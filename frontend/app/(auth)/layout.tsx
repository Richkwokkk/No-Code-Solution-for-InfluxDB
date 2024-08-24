import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = function ({ children }: AuthLayoutProps) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden h-screen w-screen bg-muted bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] lg:block" />
      {children}
    </div>
  );
};

export default AuthLayout;
