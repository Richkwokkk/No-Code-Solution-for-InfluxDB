"use client";

import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/components/auth-provider";
import { QueryProvider } from "@/components/query-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};
