import Link from "next/link";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import { useEditorToggle } from "@/features/flow/hooks/use-editor-toggle";

export const Header = () => {
  const editor = useStore(useEditorToggle, (state) => state);
  return (
    <header className="z-50 flex w-screen items-center justify-between border bg-background px-6 py-3">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-lg font-bold">Visual Flux</h1>
        </Link>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => editor.setIsOpen?.()}>
            <span className="text-sm font-bold">Show Code</span>
          </Button>
          <Button variant="outline">
            <span className="text-sm font-bold">Reset</span>
          </Button>
          <Button variant="default">
            <span className="text-sm font-bold">Execute Query</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
