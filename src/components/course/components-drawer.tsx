"use client";

import { ComponentType } from "@/src/types/builder";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Type, Image, Code, List, Info, Layout, Columns } from "lucide-react";
import { Card } from "@/src/components/ui/card";

interface ComponentItem {
  type: ComponentType;
  icon: React.ElementType;
  label: string;
  description: string;
}

const components: ComponentItem[] = [
  {
    type: "heading",
    icon: Type,
    label: "Titre",
    description: "Titre de section avec différents niveaux",
  },
  {
    type: "paragraph",
    icon: Type,
    label: "Texte",
    description: "Bloc de texte avec mise en forme",
  },
  {
    type: "image",
    icon: Image,
    label: "Image",
    description: "Image avec légende optionnelle",
  },
  {
    type: "code",
    icon: Code,
    label: "Code",
    description: "Bloc de code avec coloration syntaxique",
  },
  {
    type: "list",
    icon: List,
    label: "Liste",
    description: "Liste à puces ou numérotée",
  },
  {
    type: "callout",
    icon: Info,
    label: "Callout",
    description: "Bloc d'information, avertissement ou note",
  },
];

export function ComponentsDrawer() {
  const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ type }));
    e.dataTransfer.effectAllowed = "copy";
  };

  const renderComponentButton = (component: ComponentItem) => (
    <Card key={component.type} className="p-2 hover:bg-muted transition-colors">
      <Button
        variant="ghost"
        className="w-full justify-start"
        draggable
        onDragStart={(e) => handleDragStart(e, component.type)}
        aria-label={`Ajouter un bloc ${component.label}`}
      >
        <component.icon className="h-4 w-4 mr-2" />
        <div className="flex flex-col items-start">
          <span>{component.label}</span>
          <span className="text-xs text-muted-foreground">
            {component.description}
          </span>
        </div>
      </Button>
    </Card>
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <section>
          <h3 className="text-sm font-medium mb-3">Mise en page</h3>
          <div className="space-y-2">
            {renderComponentButton({
              type: "header",
              icon: Layout,
              label: "En-tête",
              description: "Section d'en-tête avec 3 colonnes",
            })}
            {renderComponentButton({
              type: "columns",
              icon: Columns,
              label: "Colonnes",
              description: "Section multi-colonnes personnalisable",
            })}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium mb-3">Contenu</h3>
          <div className="space-y-2">
            {components.map(renderComponentButton)}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
}
