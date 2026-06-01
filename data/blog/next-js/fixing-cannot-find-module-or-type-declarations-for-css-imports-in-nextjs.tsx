import { md, Img, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "1lssxmvozp4l",
  title: "Fixing 'Cannot find module or type declarations' for CSS imports in Next.js",
  summary: "How to resolve TypeScript errors for CSS imports in Next.js layout files by configuring VS Code to use the project's TypeScript version instead of its built-in version.",
  date: "2026-02-14",
};

export default function post() {
  return (
    <>
      <h2>TL;DR</h2>

      {md`
If you get \`Cannot find module or type declarations for side-effect import of './globals.css'\` in Next.js, open the command palette (\`Ctrl/⌘ + Shift + P\`), search for "TypeScript: Select TypeScript Version...", and select "Use Workspace Version".
      `}

      <Img
        src="/static/images/blog/2026-02-14_15-45-23.png"
        width={800}
        height={400}
        alt="TypeScript: Select TypeScript Version"
      />

      <hr />

      {md`
Recently, I encountered a frustrating TypeScript error while working on a Next.js project. In my \`layout.tsx\` file, I got this error on the import statement:
      `}

      <CodeBlock
        language="plaintext"
        code={`Cannot find module or type declarations for side-effect import of './globals.css'.`}
      />

      <Img
        src="/static/images/blog/2026-02-14_15-41-33.png"
        width={800}
        height={400}
        alt="CSS import error in VS Code"
      />

      {md`
The application worked perfectly at runtime, but the red squiggly line in VS Code was annoying. Let me walk through how I found and fixed this issue.
      `}

      <h2>Investigation</h2>

      {md`
I started by searching for the error and found a helpful [GitHub discussion](https://github.com/vercel/next.js/discussions/84317) in the Next.js repository.

In that discussion, **@icyJoseph** (a Next.js maintainer) provided a clear explanation:

> Likely that your editor is not picking up the project's TS version, but the version it has built-in.

This was exactly the issue! VS Code was using its built-in TypeScript version instead of the TypeScript version installed in my Next.js project.
      `}

      <h2>The Root Cause</h2>

      {md`
Next.js projects use their own TypeScript version, which may include type definitions and configurations specific to Next.js (like how it handles CSS imports). When VS Code uses its built-in TypeScript version instead of the project's version, it doesn't have access to these Next.js-specific configurations, resulting in type errors for CSS imports.
      `}

      <h2>The Solution</h2>

      {md`
The solution is straightforward: configure VS Code to use the workspace (project) TypeScript version instead of its built-in version.

You can enable this by:
1. Opening the command palette (\`Ctrl/⌘ + Shift + P\`)
2. Searching for "TypeScript: Select TypeScript Version"
3. Selecting "Use Workspace Version"

Alternatively, you can follow the official Next.js documentation on [TypeScript IDE Integration](https://nextjs.org/docs/app/api-reference/config/typescript#ide-plugin) for more detailed setup instructions.

After switching to the workspace TypeScript version, the error immediately disappeared, and VS Code correctly recognized the CSS import.
      `}

      <h2>Conclusion</h2>

      {md`
If you encounter TypeScript errors in your Next.js project that seem incorrect or should work but don't, check which TypeScript version your editor is using. The built-in version may not have the necessary Next.js-specific configurations. Switching to the workspace version resolves most of these issues.
      `}

      <h2>Reference</h2>

      {md`
This solution was found in the [Next.js GitHub discussion](https://github.com/vercel/next.js/discussions/84317) and verified against the [official Next.js TypeScript documentation](https://nextjs.org/docs/app/api-reference/config/typescript#ide-plugin). The answer was provided by [a comment of @icyJoseph](https://github.com/vercel/next.js/discussions/84317#discussioncomment-14557185).
      `}
    </>
  );
}
