"use client";

import { BuilderComponent } from "@/src/types/builder";
import { BuilderBlock } from "../BuilderBlock";
import { cn } from "@/src/lib/utils";

interface HeaderLayoutProps {
  components: BuilderComponent[];
  isPreview?: boolean;
  selectedComponentId?: string | null;
  onComponentSelect?: (id: string) => void;
  onUpdateComponent?: (id: string, updates: Partial<BuilderComponent>) => void;
}

export function HeaderLayout({
  components,
  isPreview = false,
  selectedComponentId,
  onComponentSelect,
  onUpdateComponent,
}: HeaderLayoutProps) {
  const leftComponents = components.filter((c) => c.props.position === "left");
  const centerComponents = components.filter(
    (c) => c.props.position === "center",
  );
  const rightComponents = components.filter(
    (c) => c.props.position === "right",
  );

  const renderColumn = (components: BuilderComponent[], justify: string) => (
    <div className={cn("flex items-center gap-4", justify)}>
      {components.map((component) => (
        <div
          key={component.id}
          className={cn(
            "flex-none",
            !isPreview && "hover:ring-2 hover:ring-primary/20 rounded-md",
          )}
        >
          <BuilderBlock
            component={component}
            isPreview={isPreview}
            isSelected={component.id === selectedComponentId}
            onSelect={() => onComponentSelect?.(component.id)}
            onUpdate={(updates) => onUpdateComponent?.(component.id, updates)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-4 w-full",
        "items-center py-4",
        !isPreview && "border rounded-lg bg-background/50 p-4",
      )}
    >
      {renderColumn(leftComponents, "justify-start")}
      {renderColumn(centerComponents, "justify-center")}
      {renderColumn(rightComponents, "justify-end")}
    </div>
  );
}
