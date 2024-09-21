import { type Monaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";

import { DARK_THEME, LIGHT_THEME } from "@/features/code/constants";
import languageConfig from "@/lib/language-configuration.json";
import { getHighlighter } from "@/lib/shiki";

export async function setupEditor(monaco: Monaco, isDark: boolean) {
  monaco.languages.register({ id: "flux" });
  monaco.languages.setLanguageConfiguration("flux", languageConfig as any);

  const highlighter = await getHighlighter();
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  await shikiToMonaco(highlighter!, monaco);
  monaco.editor.setTheme(theme);
}
