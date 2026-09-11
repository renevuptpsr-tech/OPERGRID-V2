"use client";

import type {
  ReactNode,
} from "react";

import {
  useTransition,
} from "react";

import {
  Button,
} from "@/components/design-system/primitives/button";

import {
  AlertDialog,
} from "@/components/design-system/overlays";

type ActionFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined;

type ConfirmedServerActionProps = {
  action:
    (
      formData:
        FormData,
    ) => Promise<void>;

  fields:
    Record<
      string,
      ActionFieldValue
    >;

  triggerLabel:
    string;

  confirmTitle:
    string;

  confirmDescription:
    ReactNode;

  confirmLabel:
    string;

  cancelLabel?:
    string;

  triggerVariant?:
    "primary"
    | "secondary"
    | "ghost"
    | "danger";

  triggerSize?:
    "sm"
    | "md"
    | "lg";

  triggerIcon?:
    ReactNode;

  disabled?:
    boolean;

  className?:
    string;

  children?:
    ReactNode;
};

function appendField(
  formData:
    FormData,
  key:
    string,
  value:
    ActionFieldValue,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return;
  }

  if (
    typeof value ===
    "boolean"
  ) {
    if (value) {
      formData.append(
        key,
        "true",
      );
    }

    return;
  }

  formData.append(
    key,
    String(value),
  );
}

export function ConfirmedServerAction({
  action,
  fields,
  triggerLabel,
  confirmTitle,
  confirmDescription,
  confirmLabel,
  cancelLabel = "Cancel",
  triggerVariant = "secondary",
  triggerSize = "md",
  triggerIcon,
  disabled = false,
  className,
  children,
}: ConfirmedServerActionProps) {
  const [
    pending,
    startTransition,
  ] =
    useTransition();

  function execute() {
    if (
      pending ||
      disabled
    ) {
      return;
    }

    const formData =
      new FormData();

    Object.entries(
      fields,
    ).forEach(
      ([
        key,
        value,
      ]) => {
        appendField(
          formData,
          key,
          value,
        );
      },
    );

    startTransition(
      async () => {
        await action(
          formData,
        );
      },
    );
  }

  return (
    <AlertDialog
      title={
        confirmTitle
      }
      description={
        confirmDescription
      }
      confirmLabel={
        pending
          ? "Processing..."
          : confirmLabel
      }
      cancelLabel={
        cancelLabel
      }
      loading={
        pending
      }
      disabled={
        disabled ||
        pending
      }
      onConfirm={
        execute
      }
      trigger={
        <Button
          type="button"
          variant={
            triggerVariant
          }
          size={
            triggerSize
          }
          leftIcon={
            triggerIcon
          }
          disabled={
            disabled ||
            pending
          }
          loading={
            pending
          }
          loadingText="Processing..."
          className={
            className
          }
        >
          {triggerLabel}
        </Button>
      }
    >
      {children}
    </AlertDialog>
  );
}