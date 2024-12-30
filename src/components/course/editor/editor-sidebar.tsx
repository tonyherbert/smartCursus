"use client";

import { useBuilderStore } from "@/app/lib/stores/builder-store";
import { ComponentsPanel } from "../components-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { SectionTemplatesPanel } from "../../builder/section-templates/SectionTemplatesPanel";

export function EditorSidebar() {
  const addSection = useBuilderStore((state) => state.addSection);

  return (
    <Tabs defaultValue="sections">
      <TabsList className="w-full">
        <TabsTrigger value="sections" className="flex-1">
          Sections
        </TabsTrigger>
        <TabsTrigger value="components" className="flex-1">
          Composants
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sections" className="h-[calc(100vh-8rem)]">
        <SectionTemplatesPanel onAddSection={addSection} />
      </TabsContent>
      <TabsContent value="components" className="h-[calc(100vh-8rem)]">
        <ComponentsPanel />
      </TabsContent>
    </Tabs>
  );
}
