import type { ComponentPropsWithRef } from "react";
import clsx from "clsx";

export type LabelProps = ComponentPropsWithRef<"label"> & {
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
};

export function Label({ children, required, optional, disabled, className, ...props }: LabelProps) {
  return (
    <label {...props} data-disabled={disabled || undefined} className={clsx("og-ds-label", className)}>
      {children}
      {required ? <span className="og-ds-required" aria-hidden="true"> *</span>
        : optional ? <span className="og-ds-optional"> (optional)</span> : null}
    </label>
  );
}
