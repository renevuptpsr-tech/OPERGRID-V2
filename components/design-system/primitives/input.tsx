import type { ComponentPropsWithRef, ReactNode } from "react";
import clsx from "clsx";

export type InputProps = Omit<ComponentPropsWithRef<"input">, "prefix"> & {
  error?: boolean;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  prefix?: string;
  suffix?: string;
  containerClassName?: string;
};

export function Input({
  error = false, leftIcon, rightSlot, prefix, suffix, containerClassName,
  className, disabled, readOnly, ...props
}: InputProps) {
  return (
    <span className={clsx("og-ds-input-shell", containerClassName)} data-disabled={disabled || undefined}>
      {(leftIcon || prefix) && (
        <span className="og-ds-input-leading" aria-hidden="true">
          {leftIcon && <span className="og-ds-icon">{leftIcon}</span>}{prefix}
        </span>
      )}
      <input
        {...props}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error ? true : props["aria-invalid"]}
        data-leading={Boolean(leftIcon || prefix) || undefined}
        data-trailing={Boolean(rightSlot || suffix) || undefined}
        className={clsx("og-ds-input og-ds-focus og-ds-transition", className)}
      />
      {(rightSlot || suffix) && (
        <span className="og-ds-input-trailing">
          {suffix && <span aria-hidden="true">{suffix}</span>}{rightSlot}
        </span>
      )}
    </span>
  );
}
