import {
  type ReactNode,
} from "react";
import clsx from "clsx";

import type {
  PageHeaderMetadata,
} from "./types";

export type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  metadata?: readonly PageHeaderMetadata[];
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  metadata,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={clsx(
        "og-ds-page-header",
        className,
      )}
    >
      {breadcrumbs ? (
        <div className="og-ds-page-header-breadcrumbs">
          {breadcrumbs}
        </div>
      ) : null}

      <div className="og-ds-page-header-main">
        <div className="og-ds-page-header-copy">
          {eyebrow ? (
            <div className="og-ds-page-header-eyebrow">
              {eyebrow}
            </div>
          ) : null}

          <h1 className="og-ds-page-header-title">
            {title}
          </h1>

          {description ? (
            <div className="og-ds-page-header-description">
              {description}
            </div>
          ) : null}

          {metadata && metadata.length > 0 ? (
            <dl className="og-ds-page-header-metadata">
              {metadata.map((item) => (
                <div
                  key={item.label}
                  className="og-ds-page-header-meta-item"
                >
                  <dt className="og-ds-page-header-meta-label">
                    {item.label}
                  </dt>

                  <dd className="og-ds-page-header-meta-value">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {actions ? (
          <div className="og-ds-page-header-actions">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}