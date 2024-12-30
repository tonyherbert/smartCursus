"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BuilderSection, BuilderComponent } from "@/src/types/builder";
import { LayoutSection } from "./LayoutSection";
import { GripVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface DraggableSectionProps {
  section: BuilderSection;
  isPreview?: boolean;
  isSelected?: boolean;
  selectedComponentId?: string | null;
  onSelect?: () => void;
  onLayoutChange?: (layout: BuilderSection["layout"]) => void;
  onColumnCountChange?: (count: number) => void;
  onComponentSelect?: (id: string) => void;
  onUpdateComponent?: (id: string, updates: Partial<BuilderComponent>) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function DraggableSection({ section, ...props }: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative group", isDragging && "z-50")}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "absolute -left-12 top-1/2 -translate-y-1/2 p-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity",
          isDragging && "opacity-100",
        )}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      <LayoutSection section={section} {...props} />
    </div>
  );
}
