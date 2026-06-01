import { codeToHtml, createHighlighter, LanguageInput } from 'shiki'
import mcFunction from "./mcfunction.json";

const highlighter = await createHighlighter({
    langs: [mcFunction as LanguageInput],
    themes: ["min-light", "min-dark"]
});

export async function highlight(code: string, lang: string) {
    if (highlighter.getLoadedLanguages().includes(lang)) {
        return highlighter.codeToHtml(code, {
            lang: lang,
            themes: {
                light: "min-light",
                dark: "min-dark",
            }
        });
    }
    return await codeToHtml(code, {
        lang: lang,
        themes: {
            light: "min-light",
            dark: "min-dark",
        }
    });
}