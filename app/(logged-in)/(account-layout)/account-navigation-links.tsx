"use client";

import { NavigationLinks } from "@/src/features/navigation/navigation-links";
import { getAccountNavigation } from "./account.links";

export const AccountNavigationLinks = () => {
  const accountNavigation = getAccountNavigation();

  return <NavigationLinks navigation={accountNavigation} />;
};
