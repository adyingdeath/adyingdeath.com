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
          "px-4 prose prose-adyingdeath dark:prose-invert",
          "prose-sm sm:prose-base md:prose-lg lg:prose-xl",
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
