"use server";

import { action } from "@/src/lib/actions/safe-actions";
import { auth } from "@/src/lib/auth/helper";
import { env } from "@/src/lib/env";
import { sendEmail } from "@/src/lib/mail/sendEmail";
import { prisma } from "@/src/lib/prisma";
import { ContactFeedbackSchema } from "./contact-feedback.schema";

export const contactSupportAction = action
  .schema(ContactFeedbackSchema)
  .action(async ({ parsedInput: data }) => {
    const user = await auth();

    const email = user?.email ?? data.email;

    const feedback = await prisma.feedback.create({
      data: {
        message: data.message,
        review: Number(data.review) || 0,
        userId: user?.id,
        email,
      },
    });

    await sendEmail({
      to: env.NEXT_PUBLIC_EMAIL_CONTACT,
      subject: `New feedback from ${email}`,
      text: `Review: ${feedback.review}\n\nMessage: ${feedback.message}`,
      replyTo: email,
    });

    return { message: "Your feedback has been sent to support." };
  });
