"use client";

import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";

interface CalloutBlockProps {
  title: string;
  content: string;
  type: "info" | "warning" | "error" | "success";
  isPreview?: boolean;
  isSelected?: boolean;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  onTypeChange?: (type: "info" | "warning" | "error" | "success") => void;
}

const calloutStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  error: "bg-red-50 border-red-200 text-red-800",
  success: "bg-green-50 border-green-200 text-green-800",
};

const CalloutIcon = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

export function CalloutBlock({
  title = "",
  content = "",
  type = "info",
  isPreview = false,
  isSelected = false,
  onTitleChange,
  onContentChange,
  onTypeChange,
}: CalloutBlockProps) {
  const Icon = CalloutIcon[type];

  if (isPreview) {
    return (
      <div className={cn("mb-4 p-4 rounded-lg border", calloutStyles[type])}>
        <div className="flex items-center gap-2 font-semibold mb-2">
          <Icon className="h-5 w-5" />
          {title || "Sans titre"}
        </div>
        <p>{content || "Aucun contenu"}</p>
      </div>
    );
  }

  return (
    <Card className={cn("p-4", isSelected && "ring-2 ring-primary")}>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Information</SelectItem>
              <SelectItem value="warning">Avertissement</SelectItem>
              <SelectItem value="error">Erreur</SelectItem>
              <SelectItem value="success">Succès</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            placeholder="Titre du callout"
          />
        </div>
        <Textarea
          value={content}
          onChange={(e) => onContentChange?.(e.target.value)}
          placeholder="Contenu du callout..."
          className="min-h-[100px] resize-y"
        />
      </div>
    </Card>
  );
}
