"use client";

import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BuilderSection, BuilderComponent } from "@/src/types/builder";
import { DraggableSection } from "./DraggableSection";

interface SortableSectionsProps {
  sections: BuilderSection[];
  isPreview?: boolean;
  selectedSectionId?: string | null;
  selectedComponentId?: string | null;
  onSectionSelect?: (id: string) => void;
  onLayoutChange?: (
    sectionId: string,
    layout: BuilderSection["layout"],
  ) => void;
  onColumnCountChange?: (sectionId: string, count: number) => void;
  onComponentSelect?: (id: string) => void;
  onUpdateComponent?: (
    sectionId: string,
    componentId: string,
    updates: Partial<BuilderComponent>,
  ) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onReorder?: (activeId: string, overId: string) => void;
}

export function SortableSections({
  sections,
  isPreview = false,
  selectedSectionId,
  selectedComponentId,
  onSectionSelect,
  onLayoutChange,
  onColumnCountChange,
  onComponentSelect,
  onUpdateComponent,
  onDelete,
  onDuplicate,
  onReorder,
}: SortableSectionsProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder?.(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div className="relative space-y-6">
          {sections.map((section) => (
            <DraggableSection
              key={section.id}
              section={section}
              isPreview={isPreview}
              isSelected={section.id === selectedSectionId}
              selectedComponentId={selectedComponentId}
              onSelect={() => onSectionSelect?.(section.id)}
              onLayoutChange={(layout) => onLayoutChange?.(section.id, layout)}
              onColumnCountChange={(count) =>
                onColumnCountChange?.(section.id, count)
              }
              onComponentSelect={onComponentSelect}
              onUpdateComponent={(componentId, updates) =>
                onUpdateComponent?.(section.id, componentId, updates)
              }
              onDelete={() => onDelete?.(section.id)}
              onDuplicate={() => onDuplicate?.(section.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
