import type { BlogMeta, BlogPost } from "./types";

function makePost(slug: string, meta: BlogMeta, component: React.ComponentType): BlogPost {
  return {
    slug,
    meta,
    component,
    path: `/blog/${meta.id}/${slug}`,
  };
}

/**
 * Central registry of all blog posts.
 *
 * To add a new article, just append two lines at the bottom of this file:
 *
 * ```ts
 * import { meta as metaMyPost, default as MyPost } from "./category/my-post";
 * allPosts.push(makePost("category/my-post", metaMyPost, MyPost));
 * ```
 */
export const allPosts: BlogPost[] = [];

// ##################################################################### //
// ######################### New posts go below ######################## //
// ##################################################################### //

import { meta as meta_k1yakzpo6er5, default as Post_k1yakzpo6er5 } from "./tips/how-to-change-7-zip-temp-folder-location";
allPosts.push(makePost("tips/how-to-change-7-zip-temp-folder-location", meta_k1yakzpo6er5, Post_k1yakzpo6er5));

import { meta as meta_2nf06y1tswv3, default as Post_2nf06y1tswv3 } from "./tips/fixing-invisible-scrollbar-in-tailwind-css-v4-with-shadcn-ui-components";
allPosts.push(makePost("tips/fixing-invisible-scrollbar-in-tailwind-css-v4-with-shadcn-ui-components", meta_2nf06y1tswv3, Post_2nf06y1tswv3));

import { meta as meta_pmx3zqfgmvrt, default as Post_pmx3zqfgmvrt } from "./tips/fixing-shadcn-ui-scrollarea-horizontal-overflow-trick";
allPosts.push(makePost("tips/fixing-shadcn-ui-scrollarea-horizontal-overflow-trick", meta_pmx3zqfgmvrt, Post_pmx3zqfgmvrt));

import { meta as meta_gmdp7g5e7gsj, default as Post_gmdp7g5e7gsj } from "./tips/free-up-c-drive-with-ntfs-junction";
allPosts.push(makePost("tips/free-up-c-drive-with-ntfs-junction", meta_gmdp7g5e7gsj, Post_gmdp7g5e7gsj));

import { meta as meta_ebm7w4lyapd7, default as Post_ebm7w4lyapd7 } from "./ai/causal-thought-about-ai";
allPosts.push(makePost("ai/causal-thought-about-ai", meta_ebm7w4lyapd7, Post_ebm7w4lyapd7));

import { meta as meta_ighwljdumq5w, default as Post_ighwljdumq5w } from "./ai/do-ai-have-consciousness";
allPosts.push(makePost("ai/do-ai-have-consciousness", meta_ighwljdumq5w, Post_ighwljdumq5w));

import { meta as meta_9vbbssm5bft0, default as Post_9vbbssm5bft0 } from "./forfun/liquid-glass";
allPosts.push(makePost("forfun/liquid-glass", meta_9vbbssm5bft0, Post_9vbbssm5bft0));

import { meta as meta_jifuedu2lqh0, default as Post_jifuedu2lqh0 } from "./introducing-wespinner-a-free-website-where-you-can-create-and-explore-interesting-spinning-wheels";
allPosts.push(makePost("introducing-wespinner-a-free-website-where-you-can-create-and-explore-interesting-spinning-wheels", meta_jifuedu2lqh0, Post_jifuedu2lqh0));

import { meta as meta_1wihcsz6w07y, default as Post_1wihcsz6w07y } from "./minecraft/minecraft-commands-detecting-if-player-s-y-coordinate-is-below-a-specified-value";
allPosts.push(makePost("minecraft/minecraft-commands-detecting-if-player-s-y-coordinate-is-below-a-specified-value", meta_1wihcsz6w07y, Post_1wihcsz6w07y));

import { meta as meta_zfgt530eughs, default as Post_zfgt530eughs } from "./minecraft/minecraft-datapack-how-to-implement-common-control-flow-structures";
allPosts.push(makePost("minecraft/minecraft-datapack-how-to-implement-common-control-flow-structures", meta_zfgt530eughs, Post_zfgt530eughs));

import { meta as meta_xiyht94gdyi8, default as Post_xiyht94gdyi8 } from "./minecraft/minecraft-datapack-how-to-implement-function-calls";
allPosts.push(makePost("minecraft/minecraft-datapack-how-to-implement-function-calls", meta_xiyht94gdyi8, Post_xiyht94gdyi8));

import { meta as meta_hl0deq1imb0q, default as Post_hl0deq1imb0q } from "./minecraft/minecraft-plugin-how-to-store-data-in-itemstacks";
allPosts.push(makePost("minecraft/minecraft-plugin-how-to-store-data-in-itemstacks", meta_hl0deq1imb0q, Post_hl0deq1imb0q));

import { meta as meta_87eevn0k71g7, default as Post_87eevn0k71g7 } from "./next-js/best-practices-for-implementing-i18n-in-nextjs-static-exports";
allPosts.push(makePost("next-js/best-practices-for-implementing-i18n-in-nextjs-static-exports", meta_87eevn0k71g7, Post_87eevn0k71g7));

import { meta as meta_bmj4259d68cb, default as Post_bmj4259d68cb } from "./next-js/deploy-your-static-export-next-js-website-to-vercel-easily";
allPosts.push(makePost("next-js/deploy-your-static-export-next-js-website-to-vercel-easily", meta_bmj4259d68cb, Post_bmj4259d68cb));

import { meta as meta_1lssxmvozp4l, default as Post_1lssxmvozp4l } from "./next-js/fixing-cannot-find-module-or-type-declarations-for-css-imports-in-nextjs";
allPosts.push(makePost("next-js/fixing-cannot-find-module-or-type-declarations-for-css-imports-in-nextjs", meta_1lssxmvozp4l, Post_1lssxmvozp4l));

import { meta as meta_w5y6pborfd2p, default as Post_w5y6pborfd2p } from "./next-js/solving-the-element-type-is-invalid-error-in-nextjs-a-tale-of-two-imports";
allPosts.push(makePost("next-js/solving-the-element-type-is-invalid-error-in-nextjs-a-tale-of-two-imports", meta_w5y6pborfd2p, Post_w5y6pborfd2p));

import { meta as meta_ku1phqsc5ek4, default as Post_ku1phqsc5ek4 } from "./node-js/node-js-eacces-error-when-listening-on-some-ports";
allPosts.push(makePost("node-js/node-js-eacces-error-when-listening-on-some-ports", meta_ku1phqsc5ek4, Post_ku1phqsc5ek4));

import { meta as meta_algpcew4a6oa, default as Post_algpcew4a6oa } from "./node-js/using-horizontal-overflow-for-katex-in-mdx-bundler";
allPosts.push(makePost("node-js/using-horizontal-overflow-for-katex-in-mdx-bundler", meta_algpcew4a6oa, Post_algpcew4a6oa));

import { meta as meta_1rvwtd5s8wqt, default as Post_1rvwtd5s8wqt } from "./notes/i-broke-my-entire-internet-to-fix-a-node-js-port-conflict";
allPosts.push(makePost("notes/i-broke-my-entire-internet-to-fix-a-node-js-port-conflict", meta_1rvwtd5s8wqt, Post_1rvwtd5s8wqt));

import { meta as meta_ynf8agkstdvu, default as Post_ynf8agkstdvu } from "./tutorials/how-to-connect-to-a-remote-ubuntu-server-using-vs-code-in-windows";
allPosts.push(makePost("tutorials/how-to-connect-to-a-remote-ubuntu-server-using-vs-code-in-windows", meta_ynf8agkstdvu, Post_ynf8agkstdvu));

import { meta as meta_lfigtvk7ag77, default as Post_lfigtvk7ag77 } from "./tutorials/how-to-enable-intellisense-for-unity-projects-in-vs-code";
allPosts.push(makePost("tutorials/how-to-enable-intellisense-for-unity-projects-in-vs-code", meta_lfigtvk7ag77, Post_lfigtvk7ag77));

import { meta as meta_thufz3lnhtrw, default as Post_thufz3lnhtrw } from "./notes/switching-from-mdx-to-tsx-for-blogging";
allPosts.push(makePost("notes/switching-from-mdx-to-tsx-for-blogging", meta_thufz3lnhtrw, Post_thufz3lnhtrw));

import { meta as meta_ye4vrpdwbgw0, default as Post_ye4vrpdwbgw0 } from "./minecraft/a-small-tool-to-extract-all-vanilla-advancements-from-minecraft";
allPosts.push(makePost("minecraft/a-small-tool-to-extract-all-vanilla-advancements-from-minecraft", meta_ye4vrpdwbgw0, Post_ye4vrpdwbgw0));
