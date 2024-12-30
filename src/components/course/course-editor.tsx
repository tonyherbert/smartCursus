"use client";

import { CourseMetadata } from "./course-metadata";
import { CourseContent } from "./course-content";
import { CourseHeader } from "./editor/course-header";
import { EditorLayout } from "./editor/editor-layout";
import { useCourseEditor } from "./editor/use-course-editor";

export function CourseEditor() {
  const {
    isPreview,
    isSaving,
    metadata,
    handleMetadataUpdate,
    handleSave,
    togglePreview,
  } = useCourseEditor();

  return (
    <div className="h-screen flex flex-col bg-[hsl(var(--background-light))]">
      <CourseHeader
        title={metadata.title}
        isPreview={isPreview}
        isSaving={isSaving}
        onPreviewToggle={togglePreview}
        onSave={handleSave}
        onMetadataUpdate={handleMetadataUpdate}
      />

      <div className="flex-1 overflow-hidden">
        <EditorLayout isPreview={isPreview}>
          <div className="space-y-8">
            <CourseMetadata
              metadata={metadata}
              onChange={handleMetadataUpdate}
              isPreview={isPreview}
            />
            <CourseContent isPreview={isPreview} />
          </div>
        </EditorLayout>
      </div>
    </div>
  );
}
