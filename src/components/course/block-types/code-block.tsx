"use client";

import { Textarea } from "@/src/components/ui/textarea";
import { Card } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface CodeBlockProps {
  content: string;
  onChange: (content: string) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
  isPreview?: boolean;
}

export function CodeBlock({
  content,
  onChange,
  language = "javascript",
  onLanguageChange,
  isPreview = false,
}: CodeBlockProps) {
  if (isPreview) {
    return (
      <div className="relative">
        <div className="absolute right-2 top-2 text-sm text-muted-foreground">
          {language}
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{content || "// Aucun code"}</code>
        </pre>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Label>Bloc de code</Label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Langage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Saisissez votre code ici..."
        className="font-mono min-h-[200px]"
      />
    </Card>
  );
}
