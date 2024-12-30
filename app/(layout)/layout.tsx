import { BaseLayout } from "@/src/features/layout/base-layout";
import type { PropsWithChildren } from "react";

export default function RouteLayout(props: PropsWithChildren) {
  return <BaseLayout>{props.children}</BaseLayout>;
}
