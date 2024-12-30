"use client";

import { Button } from "../../ui/button";
import { AddFreeSection } from "./AddFreeSection";
import { Section } from "@/app/types/section";
import { pedagogicalSectionTemplates } from "@/app/lib/templates/section-templates";

interface SectionToolbarProps {
  onAddSection: (section: Section) => void;
}

export function SectionToolbar({ onAddSection }: SectionToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <AddFreeSection onAdd={onAddSection} />
      <Button
        variant="outline"
        onClick={() => {
          // Ajouter une section pédagogique par défaut
          const template = pedagogicalSectionTemplates[0];
          const newSection: Section = {
            ...template,
            id: Math.random().toString(36).substr(2, 9),
            components: template.components.map((component) => ({
              ...component,
              id: Math.random().toString(36).substr(2, 9),
            })),
          };
          onAddSection(newSection);
        }}
      >
        Section pédagogique
      </Button>
    </div>
  );
}
