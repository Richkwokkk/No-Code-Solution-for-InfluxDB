import { LucideIcon } from "lucide-react";

import { SidebarDraggable } from "@/features/editor/components/sidebar-draggable";
import { SidebarToggle } from "@/features/editor/components/sidebar-toggle";
import { useSidebarToggle } from "@/features/editor/hooks/use-sidebar-toggle";
import { nodes } from "@/features/editor/utils";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export type DraggableNode = {
  label: string;
  title: string;
  icon: LucideIcon;
};

export const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "z-20 flex h-full translate-x-0 flex-col border border-r transition-[width] ease-in-out",
        sidebar?.isOpen === false ? "w-[92px]" : "w-60",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="h-full w-full space-y-4 overflow-y-auto overflow-x-hidden bg-white p-4">
        {Object.entries(nodes).map(([type, { label, title, icon: Icon }]) => {
          return (
            <SidebarDraggable
              key={type}
              id={type}
              type={type}
              className="flex w-full cursor-grab items-center space-x-2 rounded-lg border bg-white p-2 shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                <Icon size={20} />
              </div>
              <div
                className={cn(
                  "absolute flex flex-col items-start pl-10",
                  sidebar?.isOpen === false ? "hidden" : "block",
                )}
              >
                <p className="text-[10px] opacity-50">{label}</p>
                <p className="text-xs font-bold">{title}</p>
              </div>
            </SidebarDraggable>
          );
        })}
      </div>
    </aside>
  );
};
