import { Button } from "@/components/ui/button";
import Link from "next/link";

export const EditorHeader = () => {
  return (
    <header className="z-50 flex w-screen items-center justify-between border bg-background px-6 py-3">
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
        <Button variant="outline" className="rounded-l-none font-bold" disabled>
          Code Editor 🚧
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
