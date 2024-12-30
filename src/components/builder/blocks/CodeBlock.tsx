"use client";

import { Card } from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";

interface CodeBlockProps {
  content: string;
  language: string;
  isPreview?: boolean;
  isSelected?: boolean;
  onChange?: (content: string) => void;
  onLanguageChange?: (language: string) => void;
}

export function CodeBlock({
  content,
  language = "javascript",
  isPreview = false,
  isSelected = false,
  onChange,
  onLanguageChange,
}: CodeBlockProps) {
  if (isPreview) {
    return (
      <div className="relative mb-4">
        <div className="absolute right-2 top-2 text-sm text-muted-foreground">
          {language}
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{content || "// Code"}</code>
        </pre>
      </div>
    );
  }

  return (
    <Card className={cn("p-4", isSelected && "ring-2 ring-primary")}>
      <div className="flex gap-4 mb-2">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Langage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Saisissez votre code ici..."
        className="font-mono min-h-[200px] resize-y"
      />
    </Card>
  );
}
