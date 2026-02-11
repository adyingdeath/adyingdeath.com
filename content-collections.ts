import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
 
const posts = defineCollection({
  name: "posts",
  directory: "data/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
  }),
});
 
export default defineConfig({
  collections: [posts],
});