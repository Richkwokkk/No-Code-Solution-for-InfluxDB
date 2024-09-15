import React from "react";

import { ReactFlowProvider } from "@xyflow/react";

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout = function ({ children }: EditorLayoutProps) {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen bg-muted">{children}</div>
    </ReactFlowProvider>
  );
};

export default EditorLayout;
