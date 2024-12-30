import { Alert } from "@/src/components/ui/alert";
import { buttonVariants } from "@/src/components/ui/button";
import { Typography } from "@/src/components/ui/typography";
import { BaseLayout } from "@/src/features/layout/base-layout";
import { Layout } from "@/src/features/page/layout";
import { auth } from "@/src/lib/auth/helper";
import type { LayoutParams } from "@/src/types/next";
import { Rabbit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AccountNavigation } from "./account-navigation";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings.",
};

export default async function RouteLayout(props: LayoutParams) {
  const user = await auth();

  if (!user) {
    return (
      <BaseLayout>
        <Layout>
          <Alert>
            <Rabbit className="size-4" />
            <div>
              <Typography variant="large">
                It looks like you are not logged in. Please sign in to access
                your account settings.
              </Typography>
              <Link
                href="/auth/signin"
                className={buttonVariants({
                  className: "mt-2",
                })}
              >
                Sign in
              </Link>
            </div>
          </Alert>
        </Layout>
      </BaseLayout>
    );
  }

  return (
    <div>
      <AccountNavigation emailVerified={Boolean(user.emailVerified)}>
        {props.children}
      </AccountNavigation>
    </div>
  );
}
