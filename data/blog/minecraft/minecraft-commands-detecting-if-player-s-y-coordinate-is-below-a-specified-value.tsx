import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "1wihcsz6w07y",
  title: "Minecraft Commands: Detecting if Player's Y-Coordinate is Below a Specified Value",
  summary: "In this blog, we focus on discussing two implementation methods, both of which can effectively detect whether the player's y-value is below a specified value.",
  date: "2024-10-26 21:58",
};

export default function post() {
  return (
    <>
      <p><strong>This content is only valid in Java Edition</strong></p>

      {md`
In Minecraft, we sometimes have a requirement to detect whether a player's Y-coordinate is below (or above) a specified value. How can we achieve this?
      `}

      <h2>Table of Contents</h2>

      {md`
- [Solution 1: "Infinite" Cuboid](#solution-1-infinite-cuboid)
- [Solution 2: Player-Following Cuboid](#solution-2-player-following-cuboid)
- Just want the commands, not the article?
  [Quick Jump to Commands](#fastjump)
      `}

      {md`
At first, we might think of using the target selector to accomplish this task. I have excerpted a description of the coordinate parameters in the target selector from the wiki.

Coordinates \`(x, y, z)\`:
      `}

      <blockquote>
        <p>
          <code>[x=&lt;value&gt;,y=&lt;value&gt;,z=&lt;value&gt;]</code> —
          Defines a position in the world.
        </p>
        <p>
          This position will become the execution position of the target
          selector (without modifying the command execution position), meaning
          the target selected by <code>@p</code> may change.
        </p>
        <p>
          If any of the parameters are undefined, the coordinates of the command
          execution position are used by default.
        </p>
        <p>
          Can be used with the <code>distance</code> parameter or the
          <code>dx</code>, <code>dy</code>, and <code>dz</code> parameters to
          translate the selection range.
        </p>
        <p>
          The coordinates can be integers or decimal numbers like
          <code>12.34</code> (specifically double-precision floating-point
          numbers) and are not center-corrected, meaning <code>x=0</code> will
          no longer automatically correct to <code>x=0.5</code>. In Bedrock
          Edition, tildes can be used for this parameter.
        </p>
      </blockquote>

      {md`
Volume Dimensions \`(dx, dy, dz)\`:
      `}

      <blockquote>
        <p>
          <code>[dx=&lt;value&gt;,dy=&lt;value&gt;,dz=&lt;value&gt;]</code> —
          In Java Edition, selects all entities whose bounding boxes intersect
          with the defined cuboid region within the same dimension. If the
          position parameters are undefined, the selected cuboid region is
          calculated directly relative to the command execution position. These
          parameters can be negative or decimal numbers.
        </p>
      </blockquote>

      {md`
It's easy to think that in the target selector, we can use \`x, y, z\` and \`dx, dy, dz\` to detect whether a player is within a given range. For example, the following command detects whether the player is within the cuboid region defined by the points (6, 7, 8) and (123, 124, 125):
      `}

      <CodeBlock
        language="plaintext"
        code={`# xxx in the command represents a player's name or a player selector, the same below
# The part after "run" is not provided here, readers can write it according to their own needs
# In this case, dx=123-6=117, dy=124-7=117, dz=125-8=117
execute as xxx at @s if entity @s[x=6,y=7,z=8,dx=117,dy=117,dz=117]`}
      />

      {md`
Returning to the original question, how do we detect whether the player's Y-coordinate is below (or above) a specified value?
      `}

      <h3>Solution 1: "Infinite" Cuboid</h3>

      {md`
One idea is that since the target selector can \`detect whether the player's bounding box intersects with the defined cuboid region\`, we can take an "infinite" cuboid, i.e., large enough in the \`x\` and \`z\` directions to extend far enough, and then only work on the \`y\` value, which can be the critical value you want to detect.

This is mainly because the world size has an upper limit. According to the wiki, *the world border is essentially a huge bounding box. With default settings, the center of the world border is at coordinates x=0, z=0, and the length or width in each direction is about thirty million (29,999,984) blocks*, so our \`x\` and \`z\` both take half of this maximum width and take a negative value, and then \`dx\` and \`dz\` take this maximum value.

For example, if you want to monitor whether the player's \`y\` coordinate is below \`64\`, you can write it like this:
      `}

      <CodeBlock
        language="plaintext"
        code={`execute as xxx at @s if entity @s[x=-14999992,y=63,z=-14999992,dx=29999984,dy=-340,dz=29999984]`}
      />

      {md`
Note that why is \`y\` written as \`63\` here? This is due to a feature of Minecraft (refer to [MC-123441](https://bugs.mojang.com/browse/MC-123441)), which means that if you want to detect whether the player's \`y\` coordinate is below \`M\`, you just need to replace \`y=63\` in the above command with \`y=M-1\`. Also, I wrote \`dy=-340\` above, and if your y value is very large, you need to modify this \`dy\` to ensure that the value of \`y-dy\` is a height where players cannot exist (generally less than -128, below which is the void), otherwise, the player will not be detected when below this value.
      `}

      <h3>Solution 2: Player-Following Cuboid</h3>

      {md`
In the above solution, we took an "infinite" cuboid region for detection. In fact, we can completely take a region at the player's feet for detection. Imagine that I take a cuboid region defined by \`x=&lt;player's x value&gt;\`, \`y=&lt;y value to be detected&gt;\`, \`z=&lt;player's z value&gt;\` and \`dx=1, dy=-1, dz=1\`. This region is always on the same vertical line as the player.
      `}

      <div id="fastjump" />

      {md`
Therefore, it is only necessary to detect whether the player's bounding box intersects with this region.

For example, to detect whether it is below \`64\`, use the following command, still paying attention to the issue mentioned above, i.e., \`y\` should be reduced by 1.
      `}

      <CodeBlock
        language="plaintext"
        code={`execute as xxx at @s if entity @s[y=63,dx=1,dy=-1,dz=1]`}
      />

      {md`
Regarding other detections, such as detecting whether the \`y\` value is greater than a certain value, or detecting \`x\` or \`z\`, the idea is the same, so I won't elaborate further.
      `}
    </>
  );
}
