import { cn } from "@/lib/utils";

import { highlight } from "@/lib/highlight/highligher";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mapleMono } from "./font";
import { CopyButton } from "./copy-button";

function parseHighlightLines(highlight: string, code: string) {
  if (!highlight) return;

  const lines = code.split("\n");
  const decorations: { start: { line: number; character: number }; end: { line: number; character: number }; properties: { class: string } }[] = [];
  const parts = highlight.split(",");

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    let startLine: number, endLine: number;

    const rangeMatch = trimmed.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      startLine = parseInt(rangeMatch[1], 10) - 1;
      endLine = parseInt(rangeMatch[2], 10) - 1;
    } else if (/^\d+$/.test(trimmed)) {
      startLine = parseInt(trimmed, 10) - 1;
      endLine = startLine;
    } else {
      continue;
    }

    for (let i = startLine; i <= endLine; i++) {
      if (i >= lines.length) break;
      decorations.push({
        start: { line: i, character: 0 },
        end: { line: i, character: lines[i]?.length ?? -1 },
        properties: { class: "highlighted-line" },
      });
    }
  }

  return decorations.length > 0 ? decorations : undefined;
}

export async function CodeBlock({
  code = "",
  language = "plaintext",
  filename,
  highlightLines,
}: {
  code: string,
  language: string,
  filename?: string,
  highlightLines?: string,
}) {
  /* Remove leading and trailing empty lines so we can write like this:
    <CodeBlock
      language="js"
      code={`
function code() {}
        `}
      />
  */

  const trimmedCode = code.replace(/(^\s*\n)|(\n\s*$)/g, "");

  const decorations = parseHighlightLines(highlightLines ?? "", trimmedCode);

  const out = await highlight(trimmedCode, language, decorations);

  return (
    <div className="flex my-1.5">
      <div className="w-1 flex-1 rounded-sm border overflow-clip bg-muted">
        {/* Top bar — outside scroll area */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <span>{filename}</span>
          <span className="flex items-center gap-1.5">
            <span>{language}</span>
            |
            <CopyButton code={trimmedCode} />
          </span>
        </div>
        <div className="px-1 pb-1">
          <ScrollArea className="w-full rounded-sm">
            <div className={cn(mapleMono.className, "flex")}>
              <div
                className={cn(
                  "**:font-[inherit]",
                  "[&>pre]:p-4 flex-1",
                  "text-sm",
                )}
                dangerouslySetInnerHTML={{ __html: out }}
              />
            </div>
            <ScrollBar orientation="horizontal" className="m-0.5" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}