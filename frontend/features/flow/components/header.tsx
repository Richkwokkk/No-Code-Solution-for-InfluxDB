import * as React from "react";

import {
  ChartNoAxesCombinedIcon,
  CheckIcon,
  Moon,
  PlayIcon,
  SquareTerminalIcon,
  Sun,
  WorkflowIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToggle } from "@/features/flow/hooks/use-toggle";

export const Header = () => {
  const {
    isCodeEditorOpen,
    isFlowOpen,
    isVisualizationOpen,
    toggleCodeEditor,
    toggleFlow,
    toggleVisualization,
  } = useStore(useToggle);

  const { setTheme, theme } = useTheme();

  return (
    <header className="z-50 flex h-10 w-screen items-center justify-between border bg-background px-8 py-6">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-lg font-bold">Visual Flux</h1>
        </Link>
        <div className="flex space-x-2">
          <TooltipProvider delayDuration={0}>
            <DropdownMenu>
              <Tooltip>
                <DropdownMenuTrigger>
                  <TooltipTrigger asChild>
                    <div className="inline-flex h-8 w-8 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background p-0 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </div>
                  </TooltipTrigger>
                </DropdownMenuTrigger>
                <TooltipContent align="center">
                  <span className="text-[10px] font-bold capitalize">
                    toggle theme
                  </span>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="center">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs font-bold capitalize">light</span>
                  {theme === "light" && <CheckIcon size={16} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs font-bold capitalize">dark</span>
                  {theme === "dark" && <CheckIcon size={16} />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => toggleFlow?.()}
                  className={`h-8 w-8 p-0 ${isFlowOpen && "bg-accent text-accent-foreground"}`}
                >
                  <WorkflowIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  {isFlowOpen ? "hide" : "show"} flow panel
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => toggleVisualization?.()}
                  className={`h-8 w-8 p-0 ${
                    isVisualizationOpen && "bg-accent text-accent-foreground"
                  }`}
                >
                  <ChartNoAxesCombinedIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  {isVisualizationOpen ? "hide" : "show"} visualization panel
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => toggleCodeEditor?.()}
                  className={`h-8 w-8 p-0 ${
                    isCodeEditorOpen && "bg-accent text-accent-foreground"
                  }`}
                >
                  <SquareTerminalIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  {isCodeEditorOpen ? "hide" : "show"} code editor
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" className="h-8 w-8 p-0">
                  <PlayIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  run query
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};
