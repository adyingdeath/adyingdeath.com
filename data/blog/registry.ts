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

import { meta as meta_k1yakzpo6er5, default as Post_k1yakzpo6er5 } from "./tips/how-to-change-7-zip-temp-folder-location";
allPosts.push(makePost("k1ya", "tips/how-to-change-7-zip-temp-folder-location", meta_k1yakzpo6er5, Post_k1yakzpo6er5));

import { meta as meta_2nf06y1tswv3, default as Post_2nf06y1tswv3 } from "./tips/fixing-invisible-scrollbar-in-tailwind-css-v4-with-shadcn-ui-components";
allPosts.push(makePost("2nf0", "tips/fixing-invisible-scrollbar-in-tailwind-css-v4-with-shadcn-ui-components", meta_2nf06y1tswv3, Post_2nf06y1tswv3));

import { meta as meta_pmx3zqfgmvrt, default as Post_pmx3zqfgmvrt } from "./tips/fixing-shadcn-ui-scrollarea-horizontal-overflow-trick";
allPosts.push(makePost("pmx3", "tips/fixing-shadcn-ui-scrollarea-horizontal-overflow-trick", meta_pmx3zqfgmvrt, Post_pmx3zqfgmvrt));

import { meta as meta_gmdp7g5e7gsj, default as Post_gmdp7g5e7gsj } from "./tips/free-up-c-drive-with-ntfs-junction";
allPosts.push(makePost("gmdp", "tips/free-up-c-drive-with-ntfs-junction", meta_gmdp7g5e7gsj, Post_gmdp7g5e7gsj));

import { meta as meta_ebm7w4lyapd7, default as Post_ebm7w4lyapd7 } from "./ai/causal-thought-about-ai";
allPosts.push(makePost("ebm7", "ai/causal-thought-about-ai", meta_ebm7w4lyapd7, Post_ebm7w4lyapd7));

import { meta as meta_ighwljdumq5w, default as Post_ighwljdumq5w } from "./ai/do-ai-have-consciousness";
allPosts.push(makePost("ighw", "ai/do-ai-have-consciousness", meta_ighwljdumq5w, Post_ighwljdumq5w));

import { meta as meta_9vbbssm5bft0, default as Post_9vbbssm5bft0 } from "./forfun/liquid-glass";
allPosts.push(makePost("9vbb", "forfun/liquid-glass", meta_9vbbssm5bft0, Post_9vbbssm5bft0));

import { meta as meta_jifuedu2lqh0, default as Post_jifuedu2lqh0 } from "./introducing-wespinner-a-free-website-where-you-can-create-and-explore-interesting-spinning-wheels";
allPosts.push(makePost("jifu", "introducing-wespinner-a-free-website-where-you-can-create-and-explore-interesting-spinning-wheels", meta_jifuedu2lqh0, Post_jifuedu2lqh0));

import { meta as meta_1wihcsz6w07y, default as Post_1wihcsz6w07y } from "./minecraft/minecraft-commands-detecting-if-player-s-y-coordinate-is-below-a-specified-value";
allPosts.push(makePost("1wih", "minecraft/minecraft-commands-detecting-if-player-s-y-coordinate-is-below-a-specified-value", meta_1wihcsz6w07y, Post_1wihcsz6w07y));

import { meta as meta_zfgt530eughs, default as Post_zfgt530eughs } from "./minecraft/minecraft-datapack-how-to-implement-common-control-flow-structures";
allPosts.push(makePost("zfgt", "minecraft/minecraft-datapack-how-to-implement-common-control-flow-structures", meta_zfgt530eughs, Post_zfgt530eughs));

import { meta as meta_xiyht94gdyi8, default as Post_xiyht94gdyi8 } from "./minecraft/minecraft-datapack-how-to-implement-function-calls";
allPosts.push(makePost("xiyh", "minecraft/minecraft-datapack-how-to-implement-function-calls", meta_xiyht94gdyi8, Post_xiyht94gdyi8));

import { meta as meta_hl0deq1imb0q, default as Post_hl0deq1imb0q } from "./minecraft/minecraft-plugin-how-to-store-data-in-itemstacks";
allPosts.push(makePost("hl0d", "minecraft/minecraft-plugin-how-to-store-data-in-itemstacks", meta_hl0deq1imb0q, Post_hl0deq1imb0q));

import { meta as meta_87eevn0k71g7, default as Post_87eevn0k71g7 } from "./next-js/best-practices-for-implementing-i18n-in-nextjs-static-exports";
allPosts.push(makePost("87ee", "next-js/best-practices-for-implementing-i18n-in-nextjs-static-exports", meta_87eevn0k71g7, Post_87eevn0k71g7));

import { meta as meta_bmj4259d68cb, default as Post_bmj4259d68cb } from "./next-js/deploy-your-static-export-next-js-website-to-vercel-easily";
allPosts.push(makePost("bmj4", "next-js/deploy-your-static-export-next-js-website-to-vercel-easily", meta_bmj4259d68cb, Post_bmj4259d68cb));

import { meta as meta_1lssxmvozp4l, default as Post_1lssxmvozp4l } from "./next-js/fixing-cannot-find-module-or-type-declarations-for-css-imports-in-nextjs";
allPosts.push(makePost("1lss", "next-js/fixing-cannot-find-module-or-type-declarations-for-css-imports-in-nextjs", meta_1lssxmvozp4l, Post_1lssxmvozp4l));

import { meta as meta_w5y6pborfd2p, default as Post_w5y6pborfd2p } from "./next-js/solving-the-element-type-is-invalid-error-in-nextjs-a-tale-of-two-imports";
allPosts.push(makePost("w5y6", "next-js/solving-the-element-type-is-invalid-error-in-nextjs-a-tale-of-two-imports", meta_w5y6pborfd2p, Post_w5y6pborfd2p));

import { meta as meta_ku1phqsc5ek4, default as Post_ku1phqsc5ek4 } from "./node-js/node-js-eacces-error-when-listening-on-some-ports";
allPosts.push(makePost("ku1p", "node-js/node-js-eacces-error-when-listening-on-some-ports", meta_ku1phqsc5ek4, Post_ku1phqsc5ek4));

import { meta as meta_algpcew4a6oa, default as Post_algpcew4a6oa } from "./node-js/using-horizontal-overflow-for-katex-in-mdx-bundler";
allPosts.push(makePost("algp", "node-js/using-horizontal-overflow-for-katex-in-mdx-bundler", meta_algpcew4a6oa, Post_algpcew4a6oa));

import { meta as meta_1rvwtd5s8wqt, default as Post_1rvwtd5s8wqt } from "./notes/i-broke-my-entire-internet-to-fix-a-node-js-port-conflict";
allPosts.push(makePost("1rvw", "notes/i-broke-my-entire-internet-to-fix-a-node-js-port-conflict", meta_1rvwtd5s8wqt, Post_1rvwtd5s8wqt));

import { meta as meta_ynf8agkstdvu, default as Post_ynf8agkstdvu } from "./tutorials/how-to-connect-to-a-remote-ubuntu-server-using-vs-code-in-windows";
allPosts.push(makePost("ynf8", "tutorials/how-to-connect-to-a-remote-ubuntu-server-using-vs-code-in-windows", meta_ynf8agkstdvu, Post_ynf8agkstdvu));

import { meta as meta_lfigtvk7ag77, default as Post_lfigtvk7ag77 } from "./tutorials/how-to-enable-intellisense-for-unity-projects-in-vs-code";
allPosts.push(makePost("lfig", "tutorials/how-to-enable-intellisense-for-unity-projects-in-vs-code", meta_lfigtvk7ag77, Post_lfigtvk7ag77));

import { meta as meta_thufz3lnhtrw, default as Post_thufz3lnhtrw } from "./notes/switching-from-mdx-to-tsx-for-blogging";
allPosts.push(makePost("thuf", "notes/switching-from-mdx-to-tsx-for-blogging", meta_thufz3lnhtrw, Post_thufz3lnhtrw));

import { meta as meta_ye4vrpdwbgw0, default as Post_ye4vrpdwbgw0 } from "./minecraft/a-small-tool-to-extract-all-vanilla-advancements-from-minecraft";
allPosts.push(makePost("ye4v", "minecraft/a-small-tool-to-extract-all-vanilla-advancements-from-minecraft", meta_ye4vrpdwbgw0, Post_ye4vrpdwbgw0));
