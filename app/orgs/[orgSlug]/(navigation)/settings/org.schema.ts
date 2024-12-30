import { RESERVED_SLUGS } from "@/src/lib/organizations/reserved-slugs";
import { OrganizationMembershipRole } from "@prisma/client";
import { z } from "zod";

/**
 * Warning
 * The schema here is used in settings.action.ts with `z.union`
 * You should never make all properties optional in a union schema
 * because `union` will always return the first schema that matches
 * So if you make all properties optional, the first schema will always match
 * and the second schema will never be used
 */
export const OrgDetailsFormSchema = z.object({
  // This field need to be here not in DangerFormSchema
  // slug: z.string().refine((v) => !RESERVED_SLUGS.includes(v), {
  //   message: "This organization slug is reserved",
  // }),
  name: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
});

export const OrgMemberFormSchema = z.object({
  members: z.array(
    z.object({
      id: z.string(),
      roles: z.array(z.nativeEnum(OrganizationMembershipRole)),
    }),
  ),
});

export const OrgDangerFormSchema = z.object({
  // We can add live check for slug availability
  slug: z.string().refine((v) => !RESERVED_SLUGS.includes(v), {
    message: "This organization slug is reserved",
  }),
});

export type OrgDetailsFormSchemaType = z.infer<typeof OrgDetailsFormSchema>;
export type OrgMemberFormSchemaType = z.infer<typeof OrgMemberFormSchema>;
export type OrgDangerFormSchemaType = z.infer<typeof OrgDangerFormSchema>;
