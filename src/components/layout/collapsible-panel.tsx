"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CollapsiblePanelProps {
  children: React.ReactNode;
  side: "left" | "right";
  className?: string;
}

export function CollapsiblePanel({
  children,
  side,
  className,
}: CollapsiblePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        "bg-[hsl(var(--panel-background))] text-[hsl(var(--panel-foreground))]",
        "border-[hsl(var(--panel-border))]",
        isCollapsed ? "w-12" : "w-80",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-2 z-50 transition-transform bg-background",
          "hover:bg-[hsl(var(--background-subtle))]",
          side === "left" ? "-right-3" : "-left-3",
          isCollapsed && "rotate-180",
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {side === "left" ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <div
        className={cn(
          "h-full overflow-hidden transition-all duration-300",
          isCollapsed && "opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
