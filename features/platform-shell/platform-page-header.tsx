"use client";

import {
  usePathname,
} from "next/navigation";

import {
  Breadcrumb,
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
    <div className="og-premium-content-breadcrumb">
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
    </div>
  );
}