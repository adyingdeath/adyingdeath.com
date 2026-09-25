import type { Metadata } from "next";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import WidthLimit from "@/components/container";
import { findVisiblePostById, visiblePosts } from "@/lib/blog/posts";
import { blogStyle } from "@/lib/blog/style";

/**
 * Only the paths returned by `generateStaticParams` exist. Anything else —
 * including drafts in production, which `visiblePosts` omits — is a genuine
 * 404 before the page (and the root loading boundary) ever streams.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return visiblePosts.map((post) => ({
    slug: [post.id, ...post.slug.split("/")],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length < 2) {
    return { title: "Post Not Found" };
  }

  const post = findVisiblePostById(slug[0]);

  if (post === undefined) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta.htmlMeta?.title ?? post.meta.title,
    description: post.meta.htmlMeta?.description ?? post.meta.summary,
    alternates: {
      canonical: post.path,
    },
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.length < 2) {
    notFound();
  }

  const post = findVisiblePostById(slug[0]);

  if (post === undefined) {
    notFound();
  }

  const PostComponent = post.component;

  return (
    <WidthLimit className="my-12">
      <article className={blogStyle}>
        <h1 className="text-center">{post.meta.title}</h1>
        <p className="my-6">
          {`${format(new Date(post.meta.date), "MMMM d, yyyy")} | ${post.meta.summary}`}
        </p>
        <PostComponent />
      </article>
    </WidthLimit>
  );
}
