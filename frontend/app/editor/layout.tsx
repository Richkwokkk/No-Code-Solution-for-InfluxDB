import React from "react";

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout = function ({ children }: EditorLayoutProps) {
  return <div className="h-screen w-screen bg-muted">{children}</div>;
};

export default EditorLayout;
