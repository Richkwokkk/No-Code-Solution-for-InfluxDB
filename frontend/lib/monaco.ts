import { type Monaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";

import languageConfig from "@/lib/language-configuration.json";
import { getHighlighter } from "@/lib/shiki";

export async function setupEditor(monaco: Monaco, isDark: boolean) {
  monaco.languages.register({ id: "flux" });
  monaco.languages.setLanguageConfiguration("flux", languageConfig as any);

  const highlighter = await getHighlighter();
  const theme = isDark ? "vitesse-dark" : "vitesse-light";
  await shikiToMonaco(highlighter!, monaco);
  monaco.editor.setTheme(theme);
}
