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

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false // Disable automatic pageview capture, as we capture manually
    })
  }, [])

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider forcedTheme="dark" attribute="class">
        <PostHogProvider client={posthog}>
          <PostHogPageView />
          {children}
        </PostHogProvider>
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

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false
    })
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PostHogProvider>
  )
}
