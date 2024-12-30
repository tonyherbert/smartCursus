"use client";

import { Button } from "@/src/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: "left" | "center" | "right" | "justify";
  color?: string;
}

interface TextFormatToolbarProps {
  style: TextStyle;
  onChange: (style: TextStyle) => void;
}

const colors = [
  { name: "Défaut", value: "inherit" },
  { name: "Primaire", value: "text-primary" },
  { name: "Secondaire", value: "text-muted-foreground" },
  { name: "Succès", value: "text-green-600" },
  { name: "Danger", value: "text-red-600" },
  { name: "Info", value: "text-blue-600" },
];

export function TextFormatToolbar({ style, onChange }: TextFormatToolbarProps) {
  const toggleStyle = (key: keyof TextStyle) => {
    onChange({ ...style, [key]: !style[key] });
  };

  const setAlign = (align: TextStyle["align"]) => {
    onChange({ ...style, align });
  };

  const setColor = (color: string) => {
    onChange({ ...style, color });
  };

  return (
    <div className="flex items-center gap-1 mb-2">
      <Button
        variant={style.bold ? "default" : "ghost"}
        size="icon"
        onClick={() => toggleStyle("bold")}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={style.italic ? "default" : "ghost"}
        size="icon"
        onClick={() => toggleStyle("italic")}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={style.underline ? "default" : "ghost"}
        size="icon"
        onClick={() => toggleStyle("underline")}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-4 bg-border mx-1" />

      <Button
        variant={style.align === "left" ? "default" : "ghost"}
        size="icon"
        onClick={() => setAlign("left")}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={style.align === "center" ? "default" : "ghost"}
        size="icon"
        onClick={() => setAlign("center")}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={style.align === "right" ? "default" : "ghost"}
        size="icon"
        onClick={() => setAlign("right")}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant={style.align === "justify" ? "default" : "ghost"}
        size="icon"
        onClick={() => setAlign("justify")}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <div className="w-px h-4 bg-border mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {colors.map((color) => (
            <DropdownMenuItem
              key={color.value}
              onClick={() => setColor(color.value)}
              className={color.value}
            >
              {color.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
