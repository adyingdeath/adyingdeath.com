import { md, CodeBlock, type BlogMeta, InlineCode } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Switching from MDX to TypeScript TSX for Blogging: Why and How",
  summary: "How I replaced MDX with plain TSX files, a few helper functions, and still kept the convenience of writing prose-like markdown. No more broken autocomplete, no more heavy compilation pipeline.",
  date: "2026-06-02 23:04",
};

export default function post() {
  return (
    <>
      <blockquote>
        {md`
MDX is Markdown trying to reach toward JSX. It takes Markdown and extends it
to support React components.

I went the other way: start from TSX, reach back toward Markdown. That way I
get full autocomplete, type safety, and the ability to embed any component
without ceremony, while still being able to write prose almost as fast as in a
plain .md file.
        `}
      </blockquote>

      {md`
For the longest time, I wrote my blog with the standard MDX approach. Create a
\`.mdx\` file, write some frontmatter, write content in Markdown, embed a React
component here and there when needed. It worked, but it never felt great. The
issues were small at first, but they kept piling up.

The first one is that autocomplete in MDX files is essentially non-existent. You get basic
syntax highlighting, but no IntelliSense for component props, no import
suggestions, no "go to definition". Every time you need to use a component,
you should figure it out yourself.

Another one is no type safety. All those frontmatter fields are just strings. Rename
a field and nothing tells you there's an old post that still uses it. You'll
find out when the build breaks, or worse, when a reader notices.

But the biggest reason is control. With TSX, I feel like I have complete
ownership over my blog. I can design anything I want, embed any component,
add any interaction, and there's no abstraction layer between me and the
final output. MDX always felt like I was working within someone else's
system. TSX feels like I'm building my own.

None of these are dealbreakers individually, but together they make writing a
lot more frictionful than it should be. I wanted something that gives me the
best of both worlds: the fast prose-writing experience of Markdown, and the
full power of TypeScript + React.
      `}

      <h2>The idea: reverse the direction</h2>

      {md`
MDX is Markdown reaching toward JSX. What if I start from TSX and reach back
toward Markdown instead?

That's exactly what I did. Every blog post is now a plain \`.tsx\` file, a
Server Component with a typed metadata export. For the prose-heavy parts, I use
a tiny helper called \`md\` that calls \`marked.lexer()\` and maps the resulting
tokens to React elements at build time. Just a tagged template literal and a
token-to-element mapper that runs once during compilation.
      `}

      <h2>How it works</h2>

      <h3>1. Every post is a TSX file</h3>

      {md`
Each article exports a strict \`BlogMeta\` object and a default Server
Component. The \`id\` is a short random string, so in the future I can bind
database records to posts without relying on filenames or slugs.
      `}

      <CodeBlock
        language="tsx"
        code={`
import { md, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "thufz3lnhtrw",
  title: "Switching from MDX to TSX for Blogging",
  summary: "How I replaced MDX with plain TSX files.",
  date: "2026-06-02",
};

export default function post() {
  return (
    <>
      {md\`
This is **prose** content.
      \`}
    </>
  );
}`}
      />

      {md`
Everything in one import. The vscode snippets I set up (triggered by
\`markdown_block\` and \`code_block\`) make it even faster to write. I can easily insert \`{md\`\`}\` block and code block.
      `}

      <h3>2. The <InlineCode>md</InlineCode> helper</h3>

      {md`
This is the core of the whole thing. \`md\` is a tagged template literal that
uses \`marked\` under the hood to parse a lightweight markdown subset into
React elements. It handles paragraphs, \`**bold**\`, \`*italic*\`,
\`[links](url)\`, \`- lists\`, \`1. ordered lists\`, and \`inline code\`.
      `}

      <CodeBlock
        language="tsx"
        code={`{md\`
This is a paragraph with **bold text** and *italic text*.

- List item one
- List item two

Here is a link to [example](https://example.com).
\`}`}
      />

      {md`
The template literal syntax means I can still write prose almost as fast as in
a plain Markdown file. But I'm inside TSX, so full autocomplete, inline errors,
go-to-definition, everything just works.
      `}

      <h3>3. Components for everything else</h3>

      {md`
For things Markdown isn't great at (images, code blocks, custom interactive
elements), I use React components directly, right next to the \`md\` blocks.
\`Img\` wraps Next.js \`Image\` with sensible defaults. \`CodeBlock\` renders
syntax-highlighted code with Shiki and optionally shows a filename in the top
bar.
      `}

      <CodeBlock
        language="tsx"
        code={`<Img
  src="/static/images/screenshot.png"
  width={800}
  height={400}
  alt="Screenshot"
/>

<CodeBlock
  filename="example.ts"
  language="typescript"
  code={\`
function hello() {
  console.log("world");
}
  \`}
/>`}
      />

      <h3>4. Registry for SSG</h3>

      {md`
All posts are registered in a single \`registry.ts\` file. The pattern is append-only: for every new blog, just add two lines at the bottom and you're done. No need to scroll to the top, no need to modify existing code. The dynamic route page reads from this registry and uses \`generateStaticParams\` to pre-render every post at build time.
      `}

      <CodeBlock
        language="tsx"
        code={`// data/blog/registry.ts

// ── Post: My New Post ──
import { meta as meta_abc123, default as Post_abc123 } from "./category/my-post";
allPosts.push({
  slug: "category/my-post",
  meta: meta_abc123,
  component: Post_abc123,
});`}
      />

      <h2>What I got out of this</h2>

      {md`
- Full autocomplete. VS Code treats every post like any other TSX file.
  Imports, props, types, all work normally.
- Type safety. Metadata fields are strictly typed. Rename a field and every
  post using it will show errors.
- Everything runs at build time, so the client bundle doesn't include any
  parsers or compilers.

Actually it's just TSX with some small helpers for when I don't want to write HTML by hand. But it makes writing feel more consistent, and that's enough for me.
      `}

      <h2>Want to try it yourself?</h2>

      {md`
The core idea is simple, and you don't need a heavy meta-framework to pull it off:

1. Write each post as a TSX file with typed metadata.
2. Use a lightweight tagged-template helper for prose.
3. Keep your components close, right there in the same file.

That's really it. A small \`md\` function, a registry, and you're set. The code
for this blog is open source on
[GitHub](https://github.com/adyingdeath/adyingdeath.com) if you want to see the
full implementation.
      `}
    </>
  );
}
