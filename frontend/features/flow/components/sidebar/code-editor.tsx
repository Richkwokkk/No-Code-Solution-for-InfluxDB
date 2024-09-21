import Editor from "@monaco-editor/react";

// import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor";

// import { createHighlighter } from "shiki";
// import flux from "@/features/flow/flux.tmLanguage.json";

async function setupHighlighter() {
  // const highlighter = await createHighlighter({
  //   langs: [flux as any],
  //   themes: ["vitesse-light", "vitesse-dark"],
  // });

  monaco.languages.register({ id: "flux" });

  // shikiToMonaco(highlighter, monaco);
}

setupHighlighter();

function CodeEditor() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="flux"
      defaultValue="// some comment"
    />
  );
}

// const container = document.getElementById("container");
// if (container) {
//   const CodeEditor = monaco.editor.create(container, {
//     language: "flux",
//     theme: "vitesse-dark",
//   });
// }

export default CodeEditor;
