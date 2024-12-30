"use client";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { CourseMetadata } from "@/src/types/course";

interface CourseMetadataProps {
  metadata: CourseMetadata;
  onChange: (metadata: CourseMetadata) => void;
  isPreview: boolean;
}

export function CourseMetadata({
  metadata,
  onChange,
  isPreview,
}: CourseMetadataProps) {
  if (isPreview) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{metadata.title || "Sans titre"}</h1>
        <p className="text-lg text-muted-foreground">
          {metadata.description || "Aucune description"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du cours</Label>
        <Input
          id="title"
          value={metadata.title}
          onChange={(e) => onChange({ ...metadata, title: e.target.value })}
          placeholder="Entrez le titre du cours"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={metadata.description}
          onChange={(e) =>
            onChange({ ...metadata, description: e.target.value })
          }
          placeholder="Décrivez brièvement le cours"
        />
      </div>
    </div>
  );
}
