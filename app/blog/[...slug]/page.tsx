import type { Metadata } from "next";
import { allPosts } from "@/data/blog/registry";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import WidthLimit from "@/components/container";
import { getCanonicalUrl } from "@/lib/site-config";
import { notFound } from "next/navigation";

// Generate all static paths at build time for 100% SSG
export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const post = allPosts.find((p) => p.slug === slugStr);

  if (post === undefined) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta.htmlMeta?.title ?? post.meta.title,
    description: post.meta.htmlMeta?.description ?? post.meta.summary,
    alternates: {
      canonical: post.meta.htmlMeta?.canonical ?? getCanonicalUrl(`/blog/${post.slug}`),
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const post = allPosts.find((p) => p.slug === slugStr);

  if (post === undefined) {
    notFound();
  }

  const PostComponent = post.component;

  return (
    <WidthLimit className="my-12">
      <article
        className={cn(
          "px-4",
          "text-secondary-foreground leading-[1.75]",
          "text-sm sm:text-base md:text-lg lg:text-xl",
          // Paragraphs
          "[&_p]:my-[1.25em]",
          // Headings
          "[&_h1]:text-foreground [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-[1.3] [&_h1]:mb-16",
          "[&_h2]:text-foreground [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-[1.3] [&_h2]:mt-[2em] [&_h2]:mb-[1em]",
          "[&_h3]:text-foreground [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-[1.3] [&_h3]:mt-[2em] [&_h3]:mb-[1em]",
          // Links
          "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
          "[&_a:hover]:no-underline",
          // Bold
          "[&_strong]:text-foreground [&_strong]:font-semibold",
          // Lists
          "[&_ul]:my-[1.25em] [&_ul]:pl-[1.625em]",
          "[&_ol]:my-[1.25em] [&_ol]:pl-[1.625em]",
          "[&_li]:my-[0.5em]",
          "[&_ul_li]:list-disc",
          "[&_ol_li]:list-decimal",
          // Blockquotes
          "[&_blockquote]:text-muted-foreground [&_blockquote]:border-l-3 [&_blockquote]:border-border [&_blockquote]:my-[1.6em] [&_blockquote]:pl-[1em]",
          "[&_blockquote_p]:my-[0.75em]",
          // Inline code
          "[&_code]:text-primary [&_code]:text-[0.875em] [&_code]:font-normal",
          // HR
          "[&_hr]:border-border [&_hr]:my-[2em]",
          // Images
          "[&_img]:my-[2em]",
          // Figure
          "[&_figure]:my-[2em]",
          "[&_figcaption]:text-muted-foreground [&_figcaption]:text-sm [&_figcaption]:text-center [&_figcaption]:mt-2",
        )}
      >
        <h1 className="text-center">{post.meta.title}</h1>
        <p className="mt-6">
          <Badge className="mr-2" variant="outline">
            {format(new Date(post.meta.date), "MMMM d, yyyy")}
          </Badge>
          <span className="opacity-80">{post.meta.summary}</span>
        </p>
        <Separator />
        <PostComponent />
      </article>
    </WidthLimit>
  );
}
