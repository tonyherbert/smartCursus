"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { logger } from "@/src/lib/logger";
import type { ErrorParams } from "@/src/types/next";
import { useEffect } from "react";

export default function RouteError({ error, reset }: ErrorParams) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sorry, something went wrong. Please try again later.
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  );
}
