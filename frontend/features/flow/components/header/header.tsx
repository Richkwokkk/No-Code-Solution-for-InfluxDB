import * as React from "react";

import { useReactFlow } from "@xyflow/react";

import { AlignCenterVertical, Code, CodeXml, Play } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResetConfirmationAlert } from "@/features/flow/components/header/reset-alert";
import { useEditorToggle } from "@/features/flow/hooks/use-editor-toggle";
import { getLayoutedElements } from "@/lib/dagre";

export const Header = () => {
  const editor = useStore(useEditorToggle, (state) => state);
  const { fitView, setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const onLayout = React.useCallback(
    (direction: "TB" | "LR") => {
      const nodes = getNodes();
      const edges = getEdges();
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
      setTimeout(fitView);
    },
    [getNodes, getEdges, setNodes, setEdges, fitView],
  );

  return (
    <header className="z-50 flex w-screen items-center justify-between border bg-background px-6 py-3">
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
                  onClick={() => {
                    onLayout("TB");
                    setTimeout(fitView);
                  }}
                >
                  <AlignCenterVertical size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-sm font-bold capitalize">
                  Auto Layout
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <ResetConfirmationAlert />
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-sm font-bold capitalize">Reset All</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" onClick={() => editor.setIsOpen?.()}>
                  {editor.isOpen ? <CodeXml size={16} /> : <Code size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-sm font-bold capitalize">
                  {editor.isOpen ? "Close" : "Open"} Code Editor
                </span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="default">
                  <Play size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="center">
                <span className="text-sm font-bold capitalize">Run Query</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};
