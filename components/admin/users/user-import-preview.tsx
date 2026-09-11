"use client";

import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileSpreadsheet,
  LoaderCircle,
  RefreshCw,
  Search,
  Upload,
  X,
  XCircle,
} from "lucide-react";

import Link from "next/link";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Badge,
  Button,
  Panel,
} from "@/components/ui";

import {
  AlertDialog,
} from "@/components/design-system/overlays";

import type {
  UserImportAction,
  UserImportPreviewResult,
  UserImportSeverity,
} from "@/types/admin-user-import";


function actionLabel(
  action:
    UserImportAction
) {
  switch (
    action
  ) {

    case "CREATE_USER":
      return "Create User";

    case "PROVISION":
      return "Provision";

    case "ADD_ACCESS":
      return "Add Access";

    case "UPDATE_ACCESS":
      return "Update Access";

    case "NO_CHANGE":
      return "No Change";
  }
}


function severityBadge(
  severity:
    UserImportSeverity
) {
  switch (
    severity
  ) {

    case "READY":
      return {
        label:
          "Ready",

        variant:
          "success" as const,
      };

    case "WARNING":
      return {
        label:
          "Review",

        variant:
          "warning" as const,
      };

    case "ERROR":
      return {
        label:
          "Error",

        variant:
          "danger" as const,
      };
  }
}


type UserImportExecuteRow = {
  rowNumber: number;
  email: string;
  action: string;
  status:
    | "SUCCESS"
    | "FAILED"
    | "SKIPPED";
  message: string;
  userId:
    | string
    | null;
  addedAssignments: number;
};


type UserImportExecuteResult = {
  fileName: string;
  executedAt: string;
  summary: {
    totalUsers: number;
    successUsers: number;
    failedUsers: number;
    skippedUsers: number;
    addedAssignments: number;
  };
  rows:
    UserImportExecuteRow[];
};

export function UserImportPreview() {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );


  const [
    file,
    setFile,
  ] =
    useState<File | null>(
      null
    );


  const [
    loading,
    setLoading,
  ] =
    useState(
      false
    );


  const [
    preview,
    setPreview,
  ] =
    useState<UserImportPreviewResult | null>(
      null
    );


  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );


  const [
    search,
    setSearch,
  ] =
    useState(
      ""
    );


  const filteredRows =
    useMemo(
      () => {

        if (
          !preview
        ) {
          return [];
        }


        const query =
          search
            .trim()
            .toLowerCase();


        if (
          !query
        ) {
          return preview.rows;
        }


        return preview.rows.filter(
          (
            row
          ) =>
            [
              row.email,
              row.fullName,
              row.employeeId ??
                "",
              row.jobName ??
                "",
              row.organizationName ??
                "",
              actionLabel(
                row.action
              ),
            ]
              .join(
                " "
              )
              .toLowerCase()
              .includes(
                query
              )
        );
      },
      [
        preview,
        search,
      ]
    );


  const [
    importing,
    setImporting,
  ] =
    useState(
      false
    );


  const [
    executeResult,
    setExecuteResult,
  ] =
    useState<UserImportExecuteResult | null>(
      null
    );


  const [
    importError,
    setImportError,
  ] =
    useState<string | null>(
      null
    );


  const [
    importCompleted,
    setImportCompleted,
  ] =
    useState(
      false
    );

  async function analyze() {
    setExecuteResult(
      null
    );

    setImportError(
      null
    );

    setImportCompleted(
      false
    );
    if (
      !file ||
      loading
    ) {
      return;
    }


    setLoading(
      true
    );

    setError(
      null
    );

    setPreview(
      null
    );


    try {

      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );


      const response =
        await fetch(
          "/api/admin/users/import/preview",
          {
            method:
              "POST",

            body:
              formData,
          }
        );


      const payload =
        await response.json();


      if (
        !response.ok
      ) {
        throw new Error(
          typeof payload.error ===
            "string"
            ? payload.error
            : "Import preview gagal."
        );
      }


      setPreview(
        payload as UserImportPreviewResult
      );

    } catch (caughtError) {

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Import preview gagal."
      );

    } finally {

      setLoading(
        false
      );
    }
  }


  async function executeImport() {
    if (
      !file ||
      !preview ||
      importing ||
      importCompleted
    ) {
      return;
    }

    setImporting(
      true
    );

    setImportError(
      null
    );

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/admin/users/import/execute",
          {
            method:
              "POST",
            body:
              formData,
          }
        );

      const payload =
        await response.json();

      if (!response.ok) {
        throw new Error(
          typeof payload?.error ===
            "string"
            ? payload.error
            : "Bulk Import User gagal dijalankan."
        );
      }

      setExecuteResult(
        payload as UserImportExecuteResult
      );

      setImportCompleted(
        true
      );

    } catch (error) {
      setImportError(
        error instanceof Error
          ? error.message
          : "Bulk Import User gagal dijalankan."
      );

    } finally {
      setImporting(
        false
      );
    }
  }

  function reset() {
    setExecuteResult(
      null
    );

    setImportError(
      null
    );

    setImportCompleted(
      false
    );
    setFile(
      null
    );

    setPreview(
      null
    );

    setError(
      null
    );

    setSearch(
      ""
    );


    if (
      inputRef.current
    ) {
      inputRef.current.value =
        "";
    }
  }


  return (
    <div className="space-y-4">

      {/* ===================================================
          UPLOAD
         =================================================== */}

      <Panel
        variant="raised"
        padding="lg"
      >

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-3">

            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
              style={{
                color:
                  "var(--og-cyan-strong)",

                background:
                  "var(--og-cyan-soft)",
              }}
            >
              <FileSpreadsheet
                size={18}
                strokeWidth={1.8}
              />
            </div>


            <div>

              <h2 className="og-text text-[13px] font-semibold">
                Upload User Import Template
              </h2>


              <p className="og-muted mt-1 max-w-[520px] text-[8px] leading-4">
                Upload template .xlsx yang sudah diisi. OPERGRID akan melakukan validasi sebelum data dapat diimport.
              </p>


              <div className="mt-2">

                <Link
                  href="/api/admin/users/template"
                  className="text-[8px] font-semibold text-[var(--og-cyan-strong)] hover:underline"
                >
                  Download fresh template
                </Link>

              </div>

            </div>

          </div>


          <div className="flex flex-wrap items-center gap-2">

            <input
              ref={
                inputRef
              }
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(
                event
              ) => {
                const selected =
                  event.target.files
                    ?.[0] ??
                  null;


                setFile(
                  selected
                );

                setPreview(
                  null
                );

                setError(
                  null
                );
              }}
            />


            <Button
              type="button"
              variant="secondary"
              leftIcon={
                <Upload
                  size={14}
                />
              }
              disabled={
                loading
              }
              onClick={() =>
                inputRef.current
                  ?.click()
              }
            >
              Select Excel
            </Button>


            <Button
              type="button"
              leftIcon={
                loading
                  ? (
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />
                  )
                  : (
                    <Search
                      size={14}
                    />
                  )
              }
              disabled={
                !file ||
                loading
              }
              onClick={
                analyze
              }
            >
              {loading
                ? "Analyzing..."
                : "Analyze File"}
            </Button>

          </div>

        </div>


        {file && (
          <div
            className="mt-4 flex items-center justify-between gap-3 rounded-[10px] border px-3 py-2.5"
            style={{
              borderColor:
                "var(--og-border-soft)",

              background:
                "var(--og-surface-soft)",
            }}
          >

            <div className="min-w-0">

              <div className="og-text truncate text-[9px] font-semibold">
                {file.name}
              </div>

              <div className="og-muted mt-0.5 text-[7px]">
                {(file.size /
                  1024 /
                  1024)
                  .toFixed(
                    2
                  )} MB
              </div>

            </div>


            <button
              type="button"
              onClick={
                reset
              }
              disabled={
                loading
              }
              className="og-muted flex h-8 w-8 items-center justify-center rounded-[8px] transition hover:bg-[var(--og-surface-raised)] hover:text-[var(--og-text)]"
            >
              <X
                size={13}
              />
            </button>

          </div>
        )}

      </Panel>


      {/* ===================================================
          ERROR
         =================================================== */}

      {error && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-[#091521]/45 backdrop-blur-[2px]"
            onClick={() =>
              setError(
                null
              )
            }
          />


          <div
            className="relative z-10 w-full max-w-[420px] overflow-hidden rounded-[18px] border"
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
          >

            <div
              className="h-[3px]"
              style={{
                background:
                  "var(--og-danger)",
              }}
            />


            <div className="p-5">

              <div className="flex items-start gap-3">

                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
                  style={{
                    color:
                      "var(--og-danger)",

                    background:
                      "var(--og-danger-soft)",
                  }}
                >
                  <XCircle
                    size={18}
                  />
                </div>


                <div className="min-w-0 flex-1">

                  <div className="og-text text-[13px] font-semibold">
                    Import Preview Failed
                  </div>


                  <p className="og-muted mt-1 text-[8px] leading-4">
                    File tidak dapat diproses oleh validation engine.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setError(
                      null
                    )
                  }
                  className="og-muted flex h-8 w-8 items-center justify-center rounded-[8px]"
                >
                  <X
                    size={13}
                  />
                </button>

              </div>


              <div
                className="mt-4 rounded-[10px] border px-3 py-3 text-[9px] leading-5"
                style={{
                  borderColor:
                    "var(--og-border-soft)",

                  background:
                    "var(--og-surface-soft)",
                }}
              >
                {error}
              </div>


              <div className="mt-4 flex justify-end">

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setError(
                      null
                    )
                  }
                >
                  Done
                </Button>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* ===================================================
          PREVIEW
         =================================================== */}

      {preview && (
        <>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

            <Summary
              label="Total Users"
              value={
                preview.summary
                  .totalUsers
              }
            />


            <Summary
              label="Ready"
              value={
                preview.summary
                  .readyUsers
              }
              variant="success"
            />


            <Summary
              label="Review"
              value={
                preview.summary
                  .warningUsers
              }
              variant="warning"
            />


            <Summary
              label="Error"
              value={
                preview.summary
                  .errorUsers
              }
              variant="danger"
            />

          </div>


          <Panel
            variant="raised"
            padding="none"
          >

            <div
              className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between"
              style={{
                borderColor:
                  "var(--og-border-soft)",
              }}
            >

              <div>

                <h2 className="og-text text-[13px] font-semibold">
                  Import Preview
                </h2>


                <p className="og-muted mt-1 text-[8px]">
                  {preview.fileName}
                  {" · "}
                  {preview.summary
                    .totalAssignments}
                  {" access assignments"}
                </p>

              </div>


              <div className="flex items-center gap-2">

                <div
                  className="flex h-9 w-[260px] items-center gap-2 rounded-[9px] border px-3"
                  style={{
                    borderColor:
                      "var(--og-border-soft)",

                    background:
                      "var(--og-surface-soft)",
                  }}
                >
                  <Search
                    size={13}
                    className="og-muted"
                  />


                  <input
                    type="search"
                    value={
                      search
                    }
                    onChange={(
                      event
                    ) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search preview..."
                    className="og-text min-w-0 flex-1 bg-transparent text-[9px] outline-none"
                  />
                </div>


                <Button
                  type="button"
                  variant="secondary"
                  leftIcon={
                    <RefreshCw
                      size={13}
                    />
                  }
                  onClick={
                    reset
                  }
                >
                  Reset
                </Button>

              </div>

            </div>


            {preview.globalErrors.length >
            0 && (
              <div
                className="border-b px-4 py-3"
                style={{
                  borderColor:
                    "var(--og-border-soft)",
                }}
              >

                <div
                  className="rounded-[10px] border px-3 py-3"
                  style={{
                    color:
                      "var(--og-danger)",

                    background:
                      "var(--og-danger-soft)",

                    borderColor:
                      "color-mix(in srgb, var(--og-danger) 24%, transparent)",
                  }}
                >

                  <div className="text-[9px] font-semibold">
                    File-level validation errors
                  </div>


                  <div className="mt-2 space-y-1">

                    {preview.globalErrors.map(
                      (
                        message
                      ) => (
                        <div
                          key={
                            message
                          }
                          className="text-[8px]"
                        >
                          • {message}
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>
            )}


            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr
                    className="border-b"
                    style={{
                      borderColor:
                        "var(--og-border-soft)",
                    }}
                  >
                    <Th>
                      User
                    </Th>

                    <Th>
                      Action
                    </Th>

                    <Th>
                      Profile
                    </Th>

                    <Th>
                      Access
                    </Th>

                    <Th>
                      Validation
                    </Th>

                    <Th>
                      Status
                    </Th>
                  </tr>

                </thead>


                <tbody>

                  {filteredRows.map(
                    (
                      row
                    ) => {

                      const severity =
                        severityBadge(
                          row.severity
                        );


                      return (
                        <tr
                          key={
                            `${row.rowNumber}-${row.email}`
                          }
                          className="border-b align-top"
                          style={{
                            borderColor:
                              "var(--og-border-soft)",
                          }}
                        >

                          <td className="px-4 py-3">

                            <div className="og-text text-[9px] font-semibold">
                              {row.fullName ||
                                "—"}
                            </div>

                            <div className="og-muted mt-0.5 text-[8px]">
                              {row.email}
                            </div>

                            <div className="og-muted mt-1 text-[7px]">
                              USERS row {row.rowNumber}
                            </div>

                          </td>


                          <td className="px-4 py-3">

                            <Badge
                              variant={
                                row.action ===
                                  "CREATE_USER"
                                  ? "info"
                                  : row.action ===
                                      "PROVISION"
                                    ? "warning"
                                    : row.action ===
                                        "NO_CHANGE"
                                      ? "neutral"
                                      : "success"
                              }
                            >
                              {actionLabel(
                                row.action
                              )}
                            </Badge>

                          </td>


                          <td className="px-4 py-3">

                            <div className="og-secondary text-[8px] font-medium">
                              {row.jobName ??
                                "No Job"}
                            </div>

                            <div className="og-muted mt-0.5 text-[7px]">
                              {row.organizationName ??
                                "No Organization"}
                            </div>

                            <div className="og-muted mt-1 text-[7px]">
                              Auth:{" "}
                              {row.hasAuthAccount
                                ? "Existing"
                                : "New"}
                              {" · "}
                              Profile:{" "}
                              {row.hasProfile
                                ? "Existing"
                                : "New"}
                            </div>

                          </td>


                          <td className="px-4 py-3">

                            <div className="og-secondary text-[8px] font-medium">
                              {row.assignments.length} in file
                            </div>

                            <div className="og-muted mt-0.5 text-[7px]">
                              {row.activeAssignmentCount} existing active
                            </div>


                            {row.assignments.length >
                            0 && (
                              <div className="mt-2 space-y-1">

                                {row.assignments
                                  .slice(
                                    0,
                                    3
                                  )
                                  .map(
                                    (
                                      assignment
                                    ) => (
                                      <div
                                        key={
                                          assignment.rowNumber
                                        }
                                        className="og-muted text-[7px]"
                                      >
                                        {assignment.roleName}
                                        {assignment.scopeName
                                          ? ` · ${assignment.scopeName}`
                                          : ""}
                                      </div>
                                    )
                                  )}

                              </div>
                            )}

                          </td>


                          <td className="max-w-[340px] px-4 py-3">

                            {row.errors.length ===
                              0 &&
                            row.warnings.length ===
                              0 ? (

                              <div className="flex items-center gap-1.5 text-[8px] text-[var(--og-success)]">
                                <CheckCircle2
                                  size={12}
                                />
                                Validation passed
                              </div>

                            ) : (

                              <div className="space-y-1.5">

                                {row.errors.map(
                                  (
                                    message
                                  ) => (
                                    <div
                                      key={
                                        message
                                      }
                                      className="flex items-start gap-1.5 text-[7px] leading-4 text-[var(--og-danger)]"
                                    >
                                      <XCircle
                                        size={10}
                                        className="mt-0.5 shrink-0"
                                      />

                                      {message}
                                    </div>
                                  )
                                )}


                                {row.warnings.map(
                                  (
                                    message
                                  ) => (
                                    <div
                                      key={
                                        message
                                      }
                                      className="flex items-start gap-1.5 text-[7px] leading-4 text-[var(--og-warning)]"
                                    >
                                      <AlertTriangle
                                        size={10}
                                        className="mt-0.5 shrink-0"
                                      />

                                      {message}
                                    </div>
                                  )
                                )}

                              </div>
                            )}

                          </td>


                          <td className="px-4 py-3">

                            <Badge
                              variant={
                                severity.variant
                              }
                            >
                              {severity.label}
                            </Badge>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </Panel>


          <Panel
            variant="soft"
            padding="md"
          >

            <div className="space-y-4">

              {executeResult && (
                <div className="space-y-3">

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

                    <Summary
                      label="Success"
                      value={executeResult.summary.successUsers}
                      variant="success"
                    />

                    <Summary
                      label="Failed"
                      value={executeResult.summary.failedUsers}
                      variant="danger"
                    />

                    <Summary
                      label="Skipped"
                      value={executeResult.summary.skippedUsers}
                      variant="neutral"
                    />

                    <Summary
                      label="Access Added"
                      value={executeResult.summary.addedAssignments}
                      variant="success"
                    />

                  </div>

                  <div
                    className="max-h-56 overflow-auto rounded-[9px] border"
                    style={{
                      borderColor:
                        "var(--og-border)",
                    }}
                  >
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <Th>
                            User
                          </Th>
                          <Th>
                            Action
                          </Th>
                          <Th>
                            Result
                          </Th>
                          <Th>
                            Message
                          </Th>
                        </tr>
                      </thead>

                      <tbody>
                        {executeResult.rows.map(
                          (row) => (
                            <tr
                              key={`${row.rowNumber}-${row.email}`}
                              className="border-t"
                              style={{
                                borderColor:
                                  "var(--og-border)",
                              }}
                            >
                              <td className="px-3 py-2">
                                <div className="og-text text-[8px] font-medium">
                                  {row.email}
                                </div>
                              </td>

                              <td className="px-3 py-2">
                                <div className="og-muted text-[8px]">
                                  {row.action}
                                </div>
                              </td>

                              <td className="px-3 py-2">
                                <Badge
                                  variant={
                                    row.status === "SUCCESS"
                                      ? "success"
                                      : row.status === "FAILED"
                                        ? "danger"
                                        : "neutral"
                                  }
                                >
                                  {row.status}
                                </Badge>
                              </td>

                              <td className="px-3 py-2">
                                <div className="og-muted text-[8px]">
                                  {row.message}
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {importError && (
                <div
                  className="rounded-[9px] border px-3 py-2 text-[8px]"
                  style={{
                    borderColor:
                      "var(--og-danger)",
                    color:
                      "var(--og-danger)",
                  }}
                >
                  {importError}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="og-text text-[9px] font-semibold">
                    {importCompleted
                      ? "Import completed"
                      : "Ready to import"}
                  </div>

                  <p className="og-muted mt-0.5 text-[8px]">
                    {importCompleted
                      ? "Hasil import sudah diterapkan. Analyze ulang file sebelum menjalankan import berikutnya."
                      : "Server akan melakukan validasi ulang sebelum perubahan diterapkan."}
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <Link
                    href="/admin/users"
                    className="inline-flex h-9 items-center gap-2 rounded-[9px] border px-4 text-[9px] font-semibold"
                    style={{
                      borderColor:
                        "var(--og-border)",
                    }}
                  >
                    <ArrowLeft
                      size={13}
                    />

                    Back
                  </Link>

                  <AlertDialog
                    title="Confirm Bulk Import"
                    description="OPERGRID akan melakukan validasi ulang file di server lalu menerapkan seluruh user dan access yang valid. Existing access tidak akan dihapus."
                    confirmLabel={
                      importing
                        ? "Importing..."
                        : "Import Valid Users"
                    }
                    cancelLabel="Cancel"
                    loading={importing}
                    disabled={
                      importing ||
                      importCompleted ||
                      !file ||
                      preview.globalErrors.length > 0 ||
                      !preview.rows.some(
                        (row) =>
                          row.severity !== "ERROR" &&
                          row.action !== "NO_CHANGE"
                      )
                    }
                    onConfirm={executeImport}
                    trigger={
                      <Button
                        type="button"
                        loading={importing}
                        disabled={
                          importing ||
                          importCompleted ||
                          !file ||
                          preview.globalErrors.length > 0 ||
                          !preview.rows.some(
                        (row) =>
                          row.severity !== "ERROR" &&
                          row.action !== "NO_CHANGE"
                      )
                        }
                      >
                        Import Valid Users
                      </Button>
                    }
                  />

                </div>

              </div>

            </div>

          </Panel>

        </>
      )}

    </div>
  );
}


function Summary({
  label,
  value,
  variant =
    "neutral",
}: {
  label:
    string;

  value:
    number;

  variant?:
    "neutral" |
    "success" |
    "warning" |
    "danger";
}) {
  const color =
    variant ===
    "success"
      ? "var(--og-success)"
      : variant ===
          "warning"
        ? "var(--og-warning)"
        : variant ===
            "danger"
          ? "var(--og-danger)"
          : "var(--og-cyan-strong)";


  return (
    <Panel
      variant="raised"
      padding="md"
    >

      <div className="og-muted text-[8px] font-medium">
        {label}
      </div>

      <div
        className="mt-1 text-[18px] font-semibold"
        style={{
          color,
        }}
      >
        {value}
      </div>

    </Panel>
  );
}


function Th({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <th className="px-4 py-2.5 text-left text-[7px] font-semibold uppercase tracking-[0.08em] text-[var(--og-text-muted)]">
      {children}
    </th>
  );
}