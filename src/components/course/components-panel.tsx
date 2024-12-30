"use client";

import { ComponentType } from "@/app/types/builder";
import { Type, Image, Code, List, Info } from "lucide-react";
import { useBuilderStore } from "@/app/lib/stores/builder-store";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

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

export function ComponentsPanel() {
  const addComponent = useBuilderStore((state) => state.addComponent);

  const renderComponentButton = (component: ComponentItem) => (
    <Card
      key={component.type}
      className="p-2 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={() => addComponent(component.type)}
    >
      <div className="flex items-start space-x-3 p-2">
        <component.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <div>
          <h4 className="font-medium">{component.label}</h4>
          <p className="text-sm text-muted-foreground">
            {component.description}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold">Composants</h2>
        <p className="text-sm text-muted-foreground">
          Cliquez pour ajouter un composant
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {components.map(renderComponentButton)}
        </div>
      </ScrollArea>
    </div>
  );
}
