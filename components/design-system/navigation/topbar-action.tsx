import {
  type ReactNode,
} from "react";

import {
  IconButton,
} from "../primitives/icon-button";
import {
  Tooltip,
} from "../overlays/tooltip";

export type TopbarActionProps = {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
};

export function TopbarAction({
  label,
  children,
  onClick,
  disabled = false,
  badge,
}: TopbarActionProps) {
  return (
    <span className="og-ds-topbar-action-host">
      <Tooltip
        content={label}
        side="bottom"
      >
        {(tooltipProps) => (
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            aria-label={label}
            aria-describedby={
              tooltipProps["aria-describedby"]
            }
            disabled={disabled}
            onClick={onClick}
          >
            {children}
          </IconButton>
        )}
      </Tooltip>

      {badge ? (
        <span className="og-ds-topbar-action-badge">
          {badge}
        </span>
      ) : null}
    </span>
  );
}