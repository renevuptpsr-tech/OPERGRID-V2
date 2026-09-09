"use client";

import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  type ReactNode,
} from "react";
import clsx from "clsx";

import {
  IconButton,
} from "../primitives/icon-button";

export type SidebarProps = {
  brand?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapseLabel?: string;
  expandLabel?: string;
  className?: string;
};

export function Sidebar({
  brand,
  header,
  children,
  footer,
  collapsed = false,
  onCollapsedChange,
  collapseLabel = "Ciutkan navigasi",
  expandLabel = "Perluas navigasi",
  className,
}: SidebarProps) {
  const canToggle =
    typeof onCollapsedChange === "function";

  return (
    <aside
      className={clsx(
        "og-ds-sidebar",
        className,
      )}
      data-collapsed={collapsed || undefined}
      aria-label="Navigasi utama"
    >
      <div className="og-ds-sidebar-top">
        {brand ? (
          <div className="og-ds-sidebar-brand">
            {brand}
          </div>
        ) : null}

        {canToggle ? (
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            aria-label={
              collapsed
                ? expandLabel
                : collapseLabel
            }
            onClick={() => {
              onCollapsedChange?.(!collapsed);
            }}
          >
            {collapsed ? (
              <PanelLeftOpen
                size={17}
                aria-hidden="true"
              />
            ) : (
              <PanelLeftClose
                size={17}
                aria-hidden="true"
              />
            )}
          </IconButton>
        ) : null}
      </div>

      {header ? (
        <div className="og-ds-sidebar-header">
          {header}
        </div>
      ) : null}

      <nav
        className="og-ds-sidebar-nav"
        aria-label="Menu aplikasi"
      >
        {children}
      </nav>

      {footer ? (
        <div className="og-ds-sidebar-footer">
          {footer}
        </div>
      ) : null}
    </aside>
  );
}