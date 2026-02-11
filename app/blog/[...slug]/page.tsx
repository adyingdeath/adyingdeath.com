import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { standardizePath } from "@/app/utils/compare-path";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-col items-center">
      <article className="mt-4 prose dark:prose-invert prose-sm px-4 sm:prose-base max-sm:max-w-full lg:prose-xl prose-adyingdeath">
        <h1 className="mt-10 text-center text-6xl">{post.title}</h1>
        <p className="mt-6">
          <Badge className="mr-2" variant="outline">{new Date(post.date).toLocaleDateString()}</Badge>
          <span className="opacity-80">{post.summary}</span>
        </p>
        <Separator />
        <MDXContent code={post.mdx}></MDXContent>
      </article>
    </div>
  );
}
