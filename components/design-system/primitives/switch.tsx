import type { ComponentPropsWithRef } from "react";
import clsx from "clsx";

export type SwitchProps = Omit<ComponentPropsWithRef<"input">, "type" | "role">;

export function Switch({ className, ...props }: SwitchProps) {
  return <input {...props} type="checkbox" role="switch"
    className={clsx("og-ds-switch og-ds-focus og-ds-transition", className)} />;
}
