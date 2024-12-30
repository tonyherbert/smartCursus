"use server";

import { orgAction } from "@/src/lib/actions/safe-actions";
import { createCourseQuery } from "../query/course-create-query";
import { CreateCourseSchema } from "../schemas";

export const createCourseAction = orgAction
  .metadata({
    roles: ["OWNER", "ADMIN"],
  })
  .schema(CreateCourseSchema)
  .action(async ({ parsedInput, ctx }) => {
    console.log("Context organization:", ctx.org);
    console.log("Parsed input:", parsedInput);

    try {
      const course = await createCourseQuery({
        title: parsedInput.title,
        content: parsedInput.content ?? "",
        description: parsedInput.description ?? "",
        subjectId: parsedInput.subjectId,
        organizationId: ctx.org.id,
      });

      console.log("Created course:", course);
      return course;
    } catch (error) {
      console.error("Erreur détaillée:", error);

      if (error instanceof Error) {
        throw new Error(
          `Erreur lors de la création du cours : ${error.message}`,
          { cause: error },
        );
      }
      throw new Error("Erreur lors de la création du cours", { cause: error });
    }
  });
