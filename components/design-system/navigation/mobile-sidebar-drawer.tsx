"use client";

import {
  type ReactNode,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
} from "lucide-react";

import {
  IconButton,
} from "../primitives/icon-button";
import {
  useOverlayPortal,
} from "../overlays/use-overlay-portal";

export type MobileSidebarDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  closeLabel?: string;
};

export function MobileSidebarDrawer({
  open,
  onOpenChange,
  children,
  title = "Navigasi aplikasi",
  closeLabel = "Tutup navigasi",
}: MobileSidebarDrawerProps) {
  const {
    container: overlayContainer,
    attachHost,
  } = useOverlayPortal();

  return (
    <span
      ref={attachHost}
      className="og-ds-mobile-drawer-host"
    >
      <DialogPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogPrimitive.Portal container={overlayContainer}>
          <DialogPrimitive.Overlay className="og-ds-mobile-drawer-overlay" />

          <DialogPrimitive.Content
            id="og-ds-mobile-navigation"
            className="og-ds-mobile-drawer"
          >
            <DialogPrimitive.Title className="og-ds-mobile-drawer-title">
              {title}
            </DialogPrimitive.Title>

            <div className="og-ds-mobile-drawer-toolbar">
              <DialogPrimitive.Close asChild>
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={closeLabel}
                >
                  <X
                    size={18}
                    aria-hidden="true"
                  />
                </IconButton>
              </DialogPrimitive.Close>
            </div>

            <div className="og-ds-mobile-drawer-content">
              {children}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </span>
  );
}