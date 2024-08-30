"use client";

import EditorFlow from "@/features/editor/components/EditorFlow";
import Header from "@/features/editor/components/Header";
import SideBar from "@/features/editor/components/sidebar/SideBar";

export default function EditorPage() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex flex-row h-full w-full">
        <SideBar />
        <EditorFlow />
      </div>
      
    </div>
  );
}
