import { useCallback, useId } from "react";

import { DndContext as DndKitContext, DragEndEvent } from "@dnd-kit/core";
import { useReactFlow } from "@xyflow/react";

import short from "short-uuid";

import { sidebarNodes } from "@/features/flow/components/sidebar/constants";
import { SidebarDragOverlay } from "@/features/flow/components/sidebar/sidebar-drag-overlay";
import { NodeType } from "@/features/flow/types";

interface DndContextProps {
  children: React.ReactNode;
}

export const SidebarDndContext = ({ children }: DndContextProps) => {
  const ctxId = useId();
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const onDragEnd = useCallback(
    ({ active }: DragEndEvent) => {
      const type = active.data.current?.type as NodeType;
      if (!type) return;

      const el = document.getElementById("overlay")!;
      const clientRect = el.getBoundingClientRect();

      const position = screenToFlowPosition({
        x: clientRect.left,
        y: clientRect.top,
      });

      // Get the sidebar element and its boundaries
      const flow = document.querySelector(".flow");
      if (flow) {
        const flowRect = flow.getBoundingClientRect();

        // Check if the drop position is within the flow
        if (
          clientRect.left <= flowRect.left ||
          clientRect.right >= flowRect.right ||
          clientRect.top <= flowRect.top ||
          clientRect.bottom >= flowRect.bottom
        ) {
          // Drop is inside the flow, do not add the node
          return;
        }
      }

      const newNode = {
        id: short.generate(),
        type,
        position,
        data: sidebarNodes[type],
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return (
    <DndKitContext id={ctxId} onDragEnd={onDragEnd}>
      <SidebarDragOverlay />
      {children}
    </DndKitContext>
  );
};
