import { unstable_noStore as noStore } from 'next/cache';
import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "../config/site";
import { fontSans, fontHeading } from "../config/fonts";
import GoogleAnalytics from '../components/GoogleAnalytics';

import { AuthProvider } from './components/Providers';
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <AuthProvider>
          <Providers>
            <div className="relative flex flex-col h-screen">
              <main className="flex-grow w-full">
                {children}
              </main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
