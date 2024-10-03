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
import { useToggle } from "@/features/flow/hooks/use-toggle";

export default function EditorPage() {
  const { isCodeEditorOpen, isFlowOpen, isVisualizationOpen } = useStore(
    useToggle,
    (state) => state,
  );
  const shouldRenderUpperPanel = isFlowOpen || isCodeEditorOpen;
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
          <ResizablePanelGroup
            autoSaveId="vertical-panel-group"
            direction="vertical"
            className="flex-1"
          >
            {shouldRenderUpperPanel ? (
              <ResizablePanel
                order={1}
                id="upper-panel"
                ref={upperPanelRef}
                defaultSize={70}
                minSize={20}
              >
                <ResizablePanelGroup
                  autoSaveId="horizontal-panel-group"
                  direction="horizontal"
                >
                  {isFlowOpen ? (
                    <ResizablePanel
                      order={2}
                      id="flow-panel"
                      ref={leftPanelRef}
                      defaultSize={50}
                      minSize={20}
                    >
                      <Flow />
                    </ResizablePanel>
                  ) : null}

                  {isCodeEditorOpen ? (
                    <>
                      <ResizableHandle
                        onDoubleClickCapture={resetHorizontalPanelSize}
                      />
                      <ResizablePanel
                        order={3}
                        id="code-panel"
                        defaultSize={50}
                        minSize={20}
                      >
                        <CodeEditor />
                      </ResizablePanel>
                    </>
                  ) : null}
                </ResizablePanelGroup>
              </ResizablePanel>
            ) : null}

            {isVisualizationOpen ? (
              <>
                <ResizableHandle
                  onDoubleClickCapture={resetVerticalPanelSize}
                />
                <ResizablePanel
                  order={4}
                  id="visualization-panel"
                  defaultSize={30}
                  minSize={20}
                >
                  <ChartContainer />
                </ResizablePanel>
              </>
            ) : null}
          </ResizablePanelGroup>
        </div>
      </div>
    </SidebarDndContext>
  );
}
