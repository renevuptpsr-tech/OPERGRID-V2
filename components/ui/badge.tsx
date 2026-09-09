import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import clsx from "clsx";


type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "focal";


type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
} & HTMLAttributes<HTMLSpanElement>;


const variantClass: Record<
  BadgeVariant,
  string
> = {
  neutral:
    "og-ui-badge-neutral",

  info:
    "og-ui-badge-info",

  success:
    "og-ui-badge-success",

  warning:
    "og-ui-badge-warning",

  danger:
    "og-ui-badge-danger",

  focal:
    "og-ui-badge-focal",
};


export function Badge({
  children,
  variant = "neutral",
  dot = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-[9px] font-semibold tracking-[0.02em]",
        variantClass[
          variant
        ],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}

      {children}
    </span>
  );
}