import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WidthLimit from "@/components/container";
import BlogCard from "@/components/blog-card";
import { sortedPosts } from "@/lib/blog/posts";
import { standardizePath } from "@/lib/path";
import { getCanonicalUrl } from "@/lib/site-config";

const FEATURED_POST_SLUG = "forfun/liquid-glass";
const RECENT_POSTS_COUNT = 4;

export const metadata: Metadata = {
  title: "Home",
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default function Home() {
  const featuredPost =
    sortedPosts.find(
      (post) => standardizePath(post._meta.path) === FEATURED_POST_SLUG,
    ) ?? sortedPosts[0];
  const recentPosts = sortedPosts
    .filter(
      (post) =>
        standardizePath(post._meta.path) !==
        standardizePath(featuredPost?._meta.path),
    )
    .slice(0, RECENT_POSTS_COUNT);

  return (
    <div className="min-h-screen bg-background">
      <WidthLimit className="my-12">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Hi, I&apos;m adyingdeath
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Developer, creator, lifelong learner. Building things that matter.
          </p>
        </div>

        {featuredPost && (
          <div className="w-full mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Featured Post
              </h2>
              <Link href="/blog">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <BlogCard
              variant="featured"
              url={`/blog/${featuredPost._meta.path}`}
              title={featuredPost.title}
              summary={featuredPost.summary}
              date={featuredPost.date}
              showReadMore
            />
            <Separator />
          </div>
        )}

        {recentPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Recent Posts
            </h2>
            <div className="flex flex-col">
              {recentPosts.map((post, index) => (
                <div key={post._meta.path}>
                  <BlogCard
                    variant="recent"
                    url={`/blog/${post._meta.path}`}
                    title={post.title}
                    summary={post.summary}
                    date={post.date}
                  />
                  {index < recentPosts.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
        )}
      </WidthLimit>
    </div>
  );
}
