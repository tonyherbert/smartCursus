import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { SubmitButton } from "@/src/features/form/submit-button";
import AuthNavigationWrapper from "@/src/features/navigation/log-in-navigation-wrapper";
import { NavigationWrapper } from "@/src/features/navigation/navigation-wrapper";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import { Page400 } from "@/src/features/page/page-400";
import { auth } from "@/src/lib/auth/helper";
import { combineWithParentMetadata } from "@/src/lib/metadata";
import { prisma } from "@/src/lib/prisma";
import { getServerUrl } from "@/src/lib/server-url";
import type { PageParams } from "@/src/types/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

const TokenSchema = z.object({
  orgId: z.string(),
  email: z.string(),
});

export const generateMetadata = combineWithParentMetadata({
  title: "Invitation",
  description: "You receive an invitation to join an organization.",
});

export default async function RoutePage(
  props: PageParams<{ orgSlug: string; token: string }>,
) {
  const params = await props.params;
  const organization = await prisma.organization.findFirst({
    where: {
      slug: params.orgSlug,
    },
  });

  if (!organization) {
    return <Page400 title="Invalid token 1" />;
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token: params.token,
    },
  });

  if (!verificationToken) {
    return <Page400 title="Invalid token 2" />;
  }

  const user = await auth();

  const tokenData = TokenSchema.parse(verificationToken.data);

  if (tokenData.orgId !== organization.id) {
    return <Page400 title="Invalid token 3" />;
  }

  if (!user) {
    return (
      <NavigationWrapper>
        <Layout>
          <LayoutHeader>
            <LayoutTitle>
              You've been invited to join {organization.name}
            </LayoutTitle>
          </LayoutHeader>
          <LayoutContent>
            <Card>
              <CardHeader>
                <CardTitle>
                  You need to be authenticated to join {organization.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  className={buttonVariants({ size: "lg" })}
                  href={`/auth/signin?callbackUrl=${getServerUrl()}/orgs/${organization.slug}/invitations/${(await props.params).token}&email=${tokenData.email}`}
                >
                  Sign in
                </Link>
              </CardContent>
            </Card>
          </LayoutContent>
        </Layout>
      </NavigationWrapper>
    );
  }

  const membership = await prisma.organizationMembership.findFirst({
    where: {
      organizationId: organization.id,
      userId: user.id,
    },
  });

  if (membership) {
    redirect(`/orgs/${organization.slug}`);
  }

  if (
    verificationToken.identifier !== `${user.email}-invite-${organization.id}`
  ) {
    return <Page400 title="Invalid email" />;
  }

  return (
    <AuthNavigationWrapper>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>
            You've been invited to join {organization.name}
          </LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card>
            <CardHeader>
              <CardTitle>One last step to join {organization.name}</CardTitle>
              <CardDescription>
                By clicking on the button below, you agree to join{" "}
                {organization.name} as a member.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <SubmitButton
                  formAction={async () => {
                    "use server";
                    await prisma.organizationMembership.create({
                      data: {
                        organizationId: organization.id,
                        userId: user.id,
                        roles: ["MEMBER"],
                      },
                    });
                    await prisma.verificationToken.delete({
                      where: {
                        token: params.token,
                      },
                    });
                    redirect(`/orgs/${organization.slug}`);
                  }}
                >
                  Join {organization.name}
                </SubmitButton>
              </form>
            </CardContent>
          </Card>
        </LayoutContent>
      </Layout>
    </AuthNavigationWrapper>
  );
}
