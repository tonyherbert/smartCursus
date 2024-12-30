"use client";

import { BuilderSection } from "@/src/types/builder";
import { CourseMetadata } from "@/src/types/course";

export interface SerializedCourse {
  metadata: CourseMetadata;
  sections: BuilderSection[];
}

export function serializeCourseContent(
  metadata: CourseMetadata,
  sections: BuilderSection[],
): string {
  const content: SerializedCourse = {
    metadata,
    sections,
  };
  return JSON.stringify(content, null, 2); // Pretty print for debugging
}

export function deserializeCourseContent(json: string): SerializedCourse {
  try {
    return JSON.parse(json) as SerializedCourse;
  } catch (error) {
    console.error("Failed to deserialize course content:", error);
    return {
      metadata: { title: "", description: "" },
      sections: [],
    };
  }
}
