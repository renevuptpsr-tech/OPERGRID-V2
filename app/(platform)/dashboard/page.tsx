import {
  ArrowRight,
  Building2,
  Check,
  CircleAlert,
  KeyRound,
  Layers3,
  Network,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  getCurrentUserContext,
} from "@/features/auth/get-current-user-context";

function Capability({
  allowed,
}: {
  allowed: boolean;
}) {
  return allowed ? (
    <Check
      className="og-premium-check"
      size={14}
      strokeWidth={2.2}
    />
  ) : (
    <span className="og-premium-empty">
      —
    </span>
  );
}

function KpiCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="og-premium-kpi">
      <div>
        <div className="og-premium-kpi-label">
          {label}
        </div>

        <div className="og-premium-kpi-value">
          {value}
        </div>

        <div className="og-premium-kpi-hint">
          {hint}
        </div>
      </div>

      <div className="og-premium-kpi-icon">
        {icon}
      </div>
    </div>
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
    moduleAccess
      .filter(
        (module) =>
          module.can_view ===
          true,
      )
      .sort(
        (a, b) =>
          a.sort_order -
          b.sort_order,
      );

  const primaryAssignment =
    assignments.find(
      (assignment) =>
        assignment.is_primary,
    ) ??
    assignments[0] ??
    null;

  const displayName =
    profile?.display_name ??
    profile?.full_name ??
    user.email ??
    "User";

  const primaryRole =
    primaryAssignment?.role_name ??
    primaryAssignment?.role_code ??
    "No Role";

  const primaryScope =
    primaryAssignment?.scope_name ??
    "GLOBAL";

  const contextHasErrors =
    Boolean(
      errors.profile ||
      errors.assignments ||
      errors.moduleAccess,
    );

  const quickModules =
    activeModules
      .filter(
        (module) =>
          typeof module.route_path ===
            "string" &&
          module.route_path.length >
            0 &&
          module.module_code !==
            "DASHBOARD",
      )
      .slice(
        0,
        6,
      );

  return (
    <div className="og-premium-dashboard">
      <section className="og-premium-hero">
        <div>
          <div className="og-premium-eyebrow">
            <Network
              size={15}
              strokeWidth={2}
            />

            Grid Operations Intelligence
          </div>

          <h1 className="og-premium-hero-title">
            Keep Operations{" "}
            <span className="og-premium-hero-title-accent">
              Clear, Controlled & Reliable
            </span>
          </h1>

          <p className="og-premium-hero-description">
            Satu ruang kerja untuk
            mengelola aktivitas operasional,
            akses, monitoring, dan koordinasi
            OPERGRID secara konsisten.
          </p>

          <div className="og-premium-hero-status">
            {contextHasErrors ? (
              <span
                className="og-premium-status-ok"
                style={{
                  color:
                    "var(--og-warning)",
                }}
              >
                <CircleAlert
                  size={14}
                />

                Sebagian konteks belum tersedia
              </span>
            ) : (
              <span className="og-premium-status-ok">
                <span
                  className="og-premium-status-dot"
                  aria-hidden="true"
                />

                User context ready
              </span>
            )}

            <span>
              Signed in as {displayName}
            </span>
          </div>
        </div>

        <div className="og-premium-hero-side">
          <span className="og-premium-hero-side-label">
            Current Access
          </span>

          <strong className="og-premium-hero-side-value">
            {primaryRole}
          </strong>

          <span className="og-premium-hero-side-meta">
            Scope: {primaryScope}
          </span>

          <span className="og-premium-hero-side-meta">
            {activeModules.length} accessible
            module
            {activeModules.length ===
            1
              ? ""
              : "s"}
          </span>
        </div>
      </section>

      <section className="og-premium-kpi-grid">
        <KpiCard
          label="Current User"
          value={displayName}
          hint={
            profile?.status_code ??
            "Identity context"
          }
          icon={
            <UserRound
              size={18}
              strokeWidth={1.9}
            />
          }
        />

        <KpiCard
          label="Primary Role"
          value={primaryRole}
          hint={primaryScope}
          icon={
            <ShieldCheck
              size={18}
              strokeWidth={1.9}
            />
          }
        />

        <KpiCard
          label="Assignments"
          value={String(
            assignments.length,
          )}
          hint="Active access assignments"
          icon={
            <UsersRound
              size={18}
              strokeWidth={1.9}
            />
          }
        />

        <KpiCard
          label="Accessible Modules"
          value={String(
            activeModules.length,
          )}
          hint="Effective module access"
          icon={
            <KeyRound
              size={18}
              strokeWidth={1.9}
            />
          }
        />
      </section>

      <div className="og-premium-layout">
        <div className="og-premium-stack">
          <section className="og-premium-card">
            <header className="og-premium-card-header">
              <div className="og-premium-card-heading">
                <ShieldCheck
                  className="og-premium-card-heading-icon"
                  size={17}
                  strokeWidth={1.9}
                />

                <div>
                  <h2 className="og-premium-card-title">
                    Role & Scope
                  </h2>

                  <div className="og-premium-card-description">
                    Effective operational
                    authorization.
                  </div>
                </div>
              </div>

              <span className="og-premium-chip">
                {assignments.length} Active
              </span>
            </header>

            <div className="og-premium-card-body">
              {assignments.length ===
              0 ? (
                <div className="og-premium-empty">
                  Belum ada assignment aktif.
                </div>
              ) : (
                assignments.map(
                  (assignment) => (
                    <div
                      key={
                        assignment.assignment_id
                      }
                      className="og-premium-role"
                    >
                      <div>
                        <div className="og-premium-role-name">
                          {
                            assignment.role_name
                          }
                        </div>

                        <div className="og-premium-role-meta">
                          <span>
                            <Building2
                              size={12}
                              strokeWidth={1.8}
                              style={{
                                display:
                                  "inline",
                                marginRight:
                                  5,
                              }}
                            />

                            {assignment.scope_name ??
                              "GLOBAL"}
                          </span>

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

                      <div>
                        <span className="og-premium-chip">
                          {
                            assignment.role_code
                          }
                        </span>
                      </div>
                    </div>
                  ),
                )
              )}
            </div>
          </section>

          <section className="og-premium-card">
            <header className="og-premium-card-header">
              <div className="og-premium-card-heading">
                <Layers3
                  className="og-premium-card-heading-icon"
                  size={17}
                  strokeWidth={1.9}
                />

                <div>
                  <h2 className="og-premium-card-title">
                    Module Access
                  </h2>

                  <div className="og-premium-card-description">
                    Effective capabilities dari
                    seluruh role aktif.
                  </div>
                </div>
              </div>

              <span className="og-premium-chip">
                {activeModules.length} Modules
              </span>
            </header>

            <div className="og-premium-table-wrap">
              <table className="og-premium-table">
                <thead>
                  <tr>
                    <th>
                      Module
                    </th>

                    <th>
                      View
                    </th>

                    <th>
                      Create
                    </th>

                    <th>
                      Update
                    </th>

                    <th>
                      Submit
                    </th>

                    <th>
                      Verify
                    </th>

                    <th>
                      Approve
                    </th>

                    <th>
                      Export
                    </th>

                    <th>
                      Manage
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activeModules.map(
                    (module) => (
                      <tr
                        key={
                          module.module_id
                        }
                      >
                        <td>
                          <strong
                            style={{
                              color:
                                "var(--og-premium-text)",
                            }}
                          >
                            {
                              module.module_name
                            }
                          </strong>

                          <div
                            style={{
                              marginTop:
                                3,
                              color:
                                "var(--og-premium-text-muted)",
                              fontSize:
                                "0.56rem",
                            }}
                          >
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
                            index,
                          ) => (
                            <td
                              key={
                                index
                              }
                            >
                              <Capability
                                allowed={
                                  allowed
                                }
                              />
                            </td>
                          ),
                        )}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="og-premium-stack">
          <section className="og-premium-card">
            <header className="og-premium-card-header">
              <div className="og-premium-card-heading">
                <KeyRound
                  className="og-premium-card-heading-icon"
                  size={17}
                  strokeWidth={1.9}
                />

                <div>
                  <h2 className="og-premium-card-title">
                    Quick Access
                  </h2>

                  <div className="og-premium-card-description">
                    Modul yang tersedia untuk
                    akun ini.
                  </div>
                </div>
              </div>
            </header>

            <div className="og-premium-card-body">
              <div className="og-premium-quick-list">
                {quickModules.length ===
                0 ? (
                  <div className="og-premium-empty">
                    Tidak ada quick access.
                  </div>
                ) : (
                  quickModules.map(
                    (module) => (
                      <Link
                        key={
                          module.module_id
                        }
                        href={
                          module.route_path ??
                          "/dashboard"
                        }
                        className="og-premium-quick-link"
                      >
                        <Layers3
                          className="og-premium-quick-link-icon"
                          size={15}
                          strokeWidth={1.8}
                        />

                        {
                          module.module_name
                        }

                        <ArrowRight
                          className="og-premium-quick-link-arrow"
                          size={14}
                        />
                      </Link>
                    ),
                  )
                )}
              </div>
            </div>
          </section>

          <section className="og-premium-card">
            <header className="og-premium-card-header">
              <div className="og-premium-card-heading">
                <UserRound
                  className="og-premium-card-heading-icon"
                  size={17}
                  strokeWidth={1.9}
                />

                <div>
                  <h2 className="og-premium-card-title">
                    Identity
                  </h2>

                  <div className="og-premium-card-description">
                    Current OPERGRID profile.
                  </div>
                </div>
              </div>
            </header>

            <div className="og-premium-card-body">
              <div className="og-premium-identity-grid">
                <div className="og-premium-identity-row">
                  <span className="og-premium-identity-label">
                    Full Name
                  </span>

                  <span className="og-premium-identity-value">
                    {profile?.full_name ??
                      "-"}
                  </span>
                </div>

                <div className="og-premium-identity-row">
                  <span className="og-premium-identity-label">
                    Email
                  </span>

                  <span className="og-premium-identity-value">
                    {profile?.email ??
                      user.email ??
                      "-"}
                  </span>
                </div>

                <div className="og-premium-identity-row">
                  <span className="og-premium-identity-label">
                    Employee ID
                  </span>

                  <span className="og-premium-identity-value">
                    {profile?.employee_id ??
                      "-"}
                  </span>
                </div>

                <div className="og-premium-identity-row">
                  <span className="og-premium-identity-label">
                    Position
                  </span>

                  <span className="og-premium-identity-value">
                    {profile?.job_name ??
                      "-"}
                  </span>
                </div>

                <div className="og-premium-identity-row">
                  <span className="og-premium-identity-label">
                    Relationship
                  </span>

                  <span className="og-premium-identity-value">
                    {profile?.user_type_code ??
                      "-"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}