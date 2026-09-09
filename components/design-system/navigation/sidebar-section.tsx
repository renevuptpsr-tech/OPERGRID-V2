import {
  useId,
  type ReactNode,
} from "react";
import clsx from "clsx";

export type SidebarSectionProps = {
  label?: ReactNode;
  children: ReactNode;
  compact?: boolean;
  className?: string;
};

export function SidebarSection({
  label,
  children,
  compact = false,
  className,
}: SidebarSectionProps) {
  const labelId = useId();

  return (
    <section
      className={clsx(
        "og-ds-sidebar-section",
        className,
      )}
      data-compact={compact || undefined}
      aria-labelledby={label ? labelId : undefined}
    >
      {label ? (
        <div
          id={labelId}
          className="og-ds-sidebar-section-label"
        >
          {label}
        </div>
      ) : null}

      <div className="og-ds-sidebar-section-content">
        {children}
      </div>
    </section>
  );
}