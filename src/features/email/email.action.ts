"use server";

import { ActionError, action } from "@/src/lib/actions/safe-actions";
import { setupResendCustomer } from "@/src/lib/auth/auth-config-setup";
import { prisma } from "@/src/lib/prisma";
import { EmailActionSchema } from "./email.schema";

export const addEmailAction = action
  .schema(EmailActionSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const userData = {
        email,
      };

      const resendContactId = await setupResendCustomer(userData);

      await prisma.user.create({
        data: {
          ...userData,
          resendContactId,
        },
      });

      return { email };
    } catch {
      throw new ActionError("The email is already in use");
    }
  });
