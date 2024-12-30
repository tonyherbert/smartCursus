"use client";

import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

interface SelectionOverlayProps {
  isVisible: boolean;
  className?: string;
}

export function SelectionOverlay({
  isVisible,
  className,
}: SelectionOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "absolute inset-0 rounded-lg pointer-events-none",
        "bg-gradient-to-r from-primary/5 to-primary/10",
        "border-2 border-primary/50",
        "shadow-[0_0_0_4px_rgba(var(--primary)/0.1)]",
        className,
      )}
    >
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full" />
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary rounded-full" />
    </motion.div>
  );
}
