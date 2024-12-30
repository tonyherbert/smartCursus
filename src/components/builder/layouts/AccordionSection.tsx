"use client";

import { Card } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { SectionControls } from "../section/SectionControls";
import { BlocksList } from "./SortableBlocks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { BuilderSection } from "@/app/types/builder";
import { useBuilderStore } from "@/app/lib/stores/builder-store";

interface AccordionSectionProps {
  section: BuilderSection;
  isSelected?: boolean;
  selectedComponentId?: string | null;
  onSelect?: () => void;
  onComponentSelect?: (id: string) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function AccordionSection({
  section,
  isSelected = false,
  selectedComponentId,
  onSelect,
  onComponentSelect,
  onDelete,
  onDuplicate,
}: AccordionSectionProps) {
  const { updateSectionLayout, updateColumnCount } = useBuilderStore();

  return (
    <Card
      className={cn(
        "relative transition-all duration-200",
        isSelected && "ring-2 ring-primary shadow-lg",
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      <Accordion type="single" defaultValue="content" collapsible>
        <AccordionItem value="content" className="border-none">
          <div className="border-b">
            <SectionControls
              section={section}
              onLayoutChange={(layout) =>
                updateSectionLayout(section.id, layout)
              }
              onColumnCountChange={(count) =>
                updateColumnCount(section.id, count)
              }
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <span className="text-sm font-medium">
                {section.type === "content" ? "Section libre" : section.title}
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent className="p-4">
            <BlocksList
              sectionId={section.id}
              components={section.components}
              selectedComponentId={selectedComponentId}
              onComponentSelect={onComponentSelect}
              layout={section.layout}
              columnCount={section.columnCount}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
