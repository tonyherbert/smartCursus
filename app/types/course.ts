export interface CourseMetadata {
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}