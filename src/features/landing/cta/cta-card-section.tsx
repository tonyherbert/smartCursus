"use client";

import { buttonVariants } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Typography } from "@/src/components/ui/typography";
import Link from "next/link";
import { SectionLayout } from "../section-layout";

export function CTASectionCard() {
  return (
    <SectionLayout>
      <Card className="relative isolate overflow-hidden px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <Typography variant="h2">It's time to start.</Typography>
        <Typography className="mt-4 text-muted-foreground">
          Create an account and start posting today.
        </Typography>
        <div className="mt-10 flex items-center justify-center gap-6">
          <Link href="#pricing" className={buttonVariants({ size: "lg" })}>
            Get started
          </Link>
        </div>
      </Card>
    </SectionLayout>
  );
}
