import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import { requiredAuth } from "@/src/lib/auth/helper";
import type { LayoutParams } from "@/src/types/next";

export default async function RouteLayout(props: LayoutParams) {
  const user = await requiredAuth();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          {user.name ? `${user.name}'s` : "Your"} Settings
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>{props.children}</LayoutContent>
    </Layout>
  );
}
