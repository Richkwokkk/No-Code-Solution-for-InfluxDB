"use client";

import { EditorFlow } from "@/features/editor/components/editor-flow";
import { EditorHeader } from "@/features/editor/components/editor-header";

export default function EditorPage() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <EditorHeader />
      <EditorFlow />
    </div>
  );
}
