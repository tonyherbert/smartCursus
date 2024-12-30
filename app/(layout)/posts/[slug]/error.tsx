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
    <Card variant="error">
      <CardHeader>
        <CardTitle>
          Sorry, the post you are looking for doesn't work as expected. Please
          try again later.
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  );
}
