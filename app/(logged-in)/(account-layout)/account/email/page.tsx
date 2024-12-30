import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ContactSupportDialog } from "@/src/features/contact/support/contact-support-dialog";
import { requiredAuth } from "@/src/lib/auth/helper";
import { env } from "@/src/lib/env";
import { resend } from "@/src/lib/mail/resend";
import { combineWithParentMetadata } from "@/src/lib/metadata";
import { ToggleEmailCheckbox } from "./toggle-email-checkbox";

export const generateMetadata = combineWithParentMetadata({
  title: "Email",
  description: "Update your email notifications settings.",
});

export default async function MailProfilePage() {
  const user = await requiredAuth();

  if (!user.resendContactId) {
    return <ErrorComponent />;
  }

  if (!env.RESEND_AUDIENCE_ID) {
    return <ErrorComponent />;
  }

  const { data: resendUser } = await resend.contacts.get({
    audienceId: env.RESEND_AUDIENCE_ID,
    id: user.resendContactId,
  });

  if (!resendUser) {
    return <ErrorComponent />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mail settings</CardTitle>
        <CardDescription>
          Update your email notifications settings to match your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToggleEmailCheckbox unsubscribed={resendUser.unsubscribed} />
      </CardContent>
    </Card>
  );
}

const ErrorComponent = () => {
  return (
    <Card variant="error">
      <CardHeader>
        <CardTitle>Resend not found</CardTitle>
        <CardDescription>
          We couldn't find your Resend contact. Please contact support.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <ContactSupportDialog />
      </CardFooter>
    </Card>
  );
};
