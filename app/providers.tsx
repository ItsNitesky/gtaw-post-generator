"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense } from "react";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import PostHogPageView from "./PostHogPageView"

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
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false
    })
  }, [])

  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <PostHogProvider client={posthog}>
        <PostHogPageView />
        <ProvidersContent>{children}</ProvidersContent>
      </PostHogProvider>
    </Suspense>
  );
}
