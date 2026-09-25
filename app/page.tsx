import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import WidthLimit from "@/components/container";
import BlogCard from "@/components/blog-card";
import { sortedPosts } from "@/lib/blog/posts";

const FEATURED_POST_ID = "thuf";
const RECENT_POSTS_COUNT = 4;

export const metadata: Metadata = {
  title: "Home | adyingdeath's blog",
  description: "Hi, I'm adyingdeath. Developer, creator, lifelong learner building things that matter. Explore my blog posts and projects.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const featuredPost =
    sortedPosts.find((post) => post.id === FEATURED_POST_ID) ??
    sortedPosts[0];
  const recentPosts = sortedPosts
    .filter((post) => post.slug !== featuredPost?.slug)
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

        <div className="my-12 w-full">
          <h2 className="mb-6 text-2xl font-semibold text-foreground">Tools</h2>
          <Link href="/t/deepseek-clock" className="block group">
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">DeepSeek Peak / Off-Peak Clock</CardTitle>
                <CardDescription>
                  See whether DeepSeek API pricing is peak or off-peak right now, in your own
                  time zone, with the current token prices.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open the clock
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </CardFooter>
            </Card>
          </Link>
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
              url={featuredPost.path}
              title={featuredPost.meta.title}
              summary={featuredPost.meta.summary}
              date={featuredPost.meta.date}
              showReadMore
            />
            <Separator />
          </div>
        )}

        {recentPosts.length > 0 && (
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Recent Posts
            </h2>
            <div className="flex flex-col">
              {recentPosts.map((post, index) => (
                <div key={post.slug}>
                  <BlogCard
                    variant="recent"
                    url={post.path}
                    title={post.meta.title}
                    summary={post.meta.summary}
                    date={post.meta.date}
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
