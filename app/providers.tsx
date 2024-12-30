"use client";

import { Toaster } from "@/src/components/ui/sonner";
import { AlertDialogRenderer } from "@/src/features/alert-dialog/alert-dialog-renderer";
import { GlobalDialogLazy } from "@/src/features/global-dialog/global-dialog-lazy";
import { SearchParamsMessageToastSuspended } from "@/src/features/searchparams-message/search-params-message-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <AlertDialogRenderer />
          <GlobalDialogLazy />
          <SearchParamsMessageToastSuspended />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
