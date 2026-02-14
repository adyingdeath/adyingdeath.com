import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";

import { standardizePath } from "@/app/utils/compare-path";

//export const dynamic = "force-dynamic";

const baseUrl = "https://adyingdeath.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = allPosts.map((post) => {
    const standardizedPath = standardizePath(post._meta.path);
    return {
      url: `${baseUrl}/blog/${standardizedPath}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogPosts];
}
