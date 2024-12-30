"use client";

import { Card } from "@/src/components/ui/card";
import { StoredCourse } from "@/src/lib/local-storage";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface CourseListProps {
  courses: StoredCourse[];
}

export function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Aucun cours</h2>
        <p className="text-muted-foreground">
          Commencez par créer votre premier cours
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Link key={course.id} href={`/courses/${course.id}`}>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">
                {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {course.metadata.title}
            </h2>
            {course.metadata.description && (
              <p className="text-muted-foreground">
                {course.metadata.description}
              </p>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}
