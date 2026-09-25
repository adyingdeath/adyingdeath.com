import type { BlogPost } from "@/data/blog/types";
import { allPosts } from "@/data/blog/registry";

/**
 * Posts that may be exposed in the current environment: every post in
 * development, only published posts in production.
 */
export const visiblePosts = (process.env.NODE_ENV === "development")
  ? allPosts
  : allPosts.filter((post) => !post.meta.draft);

/** Visible posts, newest first. */
export const sortedPosts = [...visiblePosts].sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
);

/**
 * Resolve a post id to a post that is visible in the current environment.
 *
 * Returns `undefined` for drafts in production so callers can respond with a
 * 404 instead of leaking draft content.
 */
export function findVisiblePostById(id: string): BlogPost | undefined {
  return visiblePosts.find((post) => post.id === id);
}
