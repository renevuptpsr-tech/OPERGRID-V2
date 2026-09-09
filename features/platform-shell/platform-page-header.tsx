"use client";

import {
  usePathname,
} from "next/navigation";

import {
  Breadcrumb,
  PageHeader,
} from "@/components/design-system/navigation";

import {
  resolvePlatformPageInfo,
} from "./page-registry";

export function PlatformPageHeader() {
  const pathname =
    usePathname();

  const page =
    resolvePlatformPageInfo(
      pathname,
    );

  return (
    <PageHeader
      title={page.title}
      breadcrumbs={
        <Breadcrumb
          items={[
            {
              label: "OPERGRID",
              href: "/dashboard",
            },
            {
              label: page.section,
            },
            {
              label: page.title,
            },
          ]}
        />
      }
    />
  );
}