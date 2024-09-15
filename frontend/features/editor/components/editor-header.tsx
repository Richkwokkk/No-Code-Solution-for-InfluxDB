import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import { useEditorToggle } from "@/features/editor/hooks/use-editor-toggle";

export const EditorHeader = () => {
  const editor = useStore(useEditorToggle, (state) => state);
  return (
    <header className="z-50 flex w-screen items-center justify-between border bg-background px-6 py-3 shadow-md">
      <div className="flex w-1/2 items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">InfluxUI</h1>
        </Link>
        <Button
          variant="outline"
          className="rounded-r-none border-r-0 font-bold"
        >
          Diagram View
        </Button>
      </div>
      <div className="flex w-1/2 items-center justify-between">
        <Button
          variant="outline"
          className="rounded-l-none font-bold"
          onClick={() => editor.setIsOpen?.()}
        >
          Code Editor
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline">
            <span className="text-sm font-bold">Reset</span>
          </Button>
          <Button variant="default">
            <span className="text-sm font-bold">Publish</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
