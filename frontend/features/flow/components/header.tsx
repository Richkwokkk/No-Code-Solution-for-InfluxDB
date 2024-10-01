import * as React from "react";

import { useReactFlow } from "@xyflow/react";

import { Code, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import { initialNodes } from "@/features/flow/constants";
import { useEditorToggle } from "@/features/flow/hooks/use-editor-toggle";
import { getLayoutedElements } from "@/lib/dagre";

export const Header = () => {
  const editor = useStore(useEditorToggle, (state) => state);
  const { fitView, setNodes, setEdges, updateNodeData, getNodes, getEdges } =
    useReactFlow();

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
          <Button
            variant="outline"
            onClick={() => {
              onLayout("TB");
              setTimeout(fitView);
            }}
          >
            <span className="text-sm font-bold capitalize">Layout</span>
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              setNodes(initialNodes);
              updateNodeData(initialNodes[0].id, {
                value: undefined,
              });
              setTimeout(fitView);
            }}
          >
            <span className="text-sm font-bold capitalize">
              <RotateCcw size={16} />
            </span>
          </Button>
          <Button variant="outline" onClick={() => editor.setIsOpen?.()}>
            <span className="text-sm font-bold capitalize">
              <Code size={16} />
            </span>
          </Button>
          <Button variant="default">
            <span className="text-sm font-bold capitalize">execute query</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
