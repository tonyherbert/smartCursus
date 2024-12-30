"use client";

import { Eye, Edit2, Save } from "lucide-react";
import { TestContentButton } from "../test-content-button";
import { Button } from "../../ui/button";
import { CourseMetadata } from "@/app/types/course";

interface CourseHeaderProps {
  title: string;
  isPreview: boolean;
  isSaving: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  onMetadataUpdate: (metadata: CourseMetadata) => void;
}

export function CourseHeader({
  title,
  isPreview,
  isSaving,
  onPreviewToggle,
  onSave,
  onMetadataUpdate,
}: CourseHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center px-4 justify-between">
        <h1 className="text-lg font-semibold">{title || "Nouveau Cours"}</h1>
        <div className="flex items-center space-x-4">
          <TestContentButton onMetadataUpdate={onMetadataUpdate} />
          <Button variant="outline" size="sm" onClick={onPreviewToggle}>
            {isPreview ? (
              <>
                <Edit2 className="h-4 w-4 mr-2" />
                Mode édition
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Prévisualiser
              </>
            )}
          </Button>
          <Button onClick={onSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </header>
  );
}
