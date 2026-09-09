"use client";

import { type ReactNode } from "react";
import {
  AlertTriangle,
  CircleHelp,
  TriangleAlert,
} from "lucide-react";

import {
  Button,
  type ButtonProps,
} from "../primitives/button";
import {
  Dialog,
  DialogClose,
  type DialogSize,
} from "./dialog";

export type ConfirmDialogVariant =
  | "neutral"
  | "warning"
  | "danger";

export type ConfirmDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  loading?: boolean;
  disabled?: boolean;
  size?: DialogSize;
  onConfirm: () => void | Promise<void>;
};

function confirmButtonVariant(
  variant: ConfirmDialogVariant,
): ButtonProps["variant"] {
  return variant === "danger" ? "danger" : "primary";
}

function ConfirmIcon({
  variant,
}: {
  variant: ConfirmDialogVariant;
}) {
  if (variant === "warning") {
    return <AlertTriangle size={20} aria-hidden="true" />;
  }

  if (variant === "danger") {
    return <TriangleAlert size={20} aria-hidden="true" />;
  }

  return <CircleHelp size={20} aria-hidden="true" />;
}

export function ConfirmDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  variant = "neutral",
  loading = false,
  disabled = false,
  size = "sm",
  onConfirm,
}: ConfirmDialogProps) {
  const footer = (
    <>
      <DialogClose asChild>
        <Button
          variant="secondary"
          disabled={loading}
        >
          {cancelLabel}
        </Button>
      </DialogClose>

      <Button
        variant={confirmButtonVariant(variant)}
        loading={loading}
        disabled={disabled}
        onClick={() => {
          void onConfirm();
        }}
      >
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <Dialog
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      trigger={trigger}
      title={
        <span className="og-ds-dialog-title-row">
          <span
            className="og-ds-dialog-status-icon"
            data-variant={variant}
          >
            <ConfirmIcon variant={variant} />
          </span>

          <span>{title}</span>
        </span>
      }
      description={description}
      footer={footer}
      size={size}
      closeOnOutsideInteraction={!loading}
    >
      {children ? (
        <div className="og-ds-confirm-content">
          {children}
        </div>
      ) : null}
    </Dialog>
  );
}