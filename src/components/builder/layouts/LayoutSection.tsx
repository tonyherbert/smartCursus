"use client";

import { Card } from "@/src/components/ui/card";
import { BuilderSection } from "@/src/types/builder";
import { cn } from "@/src/lib/utils";
import { HeaderLayout } from "./HeaderLayout";
import { SectionControls } from "../section/SectionControls";
import { BlocksList } from "./SortableBlocks";
import { useBuilderStore } from "@/src/lib/stores/builder-store";

interface LayoutSectionProps {
  section: BuilderSection;
  isPreview?: boolean;
  isSelected?: boolean;
  selectedComponentId?: string | null;
  onSelect?: () => void;
  onComponentSelect?: (id: string) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function LayoutSection({
  section,
  isPreview = false,
  isSelected = false,
  selectedComponentId,
  onSelect,
  onComponentSelect,
  onDelete,
  onDuplicate,
}: LayoutSectionProps) {
  const { updateSectionLayout, updateColumnCount } = useBuilderStore();

  const renderContent = () => {
    if (section.layout === "header") {
      return (
        <HeaderLayout
          components={section.components}
          isPreview={isPreview}
          selectedComponentId={selectedComponentId}
          onComponentSelect={onComponentSelect}
        />
      );
    }

    return (
      <BlocksList
        sectionId={section.id}
        components={section.components}
        selectedComponentId={selectedComponentId}
        onComponentSelect={onComponentSelect}
        layout={section.layout}
        columnCount={section.columnCount}
      />
    );
  };

  return (
    <Card
      className={cn(
        "relative transition-all duration-200",
        isSelected && "ring-2 ring-primary shadow-lg",
        !isPreview && "hover:shadow-md",
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      {!isPreview && onDelete && onDuplicate && (
        <SectionControls
          section={section}
          onLayoutChange={(layout) => updateSectionLayout(section.id, layout)}
          onColumnCountChange={(count) => updateColumnCount(section.id, count)}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      )}

      <div className={cn(!isPreview && "p-4")}>{renderContent()}</div>
    </Card>
  );
}
