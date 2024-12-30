"use server";

import { orgAction } from "@/src/lib/actions/safe-actions";
import { sendEmail } from "@/src/lib/mail/sendEmail";
import { deleteOrganizationQuery } from "@/src/query/org/org-delete.query";
import OrgConfirmDeletionEmail from "@email/org-confirm-deletion.email";

export const organizationDeleteAction = orgAction
  .metadata({ roles: ["OWNER"] })
  .action(async ({ ctx }) => {
    await deleteOrganizationQuery(ctx.org.id);

    await sendEmail({
      subject: `Your organization has been deleted (${ctx.org.slug})`,
      to: ctx.user.email,
      react: OrgConfirmDeletionEmail({
        org: ctx.org.name,
      }),
    });
  });
