import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Minecraft Datapack: How to Store and Use Variables",
  summary: "Exploration on storage and usage of variables in Minecraft datapack.",
  date: "2026-06-16 19:16",
};

export default function post() {
  return (
    <>
      <blockquote>
        {md`
I'm developing a language, where you write high-level code similar to Java, C, Python, etc, and compile the code into datapack.

This article is more of an exploration to find proper implementations to stably convert high-level code into datapack functions, which means the methods I discuss here is not for ordinary datapack development.

It's been a long time since my last writing without LLM. This article is wholy written by myself. It gives me a place to think really deeply while writing.
        `}
      </blockquote>

      {md`
Inside [How to Implement Function Calls > The Storage](blog:xiyh#the-storage), I've discussed how to store local variables. It's better for us to store local variables inside storage, because only when they are inside storage we can make recursive function calling.

We prefer scoreboard to do calculations(if the variables can be calculated on scoreboard), because it's what directly provides by the game and can complete calculations quickly.
      `}

      <h2>Boolean Type</h2>

      {md`
I will start with Boolean type. It's good to use scoreboard directly for calcuations between boolean variables. Since scoreboard is for integer, we will make a convention where \`0\` stands for \`false\` and \`1\` stands for \`true\`. That's how we store them on scoreboard.

For calculations, we know that there are three basic kinds of boolean operations: \`NOT\`, \`OR\` and \`AND\`. We need to figure out how to complete these three operations using what Minecraft has prepared for us:

- \`+=\`
- \`-=\`
- \`*=\`
- \`/=\`
- \`%=\`
- \`=\`
- \`<\`
- \`>\`
- \`><\`

and we should achieve them with as little commands as possible for performance.
      `}

      <h3>NOT</h3>

      <Table>
        <TableCaption>Truth table for NOT operation</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">a</TableHead>
            <TableHead className="text-center">NOT a</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">0</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {md`
It's actually very easy to find how to do \`NOT\` with scoreboard.
      `}

      <CodeBlock
        language="mcfunction"
        code={`
# calculate: t = not a = 1 - a
scoreboard players set t var 1
scoreboard players operation t var -= a var
        `}
      />

      <h3>OR</h3>

      <Table>
        <TableCaption>Truth table for OR operation</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">a</TableHead>
            <TableHead className="text-center">b</TableHead>
            <TableHead className="text-center">a OR b</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">0</TableCell>
            <TableCell className="text-center">1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">1</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {md`
At first, I struggle to find a proper implementation for OR operation, and I try to build it using NOT and AND like this:
      `}

      <CodeBlock
        language="plaintext"
        code={`
a OR b
= NOT ((NOT a) AND (NOT b))
= 1 - ((1 - a) * (1 - b))
= 1 - (1 - a - b + ab)
= a + b + ab
        `}
      />

      {md`
You can see that the operation is complex, you will need a four commands to complete it.
      `}

      <CodeBlock
        filename=""
        language="mcfunction"
        code={`
# calculate: t = a + b + ab
scoreboard players operation t var = a var
scoreboard players operation t var *= b var
scoreboard players operation t var += a var
scoreboard players operation t var += b var
        `}
      />

      {md`
So I've thought very hard to find a better way to achieve OR operation. After some time of 
      `}

      <h3>AND</h3>
    </>
  );
}
