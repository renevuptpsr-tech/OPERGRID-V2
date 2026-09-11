import type {
  ReactNode,
} from "react";

type StickyActionBarProps = {
  description?:
    string;

  children:
    ReactNode;
};

export function StickyActionBar({
  description,
  children,
}: StickyActionBarProps) {
  return (
    <div className="og-premium-sticky-action">
      <div className="og-premium-sticky-copy">
        {description ? (
          <p>
            {description}
          </p>
        ) : null}
      </div>

      <div className="og-premium-sticky-controls">
        {children}
      </div>
    </div>
  );
}