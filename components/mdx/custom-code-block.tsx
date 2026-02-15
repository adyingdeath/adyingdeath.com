import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { codeToHtml } from 'shiki'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const mapleMono = localFont({
  src: './MapleMono-Regular.ttf',
  display: 'swap',
});

export async function CustomCodeBlock({ plaincode = "", language = "plaintext" }: {
  plaincode: string,
  language: string,
}) {
  const out = await codeToHtml(plaincode, {
    lang: language,
    theme: "andromeeda",
  });

  return (
    <div className="flex">
      <ScrollArea className="w-1 flex-1 not-prose rounded-md border">
        <div className={cn(mapleMono.className, "flex")}>
          <div
            className={cn(
              "**:font-[inherit]!", // Use mapleMono font
              "[&>pre]:p-4 flex-1",
            )}
            dangerouslySetInnerHTML={{ __html: out }}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}