"use client";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { BuilderSection, BuilderComponent } from "@/src/types/builder";
import { cn } from "@/src/lib/utils";
import { Info, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface CourseViewerProps {
  sections: BuilderSection[];
}

const CalloutIcon = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

export function CourseViewer({ sections }: CourseViewerProps) {
  const renderComponent = (component: BuilderComponent) => {
    const { style = {} } = component.props;

    const baseStyles = cn(
      style.bold && "font-bold",
      style.italic && "italic",
      style.underline && "underline",
      style.align === "center" && "text-center",
      style.align === "right" && "text-right",
      style.color,
    );

    switch (component.type) {
      case "heading": {
        const headingStyles = {
          1: "text-4xl font-bold mb-6",
          2: "text-3xl font-bold mb-5",
          3: "text-2xl font-bold mb-4",
          4: "text-xl font-bold mb-3",
          5: "text-lg font-bold mb-2",
          6: "text-base font-bold mb-2",
        };

        const level = component.props.level || 1;
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;

        return (
          <Tag
            className={cn(
              headingStyles[level as keyof typeof headingStyles],
              baseStyles,
            )}
          >
            {component.props.content || "Sans titre"}
          </Tag>
        );
      }

      case "paragraph":
        return (
          <p className={cn("mb-4 leading-relaxed", baseStyles)}>
            {component.props.content || "Aucun contenu"}
          </p>
        );

      case "code":
        return (
          <div className="mb-4">
            <div className="bg-muted px-4 py-2 rounded-t-lg text-sm text-muted-foreground flex items-center justify-between">
              <span>{component.props.language || "javascript"}</span>
            </div>
            <pre className="bg-muted p-4 rounded-b-lg overflow-x-auto">
              <code className="text-sm font-mono">
                {component.props.content || "// Aucun code"}
              </code>
            </pre>
          </div>
        );

      case "callout": {
        const type = component.props.type || "info";
        const Icon = CalloutIcon[type as keyof typeof CalloutIcon];

        const calloutStyles = {
          info: "bg-blue-50 border-blue-200 text-blue-800",
          warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
          error: "bg-red-50 border-red-200 text-red-800",
          success: "bg-green-50 border-green-200 text-green-800",
        };

        return (
          <div
            className={cn("mb-4 p-4 rounded-lg border", calloutStyles[type])}
          >
            <div className="flex items-center gap-2 font-semibold mb-2">
              <Icon className="h-5 w-5" />
              {component.props.title || "Note"}
            </div>
            <p>{component.props.content || "Aucun contenu"}</p>
          </div>
        );
      }

      case "image":
        return (
          <figure className="mb-4">
            {component.props.src && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={component.props.src}
                  alt={component.props.alt || ""}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            {component.props.caption && (
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                {component.props.caption}
              </figcaption>
            )}
          </figure>
        );

      case "list": {
        const items = component.props.content
          ? JSON.parse(component.props.content)
          : [];
        return (
          <ul className={cn("list-disc pl-6 mb-4 space-y-2", baseStyles)}>
            {items.map((item: string, index: number) => (
              <li key={index}>{item || "Élément vide"}</li>
            ))}
          </ul>
        );
      }

      default:
        return null;
    }
  };

  const renderSection = (section: BuilderSection) => {
    const gridCols = section.columnCount
      ? {
          2: "md:grid-cols-2",
          3: "md:grid-cols-3",
          4: "md:grid-cols-4",
        }[section.columnCount]
      : "";

    return (
      <div
        className={cn(
          "w-full",
          section.layout === "columns" && `grid grid-cols-1 ${gridCols} gap-8`,
          section.layout === "hero" &&
            "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
        )}
      >
        {section.components.map((component) => (
          <div key={component.id}>{renderComponent(component)}</div>
        ))}
      </div>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="prose prose-slate max-w-none dark:prose-invert p-8">
        {sections.map((section) => (
          <div key={section.id} className="mb-12">
            {renderSection(section)}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
