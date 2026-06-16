import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Using Horizontal Overflow for KaTeX in mdx-bundler",
  summary: "A Guide for resolving KaTeX math block overflow on mobile by wrapping .katex-display elements with a custom div using a custom rehype plugin in mdx-bundler.",
  date: "2024-11-5 21:52",
};

export default function post() {
  return (
    <>
      {md`
Recently, I encountered an issue while using \`katex\` with \`mdx-bundler\`:

*The math block may overflow on mobile devices. There isn't a direct way to add \`overflow-x: auto\` to the katex block.*

After some researches, I found the solution and would like to take a note here.
      `}

      <hr />

      {md`
Below is my method for implementing math rendering in MDX on my website. If your setup differs from mine, you might need to adjust the code accordingly.

1. Install \`mdx-bundler\` and \`react-katex\`.
2. Add \`remark-math\` and \`rehype-katex\` as plugins for \`mdx-bundler\`.

To solve the overflow problem, I wrapped the \`.katex-display\` element in a custom \`div\` with the style \`overflow-x: auto;\`.
      `}

      <h2>My Original Code</h2>

      <CodeBlock
        language="tsx"
        filename="page.tsx"
        code={`"use client";

import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getMdxContent } from '@/app/global';
import 'katex/dist/katex.min.css';

export default async function Page() {
    const srcPath = "path of mdx file";
    const mdxSource = await getMdxContent(srcPath);
    const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

    return (
        <Component />
    );
}`}
      />

      <CodeBlock
        language="ts"
        filename="global.ts"
        code={`import { bundleMDX } from 'mdx-bundler';
import fs from 'fs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export async function getMdxContent(src: string) {
    const source = fs.readFileSync(src, 'utf8');
    const { code } = await bundleMDX({
        source,
        mdxOptions(options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMath];
            options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex];
            return options;
        },
    });
    return code;
}`}
      />

      {md`
The \`rehype-katex\` plugin is used to transform math formulas into HTML code. I created a custom rehype plugin that works after \`rehype-katex\` and wraps all \`.katex-display\` elements with a custom div.
      `}

      <h2>Solution</h2>

      {md`
You can copy the plugin's code below. First, you need to install these libraries for plugin development:
      `}

      <CodeBlock
        language="bash"
        code={`npm install unified unist-util-visit hast`}
      />

      {md`
Next, copy and paste this function into your source code. You can place it anywhere; for example, here I put it directly in \`global.ts\`.
      `}

      <CodeBlock
        language="ts"
        filename="global.ts"
        code={`import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Element, Parent } from 'hast';

const rehypeWrapMathBlock: Plugin = () => {
    return (tree) => {
        visit(tree, 'element', (node: Element, index, parent: Parent) => {
            if (node.properties && node.properties.className) {
                const classList = node.properties.className as string[];
                if (classList.includes('katex-display')) {
                    const wrapper: Element = {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            style: "overflow-x: auto;"
                        },
                        children: [node]
                    };
                    parent.children[index] = wrapper;
                }
            }
        });
    };
};`}
      />

      {md`
Next, incorporate it as a \`mdx-bundler\` plugin. If \`rehypeWrapMathBlock\` is not in the same file as \`getMdxContent\` function, you should import it first.
      `}

      <CodeBlock
        language="ts"
        code={`// Add "rehypeWrapMathBlock" after "rehypeKatex"
options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex, rehypeWrapMathBlock];`}
      />

      {md`
This will now wrap the original \`.katex-display\` DOM element with a \`<div style="overflow-x: auto;">\`.
      `}
    </>
  );
}
