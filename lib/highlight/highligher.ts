import { codeToHtml, createHighlighter, LanguageInput } from 'shiki'
import mcFunction from "./mcfunction.json";

const highlighter = await createHighlighter({
    langs: [mcFunction as LanguageInput],
    themes: ["min-light", "min-dark"]
});

interface DecorationItem {
    start: { line: number; character: number } | number;
    end: { line: number; character: number } | number;
    properties?: Record<string, string | string[]>;
    tagName?: string;
}

export async function highlight(code: string, lang: string, decorations?: DecorationItem[]) {
    const options = {
        lang: lang,
        themes: {
            light: "min-light",
            dark: "min-dark",
        },
        decorations: decorations
    };

    if (highlighter.getLoadedLanguages().includes(lang)) {
        return highlighter.codeToHtml(code, options);
    }
    return await codeToHtml(code, options);
}