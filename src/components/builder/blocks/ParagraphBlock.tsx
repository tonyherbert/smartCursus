"use client";

import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { TextFormatToolbar, TextStyle } from "../text/TextFormatToolbar";
import { StyledText } from "../text/StyledText";
import { useState } from "react";

interface ParagraphBlockProps {
  content: string;
  style?: TextStyle;
  isPreview?: boolean;
  isSelected?: boolean;
  onChange?: (content: string) => void;
  onStyleChange?: (style: TextStyle) => void;
}

export function ParagraphBlock({
  content,
  style: initialStyle = {},
  isPreview = false,
  isSelected = false,
  onChange,
  onStyleChange,
}: ParagraphBlockProps) {
  const [style, setStyle] = useState<TextStyle>(initialStyle);

  const handleStyleChange = (newStyle: TextStyle) => {
    setStyle(newStyle);
    onStyleChange?.(newStyle);
  };

  if (isPreview) {
    return (
      <StyledText
        content={content || "Paragraphe vide"}
        style={style}
        className="mb-4"
        component="p"
      />
    );
  }

  return (
    <Card className={cn("p-4", isSelected && "ring-2 ring-primary")}>
      <TextFormatToolbar style={style} onChange={handleStyleChange} />
      <Textarea
        value={content}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Saisissez votre texte ici..."
        className="min-h-[150px] resize-y"
      />
    </Card>
  );
}
