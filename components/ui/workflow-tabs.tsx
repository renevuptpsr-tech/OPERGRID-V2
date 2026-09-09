import type {
  ReactNode,
} from "react";

import Link from "next/link";


export type WorkflowTab = {
  key: string;
  label: string;
  href: string;
  icon?: ReactNode;
  count?: number;
};


type WorkflowTabsProps = {
  tabs: WorkflowTab[];
  activeKey: string;
};


export function WorkflowTabs({
  tabs,
  activeKey,
}: WorkflowTabsProps) {
  return (
    <div className="og-workflow-tabs overflow-x-auto">
      <div className="flex min-w-max items-center gap-1">
        {tabs.map(
          (tab) => {
            const active =
              tab.key ===
              activeKey;

            return (
              <Link
                key={
                  tab.key
                }
                href={
                  tab.href
                }
                className={[
                  "og-workflow-tab",
                  active
                    ? "og-workflow-tab-active"
                    : "",
                ].join(" ")}
              >
                {tab.icon && (
                  <span>
                    {tab.icon}
                  </span>
                )}

                <span>
                  {tab.label}
                </span>

                {typeof tab.count ===
                  "number" && (
                  <span
                    className={[
                      "og-workflow-tab-count",
                      active
                        ? "og-workflow-tab-count-active"
                        : "",
                    ].join(" ")}
                  >
                    {tab.count}
                  </span>
                )}
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}