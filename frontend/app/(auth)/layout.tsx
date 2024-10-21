"use client";

import React from "react";

import { useIsClient } from "@/hooks/use-is-client";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = function ({ children }: AuthLayoutProps) {
  const isClient = useIsClient();

  return isClient ? (
    <section className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden h-screen w-screen bg-muted bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] lg:block" />
      {children}
    </section>
  ) : null;
};

export default AuthLayout;
