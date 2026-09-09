"use client";

import {
  Menu,
  X,
} from "lucide-react";

import {
  IconButton,
} from "../primitives/icon-button";

export type MobileNavTriggerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  openLabel?: string;
  closeLabel?: string;
};

export function MobileNavTrigger({
  open,
  onOpenChange,
  openLabel = "Buka navigasi",
  closeLabel = "Tutup navigasi",
}: MobileNavTriggerProps) {
  return (
    <IconButton
      type="button"
      variant="ghost"
      size="sm"
      aria-label={
        open
          ? closeLabel
          : openLabel
      }
      aria-expanded={open}
      aria-controls="og-ds-mobile-navigation"
      onClick={() => {
        onOpenChange(!open);
      }}
      className="og-ds-mobile-nav-trigger"
    >
      {open ? (
        <X
          size={18}
          aria-hidden="true"
        />
      ) : (
        <Menu
          size={18}
          aria-hidden="true"
        />
      )}
    </IconButton>
  );
}