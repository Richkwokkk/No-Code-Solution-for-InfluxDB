import CustomDraggable from "./CustomDraggable"
import { nodes } from "../config"
import { Button } from "@/components/ui/button"
const SideBar = () => {
  return (
    <aside className="flex h-full w-60 flex-col border-r border-gray-400">
      <div className="h-full w-full space-y-4 overflow-y-auto p-4 bg-white">
        {/* <div className="invisible lg:visible absolute z-20">
          <Button className="inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </Button>
        </div> */}
        {Object.entries(nodes).map(([type, info]) => {
          return (
            <CustomDraggable key={type} id={type} type={type} className="flex w-full cursor-grab items-center space-x-2 rounded-lg border border-gray-400 bg-white p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                  <info.icon size={20} />
                </div>
                <div className="flex flex-col items-start pr-1">
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
