"use client";

import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  type ReactNode,
} from "react";

import { IconButton } from "../primitives/icon-button";

export type AlertVariant =
  | "info"
  | "success"
  | "warning"
  | "danger";

export type AlertProps = {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  dismissLabel?: string;
  onDismiss?: () => void;
  role?: "status" | "alert";
  className?: string;
};

function AlertIcon({
  variant,
}: {
  variant: AlertVariant;
}) {
  switch (variant) {
    case "success":
      return <CircleCheck size={18} aria-hidden="true" />;

    case "warning":
      return <TriangleAlert size={18} aria-hidden="true" />;

    case "danger":
      return <CircleX size={18} aria-hidden="true" />;

    default:
      return <Info size={18} aria-hidden="true" />;
  }
}

export function Alert({
  variant = "info",
  title,
  children,
  action,
  dismissLabel = "Tutup pemberitahuan",
  onDismiss,
  role,
  className,
}: AlertProps) {
  const semanticRole =
    role ??
    (variant === "danger" ? "alert" : "status");

  return (
    <div
      role={semanticRole}
      data-variant={variant}
      className={
        className
          ? `og-ds-alert ${className}`
          : "og-ds-alert"
      }
    >
      <span
        className="og-ds-alert-icon"
        aria-hidden="true"
      >
        <AlertIcon variant={variant} />
      </span>

      <div className="og-ds-alert-content">
        {title ? (
          <div className="og-ds-alert-title">
            {title}
          </div>
        ) : null}

        {children ? (
          <div className="og-ds-alert-description">
            {children}
          </div>
        ) : null}
      </div>

      {action ? (
        <div className="og-ds-alert-action">
          {action}
        </div>
      ) : null}

      {onDismiss ? (
        <IconButton
          type="button"
          variant="ghost"
          size="sm"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <X size={16} aria-hidden="true" />
        </IconButton>
      ) : null}
    </div>
  );
}