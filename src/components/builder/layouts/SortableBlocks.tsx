"use client";

import { BuilderComponent } from "@/app/types/builder";
import { BuilderBlock } from "../BuilderBlock";
import { cn } from "@/app/lib/utils";
import { BuilderToolbar } from "../BuilderToolbar";
import { useBuilderStore } from "@/app/lib/stores/builder-store";

interface BlocksListProps {
  sectionId: string;
  components: BuilderComponent[];
  selectedComponentId?: string | null;
  onComponentSelect?: (id: string) => void;
  layout?: "full" | "columns" | "hero";
  columnCount?: number;
}

export function BlocksList({
  sectionId,
  components,
  selectedComponentId,
  onComponentSelect,
  layout = "full",
  columnCount = 2,
}: BlocksListProps) {
  const addComponent = useBuilderStore((state) => state.addComponent);

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "grid gap-4",
          layout === "columns" &&
            columnCount && {
              "grid-cols-1": true,
              "md:grid-cols-2": columnCount === 2,
              "md:grid-cols-3": columnCount === 3,
              "md:grid-cols-4": columnCount === 4,
            },
          layout === "hero" && "grid-cols-1 md:grid-cols-2 items-center",
          layout === "full" && "grid-cols-1",
        )}
      >
        {components.map((component) => (
          <div key={component.id} className="w-full">
            <BuilderBlock
              sectionId={sectionId}
              component={component}
              isSelected={component.id === selectedComponentId}
              onSelect={() => onComponentSelect?.(component.id)}
              onUpdate={(updates) => {
                const updatedComponent = { ...component, ...updates };
                useBuilderStore
                  .getState()
                  .updateComponent(sectionId, component.id, updatedComponent);
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <BuilderToolbar
          onAdd={(type) => addComponent(type)}
          variant="ghost"
          size="sm"
        />
      </div>
    </div>
  );
}
