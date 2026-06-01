import type { BlogPost } from "./types";

/**
 * Central registry of all blog posts.
 *
 * To add a new article, just append two lines at the bottom of this file:
 *
 * ```ts
 * // ── Post: My New Article ──────────────────────────
 * import { meta as metaMyPost, default as MyPost } from "./category/my-post";
 * allPosts.push({ slug: "category/my-post", meta: metaMyPost, component: MyPost });
 * ```
 */
export const allPosts: BlogPost[] = [];

// ##################################################################### //
// ######################### New posts go below ######################## //
// ##################################################################### //

// ── Post: How to change 7-zip temp folder location ──
import { meta as meta_3r0apmal1x5clmzk, default as Post_3r0apmal1x5clmzk } from "./tips/how-to-change-7-zip-temp-folder-location";
allPosts.push({ slug: "tips/how-to-change-7-zip-temp-folder-location", meta: meta_3r0apmal1x5clmzk, component: Post_3r0apmal1x5clmzk });
