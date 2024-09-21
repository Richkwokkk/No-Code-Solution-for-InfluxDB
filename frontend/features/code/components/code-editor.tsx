import * as React from "react";

import { Editor } from "@monaco-editor/react";

import { setupEditor } from "@/lib/monaco";

export const CodeEditor = () => {
  return (
    <Editor
      beforeMount={setupEditor}
      loading={<div>Loading code editor...</div>}
      height="100%"
      defaultLanguage="flux"
      value={`from(bucket: "example-bucket")
  |> range(start: -1d)
  |> filter(fn: (r) => r._measurement == "example-measurement")
  |> mean()
  |> yield(name: "_results")`}
      onChange={() => {}}
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
