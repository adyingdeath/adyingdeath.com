import type { Metadata } from "next";
import { allPosts } from "content-collections";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import WidthLimit from "@/components/container";
import BlogCard from "@/components/blog-card";

export const metadata: Metadata = {
  title: "Blog",
};

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
              <BlogCard
                variant="default"
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
