"use client";

import { ReactFlowProvider } from "@xyflow/react";

import { DndContext } from "@/features/editor/components/dnd-context";
import { EditorFlow } from "@/features/editor/components/editor-flow";
import { EditorHeader } from "@/features/editor/components/editor-header";
import { Sidebar } from "@/features/editor/components/sidebar";

export default function EditorPage() {
  return (
    <ReactFlowProvider>
      <DndContext>
        <div className="flex h-screen w-screen flex-col">
          <EditorHeader />
          <div className="flex h-full w-full">
            <Sidebar />
            <EditorFlow />
          </div>
        </div>
      </DndContext>
    </ReactFlowProvider>
  );
}
