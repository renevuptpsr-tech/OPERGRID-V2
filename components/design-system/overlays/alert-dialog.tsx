"use client";

import { type ReactNode } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { TriangleAlert } from "lucide-react";

import { Button } from "../primitives/button";
import { useOverlayPortal } from "./use-overlay-portal";

export type AlertDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  onConfirm: () => void | Promise<void>;
};

export function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  loading = false,
  disabled = false,
  onConfirm,
}: AlertDialogProps) {
  const {
    container: overlayContainer,
    attachHost,
  } = useOverlayPortal();

  return (
    <span
      ref={attachHost}
      className="og-ds-overlay-host"
    >
      <AlertDialogPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {trigger ? (
          <AlertDialogPrimitive.Trigger asChild>
            {trigger}
          </AlertDialogPrimitive.Trigger>
        ) : null}

        <AlertDialogPrimitive.Portal container={overlayContainer}>
          <AlertDialogPrimitive.Overlay className="og-ds-overlay-backdrop" />

          <AlertDialogPrimitive.Content
            className="og-ds-dialog"
            data-size="sm"
          >
            <div className="og-ds-dialog-header">
              <div className="og-ds-dialog-heading">
                <AlertDialogPrimitive.Title className="og-ds-dialog-title">
                  <span className="og-ds-dialog-title-row">
                    <span
                      className="og-ds-dialog-status-icon"
                      data-variant="danger"
                    >
                      <TriangleAlert
                        size={20}
                        aria-hidden="true"
                      />
                    </span>

                    <span>{title}</span>
                  </span>
                </AlertDialogPrimitive.Title>

                {description ? (
                  <AlertDialogPrimitive.Description className="og-ds-dialog-description">
                    {description}
                  </AlertDialogPrimitive.Description>
                ) : null}
              </div>
            </div>

            {children ? (
              <div className="og-ds-dialog-body">
                {children}
              </div>
            ) : null}

            <div className="og-ds-dialog-footer">
              <AlertDialogPrimitive.Cancel asChild>
                <Button
                  variant="secondary"
                  disabled={loading}
                  autoFocus
                >
                  {cancelLabel}
                </Button>
              </AlertDialogPrimitive.Cancel>

              <AlertDialogPrimitive.Action asChild>
                <Button
                  variant="danger"
                  loading={loading}
                  disabled={disabled}
                  onClick={(event) => {
                    if (loading) {
                      event.preventDefault();
                      return;
                    }

                    void onConfirm();
                  }}
                >
                  {confirmLabel}
                </Button>
              </AlertDialogPrimitive.Action>
            </div>
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    </span>
  );
}