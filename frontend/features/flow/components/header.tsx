import * as React from "react";

import {
  ChartNoAxesCombinedIcon,
  PlayIcon,
  SquareTerminalIcon,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
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
  } = useStore(useToggle, (state) => state);

  return (
    <header className="z-50 flex h-10 w-screen items-center justify-between border bg-background px-8 py-6">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-lg font-bold">Visual Flux</h1>
        </Link>
        <div className="flex space-x-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => toggleFlow?.()}
                  className="h-8 w-8 p-0"
                >
                  <WorkflowIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  {isFlowOpen ? "Close" : "Open"} Flow Panel
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => toggleVisualization?.()}
                  className="h-8 w-8 p-0"
                >
                  <ChartNoAxesCombinedIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  {isVisualizationOpen ? "Close" : "Open"} Visualization Panel
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => toggleCodeEditor?.()}
                  className="h-8 w-8 p-0"
                >
                  <SquareTerminalIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  {isCodeEditorOpen ? "Close" : "Open"} Code Editor
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="default" className="h-8 w-8 p-0">
                  <PlayIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-[10px] font-bold capitalize">
                  Run Query
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};
