import { md, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Causal Thought About AI",
  summary: "Just some random thoughts about AI.",
  date: "2025-1-1 22:53",
};

export default function post() {
  return (
    <>
      {md`
AI is developing more and more rapidly, out of anyone's expectations. I still remember that several years ago, It suddenly occurred to me that if there was an application which could write codes and further improve the code for me following my instructions. That time, I told myself that maybe few years later, AI will be able to do this. I was right. At 2022, the ChatGPT suddenly came into existence, which astonished me totally that time. Though its first version didn't perform well, it still blew me away.

I thought: Isn't this what I've been dreaming of? Yes, it is.

Since then, LLM has been totally different from what it was when it first came out. I remember that ChatGPT 3 can't write me a simple game even after serveral rounds of me correcting its code. But now, even non-frontier LLM can do it with ease.
      `}
    </>
  );
}
