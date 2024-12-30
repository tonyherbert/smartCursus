import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import { createSearchParamsMessageUrl } from "@/src/features/searchparams-message/createSearchParamsMessageUrl";
import { combineWithParentMetadata } from "@/src/lib/metadata";
import { SiteConfig } from "@/src/site-config";
import type { LayoutParams } from "@/src/types/next";
import { redirect } from "next/navigation";

export const generateMetadata = combineWithParentMetadata({
  title: "Settings",
  description: "Manage your organization settings.",
});

export default async function RouteLayout(
  props: LayoutParams<{ productId: string; orgSlug: string }>,
) {
  if (SiteConfig.features.enableSingleMemberOrg) {
    redirect(
      createSearchParamsMessageUrl(`/account`, {
        type: "message",
        message: "You need to update your account settings.",
      }),
    );
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Organization</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>{props.children}</LayoutContent>
    </Layout>
  );
}
