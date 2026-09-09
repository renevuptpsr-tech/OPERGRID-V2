import {
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

import type {
  BreadcrumbItem,
} from "./types";

export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  ariaLabel?: string;
  className?: string;
};

export function Breadcrumb({
  items,
  ariaLabel = "Breadcrumb",
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={clsx(
        "og-ds-breadcrumb",
        className,
      )}
    >
      <ol className="og-ds-breadcrumb-list">
        {items.map((item, index) => {
          const current =
            index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="og-ds-breadcrumb-item"
            >
              {index > 0 ? (
                <ChevronRight
                  size={13}
                  aria-hidden="true"
                  className="og-ds-breadcrumb-separator"
                />
              ) : null}

              {item.href && !current ? (
                <a
                  href={item.href}
                  className="og-ds-breadcrumb-link"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className="og-ds-breadcrumb-current"
                  aria-current={
                    current
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}