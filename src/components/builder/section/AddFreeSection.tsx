"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus, Columns, Layout, Image } from "lucide-react";
import { Section, SectionLayout, sectionLayouts } from "@/src/types/section";

interface AddFreeSectionProps {
  onAdd: (section: Section) => void;
}

const layouts: Array<{
  id: SectionLayout;
  icon: React.ElementType;
  title: string;
  description: string;
}> = [
  {
    id: "full",
    icon: Layout,
    title: "Pleine largeur",
    description: "Une seule colonne sur toute la largeur",
  },
  {
    id: "columns",
    icon: Columns,
    title: "Multi-colonnes",
    description: "2 à 4 colonnes de contenu",
  },
  {
    id: "hero",
    icon: Image,
    title: "Hero",
    description: "Image + texte côte à côte",
  },
];

export function AddFreeSection({ onAdd }: AddFreeSectionProps) {
  const [open, setOpen] = useState(false);

  const createSection = (layout: SectionLayout) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type: "content",
      title: "Nouvelle section",
      description: "",
      layout,
      components: [],
      columnCount: layout === "columns" ? 2 : undefined,
    };
    onAdd(newSection);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Section libre
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choisir une mise en page</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {layouts.map((layout) => (
            <Button
              key={layout.id}
              variant="outline"
              className="flex items-start gap-4 h-auto p-4 justify-start"
              onClick={() => createSection(layout.id)}
            >
              <layout.icon className="h-5 w-5 mt-0.5 shrink-0" />
              <div className="text-left">
                <div className="font-medium">{layout.title}</div>
                <div className="text-sm text-muted-foreground">
                  {layout.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
