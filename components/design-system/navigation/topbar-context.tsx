import {
  type ReactNode,
} from "react";

export type TopbarContextProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  indicator?: ReactNode;
};

export function TopbarContext({
  title,
  subtitle,
  indicator,
}: TopbarContextProps) {
  return (
    <div className="og-ds-topbar-context-lockup">
      {indicator ? (
        <span className="og-ds-topbar-context-indicator">
          {indicator}
        </span>
      ) : null}

      <span className="og-ds-topbar-context-copy">
        {title ? (
          <span className="og-ds-topbar-context-title">
            {title}
          </span>
        ) : null}

        {subtitle ? (
          <span className="og-ds-topbar-context-subtitle">
            {subtitle}
          </span>
        ) : null}
      </span>
    </div>
  );
}