"use client";

import { useStore } from "zustand";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChartContainer } from "@/features/charts/components/chart-container";
import { CodeEditor } from "@/features/code/components/code-editor";
import { Flow } from "@/features/flow/components/flow";
import { Header } from "@/features/flow/components/header";
import { Sidebar } from "@/features/flow/components/sidebar/sidebar";
import { SidebarDndContext } from "@/features/flow/components/sidebar/sidebar-dnd-context";
import { useEditorToggle } from "@/features/flow/hooks/use-editor-toggle";

export default function EditorPage() {
  const editor = useStore(useEditorToggle, (state) => state);

  return (
    <SidebarDndContext>
      <div className="flex h-screen w-screen flex-col">
        <Header />
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
                  <Flow />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50} minSize={20}>
                  <ChartContainer />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            {editor.isOpen && (
              <>
                <ResizableHandle />
                <ResizablePanel defaultSize={30} minSize={10}>
                  <CodeEditor />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </SidebarDndContext>
  );
}
