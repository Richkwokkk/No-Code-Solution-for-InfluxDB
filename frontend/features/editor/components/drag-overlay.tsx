import { DragOverlay, useDndContext } from "@dnd-kit/core";

import { NodeTypes, nodes } from "@/features/editor/utils";

export const DndDragOverlay = () => {
  const { active } = useDndContext();
  const type = active?.data.current?.type as NodeTypes;
  const nodeInfo = nodes[type];

  return (
    <DragOverlay dropAnimation={null}>
      {active ? (
        <div
          id="overlay"
          className="flex w-[172px] cursor-grab items-center space-x-2 rounded-lg border bg-background p-2 shadow-md"
        >
          <div className="text-editor-node-text flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            <nodeInfo.icon size={20} />
          </div>
          <div className="flex flex-col pr-1 capitalize">
            <p className="text-[10px] opacity-50">{nodeInfo.label}</p>
            <p className="text-xs font-bold">{nodeInfo.title}</p>
          </div>
        </div>
      ) : null}
    </DragOverlay>
  );
};
