import { type Monaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";

import languageConfig from "@/lib/language-configuration.json";
import { getHighlighter } from "@/lib/shiki";
import { isDarkMode } from "@/lib/utils";

export function setupEditor(monaco: Monaco) {
  monaco.languages.register({ id: "flux" });
  monaco.languages.setLanguageConfiguration("flux", languageConfig as any);

  (async () => {
    const highlighter = await getHighlighter(isDarkMode());
    shikiToMonaco(highlighter!, monaco);
  })();
}
