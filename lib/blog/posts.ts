import { allPosts } from "@/data/blog/registry";

const sortedPosts = [...allPosts].sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
);

export { allPosts, sortedPosts };
