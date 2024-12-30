"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import { SidebarMenuButtonLink } from "@/src/components/ui/sidebar-utils";
import { UserDropdown } from "@/src/features/auth/user-dropdown";
import type { NavigationGroup } from "@/src/features/navigation/navigation.type";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { OrgsSelect } from "../../orgs/[orgSlug]/(navigation)/_navigation/orgs-select";
import { getAccountNavigation } from "./account.links";

export function AccountSidebar({
  userOrgs,
}: {
  userOrgs: {
    id: string;
    slug: string;
    name: string;
    image: string | null;
  }[];
}) {
  const links: NavigationGroup[] = getAccountNavigation();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <OrgsSelect orgs={userOrgs} />
      </SidebarHeader>
      <SidebarContent>
        {links.map((link) => (
          <SidebarGroup key={link.title}>
            <SidebarGroupLabel>
              {link.title}
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {link.links.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButtonLink href={item.href}>
                      <item.Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButtonLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2">
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const UserButton = () => {
  const session = useSession();
  const data = session.data?.user;
  return (
    <UserDropdown>
      <Button variant="outline">
        <Avatar className="size-6">
          <AvatarFallback>{data?.name?.[0] ?? "-"}</AvatarFallback>
          {data?.image && <AvatarImage src={data.image} />}
        </Avatar>
      </Button>
    </UserDropdown>
  );
};
