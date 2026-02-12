# Agent Guidelines for adyingdeath.com

This Next.js 16 project uses React 19, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run start` - Start production server

No test framework is currently configured.

## Import Style

- Use `@/*` alias for imports from project root (configured in tsconfig.json)
- Use `import type` for type-only imports to reduce bundle size
- Group imports: external deps first, then internal imports, empty line between groups

```ts
import { Link } from "next/link";
import type { Metadata } from "next";

import Navigator from "@/components/navigator";
```

## Component Conventions

- Default to server components (no `"use client"` directive)
- Only add `"use client"` when necessary (event handlers, browser APIs, hooks)
- Use PascalCase for component names and files: `Navigator.tsx`, `Button.tsx`
- Use arrow functions for components
- Destructure props explicitly with type annotations

```ts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
```

## TypeScript Guidelines

- Use strict mode (enabled in tsconfig.json)
- Prefer `interface` over `type` for object shapes with multiple properties
- Use `type` for unions, intersections, and simple aliases
- Always provide explicit type annotations for function parameters
- Use `Readonly<T>` for props that shouldn't be mutated

```ts
interface Project {
  title: string;
  description: string;
  href?: string;
}
```

## Styling with Tailwind CSS

- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes
- Prefer compound classes over inline styles
- Use semantic Tailwind color tokens: `bg-background`, `text-foreground`, `text-muted-foreground`
- Leverage shadcn/ui components from `@/components/ui/`
- Use responsive prefixes when needed: `max-sm:max-w-full`, `lg:prose-xl`
- Dark mode is supported via `.dark` class

```ts
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")} />
```

## Component Variants

- Use `class-variance-authority` (cva) for variant-based components
- Define variants with clear semantic names
- Export both component and variants for reusability

```ts
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { default: "...", sm: "..." },
  },
});
```

## Naming Conventions

- Files and folders: lowercase with hyphens for pages/components (`navigator.tsx`)
- Components: PascalCase (`Navigator`, `Button`)
- Functions/variables: camelCase (`cn`, `headerNavLinks`)
- Constants: camelCase (`projectsData`)
- Utilities: place in `lib/` or specific feature folders
- Data/configuration: place in `data/` folder

## Error Handling

- Server components: handle undefined/null with early returns
- Client components: use try/catch for async operations
- Return user-friendly fallbacks, not stack traces

```ts
if (post === undefined) {
  return <div>Post Not Found</div>;
}
```

## Data Layer

- MDX blog posts managed via `@content-collections`
- Import content via `content-collections` module
- Content schema defined with Zod in `content-collections.ts`
- Static data files in `data/` folder use explicit TypeScript interfaces

## Additional Notes

- Path alias `content-collections` points to generated types
- Next.js config wrapped with `withContentCollections()`
- Typography styles configured with `@tailwindcss/typography`
- Custom prose class: `prose-adyingdeath` for blog content styling