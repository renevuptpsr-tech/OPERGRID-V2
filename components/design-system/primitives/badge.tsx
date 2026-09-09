import type { ComponentPropsWithRef, ReactNode } from "react";
import clsx from "clsx";

export type BadgeProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  children: ReactNode;
  variant?: "neutral" | "brand" | "info" | "success" | "warning" | "danger";
  dot?: boolean;
  icon?: ReactNode;
};

export function Badge({ children, variant = "neutral", dot, icon, className, ...props }: BadgeProps) {
  return <span {...props} data-variant={variant} className={clsx("og-ds-badge", className)}>
    {dot && <span className="og-ds-status-dot" aria-hidden="true" />}
    {icon && <span className="og-ds-icon" aria-hidden="true">{icon}</span>}
    {children}
  </span>;
}
