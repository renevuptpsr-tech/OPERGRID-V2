import {
  useId,
  type ReactNode,
} from "react";

export type SidebarGroupProps = {
  label?: ReactNode;
  children: ReactNode;
  collapsed?: boolean;
};

export function SidebarGroup({
  label,
  children,
  collapsed = false,
}: SidebarGroupProps) {
  const labelId = useId();

  return (
    <section
      className="og-ds-sidebar-group"
      data-collapsed={collapsed || undefined}
      aria-labelledby={
        !collapsed && label
          ? labelId
          : undefined
      }
    >
      {!collapsed && label ? (
        <div
          id={labelId}
          className="og-ds-sidebar-group-label"
        >
          {label}
        </div>
      ) : null}

      <div className="og-ds-sidebar-group-items">
        {children}
      </div>
    </section>
  );
}