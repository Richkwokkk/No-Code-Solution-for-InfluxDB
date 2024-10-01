import { useReactFlow } from "@xyflow/react";

import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import { initialNodes } from "@/features/flow/constants";
import { useEditorToggle } from "@/features/flow/hooks/use-editor-toggle";

export const Header = () => {
  const editor = useStore(useEditorToggle, (state) => state);
  const { fitView, setNodes, updateNodeData } = useReactFlow();

  return (
    <header className="z-50 flex w-screen items-center justify-between border bg-background px-6 py-3">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-lg font-bold">Visual Flux</h1>
        </Link>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => editor.setIsOpen?.()}
            className="flex min-w-[112px] justify-center"
          >
            <span className="text-sm font-bold capitalize">
              {editor.isOpen ? "hide" : "show"} code
            </span>
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
            <span className="text-sm font-bold capitalize">reset</span>
          </Button>
          <Button variant="default">
            <span className="text-sm font-bold capitalize">execute query</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
