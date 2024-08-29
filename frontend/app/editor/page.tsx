"use client";

import EditorFlow from "@/features/editor/components/EditorFlow";
import Header from "@/features/editor/components/Header";

export default function EditorPage() {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-full w-full">
        <EditorFlow />
      </div>
    </div>
  );
}
