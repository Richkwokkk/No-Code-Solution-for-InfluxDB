"use client";

import EditorFlow from "@/features/editor/components/EditorFlow";
import Header from "@/features/editor/components/Header";
import Sidebar from "@/features/editor/components/sidebar";

export default function EditorPage() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex h-full w-full">
        <Sidebar />
        <EditorFlow />
      </div>
    </div>
  );
}
