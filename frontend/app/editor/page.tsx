"use client";

import { useRef } from "react";

import { ImperativePanelHandle } from "react-resizable-panels";

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
import { Sidebar } from "@/features/flow/components/sidebar";
import { SidebarDndContext } from "@/features/flow/components/sidebar/sidebar-dnd-context";
import { useEditorToggle } from "@/features/flow/hooks/use-editor-toggle";

export default function EditorPage() {
  const editor = useStore(useEditorToggle, (state) => state);
  const leftPanelRef = useRef<ImperativePanelHandle>(null);
  const upperPanelRef = useRef<ImperativePanelHandle>(null);

  const resetVerticalPanelSize = () => {
    const upperPanel = upperPanelRef.current;
    if (upperPanel) {
      upperPanel.resize(70);
    }
  };

  const resetHorizontalPanelSize = () => {
    const leftPanel = leftPanelRef.current;
    if (leftPanel) {
      leftPanel.resize(50);
    }
  };

  return (
    <SidebarDndContext>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        <div className="flex h-full w-full">
          <Sidebar />
          <ResizablePanelGroup direction="vertical" className="flex-1">
            <ResizablePanel ref={upperPanelRef} defaultSize={70} minSize={20}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                  ref={leftPanelRef}
                  defaultSize={50}
                  minSize={20}
                >
                  <Flow />
                </ResizablePanel>
                {editor.isOpen && (
                  <>
                    <ResizableHandle
                      onDoubleClickCapture={resetHorizontalPanelSize}
                    />
                    <ResizablePanel defaultSize={50} minSize={20}>
                      <CodeEditor />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle onDoubleClickCapture={resetVerticalPanelSize} />
            <ResizablePanel defaultSize={30} minSize={20}>
              <ChartContainer />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SidebarDndContext>
  );
}
