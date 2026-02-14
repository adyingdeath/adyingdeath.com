import type { Metadata } from "next";
import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { standardizePath } from "@/app/utils/compare-path";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import WidthLimit from "@/components/container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => standardizePath(p._meta.path) === slug.join("/"));

  if (post === undefined) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => standardizePath(p._meta.path) === slug.join("/"));

  if (post === undefined) {
    return <div>Post Not Found</div>;
  }

  return (
    <WidthLimit>
      <article className={cn(
        "px-4 prose prose-adyingdeath dark:prose-invert",
        "prose-sm sm:prose-base md:prose-lg lg:prose-xl"
      )}>
        <h1 className="text-center">{post.title}</h1>
        <p className="mt-6">
          <Badge className="mr-2" variant="outline">{format(new Date(post.date), "MMMM d, yyyy")}</Badge>
          <span className="opacity-80">{post.summary}</span>
        </p>
        <Separator />
        <MDXContent code={post.mdx}></MDXContent>
      </article>
    </WidthLimit>
  );
}
