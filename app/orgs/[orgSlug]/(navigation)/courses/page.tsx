import { CourseList } from "@/src/components/course/course-list";

export default async function Page() {
  // Supposons que vous récupérez le contenu de l'éditeur depuis une base de données ou une API
  let courses = [];
  return (
    <div>
      <h1>Éditeur de cours</h1>
      <CourseList courses={courses} />
    </div>
  );
}
