import type { Metadata } from "next";
import Link from "next/link";
import WidthLimit from "@/components/container";
import { getCanonicalUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "Hi, I'm adyingdeath. A developer passionate about building useful tools and applications that solve real problems. Get to know me better.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <WidthLimit className="my-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            About
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know me better
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="prose-adyingdeath prose dark:prose-invert">
            <p>
              Hi, I&apos;m adyingdeath. I&apos;m a developer passionate about
              building useful tools and applications that solve real problems.
            </p>

            <h2>What I Do</h2>
            <p>
              I work on various projects ranging from web applications to
              developer tools. My focus is on creating intuitive interfaces and
              writing clean, maintainable code.
            </p>

            <h2>My Projects</h2>
            <p>
              Check out my&nbsp;
              <Link href="/projects">projects page</Link>
              &nbsp;to see all the tools and applications I&apos;ve built,
              including Mightool, Promptcove, and INJ.
            </p>

            <h2>Get in Touch</h2>
            <p>
              Feel free to explore my blog and projects. If you&apos;d like to
              connect, you can reach out through my social channels or check out
              my GitHub profile.
            </p>
          </div>
        </div>
      </WidthLimit>
    </div>
  );
}
