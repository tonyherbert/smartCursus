"use client";

import { HeadingBlock } from "./blocks/HeadingBlock";
import { ParagraphBlock } from "./blocks/ParagraphBlock";
import { CodeBlock } from "./blocks/CodeBlock";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { ListBlock } from "./blocks/ListBlock";
import { useBuilderStore } from "../../../app/lib/stores/builder-store";
import { DeleteButton } from "./DeleteButton";
import { BuilderComponent } from "@/app/types/builder";
import { cn } from "@/app/lib/utils";

interface BuilderBlockProps {
  sectionId: string;
  component: BuilderComponent;
  isSelected?: boolean;
  isPreview?: boolean;
  onSelect?: (e: React.MouseEvent) => void;
  onUpdate?: (updates: Partial<BuilderComponent>) => void;
}

export function BuilderBlock({
  sectionId,
  component,
  isSelected = false,
  isPreview = false,
  onSelect,
  onUpdate,
}: BuilderBlockProps) {
  const { updateComponent, deleteComponent } = useBuilderStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(e);
  };

  const updateProps = (updates: Record<string, any>) => {
    if (onUpdate) {
      onUpdate({
        ...component,
        props: {
          ...component.props,
          ...updates,
        },
      });
    }
  };

  function renderComponent() {
    const blockProps = {
      ...component.props,
      isPreview,
      isSelected,
      onChange: (content: string) => updateProps({ content }),
      onStyleChange: (style: any) => updateProps({ style }),
    };

    switch (component.type) {
      case "heading":
        return (
          <HeadingBlock
            {...blockProps}
            content={component.props.content || ""}
            level={component.props.level || 1}
            style={component.props.style || {}}
            onLevelChange={(level) => updateProps({ level })}
          />
        );
      case "paragraph":
        return (
          <ParagraphBlock
            {...blockProps}
            content={component.props.content || ""}
            style={component.props.style || {}}
          />
        );
      case "code":
        return (
          <CodeBlock
            {...blockProps}
            content={component.props.content || ""}
            language={component.props.language || "javascript"}
            onLanguageChange={(language) => updateProps({ language })}
          />
        );
      case "callout":
        return (
          <CalloutBlock
            {...blockProps}
            title={component.props.title || ""}
            content={component.props.content || ""}
            type={component.props.type || "info"}
            onTitleChange={(title) => updateProps({ title })}
            onContentChange={(content) => updateProps({ content })}
            onTypeChange={(type) => updateProps({ type })}
          />
        );
      case "image":
        return (
          <ImageBlock
            {...blockProps}
            src={component.props.src || ""}
            alt={component.props.alt || ""}
            caption={component.props.caption}
            width={component.props.width}
            height={component.props.height}
            maintainAspectRatio={component.props.maintainAspectRatio}
            onSrcChange={(src) => updateProps({ src })}
            onAltChange={(alt) => updateProps({ alt })}
            onCaptionChange={(caption) => updateProps({ caption })}
            onWidthChange={(width) => updateProps({ width })}
            onHeightChange={(height) => updateProps({ height })}
            onMaintainAspectRatioChange={(maintain) =>
              updateProps({ maintainAspectRatio: maintain })
            }
          />
        );
      case "list":
        return (
          <ListBlock
            {...blockProps}
            items={component.props.items || []}
            onItemsChange={(items) => updateProps({ items })}
          />
        );
      default:
        return null;
    }
  }

  if (isPreview) {
    return renderComponent();
  }

  return (
    <div
      className={cn(
        "relative group",
        isSelected && "ring-2 ring-primary rounded-lg",
      )}
      onClick={handleClick}
    >
      <DeleteButton
        onDelete={() => deleteComponent(sectionId, component.id)}
        title="Supprimer le composant"
        description="Êtes-vous sûr de vouloir supprimer ce composant ? Cette action est irréversible."
      />
      {renderComponent()}
    </div>
  );
}
