import { Handle, Position } from "@xyflow/react";

import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface BaseNodeProps {
  value: string;
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  leftHandle?: boolean;
  rightHandle?: boolean;
  ariaExpanded?: boolean;
}

export function BaseNode({
  title,
  value,
  icon: Icon,
  leftHandle = true,
  rightHandle = true,
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
        {leftHandle ? (
          <Handle
            type="target"
            id="node-source"
            position={Position.Left}
            className="!-left-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-l-[2px] !border-none !bg-primary shadow-md"
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
        {rightHandle ? (
          <Handle
            type="source"
            id="node-target"
            position={Position.Right}
            className="!-right-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-r-[2px] !border-none !bg-primary shadow-md"
          />
        ) : null}
      </div>
    </Button>
  );
}
