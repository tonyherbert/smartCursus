"use client";

import { useEffect, useState } from "react";
import { getCourseFromStorage } from "@/src/lib/local-storage";
import { CourseViewer } from "@/src/components/course/course-viewer";
import { deserializeCourseContent } from "@/src/lib/serialization/course";
import { BuilderSection } from "@/src/types/builder";
import { CourseMetadata } from "@/src/types/course";
import { ExportPDFButton } from "./pdf/export-pdf-button";

interface CoursePageClientProps {
  id: string;
}

export function CoursePageClient({ id }: CoursePageClientProps) {
  const [sections, setSections] = useState<BuilderSection[]>([]);
  const [metadata, setMetadata] = useState<CourseMetadata>({
    title: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const course = getCourseFromStorage(id);
    if (course) {
      try {
        const content = deserializeCourseContent(course.content);
        setMetadata(content.metadata);
        setSections(content.sections);
        setError(null);
      } catch (err) {
        setError("Impossible de charger le cours");
        console.error("Error loading course:", err);
      }
    } else {
      setError("Cours non trouvé");
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-2">
              {error}
            </h1>
            <p className="text-muted-foreground">
              Le cours que vous recherchez n'existe pas ou n'est plus
              disponible.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{metadata.title}</h1>
          <ExportPDFButton metadata={metadata} sections={sections} />
        </div>
      </header>
      <main className="container py-8">
        <CourseViewer sections={sections} />
      </main>
    </div>
  );
}
