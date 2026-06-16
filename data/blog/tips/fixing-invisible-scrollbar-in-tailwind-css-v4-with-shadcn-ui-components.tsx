import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Fixing Invisible Scrollbar in Tailwind CSS v4 with shadcn/ui Components",
  summary: "How to fix invisible scrollbar issue when using shadcn/ui ScrollArea component with Tailwind CSS v4.",
  date: "2026-02-05",
};

export default function post() {
  return (
    <>
      {md`
I recently encountered a frustrating issue while working with the shadcn/ui ScrollArea component in a project using Tailwind CSS v4. The scrollbar was completely invisible even though the scroll functionality was working.
      `}

      <h2>The Problem</h2>

      {md`
I was using the shadcn/ui ScrollArea component with the following code:
      `}

      <CodeBlock
        language="tsx"
        code={`<ScrollArea className="flex-1">
  <div className="space-y-6 p-6">
    {/* content here */}
  </div>
</ScrollArea>`}
      />

      {md`
The scroll functionality worked perfectly — I could scroll through the content using my mouse wheel or keyboard, but the scrollbar itself was nowhere to be seen.
      `}

      <h2>Investigation</h2>

      {md`
When I inspected the element in DevTools and compared it with the shadcn/ui website, I noticed something interesting. On the shadcn website, the scrollbar styles had proper selectors:
      `}

      <CodeBlock
        language="css"
        code={`.data-vertical\\:w-2\\.5:where([data-orientation="vertical"]) {
  width: calc(var(--spacing) * 2.5);
}`}
      />

      {md`
But in my project, I only found empty selectors:
      `}

      <CodeBlock
        language="css"
        code={`.data-vertical\\:w-2\\.5 {
}`}
      />

      {md`
The key difference is the \`:where([data-orientation="vertical"])\` selector that was missing in my build. This selector is crucial because it matches elements with the specific data attribute that Base UI's ScrollArea component uses.
      `}

      <h2>The Root Cause</h2>

      {md`
The shadcn/ui ScrollArea component uses Tailwind classes like \`data-vertical:w-2.5\` and \`data-horizontal:h-2.5\` to style the scrollbar. In Tailwind CSS v4, these custom variants need to be explicitly defined using \`@custom-variant\` before they can be recognized and transformed into proper CSS selectors.

Without these custom variant definitions, Tailwind v4 generates the class names but doesn't attach the proper selector logic, resulting in empty CSS rules.
      `}

      <h2>The Solution</h2>

      {md`
The fix is straightforward. Add the custom variant definitions in your CSS file (typically \`index.css\` or a similar CSS entry point):
      `}

      <CodeBlock
        language="css"
        code={`@custom-variant data-vertical (&[data-orientation="vertical"]);
@custom-variant data-horizontal (&[data-orientation="horizontal"]);`}
      />

      {md`
Place these definitions near your other \`@custom-variant\` declarations, usually right after the Tailwind imports:
      `}

      <CodeBlock
        language="css"
        code={`@import "tailwindcss";

@custom-variant dark (&:is(.dark *));
@custom-variant data-vertical (&[data-orientation="vertical"]);
@custom-variant data-horizontal (&[data-orientation="horizontal"]);`}
      />

      {md`
After adding these definitions and restarting your dev server, the scrollbar should appear correctly with all its styles applied.
      `}

      <h2>Conclusion</h2>

      {md`
Tailwind CSS v4 requires explicit custom variant declarations for non-standard variants like \`data-vertical:\` and \`data-horizontal:\`. This is a departure from v3 where these types of selectors were handled differently. If you're migrating to v4 or starting a new project with it and using shadcn/ui components, make sure to include these custom variant definitions to avoid invisible scrollbars and similar styling issues.
      `}
    </>
  );
}
