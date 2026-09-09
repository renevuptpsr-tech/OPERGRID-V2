import {
  type ReactNode,
} from "react";
import clsx from "clsx";

export type TopbarProps = {
  navigationControl?: ReactNode;
  context?: ReactNode;
  actions?: ReactNode;
  userControl?: ReactNode;
  className?: string;
};

export function Topbar({
  navigationControl,
  context,
  actions,
  userControl,
  className,
}: TopbarProps) {
  return (
    <header
      className={clsx(
        "og-ds-topbar",
        className,
      )}
      aria-label="Bilah aplikasi"
    >
      <div className="og-ds-topbar-start">
        {navigationControl ? (
          <div className="og-ds-topbar-nav-control">
            {navigationControl}
          </div>
        ) : null}

        {context ? (
          <div className="og-ds-topbar-context">
            {context}
          </div>
        ) : null}
      </div>

      <div className="og-ds-topbar-end">
        {actions ? (
          <div className="og-ds-topbar-actions">
            {actions}
          </div>
        ) : null}

        {userControl ? (
          <div className="og-ds-topbar-user">
            {userControl}
          </div>
        ) : null}
      </div>
    </header>
  );
}