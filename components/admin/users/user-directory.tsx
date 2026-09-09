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
  useState,
  type ReactNode,
} from "react";

import {
  Badge,
} from "@/components/ui";

import type {
  AdminUserDirectoryRow,
  UserDirectoryState,
} from "@/services/admin-user-directory-service";

type DirectoryFilter =
  | "ALL"
  | "ASSIGNED"
  | "UNASSIGNED"
  | "INACTIVE";

type UserDirectoryProps = {
  users: AdminUserDirectoryRow[];
};

const tabs: Array<{
  value: DirectoryFilter;
  label: string;
}> = [
  {
    value: "ALL",
    label: "All Users",
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "UNASSIGNED",
    label: "Unassigned",
  },
  {
    value: "INACTIVE",
    label: "Inactive",
  },
];

function stateBadge(
  state: UserDirectoryState,
) {
  switch (state) {
    case "ASSIGNED":
      return {
        label: "Assigned",
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
        label: "No Access",
        variant:
          "info" as const,
      };

    case "INACTIVE":
      return {
        label: "Inactive",
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
  icon: ReactNode;
  label: string;
  value: number;
  description: string;
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
  children: ReactNode;
  align?:
    | "left"
    | "right";
}) {
  return (
    <th
      className="og-admin-directory-th"
      data-align={align}
    >
      {children}
    </th>
  );
}

export function UserDirectory({
  users,
}: UserDirectoryProps) {
  const [
    filter,
    setFilter,
  ] =
    useState<DirectoryFilter>(
      "ALL",
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    page,
    setPage,
  ] =
    useState(1);

  const [
    pageSize,
    setPageSize,
  ] =
    useState(25);

  const normalizedSearch =
    search
      .trim()
      .toLowerCase();

  const filteredUsers =
    users.filter(
      (user) => {
        let matchesFilter =
          true;

        if (
          filter ===
          "ASSIGNED"
        ) {
          matchesFilter =
            user.directory_state ===
            "ASSIGNED";
        }

        if (
          filter ===
          "UNASSIGNED"
        ) {
          matchesFilter =
            user.directory_state ===
              "UNASSIGNED" ||
            user.directory_state ===
              "PENDING_PROVISIONING";
        }

        if (
          filter ===
          "INACTIVE"
        ) {
          matchesFilter =
            user.directory_state ===
            "INACTIVE";
        }

        if (
          !matchesFilter
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
            user.organization_name ??
              "",
            user.primary_role_name ??
              "",
          ]
            .join(" ")
            .toLowerCase();

        return (
          searchable.includes(
            normalizedSearch,
          )
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
      : startIndex + 1;

  const visibleTo =
    Math.min(
      startIndex +
        pageSize,
      filteredUsers.length,
    );

  const assignedCount =
    users.filter(
      (user) =>
        user.directory_state ===
        "ASSIGNED",
    ).length;

  const unassignedCount =
    users.filter(
      (user) =>
        user.directory_state ===
          "UNASSIGNED" ||
        user.directory_state ===
          "PENDING_PROVISIONING",
    ).length;

  const inactiveCount =
    users.filter(
      (user) =>
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
          value={users.length}
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
          value={assignedCount}
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
          value={unassignedCount}
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
          value={inactiveCount}
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
                Manage authentication accounts,
                OPERGRID profiles, roles, and
                operational access.
              </p>
            </div>
          </div>

          <div className="og-admin-directory-actions">
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
          </div>
        </header>

        <div className="og-admin-directory-toolbar">
          <div
            className="og-admin-directory-tabs"
            role="group"
            aria-label="User directory filter"
          >
            {tabs.map(
              (tab) => {
                const active =
                  filter ===
                  tab.value;

                return (
                  <button
                    key={
                      tab.value
                    }
                    type="button"
                    className="og-admin-directory-tab"
                    data-active={
                      active ||
                      undefined
                    }
                    aria-pressed={
                      active
                    }
                    onClick={() => {
                      setFilter(
                        tab.value,
                      );

                      setPage(1);
                    }}
                  >
                    {tab.label}
                  </button>
                );
              },
            )}
          </div>

          <label className="og-admin-directory-search">
            <Search
              size={15}
              strokeWidth={1.9}
              aria-hidden="true"
            />

            <input
              type="search"
              value={search}
              onChange={(
                event,
              ) => {
                setSearch(
                  event.target.value,
                );

                setPage(1);
              }}
              placeholder="Search name, email, employee ID, organization or role"
              aria-label="Search users"
            />
          </label>
        </div>

        <div className="og-admin-directory-table-scroll">
          <table className="og-admin-directory-table">
            <thead>
              <tr>
                <TableHead>
                  User
                </TableHead>

                <TableHead>
                  Organization
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
                        Adjust the search term or
                        directory filter.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map(
                  (user) => {
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
                                {displayName}
                              </strong>

                              <span>
                                {user.email}
                              </span>

                              {user.employee_id ? (
                                <small>
                                  ID:{" "}
                                  {
                                    user.employee_id
                                  }
                                </small>
                              ) : null}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="og-admin-directory-primary">
                            {user.organization_name ??
                              "—"}
                          </div>

                          {user.user_type_code ? (
                            <div className="og-admin-directory-secondary">
                              {
                                user.user_type_code
                              }
                            </div>
                          ) : null}
                        </td>

                        <td>
                          {user.active_assignment_count >
                          0 ? (
                            <>
                              <div className="og-admin-directory-primary">
                                {user.primary_role_name ??
                                  "Assigned"}
                              </div>

                              <div className="og-admin-directory-secondary">
                                {
                                  user.active_assignment_count
                                }{" "}
                                active assignment
                                {user.active_assignment_count >
                                1
                                  ? "s"
                                  : ""}
                              </div>
                            </>
                          ) : (
                            <span className="og-admin-directory-secondary">
                              No active access
                            </span>
                          )}
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
                          "PENDING_PROVISIONING" ? (
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
                            "UNASSIGNED" ? (
                            <Link
                              href={`/admin/users/${user.user_id}?tab=access`}
                              className="og-admin-row-action"
                              data-emphasis="accent"
                            >
                              Assign Access
                            </Link>
                          ) : (
                            <Link
                              href={`/admin/users/${user.user_id}`}
                              className="og-admin-row-action"
                            >
                              Open
                            </Link>
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
              {visibleFrom}
            </strong>
            {" – "}
            <strong>
              {visibleTo}
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
                value={pageSize}
                onChange={(
                  event,
                ) => {
                  setPageSize(
                    Number(
                      event.target.value,
                    ),
                  );

                  setPage(1);
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
                {currentPage}
              </strong>
              {" of "}
              <strong>
                {totalPages}
              </strong>
            </span>

            <button
              type="button"
              className="og-admin-page-button"
              disabled={
                currentPage <=
                1
              }
              onClick={() =>
                setPage(
                  Math.max(
                    1,
                    currentPage -
                      1,
                  ),
                )
              }
              aria-label="Previous page"
            >
              <ChevronLeft
                size={15}
              />
            </button>

            <button
              type="button"
              className="og-admin-page-button"
              disabled={
                currentPage >=
                totalPages
              }
              onClick={() =>
                setPage(
                  Math.min(
                    totalPages,
                    currentPage +
                      1,
                  ),
                )
              }
              aria-label="Next page"
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