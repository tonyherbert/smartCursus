"use client";

import { NavigationWrapper } from "@/src/features/navigation/navigation-wrapper";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import { Page400 } from "@/src/features/page/page-400";
import { logger } from "@/src/lib/logger";
import type { ErrorParams } from "@/src/types/next";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <NavigationWrapper>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Organization error</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Page400 />
        </LayoutContent>
      </Layout>
    </NavigationWrapper>
  );
}
