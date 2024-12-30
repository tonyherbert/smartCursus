"use client";

import { Button } from "@/src/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import * as Icons from "lucide-react";
import { SectionTemplate } from "@/src/lib/templates/section-templates";
import { cn } from "@/src/lib/utils";

interface SectionTemplateItemProps {
  template: SectionTemplate;
  onClick: () => void;
  isCompact?: boolean;
}

export function SectionTemplateItem({
  template,
  onClick,
  isCompact = false,
}: SectionTemplateItemProps) {
  const Icon = Icons[template.icon as keyof typeof Icons];

  const content = (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      <span>{template.title}</span>
    </div>
  );

  if (isCompact) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={onClick}
      >
        {content}
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start p-4 h-auto",
            "hover:border-primary/50",
          )}
          onClick={onClick}
        >
          <div className="flex flex-col items-start gap-1">
            {content}
            <p className="text-sm text-muted-foreground font-normal">
              {template.description}
            </p>
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs">
        <p>{template.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
