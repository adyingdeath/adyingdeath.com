import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "xiyht94gdyi8",
  title: "Minecraft Datapack: How to Implement Function Calls",
  summary: "Exploration to find a proper way to implement function calls inside Minecraft datapack.",
  date: "2026-05-29",
};

export default function post() {
  return (
    <>
      <blockquote>
        {md`
I'm developing a language, where you write high-level code similar to
Java, C, Python, etc, and compile the code into datapack.

This article is more of an exploration to find proper implementations
to stably convert high-level code into datapack functions, which means
the methods I discuss here is not for ordinary datapack development.

It's been a long time since my last writing without LLM. This article
is wholy written by myself. It gives me a place to think really deeply
while writing.
        `}
      </blockquote>

      {md`
In C language, when a function is called, there will be a stack frame pushed into the call stack, so the calling can just stacked up and every function calls won't bother others. We should do similar things inside Minecraft datapack.
      `}

      <h2>Stack Frame</h2>

      {md`
One difference is that, in datapack, the function will automatically return to its caller, which means we don't need to record the returning address. The stack frame is still needed. To be more concise, we need to put these information into the stack frame:

1. parameters
2. local variables

Return value is neccessary too, because if we want to tackle multiple types of return values, the original function return machanism is not enough. We will put return value in storage path \`return\`.
      `}

      <h2>The Storage</h2>

      {md`
We should use a storage to store all the stack frames and return value. Say we create a storage called \`minecraft:s\`. We hope its format is like this:
      `}

      <CodeBlock
        language="json"
        code={`
{
    "return": "xxx", // The return value of the recent function
    "stack": [
        { // The first stack frame
            "parameters": {"0": "xxx", "1": "xxx"},
            "local": {"0": "xxx", "1": "xxx"} // Save local variables to protect them
        },
        { // The second stack frame
            "parameters": {"0": "xxx", "1": "xxx", "2": "xxx"},
            "local": {"0": "xxx", "1": "xxx"}
        },
        // More stack frames here...
    ]
}
        `}
      />

      {md`
\`stack[index].parameters\` is where we deliver the parameters the function we're calling needs. \`stack[index].local\` is where we store local variables of the function.

Every time before a function call, we push an empty stack frame into the stack, then put variables into the frame as parameters for this function call. We will just use integers from zero as the keys name. Since we always know how many parameters a function will need during compilation time, it's okay that we just put those parameters to constant keys instead of pushing them into an array, *another reason is that the array can't support varying types of elements*.
      `}

      <h3>Local Variables</h3>

      {md`
Note that we store all the variables, including scoreboard variables and storage variables, inside \`stack[index].local\`. All the variables will take a place, with keys name starting from "0", no matter if they are storage variables or scoreboard variables.

Storage variables can be there all the time, because storage variables are stored in storage naturally and we don't need to store them somewhere else. However, scoreboard variables are different. Although scoreboard variables are stored in \`stack[index].local\` too, we will load them into scoreboard when we need to do operations between them. That means we should put them back to storage before any function calls to protect them, or they might be overrided under recursive calls.

We should protect local variables before creating callee's stack frame and preparing parameters, because local variables are stored inside current function's stack frame, not the function to be called. So we will be able to visit current function's stack frame using \`stack[-1]\`. Say we have a scoreboard variable (player name \`var\`, objective name \`temp\`) to protect. It can be achieved by doing this:
      `}

      <CodeBlock
        language="mcfunction"
        code={`execute store result storage minecraft:s stack[-1].local.0 int 1 run scoreboard players get var temp`}
      />

      {md`
Actually it's not a must to protect local variables before creating callee's stack frame, since we can still do protection after the insertion of new stack frame by using \`stack[-2]\`. However, I just think it is more natural to do the protection step before insertion. Any orders are ok.
      `}

      <h3>Parameters</h3>

      {md`
Caller is responsible to put all the parameters it wants to deliver into callee's stack frame. That's why it's caller to create callee's stack frame. Before a function call, caller should append an empty stack frame using this command:
      `}

      <CodeBlock
        language="mcfunction"
        code={`data modify storage minecraft:s stack append value {}`}
      />

      {md`
Now the storage \`stack[-1]\` is this new empty stack frame. We can directly put all parameters into it. Like if we want to deliver three parameters (text: string, opacity: float, duration: int). No matter what the type a parameter is, we put them into \`stack[-1].parameters\`. Here we can just arrange them as the original order, with keys name "0", "1" and "2".
      `}

      <CodeBlock
        language="mcfunction"
        code={`
# text: string
data modify storage minecraft:s stack[-1].parameters.0 set value "Hello World"
# opacity: float
data modify storage minecraft:s stack[-1].parameters.1 set value 0.7f
# duration: int
data modify storage minecraft:s stack[-1].parameters.2 set value 5
        `}
      />

      {md`
Note that we only use \`set value xxx\` here, but you can get the value using whatever methods you like. The final goal is to put the desired values into correct position of \`stack[-1].parameters\`. Like if your duration is calculated from some scoreboard operations and the calculated value is inside a player named \`var\` with objective named \`temp\`. You should copy that value into the corresponding storage path:
      `}

      <CodeBlock
        language="mcfunction"
        code={`
# Put into stack[-1].parameters.2 because its the third parameter
execute store result storage minecraft:s stack[-1].parameters.2 int 1 run scoreboard players get var temp
        `}
      />

      {md`
So there are a lot of methods to prepare parameters. You just need to make sure that \`stack[-1].parameters\` will have all the neccessary values before you call the function.
      `}

      <h2>Full Steps</h2>

      {md`
Here I use natural language to describe all the steps of calling a function:
      `}

      <CodeBlock
        filename="caller.mcfunction"
        language="plaintext"
        code={`
(1) Protect local variables
This is because there might be a recursive call, like function A calls function A itself again.
This means we need to save all scoreboard variables that we will need to use again later.
That can be achieved by putting them into caller's stack frame. The exact path is stack[-1].local.

(2) Push an empty stack frame as callee's stack frame

(3) Put all parameters we want to deliver to callee into its stack frame
The path is now stack[-1].parameters because the topmost element now is the callee's stack frame

(4) Call the function directly using /function command

(5) Remove the callee's stack frame

(6) Read the return value from storage path \`return\`
        `}
      />

      <CodeBlock
        filename="callee.mcfunction"
        language="plaintext"
        code={`
(1) Read delivered parameters from stack[-1].parameters

(2) Do function logic

(3) Store return value into storage path \`return\`
        `}
      />

      <h2>An Example of Calculating Factorial</h2>

      <CodeBlock
        language="mcfunction"
        filename="do_factorial.mcfunction"
        code={`
# do_factorial.mcfunction
#======================================#
# Push an empty stack frame for callee #
#======================================#
data modify storage minecraft:s stack append value {}
#=================#
# Push parameters #
#=================#
data modify storage minecraft:s stack[-1].parameters.0 set value 6
#===================#
# Call the function #
#===================#
function minecraft:factorial
#=================================#
# Remove the callee's stack frame #
#=================================#
data remove storage minecraft:s stack[-1]

tellraw @a {"storage": "minecraft:s", "nbt": "return"}
        `}
      />

      <CodeBlock
        language="mcfunction"
        filename="factorial.mcfunction"
        code={`
# factorial.mcfunction
# function factorial(num) {
#     if (num <= 1) return 1;
#     return num * factorial(num - 1);
# }

#================#
# Get parameters #
#================#
execute store result score 0 s run data get storage minecraft:s stack[-1].parameters.0

#                         #
# if (num <= 1) return 1; #
#                         #
execute if score 0 s matches ..1 run data modify storage minecraft:s return set value 1
execute if score 0 s matches ..1 run return 0

#                                  #
# return num * factorial(num - 1); #
#                                  #
scoreboard players set 1 s -1
scoreboard players operation 1 s += 0 s
#=========================#
# Protect local variables #
#=========================#
execute store result storage minecraft:s stack[-1].local.0 int 1 run scoreboard players get 0 s
#======================================#
# Push an empty stack frame for callee #
#======================================#
data modify storage minecraft:s stack append value {}
#=================#
# Push parameters #
#=================#
execute store result storage minecraft:s stack[-1].parameters.0 int 1 run scoreboard players get 1 s
#===================#
# Call the function #
#===================#
function minecraft:factorial
#=================================#
# Remove the callee's stack frame #
#=================================#
data remove storage minecraft:s stack[-1]
#=========================#
# Restore local variables #
#=========================#
execute store result score 0 s run data get storage minecraft:s stack[-1].local.0

execute store result score 1 s run data get storage minecraft:s return
scoreboard players operation 0 s *= 1 s
#==================#
# Put return value #
#==================#
execute store result storage minecraft:s return int 1 run scoreboard players get 0 s
        `}
      />
    </>
  );
}
