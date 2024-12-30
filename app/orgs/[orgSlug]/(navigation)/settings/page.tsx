import { getRequiredCurrentOrgCache } from "@/src/lib/react/cache";
import type { PageParams } from "@/src/types/next";
import { OrgDetailsForm } from "./(details)/org-details-form";

export default async function RoutePage(props: PageParams) {
  const { org: organization } = await getRequiredCurrentOrgCache(["ADMIN"]);
  return <OrgDetailsForm defaultValues={organization} />;
}
