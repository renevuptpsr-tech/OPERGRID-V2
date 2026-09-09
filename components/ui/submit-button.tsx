"use client";

import {
  LoaderCircle,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import {
  useFormStatus,
} from "react-dom";

import {
  Button,
} from "@/components/ui/button";


type SubmitButtonProps = {
  children: ReactNode;

  pendingText?: string;

  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger";

  size?:
    | "sm"
    | "md"
    | "lg";

  leftIcon?: ReactNode;

  className?: string;

  disabled?: boolean;
};


export function SubmitButton({
  children,
  pendingText =
    "Processing...",
  variant =
    "primary",
  size =
    "md",
  leftIcon,
  className,
  disabled =
    false,
}: SubmitButtonProps) {
  const {
    pending,
  } =
    useFormStatus();


  const isDisabled =
    pending ||
    disabled;


  return (
    <Button
      type="submit"
      variant={
        variant
      }
      size={
        size
      }
      disabled={
        isDisabled
      }
      leftIcon={
        pending
          ? (
            <LoaderCircle
              size={14}
              strokeWidth={1.8}
              className="animate-spin"
            />
          )
          : leftIcon
      }
      className={
        className
      }
      aria-busy={
        pending
      }
    >
      {pending
        ? pendingText
        : children}
    </Button>
  );
}