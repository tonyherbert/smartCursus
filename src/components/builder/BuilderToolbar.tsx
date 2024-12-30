"use client";

import { Button } from "@/src/components/ui/button";
import { ComponentType } from "@/src/types/builder";
import { Type, Image, Code, List, Info } from "lucide-react";

interface BuilderToolbarProps {
  onAdd?: (type: ComponentType) => void;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function BuilderToolbar({
  onAdd,
  disabled = false,
  variant = "outline",
  size = "default",
}: BuilderToolbarProps) {
  const handleAdd = (type: ComponentType) => {
    if (onAdd && !disabled) {
      onAdd(type);
    }
  };

  return (
    <div className="space-y-2">
      {disabled && (
        <p className="text-sm text-muted-foreground mb-2">
          Sélectionnez une section pour ajouter des composants
        </p>
      )}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={variant}
          size={size}
          onClick={() => handleAdd("heading")}
          disabled={disabled}
        >
          <Type className="h-4 w-4 mr-2" />
          Titre
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={() => handleAdd("paragraph")}
          disabled={disabled}
        >
          <Type className="h-4 w-4 mr-2" />
          Texte
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={() => handleAdd("image")}
          disabled={disabled}
        >
          <Image className="h-4 w-4 mr-2" />
          Image
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={() => handleAdd("code")}
          disabled={disabled}
        >
          <Code className="h-4 w-4 mr-2" />
          Code
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={() => handleAdd("list")}
          disabled={disabled}
        >
          <List className="h-4 w-4 mr-2" />
          Liste
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={() => handleAdd("callout")}
          disabled={disabled}
        >
          <Info className="h-4 w-4 mr-2" />
          Callout
        </Button>
      </div>
    </div>
  );
}
