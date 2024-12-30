"use client";

import { Button } from "../ui/button";
import { Beaker } from "lucide-react";
import { useBuilderStore } from "@/app/lib/stores/builder-store";
import {
  sampleMetadata,
  sampleSections,
} from "@/app/lib/test-data/sample-course";

interface TestContentButtonProps {
  onMetadataUpdate: (metadata: typeof sampleMetadata) => void;
}

export function TestContentButton({
  onMetadataUpdate,
}: TestContentButtonProps) {
  const { sections, addSection } = useBuilderStore();

  const loadTestContent = () => {
    // Update metadata
    onMetadataUpdate(sampleMetadata);

    // Add sample sections
    sampleSections.forEach((section) => {
      addSection(section);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={loadTestContent}
      className="gap-2"
    >
      <Beaker className="h-4 w-4" />
      Contenu test
    </Button>
  );
}
