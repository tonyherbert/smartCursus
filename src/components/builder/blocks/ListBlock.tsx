"use client";

import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Plus, X, GripVertical } from "lucide-react";

interface ListBlockProps {
  items: string[];
  isPreview?: boolean;
  isSelected?: boolean;
  onItemsChange?: (items: string[]) => void;
}

export function ListBlock({
  items = [],
  isPreview = false,
  isSelected = false,
  onItemsChange,
}: ListBlockProps) {
  const addItem = () => {
    onItemsChange?.([...items, ""]);
  };

  const removeItem = (index: number) => {
    onItemsChange?.(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onItemsChange?.(newItems);
  };

  if (isPreview) {
    return (
      <ul className="list-disc pl-6 mb-4 space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item || "Élément vide"}</li>
        ))}
      </ul>
    );
  }

  return (
    <Card className={cn("p-4", isSelected && "ring-2 ring-primary")}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Élément ${index + 1}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="opacity-0 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={addItem}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un élément
        </Button>
      </div>
    </Card>
  );
}
