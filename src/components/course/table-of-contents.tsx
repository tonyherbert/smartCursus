"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useBuilderStore } from "@/app/lib/stores/builder-store";
import { BuilderComponent, BuilderSection } from "@/app/types/builder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface TocItem {
  id: string;
  title: string;
  type: "section" | "component";
  level: number;
  sectionId: string;
  componentId?: string;
}

export function TableOfContents() {
  const { sections, selectSection, selectComponent } = useBuilderStore();

  // Fonction pour obtenir le titre d'une section
  const getSectionTitle = (section: BuilderSection): string => {
    if (section.type === "content") {
      return "Section libre";
    }
    return section.title;
  };

  // Fonction pour obtenir le titre d'un composant
  const getComponentTitle = (component: BuilderComponent): string => {
    switch (component.type) {
      case "heading":
        const level = component.props.level || 1;
        return `${component.props.content || "Sans titre"} (h${level})`;
      case "paragraph":
        return "Texte";
      case "code":
        return "Code";
      case "image":
        return "Image";
      case "list":
        return "Liste";
      case "callout":
        return "Callout";
      default:
        return "Composant";
    }
  };

  const handleItemClick = (item: TocItem) => {
    selectSection(item.sectionId);
    if (item.componentId) {
      selectComponent(item.componentId);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold">Table des matières</h2>
        <p className="text-sm text-muted-foreground">
          Structure de votre cours
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {sections.length > 0 ? (
            <Accordion type="multiple" className="space-y-2">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border rounded-lg"
                >
                  <AccordionTrigger
                    onClick={() => selectSection(section.id)}
                    className="px-4 hover:no-underline"
                  >
                    <span className="text-sm font-medium">
                      {getSectionTitle(section)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 px-2">
                    {section.components.map((component) => (
                      <Button
                        key={component.id}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start text-sm text-muted-foreground",
                          "hover:bg-muted",
                        )}
                        onClick={() => {
                          selectSection(section.id);
                          selectComponent(component.id);
                        }}
                      >
                        <ChevronRight className="h-4 w-4 mr-2" />
                        {getComponentTitle(component)}
                      </Button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Ajoutez des sections et des composants pour générer la table des
              matières
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
