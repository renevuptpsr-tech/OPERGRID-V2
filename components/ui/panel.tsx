import type {
  HTMLAttributes,
  ReactNode,
} from "react";

import clsx from "clsx";


type PanelVariant =
  | "default"
  | "raised"
  | "soft"
  | "focal";


type PanelPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";


type PanelProps = {
  children: ReactNode;
  variant?: PanelVariant;
  padding?: PanelPadding;
  interactive?: boolean;
} & HTMLAttributes<HTMLDivElement>;


const variantClass: Record<
  PanelVariant,
  string
> = {
  default:
    "og-ui-panel",

  raised:
    "og-ui-panel-raised",

  soft:
    "og-ui-panel-soft",

  focal:
    "og-ui-panel-focal",
};


const paddingClass: Record<
  PanelPadding,
  string
> = {
  none:
    "",

  sm:
    "p-3",

  md:
    "p-4",

  lg:
    "p-5",
};


export function Panel({
  children,
  variant = "default",
  padding = "md",
  interactive = false,
  className,
  ...props
}: PanelProps) {
  return (
    <div
      className={clsx(
        "rounded-[14px]",
        variantClass[
          variant
        ],
        paddingClass[
          padding
        ],
        interactive &&
          "og-ui-panel-interactive",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}