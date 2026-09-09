import {
  Activity,
  Building2,
  Check,
  Database,
  KeyRound,
  Layers3,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  redirect,
} from "next/navigation";

import {
  getCurrentUserContext,
} from "@/features/auth/get-current-user-context";

import {
  Badge,
  DataTableShell,
  Panel,
  SectionHeader,
} from "@/components/ui";


function InfoField({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | null
    | undefined;
}) {
  return (
    <div>
      <dt className="og-muted text-[10px]">
        {label}
      </dt>

      <dd className="og-text mt-1 text-[12px] font-medium">
        {value || "-"}
      </dd>
    </div>
  );
}


function PermissionIndicator({
  allowed,
}: {
  allowed: boolean;
}) {
  if (!allowed) {
    return (
      <span className="og-subtle">
        —
      </span>
    );
  }

  return (
    <span className="og-permission-yes">
      <Check
        size={11}
        strokeWidth={2.3}
      />
    </span>
  );
}


function SummaryCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Panel
      variant="raised"
      padding="md"
      className="min-h-[118px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[10px]"
          style={{
            color:
              "var(--og-cyan-strong)",
            background:
              "var(--og-cyan-soft)",
          }}
        >
          {icon}
        </div>

        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background:
              "var(--og-teal)",
          }}
        />
      </div>

      <div className="mt-4">
        <div className="og-muted text-[9px] font-semibold uppercase tracking-[0.10em]">
          {label}
        </div>

        <div className="og-text mt-1 text-[18px] font-semibold tracking-[-0.02em]">
          {value}
        </div>

        <div className="og-muted mt-1 text-[9px]">
          {hint}
        </div>
      </div>
    </Panel>
  );
}


export default async function DashboardPage() {
  const context =
    await getCurrentUserContext();

  if (!context) {
    redirect("/login");
  }

  const {
    user,
    profile,
    assignments,
    moduleAccess,
    errors,
  } = context;

  const activeModules =
    moduleAccess.filter(
      (module) =>
        module.can_view === true
    );

  const primaryAssignment =
    assignments.find(
      (assignment) =>
        assignment.is_primary
    ) ??
    assignments[0] ??
    null;

  const primaryRole =
    primaryAssignment?.role_name ??
    primaryAssignment?.role_code ??
    "No Role";

  const primaryScope =
    primaryAssignment?.scope_name ??
    "GLOBAL";

  const visibleModuleCount =
    activeModules.length;

  const activeAssignmentCount =
    assignments.length;

  const contextHasErrors =
    Boolean(
      errors.profile ||
      errors.assignments ||
      errors.moduleAccess
    );

  return (
    <div className="space-y-5">

      {/* =====================================================
          SYSTEM CONTEXT ALERT
         ===================================================== */}

      {contextHasErrors && (
        <Panel
          variant="soft"
          padding="md"
          className="border-[var(--og-warning)]"
        >
          <div className="flex items-start gap-3">
            <Activity
              size={17}
              strokeWidth={1.8}
              style={{
                color:
                  "var(--og-warning)",
              }}
            />

            <div>
              <div
                className="text-[11px] font-semibold"
                style={{
                  color:
                    "var(--og-warning)",
                }}
              >
                Sebagian konteks pengguna gagal dimuat
              </div>

              <div className="og-muted mt-1 space-y-0.5 text-[9px]">
                {errors.profile && (
                  <div>
                    Profile: {errors.profile}
                  </div>
                )}

                {errors.assignments && (
                  <div>
                    Assignment: {errors.assignments}
                  </div>
                )}

                {errors.moduleAccess && (
                  <div>
                    Module Access: {errors.moduleAccess}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Panel>
      )}


      {/* =====================================================
          SUMMARY
         ===================================================== */}

      <section>
        <SectionHeader
          title="Overview"
          description="Ringkasan identitas dan akses aktif OPERGRID."
          icon={
            <Layers3
              size={17}
              strokeWidth={1.8}
            />
          }
          compact
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            icon={
              <UserRound
                size={17}
                strokeWidth={1.8}
              />
            }
            label="Current User"
            value={
              profile?.display_name ??
              profile?.full_name ??
              user.email ??
              "User"
            }
            hint="OPERGRID V2 identity"
          />

          <SummaryCard
            icon={
              <ShieldCheck
                size={17}
                strokeWidth={1.8}
              />
            }
            label="Primary Role"
            value={primaryRole}
            hint={primaryScope}
          />

          <SummaryCard
            icon={
              <UsersRound
                size={17}
                strokeWidth={1.8}
              />
            }
            label="Assignments"
            value={
              String(
                activeAssignmentCount
              )
            }
            hint="Active role assignments"
          />

          <SummaryCard
            icon={
              <KeyRound
                size={17}
                strokeWidth={1.8}
              />
            }
            label="Modules"
            value={
              String(
                visibleModuleCount
              )
            }
            hint="Accessible modules"
          />

        </div>
      </section>


      {/* =====================================================
          IDENTITY & ROLE
         ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">

        <Panel
          variant="default"
          padding="lg"
        >
          <SectionHeader
            title="User Profile"
            description="Identity information dari OPERGRID V2."
            icon={
              <UserRound
                size={17}
                strokeWidth={1.8}
              />
            }
          />

          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">

            <InfoField
              label="Nama Lengkap"
              value={
                profile?.full_name
              }
            />

            <InfoField
              label="Display Name"
              value={
                profile?.display_name ??
                profile?.full_name
              }
            />

            <InfoField
              label="Email"
              value={
                profile?.email ??
                user.email
              }
            />

            <InfoField
              label="Employee ID"
              value={
                profile?.employee_id
              }
            />

            <InfoField
              label="Jabatan"
              value={
                profile?.job_name
              }
            />

            <InfoField
              label="User Type"
              value={
                profile?.user_type_code
              }
            />

            <InfoField
              label="Telegram"
              value={
                profile?.telegram_username
                  ? `@${profile.telegram_username}`
                  : "-"
              }
            />

            <div>
              <dt className="og-muted text-[10px]">
                Status
              </dt>

              <dd className="mt-1">
                <Badge
                  variant={
                    profile?.status_code ===
                    "ACTIVE"
                      ? "success"
                      : "warning"
                  }
                  dot
                >
                  {profile?.status_code ??
                    "UNKNOWN"}
                </Badge>
              </dd>
            </div>

          </dl>
        </Panel>


        <Panel
          variant="focal"
          padding="lg"
        >
          <div className="mb-5 flex items-start justify-between gap-4">

            <div className="flex items-start gap-3">

              <div
                className="flex h-9 w-9 items-center justify-center rounded-[10px]"
                style={{
                  color:
                    "var(--og-cyan)",
                  background:
                    "rgba(32,183,216,0.10)",
                }}
              >
                <ShieldCheck
                  size={17}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="text-[13px] font-semibold text-[#eff8fb]">
                  Role & Scope
                </h2>

                <p className="mt-0.5 text-[9px] text-[#8194a3]">
                  Active authorization assignments
                </p>
              </div>

            </div>


            <Badge
              variant="focal"
            >
              {assignments.length} Active
            </Badge>

          </div>


          {assignments.length ===
          0 ? (
            <div
              className="rounded-[12px] p-4 text-[10px]"
              style={{
                color:
                  "#b8c6d1",
                background:
                  "rgba(255,255,255,0.035)",
                border:
                  "1px solid rgba(32,183,216,0.13)",
              }}
            >
              Belum ada role assignment aktif.
            </div>
          ) : (
            <div className="space-y-3">

              {assignments.map(
                (assignment) => (
                  <div
                    key={
                      assignment.assignment_id
                    }
                    className="rounded-[12px] p-4"
                    style={{
                      background:
                        "rgba(255,255,255,0.035)",
                      border:
                        "1px solid rgba(32,183,216,0.13)",
                    }}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="flex items-center gap-2">

                          <ShieldCheck
                            size={14}
                            strokeWidth={1.8}
                            style={{
                              color:
                                "var(--og-cyan)",
                            }}
                          />

                          <span className="text-[12px] font-semibold text-[#eff8fb]">
                            {
                              assignment.role_name
                            }
                          </span>

                        </div>


                        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#b8c6d1]">

                          <Building2
                            size={13}
                            strokeWidth={1.8}
                          />

                          {
                            assignment.scope_name ??
                            "GLOBAL"
                          }

                        </div>

                      </div>


                      <div className="flex flex-col items-end gap-1.5">

                        <Badge
                          variant="focal"
                        >
                          {
                            assignment.role_code
                          }
                        </Badge>

                        {assignment.is_primary && (
                          <span
                            className="text-[8px] font-semibold uppercase tracking-[0.12em]"
                            style={{
                              color:
                                "var(--og-teal)",
                            }}
                          >
                            Primary
                          </span>
                        )}

                      </div>

                    </div>


                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[9px] text-[#8194a3]">

                      <span>
                        Scope:{" "}
                        {
                          assignment.role_scope_level
                        }
                      </span>

                      <span>
                        Children:{" "}
                        {assignment.include_children
                          ? "Included"
                          : "Excluded"}
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </Panel>

      </div>


      {/* =====================================================
          MODULE ACCESS
         ===================================================== */}

      <Panel
        variant="default"
        padding="lg"
      >
        <SectionHeader
          title="Module Access"
          description="Effective capability berdasarkan seluruh role aktif pengguna."
          icon={
            <KeyRound
              size={17}
              strokeWidth={1.8}
            />
          }
          action={
            <Badge
              variant="info"
            >
              {visibleModuleCount} Modules
            </Badge>
          }
        />


        <DataTableShell
          minWidth="1000px"
        >
          <table className="w-full text-[10px]">

            <thead
              style={{
                background:
                  "var(--og-surface-soft)",
              }}
            >
              <tr className="og-muted text-left text-[8px] font-semibold uppercase tracking-[0.11em]">

                <th className="px-4 py-3.5">
                  Module
                </th>

                {[
                  "View",
                  "Create",
                  "Update",
                  "Submit",
                  "Verify",
                  "Approve",
                  "Export",
                  "Manage",
                ].map(
                  (label) => (
                    <th
                      key={label}
                      className="px-3 py-3.5 text-center"
                    >
                      {label}
                    </th>
                  )
                )}

              </tr>
            </thead>


            <tbody>

              {activeModules.map(
                (module) => (
                  <tr
                    key={
                      module.module_id
                    }
                    className="border-t transition-colors duration-100 hover:bg-[var(--og-surface-soft)]"
                    style={{
                      borderColor:
                        "var(--og-border-soft)",
                    }}
                  >

                    <td className="px-4 py-4">

                      <div className="og-text text-[11px] font-semibold">
                        {
                          module.module_name
                        }
                      </div>

                      <div className="og-muted mt-1 text-[8px]">
                        {
                          module.module_code
                        }
                      </div>

                    </td>


                    {[
                      module.can_view,
                      module.can_create,
                      module.can_update,
                      module.can_submit,
                      module.can_verify,
                      module.can_approve,
                      module.can_export,
                      module.can_manage,
                    ].map(
                      (
                        allowed,
                        index
                      ) => (
                        <td
                          key={index}
                          className="px-3 py-4 text-center"
                        >
                          <PermissionIndicator
                            allowed={
                              allowed
                            }
                          />
                        </td>
                      )
                    )}

                  </tr>
                )
              )}

            </tbody>

          </table>
        </DataTableShell>
      </Panel>


      {/* =====================================================
          PLATFORM CONTEXT
         ===================================================== */}

      <Panel
        variant="soft"
        padding="md"
      >
        <div className="flex items-center gap-3">

          <div
            className="flex h-8 w-8 items-center justify-center rounded-[9px]"
            style={{
              color:
                "var(--og-cyan-strong)",
              background:
                "var(--og-cyan-soft)",
            }}
          >
            <Database
              size={15}
              strokeWidth={1.8}
            />
          </div>

          <div>

            <div className="og-text text-[10px] font-semibold">
              OPERGRID V2 Platform Context
            </div>

            <div className="og-muted mt-0.5 text-[9px]">
              Identity, role assignment, scope, dan module access menggunakan foundation OPERGRID V2.
            </div>

          </div>

          <div className="ml-auto hidden sm:block">
            <Badge
              variant="success"
              dot
            >
              Connected
            </Badge>
          </div>

        </div>
      </Panel>

    </div>
  );
}