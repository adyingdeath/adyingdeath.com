import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "87eevn0k71g7",
  title: "Best Practices for Implementing Internationalization (i18n) in Next.js Static Exports",
  summary: "Discover a step-by-step guide on integrating i18n support with static exports in Next.js using next-international. Learn how to set up language files, modify your project structure, and translate both server and client components seamlessly. Perfect for optimizing multilingual Next.js projects.",
  date: "2024-10-26 17:34",
};

export default function post() {
  return (
    <>
      {md`
Recently, I decided to rewrite one of my side projects using **Next.js**. I've been learning **Next.js** and wanted to practice by cleaning up my old code.

However, I encountered a challenge: while there are many i18n libraries available, few support **static exports**. I found a few libraries that claimed to support this feature, but their documentation was sparse, with only brief instructions. This led to a lengthy research process.

Here are the solutions I found:
      `}

      <h2>next-international</h2>

      <p><em>Note: The following code examples are in Typescript and are for Next.js using the App Router.</em></p>

      <h3>Installation</h3>

      {md`
First, install \`next-international\`.

For npm:
      `}

      <CodeBlock
        language="bash"
        code={`npm install next-international`}
      />

      {md`
For yarn:
      `}

      <CodeBlock
        language="bash"
        code={`yarn add next-international`}
      />

      <h3>Create \`server.ts\` and \`client.ts\`</h3>

      {md`
Create the following file structure:
      `}

      <CodeBlock
        language="plaintext"
        code={`project/
└── locales/
    ├── server.ts
    └── client.ts`}
      />

      {md`
\`server.ts\` and \`client.ts\`:
      `}

      <CodeBlock
        language="typescript"
        filename="locales/server.ts"
        code={`import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
    en: () => import('./en'),
    zh: () => import('./zh'),
});`}
      />

      <CodeBlock
        language="typescript"
        filename="locales/client.ts"
        code={`"use client"
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
    en: () => import('./en'),
    zh: () => import('./zh'),
})`}
      />

      <h3>Prepare the language files</h3>

      {md`
Create file \`{language name}.ts\` under \`locales\` folder:
      `}

      <CodeBlock
        language="plaintext"
        code={`project/
└── locales/
    ├── en.ts
    └── zh.ts`}
      />

      <CodeBlock
        language="typescript"
        filename="locales/en.ts"
        code={`export default {
    "header": {
        "home": "Home",
        "blog": "blog"
    },
    "siteName": "Adyingdeath Blog"
} as const`}
      />

      {md`
Your current file structure looks like this:
      `}

      <CodeBlock
        language="plaintext"
        code={`project/
└── locales/
    ├── server.ts
    ├── client.ts
    ├── en.ts
    └── zh.ts`}
      />

      <h3>Modify Your Existing Files</h3>

      {md`
Move all your routes into an \`app/[locale]/ \` folder:
      `}

      <CodeBlock
        language="plaintext"
        code={`// Before moving
project/
└── app/
    ├── layout.tsx
    └── page.tsx

// After moving
project/
└── app/
    └── [locale]/
        ├── layout.tsx
        └── page.tsx`}
      />

      {md`
**Note:** The \`[locale]\` placeholder is a literal string, not a variable reference. You should name the folder exactly as \`[locale]\`.

If your app contains client components, wrap the lowest level components with \`I18nProviderClient\` within a layout:
      `}

      <CodeBlock
        language="typescript"
        filename="app/[locale]/layout.tsx"
        code={`import { I18nProviderClient } from '../../locales/client'

/* other codes */

export default async function RootLayout({
    params,
    children,
}: Readonly<{
    params: Promise<{ locale: string }>;
    children: React.ReactNode;
}>) {
    const { locale } = await params;
    setStaticParamsLocale(locale);

    return (
        <I18nProviderClient locale={locale}>
            {children}
        </I18nProviderClient>
    );
}`}
      />

      <h3>Add \`setStaticParamsLocale\` and \`getStaticParams\`</h3>

      {md`
Add the following:

- Within the root layout, call the \`setStaticParamsLocale\` function, passing it the \`locale\` page parameter.
- Export a \`generateStaticParams\` function from the root layout.

**Note:** You can also add \`setStaticParamsLocale\` and \`getStaticParams\` to individual pages. If you prefer not to add them to the root layout, you can include them in the specific pages where needed. However, keep in mind that these functions can only be used in server components.
      `}

      <CodeBlock
        language="typescript"
        filename="app/[locale]/layout.tsx"
        code={`import { setStaticParamsLocale } from 'next-international/server'
import { getStaticParams } from '../../locales/server'

export default async function RootLayout({
    params,
    children,
}: Readonly<{
    params: Promise<{ locale: string }>;
    children: React.ReactNode;
}>) {
    const { locale } = await params;
    setStaticParamsLocale(locale);

    return ( /* ... */ )
}

export function generateStaticParams() {
    return getStaticParams()
}`}
      />

      <h3>Translate Now</h3>

      {md`
Inside server components:
      `}

      <CodeBlock
        language="typescript"
        code={`import { getI18n } from '@/locales/server'

export default async function Page() {
    const t = await getI18n();

    return (
        <div>{t("siteName")}</div>
    )
}`}
      />

      {md`
Inside client components:
      `}

      <CodeBlock
        language="typescript"
        code={`"use client";

import { useI18n } from '@/locales/client';

export default function Header() {
    const t = useI18n();

    return (
        <div className='w-full flex items-center p-2 gap-4'>
            {t("header.blog")}
        </div>
    )
}`}
      />

      <h3>Static Exports</h3>

      {md`
Inside your \`next.config.ts\`, set \`output\` to \`export\`:
      `}

      <CodeBlock
        language="typescript"
        code={`const nextConfig: NextConfig = {
  output: "export",
};`}
      />

      {md`
Then, export it to \`out\` folder in your project root:
      `}

      <CodeBlock
        language="bash"
        code={`npm run build`}
      />
    </>
  );
}
