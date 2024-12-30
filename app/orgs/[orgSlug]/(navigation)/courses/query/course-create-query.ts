import { prisma } from "@/src/lib/prisma";
import { log } from "console";
type CreateCourseInput = {
  title: string;
  description: string;
  content: string;
  subjectId?: string;
  organizationId: string;
};

export const createCourseQuery = async (input: CreateCourseInput) => {
  console.log("Context organization:", input.organizationId);
  const organization = await prisma.organization.findUnique({
    where: { id: input.organizationId },
  });

  if (!organization) {
    throw new Error("Organisation introuvable");
  }
  console.log("////////// data:", input);

  const course = await prisma.course.create({
    data: {
      title: input.title,
      description: input.description,
      content: input.content,
      subjectId: input.subjectId,
      organizationId: input.organizationId,
    },
  });
  console.log("////////// course:", course);

  return course;
};
