"use client";

import { Textarea } from "@/src/components/ui/textarea";
import { Card } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";

interface TextBlockProps {
  content: string;
  onChange: (content: string) => void;
  isPreview?: boolean;
}

export function TextBlock({
  content,
  onChange,
  isPreview = false,
}: TextBlockProps) {
  if (isPreview) {
    return <div className="text-lg">{content || "Aucun contenu"}</div>;
  }

  return (
    <Card className="p-4">
      <Label>Bloc de texte</Label>
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Saisissez votre texte ici..."
        className="mt-2 min-h-[150px]"
      />
    </Card>
  );
}
