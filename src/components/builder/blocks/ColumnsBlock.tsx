"use client";

import { Card } from "@/src/components/ui/card";
import { BuilderComponent } from "@/src/types/builder";
import { BuilderBlock } from "../BuilderBlock";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Plus } from "lucide-react";
import { BuilderToolbar } from "../BuilderToolbar";

interface ColumnsBlockProps {
  columns: BuilderComponent[][];
  columnCount?: number;
  isPreview?: boolean;
  isSelected?: boolean;
  onUpdate?: (columnIndex: number, components: BuilderComponent[]) => void;
  onColumnCountChange?: (count: number) => void;
}

export function ColumnsBlock({
  columns = [[], []],
  columnCount = 2,
  isPreview = false,
  isSelected = false,
  onUpdate,
  onColumnCountChange,
}: ColumnsBlockProps) {
  const handleAddComponent = (
    columnIndex: number,
    type: BuilderComponent["type"],
  ) => {
    const newComponent: BuilderComponent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      props: {
        content: "",
        style: {},
      },
    };

    const newColumns = columns[columnIndex]
      ? [...columns[columnIndex], newComponent]
      : [newComponent];
    onUpdate?.(columnIndex, newColumns);
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  if (isPreview) {
    return (
      <div
        className={cn(
          "grid gap-4 mb-4",
          gridCols[columnCount as keyof typeof gridCols],
        )}
      >
        {columns.slice(0, columnCount).map((column, index) => (
          <div key={index} className="space-y-4">
            {column.map((component) => (
              <BuilderBlock
                key={component.id}
                component={component}
                isPreview={true}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card className={cn("p-4", isSelected && "ring-2 ring-primary")}>
      <div className="mb-4">
        <Select
          value={columnCount.toString()}
          onValueChange={(value) => onColumnCountChange?.(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nombre de colonnes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 colonne</SelectItem>
            <SelectItem value="2">2 colonnes</SelectItem>
            <SelectItem value="3">3 colonnes</SelectItem>
            <SelectItem value="4">4 colonnes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={cn(
          "grid gap-4",
          gridCols[columnCount as keyof typeof gridCols],
        )}
      >
        {Array.from({ length: columnCount }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Card className="p-4 border-dashed">
              <div className="space-y-4">
                {columns[index]?.map((component) => (
                  <BuilderBlock
                    key={component.id}
                    component={component}
                    onUpdate={(id, updates) => {
                      const newColumn = columns[index].map((c) =>
                        c.id === id ? { ...c, ...updates } : c,
                      );
                      onUpdate?.(index, newColumn);
                    }}
                  />
                ))}
                <div className="flex justify-center">
                  <BuilderToolbar
                    onAdd={(type) => handleAddComponent(index, type)}
                    variant="ghost"
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Card>
  );
}
