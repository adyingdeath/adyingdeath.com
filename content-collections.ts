import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
 
const posts = defineCollection({
  name: "posts",
  directory: "data/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string().default("nothing here..."),
    content: z.string(),
    date: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx
    };
  },
});
 
export default defineConfig({
  collections: [posts],
});