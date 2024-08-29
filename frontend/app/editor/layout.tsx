import React from "react";

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout = function ({ children }: EditorLayoutProps) {
  return (
    <div className="flex w-full">
      <div className="hidden h-screen w-screen bg-muted lg:block">
        {children}
      </div>
    </div>
  );
};

export default EditorLayout;
