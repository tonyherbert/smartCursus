"use client";

import { CoursePageClient } from "@/src/components/course/course-page-client";

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CoursePageClient id={params.id} />;
}
