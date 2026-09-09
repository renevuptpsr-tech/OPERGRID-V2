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
} from "react";

import {
  Badge,
  Panel,
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
  users:
    AdminUserDirectoryRow[];
};


const tabs: Array<{
  value: DirectoryFilter;
  label: string;
}> = [
  {
    value:
      "ALL",
    label:
      "All Users",
  },

  {
    value:
      "ASSIGNED",
    label:
      "Assigned",
  },

  {
    value:
      "UNASSIGNED",
    label:
      "Unassigned",
  },

  {
    value:
      "INACTIVE",
    label:
      "Inactive",
  },
];


function stateBadge(
  state:
    UserDirectoryState
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


export function UserDirectory({
  users,
}: UserDirectoryProps) {
  const [
    filter,
    setFilter,
  ] =
    useState<DirectoryFilter>(
      "ALL"
    );


  const [
    search,
    setSearch,
  ] =
    useState(
      ""
    );


  const [
    page,
    setPage,
  ] =
    useState(
      1
    );


  const [
    pageSize,
    setPageSize,
  ] =
    useState(
      25
    );


  const normalizedSearch =
    search
      .trim()
      .toLowerCase();


  const filteredUsers =
    users.filter(
      (
        user
      ) => {

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
            .join(
              " "
            )
            .toLowerCase();


        return searchable.includes(
          normalizedSearch
        );
      }
    );


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredUsers.length /
        pageSize
      )
    );


  const currentPage =
    Math.min(
      page,
      totalPages
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
      pageSize
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
      filteredUsers.length
    );


  const assignedCount =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
        "ASSIGNED"
    ).length;


  const unassignedCount =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
          "UNASSIGNED" ||
        user.directory_state ===
          "PENDING_PROVISIONING"
    ).length;


  const inactiveCount =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
        "INACTIVE"
    ).length;


  return (
    <div className="space-y-4">

      {/* ===============================================
          SUMMARY
         =============================================== */}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          icon={
            <UsersRound
              size={15}
            />
          }
          label="Total Users"
          value={
            users.length
          }
        />


        <SummaryCard
          icon={
            <ShieldCheck
              size={15}
            />
          }
          label="Assigned"
          value={
            assignedCount
          }
        />


        <SummaryCard
          icon={
            <KeyRound
              size={15}
            />
          }
          label="Unassigned"
          value={
            unassignedCount
          }
        />


        <SummaryCard
          icon={
            <UserRound
              size={15}
            />
          }
          label="Inactive"
          value={
            inactiveCount
          }
        />

      </div>


      {/* ===============================================
          DIRECTORY
         =============================================== */}

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
              User Directory
            </h2>

            <p className="og-muted mt-1 text-[8px]">
              Authentication accounts, OPERGRID profiles, and active access assignments.
            </p>

          </div>


          <div className="flex flex-wrap items-center gap-2">

            <a
              href="/api/admin/users/template"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border px-4 text-[10px] font-semibold transition hover:bg-[var(--og-surface-soft)]"
              style={{
                color:
                  "var(--og-text)",

                borderColor:
                  "var(--og-border)",
              }}
            >
              <Download
                size={14}
                strokeWidth={1.8}
              />

              Download Template
            </a>


            <a
              href="/api/admin/users/export"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border px-4 text-[10px] font-semibold transition hover:bg-[var(--og-surface-soft)]"
              style={{
                color:
                  "var(--og-text)",

                borderColor:
                  "var(--og-border)",
              }}
            >
              <FileDown
                size={14}
                strokeWidth={1.8}
              />

              Download Data
            </a>


            <Link
              href="/admin/users/import"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border px-4 text-[10px] font-semibold transition hover:bg-[var(--og-surface-soft)]"
              style={{
                color:
                  "var(--og-text)",

                borderColor:
                  "var(--og-border)",
              }}
            >
              <Upload
                size={14}
                strokeWidth={1.8}
              />

              Import Users
            </Link>


            <Link
              href="/admin/users/new"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] px-4 text-[10px] font-semibold text-white transition"
              style={{
                background:
                  "var(--og-cyan-strong)",
              }}
            >
              <CirclePlus
                size={14}
              />

              Add / Provision User
            </Link>

          </div>

        </div>


        {/* FILTER */}

        <div
          className="flex flex-col gap-3 border-b px-4 py-3 lg:flex-row lg:items-center lg:justify-between"
          style={{
            borderColor:
              "var(--og-border-soft)",
          }}
        >

          <div className="flex flex-wrap gap-1">

            {tabs.map(
              (
                tab
              ) => {

                const active =
                  filter ===
                  tab.value;


                return (
                  <button
                    key={
                      tab.value
                    }
                    type="button"
                    onClick={() =>
                      {
                        setFilter(
                          tab.value
                        );

                        setPage(
                          1
                        );
                      }
                    }
                    className="h-8 rounded-[9px] px-3 text-[9px] font-semibold transition"
                    style={{
                      color:
                        active
                          ? "var(--og-cyan-strong)"
                          : "var(--og-text-muted)",

                      background:
                        active
                          ? "var(--og-cyan-soft)"
                          : "transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              }
            )}

          </div>


          <div
            className="flex h-9 w-full items-center gap-2 rounded-[9px] border px-3 lg:w-[280px]"
            style={{
              background:
                "var(--og-surface-soft)",

              borderColor:
                "var(--og-border-soft)",
            }}
          >
            <Search
              size={13}
              className="og-muted shrink-0"
            />

            <input
              type="search"
              value={
                search
              }
              onChange={(
                event
              ) => {
                setSearch(
                  event.target.value
                );

                setPage(
                  1
                );
              }}
              placeholder="Search user, email, role..."
              className="og-text min-w-0 flex-1 bg-transparent text-[9px] outline-none"
            />
          </div>

        </div>


        {/* TABLE */}

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

                <TableHead
                  align="right"
                >
                  Action
                </TableHead>

              </tr>

            </thead>


            <tbody>

              {filteredUsers.length ===
              0 ? (

                <tr>

                  <td
                    colSpan={
                      5
                    }
                    className="px-4 py-12 text-center"
                  >

                    <UsersRound
                      size={21}
                      className="og-muted mx-auto"
                    />

                    <div className="og-text mt-3 text-[10px] font-semibold">
                      No users found
                    </div>

                    <div className="og-muted mt-1 text-[8px]">
                      Adjust the search or directory filter.
                    </div>

                  </td>

                </tr>

              ) : (

                paginatedUsers.map(
                  (
                    user
                  ) => {

                    const status =
                      stateBadge(
                        user.directory_state
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
                        className="border-b transition hover:bg-[var(--og-surface-soft)]"
                        style={{
                          borderColor:
                            "var(--og-border-soft)",
                        }}
                      >

                        <td className="px-4 py-3">

                          <div className="flex items-center gap-3">

                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
                              style={{
                                background:
                                  "var(--og-surface-soft)",

                                color:
                                  "var(--og-cyan-strong)",
                              }}
                            >
                              <UserRound
                                size={14}
                              />
                            </div>


                            <div className="min-w-0">

                              <div className="og-text truncate text-[9px] font-semibold">
                                {displayName}
                              </div>

                              <div className="og-muted mt-0.5 truncate text-[8px]">
                                {user.email}
                              </div>

                              {user.employee_id && (
                                <div className="og-muted mt-0.5 text-[7px]">
                                  {user.employee_id}
                                </div>
                              )}

                            </div>

                          </div>

                        </td>


                        <td className="px-4 py-3">

                          <div className="og-secondary text-[8px] font-medium">
                            {user.organization_name ??
                              "—"}
                          </div>

                          {user.user_type_code && (
                            <div className="og-muted mt-0.5 text-[7px]">
                              {user.user_type_code}
                            </div>
                          )}

                        </td>


                        <td className="px-4 py-3">

                          {user.active_assignment_count >
                          0 ? (

                            <div>

                              <div className="og-secondary text-[8px] font-medium">
                                {user.primary_role_name ??
                                  "Assigned"}
                              </div>

                              <div className="og-muted mt-0.5 text-[7px]">
                                {user.active_assignment_count} active assignment
                                {user.active_assignment_count >
                                1
                                  ? "s"
                                  : ""}
                              </div>

                            </div>

                          ) : (

                            <span className="og-muted text-[8px]">
                              No active access
                            </span>

                          )}

                        </td>


                        <td className="px-4 py-3">

                          <Badge
                            variant={
                              status.variant
                            }
                          >
                            {status.label}
                          </Badge>

                        </td>


                        <td className="px-4 py-3 text-right">

                          {user.directory_state ===
                          "PENDING_PROVISIONING" ? (

                            <Link
                              href={
                                `/admin/users/new?existing_auth_user_id=${encodeURIComponent(
                                  user.user_id
                                )}&email=${encodeURIComponent(
                                  user.email
                                )}`
                              }
                              className="inline-flex h-8 items-center justify-center rounded-[9px] border px-3 text-[8px] font-semibold transition hover:bg-[var(--og-surface-soft)]"
                              style={{
                                color:
                                  "var(--og-cyan-strong)",

                                borderColor:
                                  "var(--og-border)",
                              }}
                            >
                              Provision
                            </Link>

                          ) : user.directory_state ===
                            "UNASSIGNED" ? (

                            <Link
                              href={
                                `/admin/users/${user.user_id}?tab=access`
                              }
                              className="inline-flex h-8 items-center justify-center rounded-[9px] border px-3 text-[8px] font-semibold transition hover:bg-[var(--og-cyan-soft)]"
                              style={{
                                color:
                                  "var(--og-cyan-strong)",

                                borderColor:
                                  "color-mix(in srgb, var(--og-cyan-strong) 28%, var(--og-border))",
                              }}
                            >
                              Assign Access
                            </Link>

                          ) : (

                            <Link
                              href={
                                `/admin/users/${user.user_id}`
                              }
                              className="inline-flex h-8 items-center justify-center rounded-[9px] border px-3 text-[8px] font-semibold transition hover:bg-[var(--og-surface-soft)]"
                              style={{
                                color:
                                  "var(--og-text)",

                                borderColor:
                                  "var(--og-border)",
                              }}
                            >
                              Open
                            </Link>

                          )}

                        </td>

                      </tr>
                    );
                  }
                )
              )}

            </tbody>

          </table>

        </div>


        <div
          className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor:
              "var(--og-border-soft)",
          }}
        >

          <div className="og-muted text-[8px]">
            Showing{" "}
            <span className="og-text font-semibold">
              {visibleFrom}
            </span>
            {" - "}
            <span className="og-text font-semibold">
              {visibleTo}
            </span>
            {" of "}
            <span className="og-text font-semibold">
              {filteredUsers.length}
            </span>
            {" users"}
          </div>


          <div className="flex flex-wrap items-center gap-2">

            <label className="og-muted text-[8px]">
              Rows
            </label>


            <select
              value={
                pageSize
              }
              onChange={(
                event
              ) => {
                setPageSize(
                  Number(
                    event.target.value
                  )
                );

                setPage(
                  1
                );
              }}
              className="og-text h-8 rounded-[8px] border bg-transparent px-2 text-[8px] outline-none"
              style={{
                borderColor:
                  "var(--og-border)",
              }}
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


            <div className="og-muted px-1 text-[8px]">
              Page{" "}
              <span className="og-text font-semibold">
                {currentPage}
              </span>
              {" of "}
              <span className="og-text font-semibold">
                {totalPages}
              </span>
            </div>


            <button
              type="button"
              disabled={
                currentPage <=
                1
              }
              onClick={() =>
                setPage(
                  Math.max(
                    1,
                    currentPage -
                      1
                  )
                )
              }
              className="og-secondary flex h-8 w-8 items-center justify-center rounded-[8px] border transition hover:bg-[var(--og-surface-soft)] disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor:
                  "var(--og-border)",
              }}
              aria-label="Previous page"
            >
              <ChevronLeft
                size={13}
              />
            </button>


            <button
              type="button"
              disabled={
                currentPage >=
                totalPages
              }
              onClick={() =>
                setPage(
                  Math.min(
                    totalPages,
                    currentPage +
                      1
                  )
                )
              }
              className="og-secondary flex h-8 w-8 items-center justify-center rounded-[8px] border transition hover:bg-[var(--og-surface-soft)] disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor:
                  "var(--og-border)",
              }}
              aria-label="Next page"
            >
              <ChevronRight
                size={13}
              />
            </button>

          </div>

        </div>

      </Panel>

    </div>
  );
}


function SummaryCard({
  icon,
  label,
  value,
}: {
  icon:
    React.ReactNode;

  label:
    string;

  value:
    number;
}) {
  return (
    <Panel
      variant="raised"
      padding="md"
    >
      <div className="flex items-center justify-between gap-3">

        <div>

          <div className="og-muted text-[8px] font-medium">
            {label}
          </div>

          <div className="og-text mt-1 text-[18px] font-semibold">
            {value}
          </div>

        </div>


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

      </div>
    </Panel>
  );
}


function TableHead({
  children,
  align =
    "left",
}: {
  children:
    React.ReactNode;

  align?:
    "left" |
    "right";
}) {
  return (
    <th
      className={[
        "px-4 py-2.5 text-[7px] font-semibold uppercase tracking-[0.08em]",
        align ===
        "right"
          ? "text-right"
          : "text-left",
      ].join(
        " "
      )}
      style={{
        color:
          "var(--og-text-muted)",
      }}
    >
      {children}
    </th>
  );
}