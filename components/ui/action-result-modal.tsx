"use client";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
} from "lucide-react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
} from "@/components/design-system/overlays";

type ResultType =
  | "success"
  | "error"
  | "warning"
  | "info";

function resolveMeta(
  result:
    ResultType,
  action:
    string |
    null,
) {
  if (action) {
    return {
      title:
        action,

      subtitle:
        result ===
        "success"
          ? "Changes are now active in OPERGRID."
          : result ===
            "error"
            ? "The requested action could not be completed."
            : result ===
              "warning"
              ? "Please review the information before continuing."
              : "The requested operation has been completed.",
    };
  }

  if (
    result ===
    "success"
  ) {
    return {
      title:
        "Update Successful",

      subtitle:
        "Changes are now active in OPERGRID.",
    };
  }

  if (
    result ===
    "error"
  ) {
    return {
      title:
        "Action Failed",

      subtitle:
        "The requested action could not be completed.",
    };
  }

  if (
    result ===
    "warning"
  ) {
    return {
      title:
        "Attention Required",

      subtitle:
        "Please review the information before continuing.",
    };
  }

  return {
    title:
      "Information",

    subtitle:
      "The requested operation has been completed.",
  };
}

export function ActionResultModal() {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const rawResult =
    searchParams.get(
      "result",
    );

  const message =
    searchParams.get(
      "message",
    );

  const action =
    searchParams.get(
      "action",
    );

  const result:
    | ResultType
    | null =
    rawResult ===
      "success" ||
    rawResult ===
      "error" ||
    rawResult ===
      "warning" ||
    rawResult ===
      "info"
      ? rawResult
      : null;

  if (
    !result ||
    !message
  ) {
    return null;
  }

  const meta =
    resolveMeta(
      result,
      action,
    );

  const visual = {
    success: {
      icon:
        CheckCircle2,
    },
    error: {
      icon:
        CircleAlert,
    },
    warning: {
      icon:
        TriangleAlert,
    },
    info: {
      icon:
        Info,
    },
  }[result];

  const Icon =
    visual.icon;

  function closeModal() {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    params.delete(
      "result",
    );

    params.delete(
      "message",
    );

    params.delete(
      "action",
    );

    const query =
      params.toString();

    router.replace(
      query
        ? `${pathname}?${query}`
        : pathname,
      {
        scroll:
          false,
      },
    );
  }

  return (
    <Dialog
      open
      onOpenChange={(
        open,
      ) => {
        if (!open) {
          closeModal();
        }
      }}
      title={
        meta.title
      }
      description={
        meta.subtitle
      }
      size="sm"
      closeLabel="Close result"
      contentClassName="og-result-dialog"
    >
      <div
        className="og-result-dialog-content"
        data-result={
          result
        }
      >
        <div className="og-result-dialog-icon">
          <Icon
            size={21}
            strokeWidth={1.9}
          />
        </div>

        <div className="og-result-dialog-message">
          {message}
        </div>

        <div className="og-result-dialog-footer">
          <span>
            OPERGRID · User Management
          </span>

          <Button
            type="button"
            variant={
              result ===
              "success"
                ? "primary"
                : "secondary"
            }
            onClick={
              closeModal
            }
          >
            Done
          </Button>
        </div>
      </div>
    </Dialog>
  );
}