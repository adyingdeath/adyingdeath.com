import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "zfgt530eughs",
  title: "Minecraft Datapack: How to Implement Control Flow Structures",
  summary: "Exploration to find a proper way to implement control flow structures inside Minecraft datapack.",
  date: "2026-06-02 22:00",
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
I will discuss how to implement these control flow structures in datapack:

- If
- While, as well as Continue and Break
- For

We know that computer programs use operations like \`jump\` or condition \`jump\` to build up control flow structures like \`if\`, \`while\`, etc. However, we don't have \`jump\` inside datapack. What we only have is \`/function\` and \`/return\`, which are the only two commands that can change the flow of control.

That means, if we want to implement control flow structures like \`if\`, \`while\` inside datapack, we have two options: one is to figure out how to simulate \`jump\` with minecraft commands, another is to implement them without \`jump\`.

I've found that it isn't intuitive to implement a complete version of control flow structures like \`If\` and \`While\` without an operation like \`jump\`. (See [Why Do We Need Jump?](#why-do-we-need-jump))

However, there's a good news. I've figured out how to simulate \`jump\` inside minecraft datapack. Let's dive deep.
      `}

      <h2>Simulate Jump</h2>

      {md`
The only two things we can use are \`/function\` and \`/return\`. Say we have these two functions:
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say 1
function minecraft:callee
say 3
        `}
      />

      <CodeBlock
        filename="callee.mcfunction"
        language="mcfunction"
        code={`
say 2
        `}
      />

      {md`
If you run \`/function minecraft:caller\`, it's obvious we will get output like \`1 2 3\`, right? What if we want to do a \`jump\` operation after \`say 1\`? That means we will only get output like \`1 2\` with \`say 3\` skipped.

The method is to use \`return run function minecraft:callee\` instead of \`function minecraft:callee\`. Minecraft will first run \`say 1\`, then switch to function \`callee\`, which is \`say 2\`, then it goes back to function \`caller\` and directly return. All commands after it are actually skipped.
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say 1
return run function minecraft:callee
say 3
        `}
      />

      <CodeBlock
        filename="callee.mcfunction"
        language="mcfunction"
        code={`
say 2
        `}
      />

      {md`
The following code will have a similar effect but it's easier for you to determine return value:
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say 1
function minecraft:callee
return 0 # any integers you want
say 3
        `}
      />

      <CodeBlock
        filename="callee.mcfunction"
        language="mcfunction"
        code={`
say 2
        `}
      />

      {md`
Multiple \`jump\` will work well too.
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say 1
return run function minecraft:chain1
say 2
        `}
      />

      <CodeBlock
        filename="chain1.mcfunction"
        language="mcfunction"
        code={`
say 3
return run function minecraft:chain2
say 4
        `}
      />

      <CodeBlock
        filename="chain2.mcfunction"
        language="mcfunction"
        code={`
say 5
return 1
say 6
        `}
      />

      {md`
Run \`/function minecraft:caller\`, we will get output \`1 3 5\`, skipping \`say 3\`, \`say 4\` and \`say 6\`. It's just the same as \`jump\`, right?
      `}

      <h2>If</h2>

      <h3>Single Branch If</h3>

      {md`
**Single Branch If** is easy to implement. Say we have this high-level code:
      `}

      <CodeBlock
        language="js"
        code={`
say("before_if");
if(condition) {
    say("if_then");
}
say("after_if");
        `}
      />

      {md`
Represent it in mcfunction:
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_if
execute unless <condition> run return run function minecraft:after_if
say if_then
return run function minecraft:after_if
        `}
      />

      <CodeBlock
        filename="after_if.mcfunction"
        language="mcfunction"
        code={`
say after_if
        `}
      />

      <h3>Two Branch If</h3>

      <CodeBlock
        language="js"
        code={`
say("before_if");
if(condition) {
    say("if_then");
} else {
    say("if_else");
}
say("after_if");
        `}
      />

      {md`
It's similar to **Single Branch If**. Before \`if_then\`, we just need to jump to \`if_else\` position instead of \`after_if\` position, then jump to \`after_if\` position inside \`if_else\`.
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_if
execute unless <condition> run return run function minecraft:if_else
say if_then
return run function minecraft:after_if
        `}
      />

      <CodeBlock
        filename="if_else.mcfunction"
        language="mcfunction"
        code={`
say if_else
return run function minecraft:after_if
        `}
      />

      <CodeBlock
        filename="after_if.mcfunction"
        language="mcfunction"
        code={`
say after_if
        `}
      />

      <h3>Multiple Branch If</h3>

      <CodeBlock
        language="js"
        code={`
say("before_if");
if(condition1) {
    say("branch1");
} else if(condition2) {
    say("branch2");
} else {
    say("branch3");
}
say("after_if");
        `}
      />

      {md`
Try to jump to \`branch2\` before \`branch1\`. And try to jump to \`branch3\` before \`branch2\`. Start to perceive the regularity?
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_if
execute unless <condition1> run return run function minecraft:branch2
say branch1
return run function minecraft:after_if
        `}
      />

      <CodeBlock
        filename="branch2.mcfunction"
        language="mcfunction"
        code={`
execute unless <condition1> run return run function minecraft:branch3
say branch2
return run function minecraft:after_if
        `}
      />

      <CodeBlock
        filename="branch3.mcfunction"
        language="mcfunction"
        code={`
say branch3
return run function minecraft:after_if
        `}
      />

      <CodeBlock
        filename="after_if.mcfunction"
        language="mcfunction"
        code={`
say after_if
        `}
      />

      <h3>Summary</h3>

      {md`
The core principle is to do a jump to the next branch (or \`after_if\` if there's only one branch) at the beginning of branches except the last branch, when the branch's condition is not met.

- For **Single Branch If**, \`unless jump\` to \`after_if\` before \`if_then\`.
- For **Two Branch If**, \`unless jump\` to \`if_else\` before \`if_then\`.
- For **Multiple Branch If**, \`unless jump\` to \`branch2\` before \`branch1\`, and \`unless jump\` to \`branch3\` before \`branch2\`.
      `}

      <h2>While</h2>

      <CodeBlock
        language="js"
        code={`
say("before_while");
while(condition) {
    say("a_round");
}
say("after_while");
        `}
      />

      {md`
To implement **While**, we jump to \`loop_body\` directly, and try to leave the \`loop_body\` at the beginning of it using a jump to \`after_while\`. At the end of \`loop_body\` we jump back to itself so it keeps looping.
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_while
return run function minecraft:loop_body
        `}
      />

      <CodeBlock
        filename="loop_body.mcfunction"
        language="mcfunction"
        code={`
execute unless <condition> run return run function minecraft:after_while
say a_round
return run function minecraft:loop_body
        `}
      />

      <CodeBlock
        filename="after_while.mcfunction"
        language="mcfunction"
        code={`
say after_while
        `}
      />

      <h3>For Loop</h3>

      {md`
Since we've figured out how to implement **While Loop**, we can build a **For Loop** based on it.

Actually, **For Loop** can always be rewritten to a **While Loop**.
      `}

      <CodeBlock
        language="js"
        code={`
// For loop
for(i = 0;i <= 5;i++) {
    say(i);
}

// Rewrite to while loop
i = 0;
while(i <= 5) {
    say(i);
    i++;
}
        `}
      />

      {md`
You see it? To turn a **For Loop** into a **While Loop**, you only need to move the \`int i = 0\` to the front of while and move the \`i++\` to the last line of while.

Here is an example of mcfunction:
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_while
# int i = 0;
scoreboard players set i var 0
return run function minecraft:loop_body
        `}
        highlightLines="2-3"
      />

      <CodeBlock
        filename="loop_body.mcfunction"
        language="mcfunction"
        code={`
# while(i <= 5)
execute unless score i var matches ..5 run return run function minecraft:after_while
tellraw @a {"score": {"objective": "var", "name": "i"}}
# i++;
scoreboard players add i var 1
return run function minecraft:loop_body
        `}
        highlightLines="4-5"
      />

      <CodeBlock
        filename="after_while.mcfunction"
        language="mcfunction"
        code={`
say after_while
        `}
      />

      {md`
You can see that we just add several lines of code to the mcfunction code of **While** above.
      `}

      <h3>Continue</h3>

      {md`
This is actually the most tricky one if you don't find a way to simulate \`jump\` operation. That's why I think it's better to implement **While** with \`jump\` instead of without it.

With \`jump\`, we can directly jump to start a new round again(by jumping to \`loop_body\`). Say we want to output \`0\` to \`5\` but skip \`3\`.
      `}

      <CodeBlock
        language="js"
        code={`
i = 0;
while(i <= 5) {
    if(i == 3) continue;
    say(i);
    i++;
}
        `}
        highlightLines="3"
      />
      
      {md`
Here is the mcfunction code. We'll jump to a new mcfunction \`increment\`, where the variable \`i\` increments and jump to start a new loop round.
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_while
# int i = 0;
scoreboard players set i var 0
return run function minecraft:loop_body
        `}
      />

      <CodeBlock
        filename="loop_body.mcfunction"
        language="mcfunction"
        code={`
# while(i <= 5)
execute unless score i var matches ..5 run return run function minecraft:after_while
# if(i == 3) continue;
execute if score i var matches 3 run return run function minecraft:increment
tellraw @a {"score": {"objective": "var", "name": "i"}}
# i++;
scoreboard players add i var 1
return run function minecraft:loop_body
        `}
        highlightLines="3-4"
      />

      <CodeBlock
        filename="increment.mcfunction"
        language="mcfunction"
        code={`
# This is a new file!
# i++;
scoreboard players add i var 1
return run function minecraft:loop_body
        `}
      />

      <CodeBlock
        filename="after_while.mcfunction"
        language="mcfunction"
        code={`
say after_while
        `}
      />

      {md`
Why don't I just replace \`loop_body:line7-8\` with \`return run function minecraft:increment\`? Because most of the time \`i\` can directly increment inside \`loop_body\` instead of running another \`/function\`, better performance.
      `}

      <h3>Break</h3>

      {md`
Compared to \`Continue\`, \`Break\` is far more easier to implement. You jump out of the loop directly, and it's done. Say we stop the loop when \`i\` equals to \`3\`.
      `}
      
      <CodeBlock
        language="js"
        code={`
i = 0;
while(i <= 5) {
    if(i == 3) break;
    say(i);
    i++;
}
        `}
        highlightLines="3"
      />

      {md`
The mcfunction. Easy, right?
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="mcfunction"
        code={`
say before_while
# int i = 0;
scoreboard players set i var 0
return run function minecraft:loop_body
        `}
      />

      <CodeBlock
        filename="loop_body.mcfunction"
        language="mcfunction"
        code={`
# while(i <= 5)
execute unless score i var matches ..5 run return run function minecraft:after_while
# if(i == 3) break;
execute if score i var matches 3 run return run function minecraft:after_while
tellraw @a {"score": {"objective": "var", "name": "i"}}
# i++;
scoreboard players add i var 1
return run function minecraft:loop_body
        `}
        highlightLines="3-4"
      />

      <CodeBlock
        filename="after_while.mcfunction"
        language="mcfunction"
        code={`
say after_while
        `}
      />

      <h2 id="why-do-we-need-jump">Why Do We Need Jump?</h2>

      {md`
All the things we talk about in this article are built on top of \`jump\`. That's because it will be far more easier to build them using \`jump\`.

There are a lot of differences between \`jump\` and \`/function\` command: \`/function\` will go back to where we run \`/function\` after the function completes, but \`jump\` won't come back itself. \`jump\` has a great advantage that you can determine yourself whether you want to go back to its caller because you can directly jump to the original position if you want. In comparison, \`/function\` must go back, no matter whether you want or not.
      `}
    </>
  );
}
