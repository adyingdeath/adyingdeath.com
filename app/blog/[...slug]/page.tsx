import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path === slug.join("/"));

  if (post === undefined) {
    return <div>Post Not Found</div>;
  }

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.summary}</div>
      <div>
        <MDXContent code={post.mdx}></MDXContent>
      </div>
    </div>
  );
}
