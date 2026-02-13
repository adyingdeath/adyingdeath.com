import type { Metadata } from "next";
import { allPosts } from "content-collections";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import WidthLimit from "@/components/container";

export const metadata: Metadata = {
  title: "Blog",
};

function PostItem({
  url,
  title,
  summary,
  date,
}: {
  url: string;
  title: string;
  summary: string;
  date: string;
}) {
  return (
    <Link href={url} className="block group">
      <div className="py-8 cursor-pointer">
        <time className="text-sm text-muted-foreground mb-2 block">
          {new Date(date).toLocaleDateString()}
        </time>
        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
          {title}
        </h2>
        <p className="text-muted-foreground">{summary}</p>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <WidthLimit className="my-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts, tutorials, and updates from my journey as a developer.
          </p>
        </div>
        <div className="flex flex-col">
          {sortedPosts.map((post, index) => (
            <div key={post._meta.path}>
              <PostItem
                url={`/blog/${post._meta.path}`}
                title={post.title}
                summary={post.summary}
                date={post.date}
              />
              {index < sortedPosts.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </WidthLimit>
    </div>
  );
}
