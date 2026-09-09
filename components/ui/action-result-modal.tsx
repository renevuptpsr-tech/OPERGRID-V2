"use client";

import {
  CheckCircle2,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";


type ResultType =
  | "success"
  | "error"
  | "warning"
  | "info";


function resolveMeta(
  result: ResultType,
  action: string | null
) {
  if (action) {
    return {
      title: action,

      subtitle:
        result === "success"
          ? "Changes are now active in OPERGRID."
          : result === "error"
            ? "The requested action could not be completed."
            : result === "warning"
              ? "Please review the information before continuing."
              : "The requested operation has been completed.",
    };
  }


  if (result === "success") {
    return {
      title: "Update Successful",
      subtitle:
        "Changes are now active in OPERGRID.",
    };
  }


  if (result === "error") {
    return {
      title: "Action Failed",
      subtitle:
        "The requested action could not be completed.",
    };
  }


  if (result === "warning") {
    return {
      title: "Attention Required",
      subtitle:
        "Please review the information before continuing.",
    };
  }


  return {
    title: "Information",
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
      "result"
    );

  const message =
    searchParams.get(
      "message"
    );

  const action =
    searchParams.get(
      "action"
    );


  const result:
    | ResultType
    | null =
    rawResult === "success" ||
    rawResult === "error" ||
    rawResult === "warning" ||
    rawResult === "info"
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
      action
    );


  const visual =
    {
      success: {
        icon: CheckCircle2,
        color: "var(--og-success)",
        soft: "var(--og-success-soft)",
      },

      error: {
        icon: CircleAlert,
        color: "var(--og-danger)",
        soft: "var(--og-danger-soft)",
      },

      warning: {
        icon: TriangleAlert,
        color: "var(--og-warning)",
        soft: "var(--og-warning-soft)",
      },

      info: {
        icon: Info,
        color: "var(--og-cyan-strong)",
        soft: "var(--og-cyan-soft)",
      },
    }[result];


  const Icon =
    visual.icon;


  function closeModal() {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );


    params.delete(
      "result"
    );

    params.delete(
      "message"
    );

    params.delete(
      "action"
    );


    const query =
      params.toString();


    router.replace(
      query
        ? `${pathname}?${query}`
        : pathname,
      {
        scroll: false,
      }
    );
  }


  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-[#091521]/45 backdrop-blur-[2px]"
        onClick={
          closeModal
        }
      />


      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[20px] border"
        style={{
          color:
            "var(--og-text)",

          background:
            "var(--og-surface-raised)",

          borderColor:
            "var(--og-border)",

          boxShadow:
            "0 24px 70px rgba(7,17,28,0.24)",
        }}
        onClick={(
          event
        ) =>
          event.stopPropagation()
        }
      >

        <div
          className="h-[3px] w-full"
          style={{
            background:
              visual.color,
          }}
        />


        <div className="p-5">

          <div className="flex items-start gap-3.5">

            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
              style={{
                color:
                  visual.color,

                background:
                  visual.soft,
              }}
            >
              <Icon
                size={18}
                strokeWidth={1.9}
              />
            </div>


            <div className="min-w-0 flex-1">

              <h2 className="og-text text-[14px] font-semibold tracking-[-0.01em]">
                {meta.title}
              </h2>

              <p className="og-muted mt-1 text-[9px] leading-4">
                {meta.subtitle}
              </p>

            </div>


            <button
              type="button"
              onClick={
                closeModal
              }
              aria-label="Close"
              className="og-modal-interactive og-muted -mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] transition hover:bg-[var(--og-surface-soft)] hover:text-[var(--og-text)]"
            >
              <X
                size={14}
              />
            </button>

          </div>


          <div
            className="mt-4 rounded-[12px] border px-4 py-3"
            style={{
              background:
                "var(--og-surface-soft)",

              borderColor:
                "var(--og-border-soft)",
            }}
          >
            <p className="og-secondary text-[10px] leading-5">
              {message}
            </p>
          </div>


          <div className="mt-4 flex items-center justify-between gap-3">

            <div className="og-muted text-[8px]">
              OPERGRID · User Management
            </div>


            <button
              type="button"
              onClick={
                closeModal
              }
              className="og-modal-interactive inline-flex h-9 min-w-[74px] items-center justify-center rounded-[10px] px-4 text-[10px] font-semibold transition"
              style={{
                color:
                  result === "success"
                    ? "#ffffff"
                    : "var(--og-text)",

                background:
                  result === "success"
                    ? "var(--og-cyan-strong)"
                    : "var(--og-surface-soft)",

                border:
                  result === "success"
                    ? "1px solid transparent"
                    : "1px solid var(--og-border)",
              }}
            >
              Done
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}