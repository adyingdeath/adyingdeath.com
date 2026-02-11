import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { standardizePath } from "@/app/utils/compare-path";

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
      <article className="mt-4 prose dark:prose-invert lg:prose-xl prose-adyingdeath">
        <h1 className="mt-10 text-center text-6xl">{post.title}</h1>
        <div className="mt-6">{post.summary}</div>
        <MDXContent code={post.mdx}></MDXContent>
      </article>
    </div>
  );
}
