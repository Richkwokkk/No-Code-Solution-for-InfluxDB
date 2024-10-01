import { Handle, Position } from "@xyflow/react";

import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NodeType } from "@/features/flow/components/flow-nodes/type";

export interface BaseNodeProps {
  value: string;
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  upHandle?: boolean;
  underHandle?: boolean;
  upHandleId?: NodeType;
  underHandleId?: NodeType;
  ariaExpanded?: boolean;
}

export function BaseNode({
  title,
  value,
  icon: Icon,
  upHandle = false,
  underHandle = false,
  upHandleId,
  underHandleId,
  ariaExpanded = false,
}: BaseNodeProps) {
  return (
    <Button
      asChild
      variant="outline"
      aria-expanded={ariaExpanded}
      className="min-w-40 rounded-lg border px-2 py-7 shadow-sm transition-colors hover:cursor-grab hover:bg-primary-foreground active:cursor-grabbing"
    >
      <div className="relative flex items-center justify-between p-2">
        {upHandle ? (
          <Handle
            type="target"
            id={upHandleId}
            position={Position.Top}
            className="!-bottom-[4px] !h-1 !w-4 !min-w-0 !rounded-none !rounded-b-[2px] !border-none !bg-transparent"
          />
        ) : null}
        <div className="flex items-center space-x-2">
          <div className="text-editor-node-text flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
            <Icon size={20} />
          </div>
          <div className="flex flex-col pr-1">
            <p className="text-start text-[10px] capitalize opacity-50">
              {title}
            </p>
            <p className="text-start text-xs font-bold">{value}</p>
          </div>
        </div>
        {underHandle ? (
          <Handle
            type="source"
            id={underHandleId}
            position={Position.Bottom}
            className="!-bottom-[4px] !h-1 !w-4 !min-w-0 !rounded-none !rounded-b-[2px] !border-none !bg-transparent"
          />
        ) : null}
      </div>
    </Button>
  );
}
