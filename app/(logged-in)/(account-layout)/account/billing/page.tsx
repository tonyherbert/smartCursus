import { requiredAuth } from "@/src/lib/auth/helper";
import { OrgSelectQuery } from "@/src/lib/organizations/get-org";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import { OrganizationBilling } from "../../../../orgs/[orgSlug]/(navigation)/settings/billing/page";

export default async function RoutePage() {
  const user = await requiredAuth();
  const org = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: OrgSelectQuery(user.id),
  });

  if (!org) {
    notFound();
  }

  return <OrganizationBilling org={org} />;
}
