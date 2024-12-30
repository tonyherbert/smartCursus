"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BuilderComponent } from "@/src/types/builder";
import { BuilderBlock } from "./BuilderBlock";
import { GripVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface DraggableBlockProps {
  component: BuilderComponent;
  isSelected?: boolean;
  onSelect?: (e: React.MouseEvent) => void;
  onUpdate?: (updates: Partial<BuilderComponent>) => void;
}

export function DraggableBlock({
  component,
  isSelected,
  onSelect,
  onUpdate,
}: DraggableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        isDragging && "z-50",
        isSelected && "z-40",
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "absolute -left-8 top-1/2 -translate-y-1/2 p-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity",
          isDragging && "opacity-100",
        )}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      <BuilderBlock
        component={component}
        isSelected={isSelected}
        onSelect={onSelect}
        onUpdate={onUpdate}
      />
    </div>
  );
}
