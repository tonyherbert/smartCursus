import { buttonVariants } from "@/src/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import { isInRoles } from "@/src/lib/organizations/is-in-roles";
import { getRequiredCurrentOrgCache } from "@/src/lib/react/cache";
import type { PageParams } from "@/src/types/next";
import Link from "next/link";
import InformationCards from "./information-cards";
import { SubscribersChart } from "./subscribers-charts";

export default async function RoutePage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const org = await getRequiredCurrentOrgCache();
  const params = await props.params;
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        {isInRoles(org.roles, ["ADMIN"]) ? (
          <Link
            href={`/orgs/${params.orgSlug}/settings/members`}
            className={buttonVariants({ variant: "outline" })}
          >
            Invite member
          </Link>
        ) : null}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <InformationCards />
        <SubscribersChart />
      </LayoutContent>
    </Layout>
  );
}
