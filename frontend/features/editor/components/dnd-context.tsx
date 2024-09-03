import { DndDragOverlay } from "@/features/editor/components/drag-overlay";
import { nodes, NodeTypes } from "@/features/editor/utils";
import { DndContext as DndKitContext, DragEndEvent } from "@dnd-kit/core";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useId } from "react";
import short from "short-uuid";

interface DndContextProps {
  children: React.ReactNode;
}

export const DndContext = ({ children }: DndContextProps) => {
  const ctxId = useId();
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const onDragEnd = useCallback(
    ({ active }: DragEndEvent) => {
      const type = active.data.current?.type as NodeTypes;
      if (!type) return;

      const el = document.getElementById("overlay")!;
      const clientRect = el.getBoundingClientRect();

      const position = screenToFlowPosition({
        x: clientRect.left,
        y: clientRect.top,
      });

      const newNode = {
        id: short.generate(),
        type,
        position,
        data: nodes[type],
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return (
    <DndKitContext id={ctxId} onDragEnd={onDragEnd}>
      <DndDragOverlay />
      {children}
    </DndKitContext>
  );
};
