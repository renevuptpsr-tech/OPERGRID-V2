import {
  type ReactNode,
} from "react";

export type SidebarBrandProps = {
  mark?: ReactNode;
  name: string;
  descriptor?: string;
  collapsed?: boolean;
};

export function SidebarBrand({
  mark,
  name,
  descriptor,
  collapsed = false,
}: SidebarBrandProps) {
  return (
    <div
      className="og-ds-sidebar-brand-lockup"
      data-collapsed={collapsed || undefined}
    >
      {mark ? (
        <span
          className="og-ds-sidebar-brand-mark"
          aria-hidden="true"
        >
          {mark}
        </span>
      ) : null}

      {!collapsed ? (
        <span className="og-ds-sidebar-brand-copy">
          <span className="og-ds-sidebar-brand-name">
            {name}
          </span>

          {descriptor ? (
            <span className="og-ds-sidebar-brand-descriptor">
              {descriptor}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  );
}