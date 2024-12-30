"use server";

import { authAction } from "@/src/lib/actions/safe-actions";
import { put } from "@vercel/blob";
import { z } from "zod";

export const uploadImageAction = authAction
  .schema(
    z.object({
      formData: z.instanceof(FormData),
    }),
  )
  .action(async ({ parsedInput: props }) => {
    const file = props.formData.get("file") as File;
    const filename = file.name;
    const blob = await put(filename, file, {
      access: "public",
    });

    return { url: blob.url };
  });
