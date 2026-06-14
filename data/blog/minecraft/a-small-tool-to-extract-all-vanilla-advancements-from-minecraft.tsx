import { md, type BlogMeta } from "@/lib/blog";
import AdvancementTool from "@/data/blog/minecraft/component.advancement-tool";

export const meta: BlogMeta = {
  id: "ye4vrpdwbgw0",
  title: "A Small Tool to Extract All Vanilla Advancements from Minecraft",
  summary: "Upload your advancement folder and generate a complete advancements JSON for your datapack.",
  date: "2026-06-14 10:22",
};

export default function Post() {
  return (
    <>
      {md`
You should first find your game's jar file, like \`26.1.2.jar\`. Then open the jar with 7-Zip or other similar file archiver app and extract the \`data/minecraft/advancement\` folder. Another way is to rename the jar file and change its prefix from \`.jar\` to \`.zip\` and unzip it.

Find the \`advancement\` folder. in my case its path is \`26.1.2.jar/data/minecraft/advancement\`.

Upload the \`advancement\` folder extracted from your Minecraft jar file. This tool will recursively find all advancement JSON files and generate a JSON that you can use in a datapack.
      `}

      <AdvancementTool />
    </>
  );
}
