"use client";

import {
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Download,
  FileDown,
  KeyRound,
  Search,
  ShieldCheck,
  Upload,
  UserRound,
  UsersRound,
} from "lucide-react";

import Link from "next/link";

import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ConfirmedServerAction,
} from "@/components/ui/confirmed-server-action";

import {
  forceDeleteV2UserAction,
} from "@/app/(platform)/admin/users/actions";

import {
  Badge,
} from "@/components/ui";

import {
  UserDirectoryFilterModal,
  type UserDirectoryFilters,
} from "@/components/admin/users/user-directory-filter-modal";

import type {
  AdminDirectoryScopeHierarchyNode,
  AdminUserDirectoryRow,
  UserDirectoryState,
} from "@/services/admin-user-directory-service";


type UserDirectoryProps = {
  users:
    AdminUserDirectoryRow[];

  scopes:
    AdminDirectoryScopeHierarchyNode[];

  canManageUsers:
    boolean;

  canExportUsers:
    boolean;

  canForceDeleteUsers:
    boolean;
};


const defaultFilters:
  UserDirectoryFilters = {
    status:
      "ALL",

    roleCode:
      "",

    uptScopeId:
      "",

    ultgScopeId:
      "",

    giScopeId:
      "",
  };


function stateBadge(
  state:
    UserDirectoryState,
) {
  switch (
    state
  ) {
    case "ASSIGNED":
      return {
        label:
          "Assigned",

        variant:
          "success" as const,
      };

    case "PENDING_PROVISIONING":
      return {
        label:
          "Pending Provisioning",

        variant:
          "warning" as const,
      };

    case "UNASSIGNED":
      return {
        label:
          "No Access",

        variant:
          "info" as const,
      };

    case "INACTIVE":
      return {
        label:
          "Inactive",

        variant:
          "neutral" as const,
      };
  }
}


function DirectoryMetric({
  icon,
  label,
  value,
  description,
}: {
  icon:
    ReactNode;

  label:
    string;

  value:
    number;

  description:
    string;
}) {
  return (
    <article className="og-admin-directory-metric">
      <div className="og-admin-directory-metric-copy">
        <span className="og-admin-directory-metric-label">
          {label}
        </span>

        <strong className="og-admin-directory-metric-value">
          {value}
        </strong>

        <span className="og-admin-directory-metric-description">
          {description}
        </span>
      </div>

      <div className="og-admin-directory-metric-icon">
        {icon}
      </div>
    </article>
  );
}


function TableHead({
  children,
  align = "left",
}: {
  children:
    ReactNode;

  align?:
    | "left"
    | "right";
}) {
  return (
    <th
      className="og-admin-directory-th"
      data-align={
        align
      }
    >
      {children}
    </th>
  );
}


function ScopeBadges({
  user,
}: {
  user:
    AdminUserDirectoryRow;
}) {
  const visible =
    user.assigned_scopes.slice(
      0,
      3,
    );

  const remaining =
    Math.max(
      0,
      user.assigned_scopes.length -
        visible.length,
    );

  if (
    visible.length ===
    0
  ) {
    return (
      <span className="og-admin-directory-secondary">
        No operational scope
      </span>
    );
  }

  return (
    <div className="og-admin-directory-badge-stack">
      {visible.map(
        (
          scope,
        ) => (
          <span
            key={
              scope.functloc_id ??
              "GLOBAL"
            }
            className="og-admin-directory-scope-badge"
            data-level={
              scope.scope_level
            }
            title={
              scope.include_children &&
              scope.child_count >
                0
                ? `${scope.location_name} termasuk ${scope.child_count} child scope`
                : scope.location_name
            }
          >
            <span>
              {
                scope.location_name
              }
            </span>

            {scope.include_children &&
            scope.child_count >
              0 ? (
              <small>
                +
                {
                  scope.child_count
                }
              </small>
            ) : null}
          </span>
        ),
      )}

      {remaining >
      0 ? (
        <Badge variant="neutral">
          +
          {
            remaining
          }
        </Badge>
      ) : null}
    </div>
  );
}


function RoleBadges({
  user,
}: {
  user:
    AdminUserDirectoryRow;
}) {
  const visible =
    user.roles.slice(
      0,
      3,
    );

  const remaining =
    Math.max(
      0,
      user.roles.length -
        visible.length,
    );

  if (
    visible.length ===
    0
  ) {
    return (
      <span className="og-admin-directory-secondary">
        No active access
      </span>
    );
  }

  return (
    <div className="og-admin-directory-access-wrap">
      <div className="og-admin-directory-badge-stack">
        {visible.map(
          (
            role,
          ) => (
            <Badge
              key={
                role.role_code
              }
              variant="info"
            >
              {
                role.role_code
              }
            </Badge>
          ),
        )}

        {remaining >
        0 ? (
          <Badge variant="neutral">
            +
            {
              remaining
            }
          </Badge>
        ) : null}
      </div>

      <span className="og-admin-directory-secondary">
        {
          user.roles.length
        } role
        {user.roles.length !==
        1
          ? "s"
          : ""}

        {" • "}

        {
          user.active_assignment_count
        } assignment
        {user.active_assignment_count !==
        1
          ? "s"
          : ""}
      </span>
    </div>
  );
}


export function UserDirectory({
  users,
  scopes,
  canManageUsers,
  canExportUsers,
  canForceDeleteUsers,
}: UserDirectoryProps) {
  const [
    filters,
    setFilters,
  ] =
    useState<UserDirectoryFilters>(
      defaultFilters,
    );

  const [
    search,
    setSearch,
  ] =
    useState(
      "",
    );

  const [
    page,
    setPage,
  ] =
    useState(
      1,
    );

  const [
    pageSize,
    setPageSize,
  ] =
    useState(
      25,
    );

  const roleOptions =
    useMemo(
      () => {
        const map =
          new Map<
            string,
            {
              role_code:
                string;

              role_name:
                string;
            }
          >();

        for (
          const user
          of users
        ) {
          for (
            const role
            of user.roles
          ) {
            map.set(
              role.role_code,
              {
                role_code:
                  role.role_code,

                role_name:
                  role.role_name,
              },
            );
          }
        }

        return Array.from(
          map.values(),
        ).sort(
          (
            a,
            b,
          ) =>
            a.role_name.localeCompare(
              b.role_name,
            ),
        );
      },
      [
        users,
      ],
    );

  const selectedScopeTargetIds =
    useMemo(
      () => {
        const selectedScopeId =
          filters.giScopeId ||
          filters.ultgScopeId ||
          filters.uptScopeId;

        return selectedScopeId
          ? new Set([
              selectedScopeId,
            ])
          : null;
      },
      [
        filters.giScopeId,
        filters.ultgScopeId,
        filters.uptScopeId,
      ],
    );

  const normalizedSearch =
    search
      .trim()
      .toLowerCase();

  const filteredUsers =
    users.filter(
      (
        user,
      ) => {
        if (
          filters.status ===
          "ASSIGNED" &&
          user.directory_state !==
            "ASSIGNED"
        ) {
          return false;
        }

        if (
          filters.status ===
          "UNASSIGNED" &&
          user.directory_state !==
            "UNASSIGNED" &&
          user.directory_state !==
            "PENDING_PROVISIONING"
        ) {
          return false;
        }

        if (
          filters.status ===
          "INACTIVE" &&
          user.directory_state !==
            "INACTIVE"
        ) {
          return false;
        }

        if (
          filters.roleCode &&
          !user.roles.some(
            (
              role,
            ) =>
              role.role_code ===
              filters.roleCode,
          )
        ) {
          return false;
        }

        if (
          selectedScopeTargetIds &&
          !user.assigned_scopes.some(
            (
              scope,
            ) =>
              scope.functloc_id !==
                null &&
              selectedScopeTargetIds.has(
                scope.functloc_id,
              ),
          )
        ) {
          return false;
        }

        if (
          !normalizedSearch
        ) {
          return true;
        }

        const searchable =
          [
            user.email,
            user.full_name ??
              "",
            user.display_name ??
              "",
            user.employee_id ??
              "",
            ...user.roles.map(
              (
                role,
              ) =>
                `${role.role_code} ${role.role_name}`,
            ),
            ...user.assigned_scopes.map(
              (
                scope,
              ) =>
                `${scope.scope_level} ${scope.location_name}`,
            ),
          ]
            .join(
              " ",
            )
            .toLowerCase();

        return searchable.includes(
          normalizedSearch,
        );
      },
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredUsers.length /
          pageSize,
      ),
    );

  const currentPage =
    Math.min(
      page,
      totalPages,
    );

  const startIndex =
    (
      currentPage -
      1
    ) *
    pageSize;

  const paginatedUsers =
    filteredUsers.slice(
      startIndex,
      startIndex +
        pageSize,
    );

  const visibleFrom =
    filteredUsers.length ===
    0
      ? 0
      : startIndex +
        1;

  const visibleTo =
    Math.min(
      startIndex +
        pageSize,
      filteredUsers.length,
    );

  const assignedCount =
    users.filter(
      (
        user,
      ) =>
        user.directory_state ===
        "ASSIGNED",
    ).length;

  const unassignedCount =
    users.filter(
      (
        user,
      ) =>
        user.directory_state ===
          "UNASSIGNED" ||
        user.directory_state ===
          "PENDING_PROVISIONING",
    ).length;

  const inactiveCount =
    users.filter(
      (
        user,
      ) =>
        user.directory_state ===
        "INACTIVE",
    ).length;

  return (
    <div className="og-admin-directory">
      <section className="og-admin-directory-metrics">
        <DirectoryMetric
          icon={
            <UsersRound
              size={18}
              strokeWidth={1.9}
            />
          }
          label="Total Users"
          value={
            users.length
          }
          description="Authentication accounts"
        />

        <DirectoryMetric
          icon={
            <ShieldCheck
              size={18}
              strokeWidth={1.9}
            />
          }
          label="Assigned"
          value={
            assignedCount
          }
          description="Users with active access"
        />

        <DirectoryMetric
          icon={
            <KeyRound
              size={18}
              strokeWidth={1.9}
            />
          }
          label="Unassigned"
          value={
            unassignedCount
          }
          description="Provisioning or access required"
        />

        <DirectoryMetric
          icon={
            <UserRound
              size={18}
              strokeWidth={1.9}
            />
          }
          label="Inactive"
          value={
            inactiveCount
          }
          description="Inactive OPERGRID profiles"
        />
      </section>

      <section className="og-admin-directory-panel">
        <header className="og-admin-directory-header">
          <div className="og-admin-directory-heading">
            <div className="og-admin-directory-heading-icon">
              <UsersRound
                size={18}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <h2 className="og-admin-directory-title">
                User Directory
              </h2>

              <p className="og-admin-directory-description">
                Directory user berdasarkan role
                dan operational scope.
              </p>
            </div>
          </div>

          <div className="og-admin-directory-actions">
            {canManageUsers ? (
              <>
                <a
                  href="/api/admin/users/template"
                  className="og-admin-action-button"
                >
                  <Download
                    size={15}
                    strokeWidth={1.9}
                  />

                  Template
                </a>

                <Link
                  href="/admin/users/import"
                  className="og-admin-action-button"
                >
                  <Upload
                    size={15}
                    strokeWidth={1.9}
                  />

                  Import
                </Link>

                <Link
                  href="/admin/users/new"
                  className="og-admin-action-button"
                  data-variant="primary"
                >
                  <CirclePlus
                    size={15}
                    strokeWidth={2}
                  />

                  Add User
                </Link>
              </>
            ) : null}

            {canExportUsers ? (
              <a
                href="/api/admin/users/export"
                className="og-admin-action-button"
              >
                <FileDown
                  size={15}
                  strokeWidth={1.9}
                />

                Export
              </a>
            ) : null}
          </div>
        </header>

        <div className="og-admin-directory-toolbar">
          <label className="og-admin-directory-search">
            <Search
              size={15}
              strokeWidth={1.9}
              aria-hidden="true"
            />

            <input
              type="search"
              value={
                search
              }
              onChange={(
                event,
              ) => {
                setSearch(
                  event.target.value,
                );

                setPage(
                  1,
                );
              }}
              placeholder="Search name, email, NIP, role or unit scope"
              aria-label="Search users"
            />
          </label>

          <UserDirectoryFilterModal
            value={
              filters
            }
            onApply={(
              nextFilters,
            ) => {
              setFilters(
                nextFilters,
              );

              setPage(
                1,
              );
            }}
            roles={
              roleOptions
            }
            scopes={
              scopes
            }
          />
        </div>

        <div className="og-admin-directory-table-scroll">
          <table className="og-admin-directory-table">
            <thead>
              <tr>
                <TableHead>
                  User
                </TableHead>

                <TableHead>
                  Unit Scope
                </TableHead>

                <TableHead>
                  Access
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead align="right">
                  Action
                </TableHead>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length ===
              0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="og-admin-directory-empty-cell"
                  >
                    <div className="og-admin-directory-empty">
                      <div className="og-admin-directory-empty-icon">
                        <UsersRound
                          size={22}
                          strokeWidth={1.7}
                        />
                      </div>

                      <strong>
                        No users found
                      </strong>

                      <span>
                        Adjust search or filter criteria.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map(
                  (
                    user,
                  ) => {
                    const status =
                      stateBadge(
                        user.directory_state,
                      );

                    const displayName =
                      user.full_name ??
                      user.display_name ??
                      user.email;

                    return (
                      <tr
                        key={
                          user.user_id
                        }
                      >
                        <td>
                          <div className="og-admin-directory-user">
                            <div className="og-admin-directory-avatar">
                              <UserRound
                                size={15}
                                strokeWidth={1.9}
                              />
                            </div>

                            <div className="og-admin-directory-user-copy">
                              <strong>
                                {
                                  displayName
                                }
                              </strong>

                              <span>
                                {
                                  user.email
                                }
                              </span>

                              {user.employee_id ? (
                                <small>
                                  NIP:{" "}
                                  {
                                    user.employee_id
                                  }
                                </small>
                              ) : null}
                            </div>
                          </div>
                        </td>

                        <td>
                          <ScopeBadges
                            user={
                              user
                            }
                          />
                        </td>

                        <td>
                          <RoleBadges
                            user={
                              user
                            }
                          />
                        </td>

                        <td>
                          <Badge
                            variant={
                              status.variant
                            }
                          >
                            {
                              status.label
                            }
                          </Badge>
                        </td>

                        <td data-align="right">
                          {user.directory_state ===
                            "PENDING_PROVISIONING" &&
                          canManageUsers ? (
                            <Link
                              href={`/admin/users/new?existing_auth_user_id=${encodeURIComponent(
                                user.user_id,
                              )}&email=${encodeURIComponent(
                                user.email,
                              )}`}
                              className="og-admin-row-action"
                              data-emphasis="accent"
                            >
                              Provision
                            </Link>
                          ) : user.directory_state ===
                            "PENDING_PROVISIONING" ? (
                            <span className="og-admin-directory-secondary">
                              Pending
                            </span>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/admin/users/${user.user_id}`}
                                className="og-admin-row-action"
                              >
                                Open
                              </Link>

                              {canForceDeleteUsers ? (
                                <ConfirmedServerAction
                                  action={
                                    forceDeleteV2UserAction
                                  }
                                  fields={{
                                    user_id:
                                      user.user_id,
                                  }}
                                  triggerLabel="Force Delete"
                                  confirmTitle="Force Delete User"
                                  confirmDescription={
                                    <>
                                      Profile dan seluruh access OPERGRID V2 untuk <strong>{user.email}</strong> akan dihapus permanen. Akun Supabase Auth tetap dipertahankan.
                                    </>
                                  }
                                  confirmLabel="Force Delete"
                                  triggerVariant="danger"
                                  triggerSize="sm"
                                />
                              ) : null}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  },
                )
              )}
            </tbody>
          </table>
        </div>

        <footer className="og-admin-directory-footer">
          <div className="og-admin-directory-result">
            Showing{" "}
            <strong>
              {
                visibleFrom
              }
            </strong>
            {" – "}
            <strong>
              {
                visibleTo
              }
            </strong>
            {" of "}
            <strong>
              {
                filteredUsers.length
              }
            </strong>
            {" users"}
          </div>

          <div className="og-admin-directory-pagination">
            <label>
              <span>
                Rows
              </span>

              <select
                value={
                  pageSize
                }
                onChange={(
                  event,
                ) => {
                  setPageSize(
                    Number(
                      event.target.value,
                    ),
                  );

                  setPage(
                    1,
                  );
                }}
                aria-label="Rows per page"
              >
                <option value={25}>
                  25
                </option>

                <option value={50}>
                  50
                </option>

                <option value={100}>
                  100
                </option>
              </select>
            </label>

            <span className="og-admin-directory-page-number">
              Page{" "}
              <strong>
                {
                  currentPage
                }
              </strong>
              {" of "}
              <strong>
                {
                  totalPages
                }
              </strong>
            </span>

            <button
              type="button"
              aria-label="Previous page"
              disabled={
                currentPage <=
                1
              }
              onClick={() =>
                setPage(
                  (
                    current,
                  ) =>
                    Math.max(
                      1,
                      current -
                        1,
                    ),
                )
              }
            >
              <ChevronLeft
                size={15}
              />
            </button>

            <button
              type="button"
              aria-label="Next page"
              disabled={
                currentPage >=
                totalPages
              }
              onClick={() =>
                setPage(
                  (
                    current,
                  ) =>
                    Math.min(
                      totalPages,
                      current +
                        1,
                    ),
                )
              }
            >
              <ChevronRight
                size={15}
              />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}