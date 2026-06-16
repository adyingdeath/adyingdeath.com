import type { Metadata } from "next";
import { allPosts } from "@/data/blog/registry";
import { format } from "date-fns";
import WidthLimit from "@/components/container";
import { getCanonicalUrl } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { blogStyle } from "@/lib/blog/style";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
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

  const post = allPosts.find((p) => p.id === slug[0]);

  if (post === undefined) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta.htmlMeta?.title ?? post.meta.title,
    description: post.meta.htmlMeta?.description ?? post.meta.summary,
    alternates: {
      canonical: post.meta.htmlMeta?.canonical ?? getCanonicalUrl(post.path),
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

  const post = allPosts.find((p) => p.id === slug[0]);

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
