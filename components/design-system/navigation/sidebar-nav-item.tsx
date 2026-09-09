"use client";

import {
  type MouseEventHandler,
  type ReactNode,
} from "react";
import clsx from "clsx";

import {
  Tooltip,
} from "../overlays/tooltip";
import type {
  NavigationBadge,
} from "./types";

export type SidebarNavItemProps = {
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: NavigationBadge;
  active?: boolean;
  disabled?: boolean;
  collapsed?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

function ItemBody({
  label,
  icon,
  badge,
  collapsed,
}: {
  label: string;
  icon?: ReactNode;
  badge?: NavigationBadge;
  collapsed: boolean;
}) {
  return (
    <>
      {icon ? (
        <span
          className="og-ds-sidebar-nav-icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}

      {!collapsed ? (
        <>
          <span className="og-ds-sidebar-nav-label">
            {label}
          </span>

          {badge ? (
            <span
              className="og-ds-sidebar-nav-badge"
              data-tone={badge.tone ?? "neutral"}
            >
              {badge.label}
            </span>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export function SidebarNavItem({
  label,
  href,
  icon,
  badge,
  active = false,
  disabled = false,
  collapsed = false,
  className,
  onClick,
}: SidebarNavItemProps) {
  const common = {
    "aria-current": active
      ? ("page" as const)
      : undefined,
    "aria-disabled": disabled
      ? (true as const)
      : undefined,
    "data-active": active || undefined,
    "data-disabled": disabled || undefined,
    "data-collapsed": collapsed || undefined,
    className: clsx(
      "og-ds-sidebar-nav-item",
      className,
    ),
  };

  const control =
    href && !disabled ? (
      <a
        {...common}
        href={href}
        aria-label={collapsed ? label : undefined}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        <ItemBody
          label={label}
          icon={icon}
          badge={badge}
          collapsed={collapsed}
        />
      </a>
    ) : (
      <button
        {...common}
        type="button"
        disabled={disabled}
        aria-label={collapsed ? label : undefined}
        onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      >
        <ItemBody
          label={label}
          icon={icon}
          badge={badge}
          collapsed={collapsed}
        />
      </button>
    );

  if (!collapsed) {
    return control;
  }

  return (
    <Tooltip
      content={label}
      side="right"
      delayDuration={300}
    >
      {(tooltipProps) => {
        const describedBy =
          tooltipProps["aria-describedby"];

        if (href && !disabled) {
          return (
            <a
              {...common}
              href={href}
              aria-label={label}
              aria-describedby={describedBy}
              onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
            >
              <ItemBody
                label={label}
                icon={icon}
                badge={badge}
                collapsed
              />
            </a>
          );
        }

        return (
          <button
            {...common}
            type="button"
            disabled={disabled}
            aria-label={label}
            aria-describedby={describedBy}
            onClick={onClick as MouseEventHandler<HTMLButtonElement>}
          >
            <ItemBody
              label={label}
              icon={icon}
              badge={badge}
              collapsed
            />
          </button>
        );
      }}
    </Tooltip>
  );
}