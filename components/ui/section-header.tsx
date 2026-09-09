import type {
  ReactNode,
} from "react";

import clsx from "clsx";


type SectionHeaderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};


export function SectionHeader({
  title,
  description,
  icon,
  action,
  compact = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-start justify-between gap-4",
        compact
          ? "mb-3"
          : "mb-5",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {icon && (
          <div className="og-ui-section-icon">
            {icon}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="og-text text-[13px] font-semibold">
            {title}
          </h2>

          {description && (
            <p className="og-muted mt-0.5 text-[9px]">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}