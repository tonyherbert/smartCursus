"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { SignInButton } from "@/src/features/auth/sign-in-button";
import { Page400 } from "@/src/features/page/page-400";
import { logger } from "@/src/lib/logger";
import type { ErrorParams } from "@/src/types/next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  const session = useSession();

  useEffect(() => {
    logger.error(error);
  }, [error]);

  if (session.status === "authenticated") {
    return <Page400 />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          You need to be authenticated to access this resource.
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <SignInButton variant="invert" size="lg" />
      </CardFooter>
    </Card>
  );
}
