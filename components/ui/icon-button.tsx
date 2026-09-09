import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import clsx from "clsx";


type IconButtonVariant =
  | "default"
  | "ghost"
  | "danger";


type IconButtonSize =
  | "sm"
  | "md"
  | "lg";


type IconButtonProps = {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const variantClass: Record<
  IconButtonVariant,
  string
> = {
  default:
    "og-ui-icon-button",

  ghost:
    "og-ui-icon-button-ghost",

  danger:
    "og-ui-icon-button-danger",
};


const sizeClass: Record<
  IconButtonSize,
  string
> = {
  sm:
    "h-8 w-8",

  md:
    "h-9 w-9",

  lg:
    "h-10 w-10",
};


export function IconButton({
  icon,
  label,
  variant = "default",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={
        label
      }
      title={
        label
      }
      className={clsx(
        "inline-flex items-center justify-center rounded-[10px]",
        "transition-colors duration-120",
        variantClass[
          variant
        ],
        sizeClass[
          size
        ],
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}