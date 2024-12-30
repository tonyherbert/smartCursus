import { Alert } from "@/src/components/ui/alert";
import { buttonVariants } from "@/src/components/ui/button";
import { Typography } from "@/src/components/ui/typography";
import { NavigationWrapper } from "@/src/features/navigation/navigation-wrapper";
import { Layout } from "@/src/features/page/layout";
import { auth } from "@/src/lib/auth/helper";
import { getCurrentOrgCache } from "@/src/lib/react/cache";
import type { LayoutParams } from "@/src/types/next";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import { OrgNavigation } from "./_navigation/org-navigation";

export default async function RouteLayout(
  props: LayoutParams<{ orgSlug: string }>,
) {
  const org = await getCurrentOrgCache();
  const params = await props.params;

  if (!org) {
    const user = await auth();
    return (
      <NavigationWrapper>
        <Layout>
          <Alert>
            <Rabbit className="size-4" />
            <div>
              <Typography variant="large">
                Oh! You are not logged in or the organization with the ID{" "}
                <Typography variant="code">{params.orgSlug}</Typography> was not
                found.
              </Typography>
              {user ? (
                <Link
                  href="/orgs"
                  className={buttonVariants({
                    className: "mt-2",
                  })}
                >
                  Return to your organizations
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className={buttonVariants({
                    className: "mt-2",
                  })}
                >
                  Sign in
                </Link>
              )}
            </div>
          </Alert>
        </Layout>
      </NavigationWrapper>
    );
  }

  return <OrgNavigation>{props.children}</OrgNavigation>;
}
