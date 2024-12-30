"use client";

import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { TextStyle, TextFormatToolbar } from "../text/TextFormatToolbar";
import { StyledText } from "../text/StyledText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface HeadingBlockProps {
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  style?: TextStyle;
  isPreview?: boolean;
  isSelected?: boolean;
  onChange?: (content: string) => void;
  onLevelChange?: (level: 1 | 2 | 3 | 4 | 5 | 6) => void;
  onStyleChange?: (style: TextStyle) => void;
}

const headingClasses = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

export function HeadingBlock({
  content,
  level = 1,
  style = {},
  isPreview = false,
  isSelected = false,
  onChange,
  onLevelChange,
  onStyleChange,
}: HeadingBlockProps) {
  if (isPreview) {
    return (
      <StyledText
        content={content || `Titre niveau ${level}`}
        style={style}
        className={cn("font-bold", headingClasses[level], "mb-4")}
        component={`h${level}` as keyof JSX.IntrinsicElements}
      />
    );
  }

  return (
    <Card className={cn("p-4", isSelected && "ring-2 ring-primary")}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Select
            value={level.toString()}
            onValueChange={(value) =>
              onLevelChange?.(parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((l) => (
                <SelectItem key={l} value={l.toString()}>
                  Niveau {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1 min-w-[200px]">
            <TextFormatToolbar
              style={style}
              onChange={onStyleChange || (() => {})}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            value={content}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={`Titre niveau ${level}`}
            className={cn(
              "w-full border-none bg-transparent",
              "focus:ring-0 focus:border-none",
              headingClasses[level],
              "font-bold",
              style.italic && "italic",
              style.underline && "underline",
              style.align === "center" && "text-center",
              style.align === "right" && "text-right",
            )}
          />
        </div>
      </div>
    </Card>
  );
}
