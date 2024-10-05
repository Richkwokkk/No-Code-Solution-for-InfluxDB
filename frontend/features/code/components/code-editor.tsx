import * as React from "react";

import { Editor, type Monaco } from "@monaco-editor/react";

import { useTheme } from "next-themes";

import {
  CODE_EDITOR_FONT_FAMILY,
  DARK_THEME,
  LIGHT_THEME,
  READ_ONLY_MESSAGE,
} from "@/features/code/constants";
import { useFluxCode } from "@/features/code/hooks/use-flux-code";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
import { firaCode } from "@/lib/fonts";
import { setupEditor } from "@/lib/monaco";

export const CodeEditor = () => {
  const isDark = useIsDarkMode();
  const [theme, setTheme] = React.useState(isDark ? DARK_THEME : LIGHT_THEME);

  const { theme: nextTheme, systemTheme } = useTheme();

  React.useEffect(() => {
    const currentTheme = nextTheme === "system" ? systemTheme : nextTheme;
    setTheme(currentTheme === "dark" ? DARK_THEME : LIGHT_THEME);
  }, [nextTheme, systemTheme]);

  const beforeMount = React.useCallback(
    async (monaco: Monaco) => {
      await setupEditor(monaco, isDark);
    },
    [isDark],
  );

  const code = useFluxCode();

  return (
    <Editor
      beforeMount={beforeMount}
      theme={theme}
      loading={
        <div className={`${firaCode.variable} font-mono`}>
          Loading code editor...
        </div>
      }
      height="100%"
      defaultLanguage="flux"
      value={code}
      options={{
        wordWrap: "on",
        readOnly: true,
        fontLigatures: true,
        fontSize: 16,
        lineHeight: 32,
        lineNumbers: "off",
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        hideCursorInOverviewRuler: true,
        renderLineHighlight: "none",
        fontFamily: CODE_EDITOR_FONT_FAMILY,
        padding: { top: 26 },
        minimap: { enabled: false },
        guides: { indentation: false },
        readOnlyMessage: { value: READ_ONLY_MESSAGE },
      }}
    />
  );
};
