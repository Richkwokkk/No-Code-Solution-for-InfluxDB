"use client";

import { useReactFlow } from "@xyflow/react";

import { useStore } from "zustand";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "@/features/editor/components/code-editor";
import { DndContext } from "@/features/editor/components/dnd-context";
import { EditorFlow } from "@/features/editor/components/editor-flow";
import { EditorHeader } from "@/features/editor/components/editor-header";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Visualization } from "@/features/editor/components/visualization";
import { useEditorToggle } from "@/features/editor/hooks/use-editor-toggle";

export default function EditorPage() {
  const editor = useStore(useEditorToggle, (state) => state);
  const { fitView } = useReactFlow();
  return (
    <DndContext>
      <div className="flex h-screen w-screen flex-col">
        <EditorHeader />
        <div className="flex h-full w-full">
          <Sidebar />
          <ResizablePanelGroup
            autoSaveId="group-1"
            direction="vertical"
            className="flex-1"
          >
            <ResizablePanel defaultSize={70} minSize={20}>
              <ResizablePanelGroup autoSaveId="group-2" direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <EditorFlow />
                </ResizablePanel>
                <ResizableHandle onDragging={(_dragging) => fitView()} />
                <ResizablePanel defaultSize={50} minSize={20}>
                  <Visualization />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            {editor.isOpen && (
              <>
                <ResizableHandle onDragging={(_dragging) => fitView()} />
                <ResizablePanel defaultSize={30} minSize={10}>
                  <CodeEditor />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </DndContext>
  );
}
