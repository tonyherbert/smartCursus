"use client";

import { pedagogicalSectionTemplates } from "@/app/lib/templates/section-templates";
import { BuilderSection } from "@/app/types/builder";
import { SectionTemplateItem } from "./SectionTemplateItem";
import { ScrollArea } from "../../ui/scroll-area";

interface SectionTemplatesPanelProps {
  onAddSection: (section: BuilderSection) => void;
}

export function SectionTemplatesPanel({
  onAddSection,
}: SectionTemplatesPanelProps) {
  const handleAddSection = (
    template: (typeof pedagogicalSectionTemplates)[0],
  ) => {
    const newSection: BuilderSection = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      components: template.components.map((component) => ({
        ...component,
        id: Math.random().toString(36).substr(2, 9),
      })),
    };
    onAddSection(newSection);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold">Sections pédagogiques</h2>
        <p className="text-sm text-muted-foreground">
          Structurez votre cours avec des sections adaptées
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="grid gap-4">
          {pedagogicalSectionTemplates.map((template) => (
            <SectionTemplateItem
              key={template.key}
              template={template}
              onClick={() => handleAddSection(template)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
