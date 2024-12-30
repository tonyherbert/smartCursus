"use client";

import { HeaderBase } from "@/src/features/layout/header-base";
import { Page400 } from "@/src/features/page/page-400";

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Page400 />
      </div>
    </div>
  );
}
