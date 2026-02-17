import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import WidthLimit from "@/components/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import projectsData from "@/data/projectsData";
import { getCanonicalUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
  alternates: {
    canonical: getCanonicalUrl("/projects"),
  },
};

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <WidthLimit className="my-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my work and side projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              {project.imgSrc && (
                <CardContent className="p-0">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={project.imgSrc}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              {project.href && (
                <CardFooter>
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    Visit site
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </WidthLimit>
    </div>
  );
}
