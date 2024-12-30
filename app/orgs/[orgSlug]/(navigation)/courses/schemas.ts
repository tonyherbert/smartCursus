import { z } from "zod";

export const DraftContentSchema = z.object({
  blocks: z.array(
    z.object({
      key: z.string(),
      text: z.string(),
      type: z.string(),
      depth: z.number(),
      inlineStyleRanges: z
        .array(
          z.object({
            offset: z.number(),
            length: z.number(),
            style: z.string(),
          }),
        )
        .optional(),
      entityRanges: z.array(z.any()).optional(),
      data: z.record(z.any()).optional(),
    }),
  ),
  entityMap: z.record(z.any()),
});

const SubsectionContentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("TEXT"),
    content: z.object({
      blocks: z.array(z.any()),
      entityMap: z.record(z.any()),
    }),
  }),
  z.object({
    type: z.literal("VIDEO"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("EXERCISE"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("QUIZ"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("UPLOAD"),
    content: z.instanceof(File),
  }),
]);

const SubsectionSchema = z.object({
  type: z.enum(["TEXT", "VIDEO", "EXERCISE", "QUIZ", "UPLOAD"]),
  content: SubsectionContentSchema,
  order: z.number(),
});

const SectionSchema = z.object({
  title: z.string().min(1, "Le titre de la section est requis"),
  order: z.number(),
  subsections: z.array(SubsectionSchema),
});

const ChapterSchema = z.object({
  title: z.string().min(1, "Le titre du chapitre est requis"),
  order: z.number(),
  sections: z.array(SectionSchema),
});

export const CreateCourseSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  description: z.string().optional(),
  content: z.string().optional(),
  subjectId: z.string().optional(),
});
export const EditCourseSchema = z.object({
  courseId: z.string(),
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  description: z.string().optional(),
  content: z.string().min(1, "Le contenu ne peut pas être vide"),
  subjectId: z.string().optional(),
});
