"use client";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Card } from "@/src/components/ui/card";
import { useBuilderStore } from "@/src/lib/stores/builder-store";
import { courseTemplates, contentLayouts } from "@/src/lib/templates";
import {
  BookOpen,
  Target,
  FileText,
  PenTool,
  ClipboardCheck,
  Library,
  FileCheck,
  Layout,
} from "lucide-react";

const sectionIcons = {
  introduction: BookOpen,
  objectives: Target,
  content: FileText,
  practice: PenTool,
  assessment: ClipboardCheck,
  resources: Library,
  summary: FileCheck,
};

export function SectionTemplates() {
  const { addSection } = useBuilderStore();

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold">Sections pédagogiques</h2>
        <p className="text-sm text-muted-foreground">
          Structurez votre cours avec des sections adaptées
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Sections principales */}
          <div className="space-y-3">
            {Object.entries(courseTemplates).map(([type, template]) => {
              const Icon = sectionIcons[type as keyof typeof sectionIcons];

              return (
                <Card
                  key={type}
                  className="p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => addSection(template)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{template.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Layouts de contenu */}
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-3 px-1">
              Layouts de contenu
            </h3>
            <div className="space-y-3">
              {Object.entries(contentLayouts).map(([key, layout]) => (
                <Card
                  key={key}
                  className="p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() =>
                    addSection({
                      id: Math.random().toString(36).substr(2, 9),
                      type: "content",
                      title: layout.title,
                      description: layout.description,
                      layout: layout.layout,
                      columnCount: layout.columnCount,
                      components: [],
                    })
                  }
                >
                  <div className="flex items-start space-x-3">
                    <Layout className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{layout.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {layout.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
