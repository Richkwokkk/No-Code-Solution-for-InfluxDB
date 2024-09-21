import AsyncLock from "async-lock";
import { createHighlighter, type Highlighter } from "shiki";

import grammar from "@/lib/flux.tmLanguage.json";

let highlighter: Highlighter | null = null;
const highlighterLock = new AsyncLock();

export async function getHighlighter() {
  return highlighterLock.acquire("highlighter", async () => {
    if (!highlighter) {
      highlighter = await createHighlighter({
        themes: ["vitesse-light", "vitesse-dark"],
        langs: [grammar as any],
      });
    }
    return highlighter;
  });
}
