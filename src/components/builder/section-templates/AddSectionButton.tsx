"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { pedagogicalSectionTemplates } from "@/src/lib/templates/section-templates";
import { BuilderSection } from "@/src/types/builder";
import { SectionTemplateItem } from "./SectionTemplateItem";

interface AddSectionButtonProps {
  onAddSection: (section: BuilderSection) => void;
}

export function AddSectionButton({ onAddSection }: AddSectionButtonProps) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une section
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2">
        <div className="grid gap-2">
          {pedagogicalSectionTemplates.map((template) => (
            <SectionTemplateItem
              key={template.key}
              template={template}
              onClick={() => handleAddSection(template)}
              isCompact
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
