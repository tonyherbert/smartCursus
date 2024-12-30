"use client";

import { cn } from "@/src/lib/utils";
import { TextStyle } from "./TextFormatToolbar";

interface StyledTextProps {
  content: string;
  style: TextStyle;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
}

export function StyledText({
  content,
  style,
  className,
  component: Component = "div",
}: StyledTextProps) {
  return (
    <Component
      className={cn(
        style.color,
        style.align && `text-${style.align}`,
        style.bold && "font-bold",
        style.italic && "italic",
        style.underline && "underline",
        className,
      )}
    >
      {content}
    </Component>
  );
}
