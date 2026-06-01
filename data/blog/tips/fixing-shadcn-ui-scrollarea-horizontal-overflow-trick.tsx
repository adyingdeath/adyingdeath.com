import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "pmx3zqfgmvrt",
  title: "Fixing shadcn/ui ScrollArea Horizontal Overflow with a Simple Trick",
  summary: "A quick trick to make shadcn/ui ScrollArea properly scroll horizontally instead of overflowing its container.",
  date: "2026-02-15 22:35",
};

export default function post() {
  return (
    <>
      {md`
I encountered an annoying issue where the shadcn/ui ScrollArea component wasn't containing overflow properly. Instead of scrolling horizontally, the content would overflow and push the entire page wide.
      `}

      <h2>The Problem</h2>

      {md`
I had a ScrollArea wrapping a code block in my blog:
      `}

      <CodeBlock
        language="tsx"
        code={`<ScrollArea className="w-full">
  <code>{/* some long code line */}</code>
</ScrollArea>`}
      />

      {md`
On narrow screens, instead of the code block scrolling within the ScrollArea, it would stretch the entire page wide and cause horizontal scrolling on the document body.
      `}

      <h2>The Trick</h2>

      {md`
Here's the fix by [CeamKrier](https://stackoverflow.com/users/4865314/ceamkrier) from stackoverflow — set both \`flex-1\` and a small random width (e.g. \`w-1\`) on the ScrollArea:
      `}

      <CodeBlock
        language="tsx"
        code={`<ScrollArea className="w-1 flex-1">
  <code>{/* your content */}</code>
</ScrollArea>`}
      />

      {md`
That's it. The ScrollArea now properly contains overflow and shows a horizontal scrollbar instead of stretching the page.
      `}

      <h2>Why This Works</h2>

      {md`
Honestly, it seems counterintuitive — why would setting \`w-1\` and \`flex-1\` together make it work? The stackoverflow community also found this surprising, but it works reliably across different projects.

Reference: [stackoverflow answer by CeamKrier](https://stackoverflow.com/a/78690553)
      `}
    </>
  );
}
