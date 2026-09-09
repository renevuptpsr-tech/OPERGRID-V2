"use client";

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";

import { IconButton } from "../primitives/icon-button";
import { useOverlayPortal } from "./use-overlay-portal";

export type DialogSize = "sm" | "md" | "lg";

export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  closeLabel?: string;
  closeOnOutsideInteraction?: boolean;
  className?: string;
  contentClassName?: string;
};

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = "md",
  closeLabel = "Tutup dialog",
  closeOnOutsideInteraction = true,
  className,
  contentClassName,
}: DialogProps) {
  const {
    container: overlayContainer,
    attachHost,
  } = useOverlayPortal();

  return (
    <span
      ref={attachHost}
      className={clsx("og-ds-overlay-host", className)}
    >
      <DialogPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {trigger ? (
          <DialogPrimitive.Trigger asChild>
            {trigger}
          </DialogPrimitive.Trigger>
        ) : null}

        <DialogPrimitive.Portal container={overlayContainer}>
          <DialogPrimitive.Overlay className="og-ds-overlay-backdrop" />

          <DialogPrimitive.Content
            data-size={size}
            className={clsx(
              "og-ds-dialog",
              contentClassName,
            )}
            onPointerDownOutside={(event) => {
              if (!closeOnOutsideInteraction) {
                event.preventDefault();
              }
            }}
            onInteractOutside={(event) => {
              if (!closeOnOutsideInteraction) {
                event.preventDefault();
              }
            }}
          >
            <div className="og-ds-dialog-header">
              <div className="og-ds-dialog-heading">
                <DialogPrimitive.Title className="og-ds-dialog-title">
                  {title}
                </DialogPrimitive.Title>

                {description ? (
                  <DialogPrimitive.Description className="og-ds-dialog-description">
                    {description}
                  </DialogPrimitive.Description>
                ) : null}
              </div>

              <DialogPrimitive.Close asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label={closeLabel}
                >
                  <X size={18} aria-hidden="true" />
                </IconButton>
              </DialogPrimitive.Close>
            </div>

            <div className="og-ds-dialog-body">
              {children}
            </div>

            {footer ? (
              <div className="og-ds-dialog-footer">
                {footer}
              </div>
            ) : null}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </span>
  );
}

export type DialogCloseProps =
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close {...props} />;
}