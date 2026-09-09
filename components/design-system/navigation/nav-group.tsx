import {
  useId,
  type ReactNode,
} from "react";
import clsx from "clsx";

export type NavGroupProps = {
  label?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function NavGroup({
  label,
  description,
  children,
  className,
}: NavGroupProps) {
  const headingId = useId();

  return (
    <section
      className={clsx(
        "og-ds-nav-group",
        className,
      )}
      aria-labelledby={label ? headingId : undefined}
    >
      {label || description ? (
        <div className="og-ds-nav-group-header">
          {label ? (
            <div
              id={headingId}
              className="og-ds-nav-group-label"
            >
              {label}
            </div>
          ) : null}

          {description ? (
            <div className="og-ds-nav-group-description">
              {description}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="og-ds-nav-group-items">
        {children}
      </div>
    </section>
  );
}