import AuthNavigationWrapper from "@/src/features/navigation/log-in-navigation-wrapper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import { createSearchParamsMessageUrl } from "@/src/features/searchparams-message/createSearchParamsMessageUrl";
import { requiredAuth } from "@/src/lib/auth/helper";
import { SiteConfig } from "@/src/site-config";
import { redirect } from "next/navigation";
import { NewOrganizationForm } from "./new-org-form";

export default async function RoutePage() {
  await requiredAuth();

  if (SiteConfig.features.enableSingleMemberOrg) {
    redirect(
      createSearchParamsMessageUrl(`/orgs`, {
        type: "message",
        message: "You can't create an organization.",
      }),
    );
  }

  return (
    <AuthNavigationWrapper>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Create a new organization</LayoutTitle>
          <LayoutDescription>
            Each organization has its own billing account and can be used to
            manage multiple members.
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <NewOrganizationForm />
        </LayoutContent>
      </Layout>
    </AuthNavigationWrapper>
  );
}
