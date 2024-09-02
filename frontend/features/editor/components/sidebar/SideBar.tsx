import CustomDraggable from "./CustomDraggable"
import { nodes } from "../config"
import { Button } from "@/components/ui/button"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { cn } from "@/lib/utils"
import { SidebarToggle } from "./SideBarToggle"
import { useStore } from "@/hooks/use-store"
const SideBar = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside className={cn("fixed flex h-screen w-60 z-20 flex-col border-r translate-x-0 transition-[width] ease-in-out border-gray-400", sidebar?.isOpen === false ? "w-[90px]" : "w-72")}>
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="h-full w-full space-y-4 overflow-y-auto p-4 bg-white">
        {Object.entries(nodes).map(([type, info]) => {
          return (
            <CustomDraggable key={type} id={type} type={type} className="flex w-full cursor-grab items-center space-x-2 rounded-lg border border-gray-400 bg-white p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                  <info.icon size={20} />
                </div>
                <div className={cn("flex flex-col items-start pr-1 ", sidebar?.isOpen === false
                  ? "hidden"
                  : ""
                )}>
                  <p className="text-[10px] opacity-50">{info.label}</p>
                  <p className="text-xs font-bold">{info.title}</p>
                </div>
            </CustomDraggable>
          )
        })}
      </div>
    </aside>
  )
}

export default SideBar
