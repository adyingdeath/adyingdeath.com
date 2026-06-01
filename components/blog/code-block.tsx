import { cn } from "@/lib/utils";

import { highlight } from "@/lib/highlight/highligher";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mapleMono } from "./font";

export async function CodeBlock({
  code = "",
  language = "plaintext",
  filename,
}: {
  code: string,
  language: string,
  filename?: string,
}) {
  const out = await highlight(code, language);

  return (
    <div className="flex">
      <div className="w-1 flex-1 rounded-sm border overflow-clip bg-muted">
        {/* Top bar — outside scroll area */}
        <div className="flex items-center justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <span>{filename}</span>
          <span>{language}</span>
        </div>
        <div className="px-1 pb-1">
          <ScrollArea className="w-full rounded-sm">
            <div className={cn(mapleMono.className, "flex")}>
              <div
                className={cn(
                  "**:font-[inherit]",
                  "[&>pre]:p-4 flex-1",
                  "text-xs",
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