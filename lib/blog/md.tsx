import React from "react";
import { marked } from "marked";
import type { Token, Tokens } from "marked";
import { cn } from "../utils";
import { mapleMono } from "@/components/blog/font";
import { InlineCode } from ".";

function renderInline(tokens: Token[]): React.ReactNode[] {
  return tokens.map((token, i) => {
    const children = "tokens" in token && token.tokens
      ? renderInline(token.tokens)
      : [];

    switch (token.type) {
      case "text":
        return token.text;
      case "strong":
        return React.createElement("strong", { key: i }, ...children);
      case "em":
        return React.createElement("em", { key: i }, ...children);
      case "link":
        return React.createElement(
          "a",
          { key: i, href: token.href },
          ...children,
        );
      case "codespan":
        return <InlineCode>{token.text}</InlineCode>;
      default:
        return token.raw ?? "";
    }
  });
}

// ─── Block rendering ─────────────────────────────────────────────────

function blockTokens(t: Token): Token[] {
  return "tokens" in t && t.tokens ? t.tokens : [];
}

function renderBlocks(tokens: Token[]): React.ReactNode[] {
  const elements: React.ReactNode[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "space":
        break;

      case "paragraph":
        elements.push(
          <p key={elements.length}>{renderInline(blockTokens(token))}</p>,
        );
        break;

      case "list": {
        const ListTag = token.ordered ? "ol" : "ul";
        const items = (token as Tokens.List).items.map((item) => {
          const content = blockTokens(item).flatMap((t) => {
            if (t.type === "text" || t.type === "paragraph") {
              const inline = blockTokens(t);
              return inline.length ? renderInline(inline) : ("text" in t ? t.text : "");
            }
            return renderBlocks([t]);
          });
          return React.createElement("li", null, ...content);
        });
        elements.push(React.createElement(ListTag, { key: elements.length }, ...items));
        break;
      }

      default:
        break;
    }
  }

  return elements;
}

/**
 * Tagged template literal that parses a Markdown subset into React elements.
 *
 * Supports: paragraphs, bold, italic, links, unordered lists, ordered lists.
 *
 * Must be written flush left (no indentation).
 */
export function md(
  strings: TemplateStringsArray,
  ...values: unknown[]
): React.ReactNode {
  const raw = strings.reduce(
    (acc, str, i) => acc + str + (values[i] ?? ""),
    "",
  );
  const trimmed = raw.replace(/^\n/, "");
  const tokens = marked.lexer(trimmed);
  return React.createElement(React.Fragment, null, ...renderBlocks(tokens));
}
