import { Plugin } from 'unified'
import { Node, Nodes } from "hast"
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'

/**
 * rehype plugin：dumplicate the code in <pre> to an attribute `plaincode`
 */
const rehypeCodeblock: Plugin<[], Node> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Nodes) => {
      if (node.type === "element" && node.tagName === 'pre') {
        node.properties["plaincode"] = toString(node);
        const codeElement = (node.children as Nodes[]).find(child => child.type === 'element' && child.tagName === 'code') as any;
        if (codeElement) {
          const className = codeElement.properties.className as string[];
          if (Array.isArray(className)) {
            const languageClass = className.find(cls => cls && typeof cls === 'string' && cls.startsWith('language-'))
            if (languageClass) {
              const language = languageClass.replace('language-', '')
              node.properties['language'] = language
            }
          }
        }
      }
    })
  }
}

export default rehypeCodeblock