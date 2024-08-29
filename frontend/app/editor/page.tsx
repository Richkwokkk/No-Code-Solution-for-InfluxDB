"use client";

import EditorFlow from "@/features/editor/components/EditorFlow";
import Header from "@/features/editor/components/Header";

export default function EditorPage() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <EditorFlow />
    </div>
  );
}
