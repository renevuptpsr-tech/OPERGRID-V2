import type { ComponentPropsWithRef } from "react";
import clsx from "clsx";

export type SeparatorProps = ComponentPropsWithRef<"div"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Separator({ orientation = "horizontal", decorative = true, className, ...props }: SeparatorProps) {
  return <div {...props} role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation} aria-hidden={decorative || undefined}
    data-orientation={orientation} className={clsx("og-ds-separator", className)} />;
}
