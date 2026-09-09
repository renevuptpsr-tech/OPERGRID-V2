import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import clsx from "clsx";


type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";


type ButtonSize =
  | "sm"
  | "md"
  | "lg";


type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const variantClass: Record<
  ButtonVariant,
  string
> = {
  primary:
    "og-ui-button-primary",

  secondary:
    "og-ui-button-secondary",

  ghost:
    "og-ui-button-ghost",

  danger:
    "og-ui-button-danger",
};


const sizeClass: Record<
  ButtonSize,
  string
> = {
  sm:
    "h-8 px-3 text-[11px]",

  md:
    "h-9 px-3.5 text-[12px]",

  lg:
    "h-10 px-4 text-[12px]",
};


export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={
        disabled ||
        loading
      }
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium",
        "transition-colors duration-120",
        "disabled:cursor-not-allowed disabled:opacity-55",
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
      {loading ? (
        <span className="og-ui-spinner" />
      ) : (
        leftIcon
      )}

      <span>
        {children}
      </span>

      {!loading &&
        rightIcon}
    </button>
  );
}