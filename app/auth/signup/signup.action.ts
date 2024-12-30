"use server";

import { ActionError, action } from "@/src/lib/actions/safe-actions";
import {
  setupDefaultOrganizationsOrInviteUser,
  setupResendCustomer,
} from "@/src/lib/auth/auth-config-setup";
import {
  hashStringWithSalt,
  validatePassword,
} from "@/src/lib/auth/credentials-provider";
import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";
import { LoginCredentialsFormScheme } from "./signup.schema";

export const signUpAction = action
  .schema(LoginCredentialsFormScheme)
  .action(async ({ parsedInput: { email, password, name } }) => {
    if (!validatePassword(password)) {
      throw new ActionError(
        "Invalid new password. Must be at least 8 characters, and contain at least one letter and one number",
      );
    }

    try {
      const userData = {
        email,
        passwordHash: hashStringWithSalt(password, env.NEXTAUTH_SECRET),
        name,
      };

      const resendContactId = await setupResendCustomer(userData);

      const user = await prisma.user.create({
        data: {
          ...userData,
          resendContactId,
        },
      });

      await setupDefaultOrganizationsOrInviteUser(user);

      return user;
    } catch {
      throw new ActionError("Email already exists");
    }
  });
