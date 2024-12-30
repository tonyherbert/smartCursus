import { TailwindIndicator } from "@/src/components/utils/tailwind-indicator";
import { FloatingLegalFooter } from "@/src/features/legal/floating-legal-footer";
import { NextTopLoader } from "@/src/features/page/next-top-loader";
import { getServerUrl } from "@/src/lib/server-url";
import { cn } from "@/src/lib/utils";
import { SiteConfig } from "@/src/site-config";
import type { LayoutParams } from "@/src/types/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
  metadataBase: new URL(getServerUrl()),
};

const CaptionFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-caption",
});

export default function RootLayout({
  children,
  modal,
}: LayoutParams & { modal?: ReactNode }) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={cn(
            "h-full bg-background font-sans antialiased",
            GeistMono.variable,
            GeistSans.variable,
            CaptionFont.variable,
          )}
        >
          <Providers>
            <NextTopLoader
              delay={100}
              showSpinner={false}
              color="hsl(var(--primary))"
            />
            {children}
            {modal}
            <TailwindIndicator />
            <FloatingLegalFooter />
          </Providers>
        </body>
      </html>
    </>
  );
}
