import { Plugin } from "unified";
import { Node, Nodes } from "hast";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

/**
 * rehype plugin：dumplicate the code in <pre> to an attribute `plaincode`
 */
const rehypeCodeblock: Plugin<[], Node> = () => {
  return (tree) => {
    visit(tree, "element", (node: Nodes) => {
      if (node.type === "element" && node.tagName === "pre") {
        // Extract plain code to property so the code block component can use it
        // to render.
        node.properties["plaincode"] = toString(node);
        // Extract language.
        const codeElement = node.children.find(child => child.type === "element" && child.tagName === "code");
        if (codeElement && codeElement.type === "element") {
          const className = codeElement.properties["className"] as string[];
          if (Array.isArray(className)) {
            const languageClass = className.find(cls => cls && typeof cls === "string" && cls.startsWith("language-"))
            if (languageClass) {
              const language = languageClass.replace("language-", "")
              node.properties["language"] = language
            }
          }
        }
      }
    })
  }
}

export default rehypeCodeblock