"use client";

import { useState } from "react";
import { Card } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Plus, X } from "lucide-react";

interface ListBlockProps {
  content: string;
  onChange: (content: string) => void;
  isPreview?: boolean;
}

export function ListBlock({
  content,
  onChange,
  isPreview = false,
}: ListBlockProps) {
  const [items, setItems] = useState<string[]>(
    content ? JSON.parse(content) : [],
  );

  const updateItems = (newItems: string[]) => {
    setItems(newItems);
    onChange(JSON.stringify(newItems));
  };

  const addItem = () => {
    updateItems([...items, ""]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    updateItems(newItems);
  };

  if (isPreview) {
    return (
      <ul className="list-disc pl-6">
        {items.map((item, index) => (
          <li key={index}>{item || "Élément vide"}</li>
        ))}
      </ul>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Label>Liste à puces</Label>
        <Button onClick={addItem} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un élément
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={`Élément ${index + 1}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
