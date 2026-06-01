import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "bmj4259d68cb",
  title: "Deploy Your Static Export Next.js Website to Vercel Easily",
  summary: "Learn how to easily deploy your static exported Next.js site using Vercel, with only a few steps.",
  date: "2025-1-13",
};

export default function post() {
  return (
    <>
      {md`
Recently, I wanted to deploy one of my static exported Next.js sites to Vercel. However, I found that there were only two options on the Vercel dashboard:

1. Deploy from a Git repository
2. Deploy from a template

However, I wanted to deploy some static files that I had generated.

After some research and testing, I found that I could use the \`vercel\` CLI to deploy my site, and actually this is super convenient.
      `}

      <h2>Setup</h2>

      {md`
First, you need to install the \`vercel\` CLI.
      `}

      <CodeBlock language="bash" code={`npm i -g vercel`} />

      {md`
Here, we're installing the \`vercel\` CLI globally, which will enable us to use vercel in any of our later projects.
      `}

      <h2>Build your site</h2>

      {md`
Next, you need to build your site.

Make sure you have added \`output: export\` to your \`next.config.js\` (or \`next.config.ts\`) file.
      `}

      <CodeBlock
        language="js"
        code={`// next.config.(js|ts)
module.exports = {
  output: 'export', // enable static export
  trailingSlash: true,
};`}
      />

      {md`
Tips: the \`trailingSlash\` option is optional, because Vercel can handle the two different cases. Their difference is as follows:
      `}

      <CodeBlock
        language="plaintext"
        code={`trailingSlash: true
"https://example.com/page" -> "https://example.com/page/index.html"

trailingSlash: false
"https://example.com/page" -> "https://example.com/page.html"`}
      />

      {md`
Then, build your site:
      `}

      <CodeBlock language="bash" code={`npm run build`} />

      {md`
After the build is complete, you will find an \`out\` folder in your project root, which contains all the static files that you need to deploy.
      `}

      <h2>Deploy to Vercel</h2>

      {md`
Now, you can deploy your site to Vercel.
      `}

      <CodeBlock language="bash" code={`npx vercel`} />

      {md`
There will be some prompts asking you for extra information:
      `}

      <CodeBlock
        language="plaintext"
        code={`? Set up and deploy "<your project path>"? yes
? Which scope should contain your project? projects
? Link to existing project? no
? What's your project's name? <your project name>
? In which directory is your code located? ./out`}
      />

      {md`
Most of the cases, you can just press Enter to use the default value, until you see \`? In which directory is your code located?\`. Here, you need to type in \`out\`, which is the directory that contains all the static files that you need to deploy. Then, you can press Enter to continue.

After that, you will see the deployment progress, which will take a few minutes.

Well done! You have successfully deployed your static exported Next.js site to Vercel. There will be a URL of your site in the terminal. You can check the URL in the Vercel dashboard.
      `}

      <h2>Deploy again later</h2>

      {md`
It's very easy and convenient to deploy again using vercel CLI.

First, build the project:
      `}

      <CodeBlock language="bash" code={`npm run build`} />

      {md`
Then, deploy it to Vercel:
      `}

      <CodeBlock language="bash" code={`npx vercel --prod`} />

      {md`
Wait for the files to be uploaded and it will be done automatically. Then, visit the URL of your site to check the changes.
      `}
    </>
  );
}
