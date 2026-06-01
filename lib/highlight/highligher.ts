import { codeToHtml, createHighlighter, LanguageInput } from 'shiki'
import mcFunction from "./mcfunction.json";

const highlighter = await createHighlighter({
    langs: [mcFunction as LanguageInput],
    themes: ["andromeeda"]
});

export async function highlight(code: string, lang: string) {
    if (highlighter.getLoadedLanguages().includes(lang)) {
        return highlighter.codeToHtml(code, { lang: lang, theme: "andromeeda" });
    }
    return await codeToHtml(code, { lang: lang, theme: "andromeeda" });
}