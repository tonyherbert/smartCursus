"use client";

import { BuilderCanvas } from "../builder/BuilderCanvas";
import { CourseViewer } from "./course-viewer";
import { useBuilderStore } from "@/app/lib/stores/builder-store";

interface CourseContentProps {
  isPreview: boolean;
}

export function CourseContent({ isPreview }: CourseContentProps) {
  const sections = useBuilderStore((state) => state.sections);

  return (
    <div className="space-y-8">
      {isPreview ? (
        <CourseViewer sections={sections} />
      ) : (
        <BuilderCanvas isPreview={false} />
      )}
    </div>
  );
}
