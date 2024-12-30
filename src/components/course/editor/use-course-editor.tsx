"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CourseMetadata } from "@/app/types/course";
import { useToast } from "../../ui/use-toast";
import { useBuilderStore } from "@/app/lib/stores/builder-store";
import { serializeCourseContent } from "@/app/lib/serialization/course";
import { saveCourseToStorage } from "@/app/lib/local-storage";

export function useCourseEditor() {
  const [isPreview, setIsPreview] = useState(false);
  const [metadata, setMetadata] = useState<CourseMetadata>({
    title: "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const sections = useBuilderStore((state) => state.sections);

  const handleMetadataUpdate = useCallback((newMetadata: CourseMetadata) => {
    setMetadata(newMetadata);
  }, []);

  const handleSave = useCallback(async () => {
    if (!metadata.title) {
      toast({
        title: "Titre requis",
        description: "Veuillez saisir un titre pour le cours",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const courseContent = serializeCourseContent(metadata, sections);
      const savedCourse = saveCourseToStorage(courseContent);

      toast({
        title: "Cours enregistré",
        description: "Votre cours a été enregistré avec succès.",
      });
      router.push("/courses");
    } catch (error) {
      console.error("Error saving course:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [metadata, sections, router, toast]);

  const togglePreview = useCallback(() => {
    setIsPreview((prev) => !prev);
  }, []);

  return {
    isPreview,
    isSaving,
    metadata,
    handleMetadataUpdate,
    handleSave,
    togglePreview,
  };
}
