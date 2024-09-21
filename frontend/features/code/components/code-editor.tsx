import * as React from "react";

import { Editor, type Monaco } from "@monaco-editor/react";

import { useTheme } from "next-themes";

import { DARK_THEME, LIGHT_THEME } from "@/features/code/constants";
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
      value={`from(bucket: "example-bucket")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "example-measurement")
  |> mean()
  |> yield(name: "_results")`}
      options={{
        readOnly: true,
        readOnlyMessage: {
          value: "You can only modify the code through drag and drop",
        },
        fontFamily: "Fira Code",
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
