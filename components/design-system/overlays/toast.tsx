"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

import { IconButton } from "../primitives/icon-button";
import { useOverlayPortal } from "./use-overlay-portal";

export type ToastVariant =
  | "success"
  | "warning"
  | "danger"
  | "info";

export type ToastAction = {
  label: string;
  onClick: () => void;
  altText?: string;
};

export type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
};

type ToastRecord = ToastInput & {
  id: string;
  open: boolean;
};

export type ToastContextValue = {
  toast: (input: ToastInput) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
};

const ToastContext =
  createContext<ToastContextValue | null>(null);

let toastSequence = 0;

function createToastId() {
  toastSequence += 1;
  return `og-toast-${Date.now()}-${toastSequence}`;
}

function ToastIcon({
  variant,
}: {
  variant: ToastVariant;
}) {
  switch (variant) {
    case "success":
      return <CircleCheck size={18} aria-hidden="true" />;

    case "warning":
      return <TriangleAlert size={18} aria-hidden="true" />;

    case "danger":
      return <CircleX size={18} aria-hidden="true" />;

    default:
      return <Info size={18} aria-hidden="true" />;
  }
}

export type ToastProviderProps = {
  children: ReactNode;
  defaultDuration?: number;
  maxVisible?: number;
  label?: string;
};

export function ToastProvider({
  children,
  defaultDuration = 5000,
  maxVisible = 4,
  label = "Pemberitahuan",
}: ToastProviderProps) {
  const [toasts, setToasts] =
    useState<ToastRecord[]>([]);

  const {
    attachHost,
  } = useOverlayPortal();

  const toast = useCallback(
    (input: ToastInput) => {
      const id = createToastId();

      const next: ToastRecord = {
        ...input,
        id,
        open: true,
        variant: input.variant ?? "info",
        duration:
          input.duration ?? defaultDuration,
      };

      setToasts((current) => [
        ...current.slice(
          Math.max(0, current.length - maxVisible + 1),
        ),
        next,
      ]);

      return id;
    },
    [defaultDuration, maxVisible],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, open: false }
          : item,
      ),
    );
  }, []);

  const dismissAll = useCallback(() => {
    setToasts((current) =>
      current.map((item) => ({
        ...item,
        open: false,
      })),
    );
  }, []);

  const contextValue: ToastContextValue = {
    toast,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <span
        ref={attachHost}
        className="og-ds-toast-host"
      >
        <ToastPrimitive.Provider
          duration={defaultDuration}
          label={label}
          swipeDirection="right"
        >
          {children}

          {toasts.map((item) => {
            const variant =
              item.variant ?? "info";

            return (
              <ToastPrimitive.Root
                key={item.id}
                open={item.open}
                duration={item.duration}
                data-variant={variant}
                className="og-ds-toast"
                onOpenChange={(open) => {
                  if (open) {
                    return;
                  }

                  setToasts((current) =>
                    current.filter(
                      (toastItem) =>
                        toastItem.id !== item.id,
                    ),
                  );
                }}
              >
                <span
                  className="og-ds-toast-icon"
                  aria-hidden="true"
                >
                  <ToastIcon variant={variant} />
                </span>

                <div className="og-ds-toast-content">
                  <ToastPrimitive.Title className="og-ds-toast-title">
                    {item.title}
                  </ToastPrimitive.Title>

                  {item.description ? (
                    <ToastPrimitive.Description className="og-ds-toast-description">
                      {item.description}
                    </ToastPrimitive.Description>
                  ) : null}

                  {item.action ? (
                    <ToastPrimitive.Action
                      asChild
                      altText={
                        item.action.altText ??
                        item.action.label
                      }
                    >
                      <button
                        type="button"
                        className="og-ds-toast-action"
                        onClick={item.action.onClick}
                      >
                        {item.action.label}
                      </button>
                    </ToastPrimitive.Action>
                  ) : null}
                </div>

                <ToastPrimitive.Close asChild>
                  <IconButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Tutup pemberitahuan"
                  >
                    <X
                      size={15}
                      aria-hidden="true"
                    />
                  </IconButton>
                </ToastPrimitive.Close>
              </ToastPrimitive.Root>
            );
          })}

          <ToastPrimitive.Viewport className="og-ds-toast-viewport" />
        </ToastPrimitive.Provider>
      </span>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used within ToastProvider.",
    );
  }

  return context;
}