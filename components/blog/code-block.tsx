import { cn } from "@/lib/utils";
import { codeToHtml } from 'shiki'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mapleMono } from "./font";

export async function CodeBlock({ code = "", language = "plaintext" }: {
  code: string,
  language: string,
}) {
  const out = await codeToHtml(code, {
    lang: language,
    theme: "andromeeda",
  });

  return (
    <div className="flex">
      <ScrollArea className="w-1 flex-1 rounded-sm border">
        <div className={cn(mapleMono.className, "flex")}>
          <div
            className={cn(
              "**:font-[inherit]", // Use mapleMono font
              "[&>pre]:p-4 flex-1",
              "text-xs"
            )}
            dangerouslySetInnerHTML={{ __html: out }}
          />
        </div>
        <ScrollBar orientation="horizontal" className="m-0.5" />
      </ScrollArea>
    </div>
  );
}