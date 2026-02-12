import type { Metadata } from "next";
import { allPosts } from "content-collections";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Home",
};

function FeaturedPost({
  url,
  title,
  summary,
}: {
  url: string;
  title: string;
  summary: string;
}) {
  return (
    <Link href={url} className="block group">
      <div className="py-8 cursor-pointer">
        <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground line-clamp-3">{summary}</p>
        <div className="mt-4 flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
          <span className="text-sm font-medium">Read more</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function RecentPost({
  url,
  title,
  summary,
}: {
  url: string;
  title: string;
  summary: string;
}) {
  return (
    <Link href={url} className="block group">
      <div className="py-6 cursor-pointer">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            Hi, I'm adyingdeath
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Developer, creator, lifelong learner. Building things that matter.
          </p>
        </div>

        {featuredPost && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Featured Post</h2>
              <Link href="/blog">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <FeaturedPost
              url={`/blog/${featuredPost._meta.path}`}
              title={featuredPost.title}
              summary={featuredPost.summary}
            />
            <Separator />
          </div>
        )}

        {recentPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Posts</h2>
            <div className="flex flex-col">
              {recentPosts.map((post, index) => (
                <div key={post._meta.path}>
                  <RecentPost
                    url={`/blog/${post._meta.path}`}
                    title={post.title}
                    summary={post.summary}
                  />
                  {index < recentPosts.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
