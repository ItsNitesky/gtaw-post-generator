"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense } from "react";

export interface ProvidersProps {
  children: React.ReactNode;
}

function ProvidersContent({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider forcedTheme="dark" attribute="class">
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <ProvidersContent>{children}</ProvidersContent>
    </Suspense>
  );
}
