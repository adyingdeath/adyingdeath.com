import type { BlogMeta, BlogPost } from "./types";

function makePost(id: string, slug: string, meta: BlogMeta, component: React.ComponentType): BlogPost {
  return {
    id,
    slug,
    meta,
    component,
    path: `/blog/${id}/${slug}`,
  };
}

/**
 * Central registry of all blog posts.
 *
 * To add a new article, just append two lines at the bottom of this file:
 *
 * ```ts
 * import { meta as metaMyPost, default as MyPost } from "./category/my-post";
 * allPosts.push(makePost("myPostId", "category/my-post", metaMyPost, MyPost));
 * ```
 */
export const allPosts: BlogPost[] = [];

// ##################################################################### //
// ######################### New posts go below ######################## //
// ##################################################################### //

import { meta as meta_k1ya, default as Post_k1ya } from "./tips/how-to-change-7-zip-temp-folder-location";
allPosts.push(makePost("k1ya", "tips/how-to-change-7-zip-temp-folder-location", meta_k1ya, Post_k1ya));

import { meta as meta_2nf0, default as Post_2nf0 } from "./tips/fixing-invisible-scrollbar-in-tailwind-css-v4-with-shadcn-ui-components";
allPosts.push(makePost("2nf0", "tips/fixing-invisible-scrollbar-in-tailwind-css-v4-with-shadcn-ui-components", meta_2nf0, Post_2nf0));

import { meta as meta_pmx3, default as Post_pmx3 } from "./tips/fixing-shadcn-ui-scrollarea-horizontal-overflow-trick";
allPosts.push(makePost("pmx3", "tips/fixing-shadcn-ui-scrollarea-horizontal-overflow-trick", meta_pmx3, Post_pmx3));

import { meta as meta_gmdp, default as Post_gmdp } from "./tips/free-up-c-drive-with-ntfs-junction";
allPosts.push(makePost("gmdp", "tips/free-up-c-drive-with-ntfs-junction", meta_gmdp, Post_gmdp));

import { meta as meta_ebm7, default as Post_ebm7 } from "./ai/causal-thought-about-ai";
allPosts.push(makePost("ebm7", "ai/causal-thought-about-ai", meta_ebm7, Post_ebm7));

import { meta as meta_ighw, default as Post_ighw } from "./ai/do-ai-have-consciousness";
allPosts.push(makePost("ighw", "ai/do-ai-have-consciousness", meta_ighw, Post_ighw));

import { meta as meta_9vbb, default as Post_9vbb } from "./forfun/liquid-glass";
allPosts.push(makePost("9vbb", "forfun/liquid-glass", meta_9vbb, Post_9vbb));

import { meta as meta_jifu, default as Post_jifu } from "./introducing-wespinner-a-free-website-where-you-can-create-and-explore-interesting-spinning-wheels";
allPosts.push(makePost("jifu", "introducing-wespinner-a-free-website-where-you-can-create-and-explore-interesting-spinning-wheels", meta_jifu, Post_jifu));

import { meta as meta_1wih, default as Post_1wih } from "./minecraft/minecraft-commands-detecting-if-player-s-y-coordinate-is-below-a-specified-value";
allPosts.push(makePost("1wih", "minecraft/minecraft-commands-detecting-if-player-s-y-coordinate-is-below-a-specified-value", meta_1wih, Post_1wih));

import { meta as meta_hl0d, default as Post_hl0d } from "./minecraft/minecraft-plugin-how-to-store-data-in-itemstacks";
allPosts.push(makePost("hl0d", "minecraft/minecraft-plugin-how-to-store-data-in-itemstacks", meta_hl0d, Post_hl0d));

import { meta as meta_87ee, default as Post_87ee } from "./next-js/best-practices-for-implementing-i18n-in-nextjs-static-exports";
allPosts.push(makePost("87ee", "next-js/best-practices-for-implementing-i18n-in-nextjs-static-exports", meta_87ee, Post_87ee));

import { meta as meta_bmj4, default as Post_bmj4 } from "./next-js/deploy-your-static-export-next-js-website-to-vercel-easily";
allPosts.push(makePost("bmj4", "next-js/deploy-your-static-export-next-js-website-to-vercel-easily", meta_bmj4, Post_bmj4));

import { meta as meta_1lss, default as Post_1lss } from "./next-js/fixing-cannot-find-module-or-type-declarations-for-css-imports-in-nextjs";
allPosts.push(makePost("1lss", "next-js/fixing-cannot-find-module-or-type-declarations-for-css-imports-in-nextjs", meta_1lss, Post_1lss));

import { meta as meta_w5y6, default as Post_w5y6 } from "./next-js/solving-the-element-type-is-invalid-error-in-nextjs-a-tale-of-two-imports";
allPosts.push(makePost("w5y6", "next-js/solving-the-element-type-is-invalid-error-in-nextjs-a-tale-of-two-imports", meta_w5y6, Post_w5y6));

import { meta as meta_ku1p, default as Post_ku1p } from "./node-js/node-js-eacces-error-when-listening-on-some-ports";
allPosts.push(makePost("ku1p", "node-js/node-js-eacces-error-when-listening-on-some-ports", meta_ku1p, Post_ku1p));

import { meta as meta_algp, default as Post_algp } from "./node-js/using-horizontal-overflow-for-katex-in-mdx-bundler";
allPosts.push(makePost("algp", "node-js/using-horizontal-overflow-for-katex-in-mdx-bundler", meta_algp, Post_algp));

import { meta as meta_1rvw, default as Post_1rvw } from "./notes/i-broke-my-entire-internet-to-fix-a-node-js-port-conflict";
allPosts.push(makePost("1rvw", "notes/i-broke-my-entire-internet-to-fix-a-node-js-port-conflict", meta_1rvw, Post_1rvw));

import { meta as meta_ynf8, default as Post_ynf8 } from "./tutorials/how-to-connect-to-a-remote-ubuntu-server-using-vs-code-in-windows";
allPosts.push(makePost("ynf8", "tutorials/how-to-connect-to-a-remote-ubuntu-server-using-vs-code-in-windows", meta_ynf8, Post_ynf8));

import { meta as meta_lfig, default as Post_lfig } from "./tutorials/how-to-enable-intellisense-for-unity-projects-in-vs-code";
allPosts.push(makePost("lfig", "tutorials/how-to-enable-intellisense-for-unity-projects-in-vs-code", meta_lfig, Post_lfig));

import { meta as meta_thuf, default as Post_thuf } from "./notes/switching-from-mdx-to-tsx-for-blogging";
allPosts.push(makePost("thuf", "notes/switching-from-mdx-to-tsx-for-blogging", meta_thuf, Post_thuf));

import { meta as meta_ye4v, default as Post_ye4v } from "./minecraft/a-small-tool-to-extract-all-vanilla-advancements-from-minecraft";
allPosts.push(makePost("ye4v", "minecraft/a-small-tool-to-extract-all-vanilla-advancements-from-minecraft", meta_ye4v, Post_ye4v));

import { meta as meta_xiyh, default as Post_xiyh } from "./minecraft/minecraft-datapack-how-to-implement-function-calls";
allPosts.push(makePost("xiyh", "minecraft/minecraft-datapack-how-to-implement-function-calls", meta_xiyh, Post_xiyh));

import { meta as meta_zfgt, default as Post_zfgt } from "./minecraft/minecraft-datapack-how-to-implement-common-control-flow-structures";
allPosts.push(makePost("zfgt", "minecraft/minecraft-datapack-how-to-implement-common-control-flow-structures", meta_zfgt, Post_zfgt));

import { meta as meta_1ixx, default as Post_1ixx } from "./minecraft/minecraft-datapack-how-to-store-and-use-variables";
allPosts.push(makePost("1ixx", "minecraft/minecraft-datapack-how-to-store-and-use-variables", meta_1ixx, Post_1ixx));

import { meta as meta_ml97, default as Post_ml97 } from "./forfun/github-snake";
allPosts.push(makePost("ml97", "forfun/github_snake", meta_ml97, Post_ml97));
