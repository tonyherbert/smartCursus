"use client";

import {
  BuilderSection,
  BuilderComponent,
  LayoutType,
} from "@/src/types/builder";
import { Button } from "@/src/components/ui/button";
import { Plus, Layout } from "lucide-react";
import { defaultHeader, sectionTemplates } from "@/src/lib/templates";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { SortableSections } from "./SortableSections";

interface LayoutContainerProps {
  sections: BuilderSection[];
  setSections?: (sections: BuilderSection[]) => void;
  isPreview?: boolean;
  selectedSectionId?: string | null;
  selectedComponentId?: string | null;
  onSectionSelect?: (id: string) => void;
  onComponentSelect?: (id: string) => void;
  onUpdateComponent?: (
    sectionId: string,
    componentId: string,
    updates: Partial<BuilderComponent>,
  ) => void;
}

export function LayoutContainer({
  sections,
  setSections,
  isPreview = false,
  selectedSectionId,
  selectedComponentId,
  onSectionSelect,
  onComponentSelect,
  onUpdateComponent,
}: LayoutContainerProps) {
  const addSection = (template?: BuilderSection) => {
    if (!setSections) return;

    const newSection: BuilderSection = template
      ? {
          ...template,
          id: Math.random().toString(36).substr(2, 9),
        }
      : {
          id: Math.random().toString(36).substr(2, 9),
          layout: "full",
          components: [],
          columnCount: 2,
        };

    setSections([...sections, newSection]);
    onSectionSelect?.(newSection.id);
  };

  const updateSectionLayout = (sectionId: string, layout: LayoutType) => {
    if (!setSections) return;

    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              layout,
              columnCount:
                layout === "columns" ? section.columnCount || 2 : undefined,
            }
          : section,
      ),
    );
  };

  const updateColumnCount = (sectionId: string, count: number) => {
    if (!setSections) return;

    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, columnCount: count } : section,
      ),
    );
  };

  const deleteSection = (id: string) => {
    if (!setSections) return;
    setSections(sections.filter((section) => section.id !== id));
  };

  const duplicateSection = (id: string) => {
    if (!setSections) return;

    const sectionToDuplicate = sections.find((section) => section.id === id);
    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        components: sectionToDuplicate.components.map((component) => ({
          ...component,
          id: Math.random().toString(36).substr(2, 9),
        })),
      };
      setSections([...sections, duplicatedSection]);
    }
  };

  const handleReorderSections = (activeId: string, overId: string) => {
    if (!setSections) return;

    const oldIndex = sections.findIndex((s) => s.id === activeId);
    const newIndex = sections.findIndex((s) => s.id === overId);

    const newSections = [...sections];
    const [removed] = newSections.splice(oldIndex, 1);
    newSections.splice(newIndex, 0, removed);

    setSections(newSections);
  };

  return (
    <div className="space-y-4">
      <SortableSections
        sections={sections}
        isPreview={isPreview}
        selectedSectionId={selectedSectionId}
        selectedComponentId={selectedComponentId}
        onSectionSelect={onSectionSelect}
        onLayoutChange={updateSectionLayout}
        onColumnCountChange={updateColumnCount}
        onComponentSelect={onComponentSelect}
        onUpdateComponent={onUpdateComponent}
        onDelete={deleteSection}
        onDuplicate={duplicateSection}
        onReorder={handleReorderSections}
      />

      {!isPreview && setSections && (
        <div className="flex gap-2 justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => addSection()}
            className="w-full max-w-xs"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une section
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Layout className="h-4 w-4 mr-2" />
                Modèles
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => addSection(defaultHeader)}>
                En-tête simple
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => addSection(sectionTemplates.headerWithContent)}
              >
                En-tête avec contenu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
