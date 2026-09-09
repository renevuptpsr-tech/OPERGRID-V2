"use client";

import type {
  MouseEventHandler,
  ReactNode,
} from "react";
import clsx from "clsx";

import type {
  NavigationBadge,
} from "./types";

export type NavItemProps = {
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: NavigationBadge;
  description?: string;
  active?: boolean;
  disabled?: boolean;
  compact?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

function NavItemContent({
  label,
  icon,
  badge,
  description,
}: {
  label: string;
  icon?: ReactNode;
  badge?: NavigationBadge;
  description?: string;
}) {
  return (
    <>
      {icon ? (
        <span
          className="og-ds-nav-item-icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}

      <span className="og-ds-nav-item-copy">
        <span className="og-ds-nav-item-label">
          {label}
        </span>

        {description ? (
          <span className="og-ds-nav-item-description">
            {description}
          </span>
        ) : null}
      </span>

      {badge ? (
        <span
          className="og-ds-nav-badge"
          data-tone={badge.tone ?? "neutral"}
        >
          {badge.label}
        </span>
      ) : null}
    </>
  );
}

export function NavItem({
  label,
  href,
  icon,
  badge,
  description,
  active = false,
  disabled = false,
  compact = false,
  className,
  onClick,
}: NavItemProps) {
  const sharedProps = {
    "aria-current": active
      ? ("page" as const)
      : undefined,
    "aria-disabled": disabled
      ? (true as const)
      : undefined,
    "data-active": active || undefined,
    "data-disabled": disabled || undefined,
    "data-compact": compact || undefined,
    className: clsx(
      "og-ds-nav-item",
      className,
    ),
  };

  if (href && !disabled) {
    return (
      <a
        {...sharedProps}
        href={href}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        <NavItemContent
          label={label}
          icon={icon}
          badge={badge}
          description={description}
        />
      </a>
    );
  }

  return (
    <button
      {...sharedProps}
      type="button"
      disabled={disabled}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      <NavItemContent
        label={label}
        icon={icon}
        badge={badge}
        description={description}
      />
    </button>
  );
}