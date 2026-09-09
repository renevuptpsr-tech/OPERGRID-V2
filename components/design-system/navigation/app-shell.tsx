"use client";

import {
  type ReactNode,
} from "react";
import clsx from "clsx";

export type AppShellProps = {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  mobileNavigation?: ReactNode;
  sidebarCollapsed?: boolean;
  className?: string;
  contentClassName?: string;
};

export function AppShell({
  sidebar,
  topbar,
  children,
  mobileNavigation,
  sidebarCollapsed = false,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <div
      className={clsx(
        "og-ds-app-shell",
        className,
      )}
      data-sidebar-collapsed={
        sidebarCollapsed || undefined
      }
    >
      <div className="og-ds-app-shell-sidebar">
        {sidebar}
      </div>

      <div className="og-ds-app-shell-main">
        <div className="og-ds-app-shell-topbar">
          {topbar}
        </div>

        <main
          className={clsx(
            "og-ds-app-shell-content",
            contentClassName,
          )}
        >
          {children}
        </main>
      </div>

      {mobileNavigation ? (
        <div className="og-ds-app-shell-mobile">
          {mobileNavigation}
        </div>
      ) : null}
    </div>
  );
}