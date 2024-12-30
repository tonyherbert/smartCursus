"use client";

import { useBuilderStore } from "../../../app/lib/stores/builder-store";
import { cn } from "../../../app/lib/utils";
import { SectionToolbar } from "./section/SectionToolbar";
import { AccordionSection } from "./layouts/AccordionSection";
import { CourseViewer } from "../course/course-viewer";
import { useEffect } from "react";

interface BuilderCanvasProps {
  isPreview: boolean;
}

export function BuilderCanvas({ isPreview }: BuilderCanvasProps) {
  const {
    sections,
    selectedSectionId,
    selectedComponentId,
    addSection,
    selectSection,
    selectComponent,
    deleteSection,
    duplicateSection,
  } = useBuilderStore();

  // Reset selection when switching to preview mode
  useEffect(() => {
    if (isPreview) {
      selectSection(null);
      selectComponent(null);
    }
  }, [isPreview, selectSection, selectComponent]);

  if (isPreview) {
    return (
      <div className="prose prose-slate max-w-none">
        <CourseViewer sections={sections} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SectionToolbar onAddSection={addSection} />

      <div
        className={cn(
          "min-h-[600px] rounded-lg border-2 border-dashed p-8",
          "transition-colors",
          selectedComponentId ? "border-primary" : "border-muted",
        )}
      >
        <div className="space-y-4">
          {sections.map((section) => (
            <AccordionSection
              key={section.id}
              section={section}
              isSelected={section.id === selectedSectionId}
              selectedComponentId={selectedComponentId}
              onSelect={() => selectSection(section.id)}
              onComponentSelect={selectComponent}
              onDelete={() => deleteSection(section.id)}
              onDuplicate={() => duplicateSection(section.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
