"use client";

import {
  type ReactNode,
} from "react";
import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import {
  Check,
  ChevronRight,
} from "lucide-react";

import { useOverlayPortal } from "./use-overlay-portal";

export type DropdownMenuProps = {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

export function DropdownMenu({
  trigger,
  children,
  side = "bottom",
  align = "end",
  sideOffset = 6,
}: DropdownMenuProps) {
  const {
    container: overlayContainer,
    attachHost,
  } = useOverlayPortal();

  return (
    <span
      ref={attachHost}
      className="og-ds-dropdown-host"
    >
      <DropdownPrimitive.Root>
        <DropdownPrimitive.Trigger asChild>
          {trigger}
        </DropdownPrimitive.Trigger>

        <DropdownPrimitive.Portal container={overlayContainer}>
          <DropdownPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            collisionPadding={12}
            className="og-ds-dropdown-content"
          >
            {children}
          </DropdownPrimitive.Content>
        </DropdownPrimitive.Portal>
      </DropdownPrimitive.Root>
    </span>
  );
}

export type DropdownMenuItemProps = {
  children: ReactNode;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  inset?: boolean;
  onSelect?: () => void;
};

export function DropdownMenuItem({
  children,
  icon,
  destructive = false,
  disabled = false,
  inset = false,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <DropdownPrimitive.Item
      disabled={disabled}
      data-destructive={destructive || undefined}
      data-inset={inset || undefined}
      className="og-ds-dropdown-item"
      onSelect={() => {
        onSelect?.();
      }}
    >
      {icon ? (
        <span
          className="og-ds-dropdown-icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}

      <span className="og-ds-dropdown-label">
        {children}
      </span>
    </DropdownPrimitive.Item>
  );
}

export type DropdownMenuCheckboxItemProps = {
  children: ReactNode;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function DropdownMenuCheckboxItem({
  children,
  checked,
  disabled = false,
  onCheckedChange,
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownPrimitive.CheckboxItem
      checked={checked}
      disabled={disabled}
      onCheckedChange={(next) => {
        onCheckedChange?.(next === true);
      }}
      className="og-ds-dropdown-item"
    >
      <span
        className="og-ds-dropdown-check"
        aria-hidden="true"
      >
        <DropdownPrimitive.ItemIndicator>
          <Check size={14} />
        </DropdownPrimitive.ItemIndicator>
      </span>

      <span className="og-ds-dropdown-label">
        {children}
      </span>
    </DropdownPrimitive.CheckboxItem>
  );
}

export function DropdownMenuSeparator() {
  return (
    <DropdownPrimitive.Separator className="og-ds-dropdown-separator" />
  );
}

export type DropdownMenuLabelProps = {
  children: ReactNode;
};

export function DropdownMenuLabel({
  children,
}: DropdownMenuLabelProps) {
  return (
    <DropdownPrimitive.Label className="og-ds-dropdown-section-label">
      {children}
    </DropdownPrimitive.Label>
  );
}

export type DropdownMenuSubProps = {
  label: ReactNode;
  children: ReactNode;
};

export function DropdownMenuSub({
  label,
  children,
}: DropdownMenuSubProps) {
  return (
    <DropdownPrimitive.Sub>
      <DropdownPrimitive.SubTrigger className="og-ds-dropdown-item">
        <span className="og-ds-dropdown-label">
          {label}
        </span>

        <ChevronRight
          size={15}
          aria-hidden="true"
        />
      </DropdownPrimitive.SubTrigger>

      <DropdownPrimitive.Portal>
        <DropdownPrimitive.SubContent className="og-ds-dropdown-content">
          {children}
        </DropdownPrimitive.SubContent>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Sub>
  );
}