"use client";

import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import {
  type ReactNode,
} from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../overlays/dropdown-menu";

export type UserControlAction = {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
};

export type UserControlProps = {
  displayName: string;
  secondaryLabel?: string;
  avatarUrl?: string;
  initials?: string;
  profileLabel?: string;
  settingsLabel?: string;
  signOutLabel?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onSignOut?: () => void;
  actions?: readonly UserControlAction[];
  compact?: boolean;
};

function getInitials(
  displayName: string,
  provided?: string,
) {
  if (provided?.trim()) {
    return provided.trim().slice(0, 3).toUpperCase();
  }

  return displayName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserControl({
  displayName,
  secondaryLabel,
  avatarUrl,
  initials,
  profileLabel = "Profil",
  settingsLabel = "Pengaturan",
  signOutLabel = "Keluar",
  onProfile,
  onSettings,
  onSignOut,
  actions = [],
  compact = false,
}: UserControlProps) {
  const resolvedInitials =
    getInitials(displayName, initials);

  const trigger = (
    <button
      type="button"
      className="og-ds-user-control-trigger"
      data-compact={compact || undefined}
      aria-label={
        compact
          ? `Menu pengguna: ${displayName}`
          : undefined
      }
    >
      <span className="og-ds-user-avatar">
        {avatarUrl ? (
          <>
            {/* Generic DS avatar URLs may be remote and app-configured. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt=""
              className="og-ds-user-avatar-image"
            />
          </>
        ) : (
          <span
            className="og-ds-user-avatar-initials"
            aria-hidden="true"
          >
            {resolvedInitials}
          </span>
        )}
      </span>

      {!compact ? (
        <span className="og-ds-user-control-copy">
          <span className="og-ds-user-control-name">
            {displayName}
          </span>

          {secondaryLabel ? (
            <span className="og-ds-user-control-secondary">
              {secondaryLabel}
            </span>
          ) : null}
        </span>
      ) : null}

      {!compact ? (
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="og-ds-user-control-chevron"
        />
      ) : null}
    </button>
  );

  return (
    <DropdownMenu
      trigger={trigger}
      align="end"
      side="bottom"
      sideOffset={6}
    >
      <DropdownMenuLabel>
        <span className="og-ds-user-menu-heading">
          <span className="og-ds-user-menu-name">
            {displayName}
          </span>

          {secondaryLabel ? (
            <span className="og-ds-user-menu-secondary">
              {secondaryLabel}
            </span>
          ) : null}
        </span>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      {onProfile ? (
        <DropdownMenuItem
          icon={
            <UserRound
              size={15}
              aria-hidden="true"
            />
          }
          onSelect={onProfile}
        >
          {profileLabel}
        </DropdownMenuItem>
      ) : null}

      {onSettings ? (
        <DropdownMenuItem
          icon={
            <Settings
              size={15}
              aria-hidden="true"
            />
          }
          onSelect={onSettings}
        >
          {settingsLabel}
        </DropdownMenuItem>
      ) : null}

      {actions.map((action) => (
        <DropdownMenuItem
          key={action.id}
          icon={action.icon}
          disabled={action.disabled}
          destructive={action.destructive}
          onSelect={action.onSelect}
        >
          {action.label}
        </DropdownMenuItem>
      ))}

      {onSignOut ? (
        <>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            destructive
            icon={
              <LogOut
                size={15}
                aria-hidden="true"
              />
            }
            onSelect={onSignOut}
          >
            {signOutLabel}
          </DropdownMenuItem>
        </>
      ) : null}
    </DropdownMenu>
  );
}