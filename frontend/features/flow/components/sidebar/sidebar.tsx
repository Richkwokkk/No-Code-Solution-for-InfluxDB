import { LucideIcon } from "lucide-react";

import { sidebarNodes } from "@/features/flow/components/sidebar/constants";
import { SidebarDraggable } from "@/features/flow/components/sidebar/sidebar-draggable";
import { SidebarToggle } from "@/features/flow/components/sidebar/sidebar-toggle";
import { useSidebarToggle } from "@/features/flow/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export type DraggableNode = {
  label: string;
  title: string;
  icon: LucideIcon;
};

export const Sidebar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <aside
      className={cn(
        "z-20 flex h-full translate-x-0 flex-col border-r transition-[width] ease-in-out",
        sidebar?.isOpen === false ? "w-[92px]" : "w-52",
      )}
    >
      <div className="flex h-fit w-full items-center justify-center pt-4">
        <h1 className="text-sm font-bold">Nodes</h1>
        <SidebarToggle
          isOpen={sidebar?.isOpen}
          setIsOpen={sidebar?.setIsOpen}
        />
      </div>
      <div className="h-full w-full space-y-4 overflow-y-auto overflow-x-hidden bg-background p-4">
        {Object.entries(sidebarNodes).map(
          ([type, { label, title, icon: Icon }]) => {
            return (
              <SidebarDraggable
                key={type}
                id={type}
                type={type}
                className="flex w-full cursor-grab items-center space-x-2 rounded-lg border bg-background p-2 shadow-sm transition-all ease-in-out hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <Icon size={20} />
                </div>
                <div
                  className={cn(
                    "absolute flex flex-col items-start pl-10 transition-opacity duration-75 ease-out",
                    sidebar?.isOpen === false ? "opacity-0" : "opacity-100",
                  )}
                >
                  <p className="text-nowrap text-[10px] capitalize opacity-50">
                    {label}
                  </p>
                  <p className="text-nowrap text-xs font-bold capitalize">
                    {title}
                  </p>
                </div>
              </SidebarDraggable>
            );
          },
        )}
      </div>
    </aside>
  );
};
