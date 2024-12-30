import { Menu } from "lucide-react";

import { LogoSvg } from "@/src/components/svg/logo-svg";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Typography } from "@/src/components/ui/typography";
import type { ReactNode } from "react";
import { ThemeToggle } from "../theme/theme-toggle";

export async function NavigationWrapper({
  children,
  logoChildren,
  navigationChildren,
  bottomNavigationChildren,
  topBarCornerLeftChildren,
  topBarChildren,
}: {
  children: ReactNode;
  logoChildren?: ReactNode;
  navigationChildren?: ReactNode;
  bottomNavigationChildren?: ReactNode;
  topBarChildren?: ReactNode;
  topBarCornerLeftChildren?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center gap-2 border-b px-4 lg:h-[60px] lg:px-6">
            <LogoSvg size={32} />
            <Typography variant="large" className="font-mono">
              /
            </Typography>
            {logoChildren}
          </div>
          <div className="flex-1">{navigationChildren}</div>
          <div className="mt-auto p-4">{bottomNavigationChildren}</div>
        </div>
      </div>
      <div className="flex max-h-screen flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex items-center gap-2">
                <LogoSvg size={32} />
                {logoChildren}
              </div>
              {navigationChildren}
              <div className="mt-auto">{bottomNavigationChildren}</div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">{topBarChildren}</div>
          <div className="flex items-center gap-2">
            {topBarCornerLeftChildren}
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 overflow-auto lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
