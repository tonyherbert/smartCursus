import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { Layout } from "@/src/features/page/layout";
import { getRequiredCurrentOrgCache } from "@/src/lib/react/cache";
import { getUsersOrgs } from "@/src/query/org/get-users-orgs.query";
import type { PropsWithChildren } from "react";
import { OrgSidebar } from "./org-sidebar";
import { headers } from "next/headers";

export async function OrgNavigation({ children }: PropsWithChildren) {
  const { org, roles } = await getRequiredCurrentOrgCache();
  const userOrganizations = await getUsersOrgs();
  const headersList = await headers();
  const currentPath = headersList.get("x-current-path") || "";
  const isCreatePage = currentPath.endsWith("/create");

  return (
    <SidebarProvider>
      <OrgSidebar slug={org.slug} roles={roles} userOrgs={userOrganizations} />
      <SidebarInset className="border border-accent">
        {!isCreatePage && (
          <header className="flex h-16 shrink-0 items-center gap-2">
            <Layout />
          </header>
        )}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
