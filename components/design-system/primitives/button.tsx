import type { ComponentPropsWithRef, ReactNode } from "react";
import clsx from "clsx";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
};

export function Button({
  children, variant = "primary", size = "md", leftIcon, rightIcon,
  loading = false, loadingText = "Working…", disabled, fullWidth = false,
  className, type = "button", ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"]}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      className={clsx("og-ds-button og-ds-focus og-ds-transition", fullWidth && "og-ds-full-width", className)}
    >
      <span className="og-ds-button-content" aria-hidden={loading || undefined}>
        {leftIcon && <span className="og-ds-icon" aria-hidden="true">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="og-ds-icon" aria-hidden="true">{rightIcon}</span>}
      </span>
      {loading && (
        <span className="og-ds-button-pending">
          <span className="og-ds-spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </span>
      )}
    </button>
  );
}
