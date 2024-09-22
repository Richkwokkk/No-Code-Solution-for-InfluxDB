import * as React from "react";

import { Editor, type Monaco } from "@monaco-editor/react";

import { useTheme } from "next-themes";

import {
  CODE_FONT_FAMILY,
  DARK_THEME,
  DEFAULT_CODE,
  LIGHT_THEME,
  READ_ONLY_MESSAGE,
} from "@/features/code/constants";
import { useIsDarkMode } from "@/hooks/use-is-dark-mode";
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

  return (
    <Editor
      beforeMount={beforeMount}
      theme={theme}
      loading={<div>Loading code editor...</div>}
      height="100%"
      defaultLanguage="flux"
      value={DEFAULT_CODE}
      options={{
        readOnly: true,
        readOnlyMessage: {
          value: READ_ONLY_MESSAGE,
        },
        fontFamily: CODE_FONT_FAMILY,
        fontLigatures: true,
        fontSize: 16,
        lineHeight: 32,
        padding: { top: 26 },
        lineNumbers: "off",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
};
