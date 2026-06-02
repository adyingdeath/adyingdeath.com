import { mapleMono } from "@/components/blog/font";
import { cn } from "../utils";

export { md } from "./md";
export { Img } from "@/components/blog/img";
export { CodeBlock } from "@/components/blog/code-block";
export type { BlogMeta } from "@/data/blog/types";

export function InlineCode({ children }: { children: string }) {
    return (
        <code key={children.slice(5)} className={cn("px-0.5 py-[0.25] bg-secondary text-secondary-foreground rounded-xs", mapleMono.className)}>
            {children}
        </code>
    );
}