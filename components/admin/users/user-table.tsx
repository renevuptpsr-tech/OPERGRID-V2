import {
  ChevronRight,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import type {
  AdminUserRow,
} from "@/services/admin-user-service";

import {
  Badge,
  DataTableShell,
  EmptyState,
} from "@/components/ui";


type UserTableProps = {
  users: AdminUserRow[];
};


function statusVariant(
  status:
    | string
    | null
) {
  switch (status) {
    case "ACTIVE":
      return "success";

    case "PENDING":
      return "warning";

    case "SUSPENDED":
      return "danger";

    case "INACTIVE":
      return "neutral";

    default:
      return "neutral";
  }
}


function initials(
  value: string
) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (part) =>
        part
          .charAt(0)
          .toUpperCase()
    )
    .join("");
}


export function UserTable({
  users,
}: UserTableProps) {
  if (
    users.length === 0
  ) {
    return (
      <EmptyState
        icon={
          <UserRound
            size={19}
            strokeWidth={1.7}
          />
        }
        title="User tidak ditemukan"
        description="Tidak ada user yang sesuai dengan filter atau pencarian saat ini."
      />
    );
  }


  return (
    <DataTableShell
      minWidth="1050px"
    >
      <table className="w-full text-[10px]">

        <thead
          style={{
            background:
              "var(--og-surface-soft)",
          }}
        >
          <tr className="og-muted text-left text-[8px] font-semibold uppercase tracking-[0.10em]">

            <th className="px-4 py-3.5">
              User
            </th>

            <th className="px-4 py-3.5">
              Employee ID
            </th>

            <th className="px-4 py-3.5">
              Jabatan
            </th>

            <th className="px-4 py-3.5">
              User Type
            </th>

            <th className="px-4 py-3.5">
              Primary Role
            </th>

            <th className="px-4 py-3.5">
              Scope
            </th>

            <th className="px-4 py-3.5">
              Status
            </th>

            <th className="w-[72px] px-4 py-3.5 text-right">
              Action
            </th>

          </tr>
        </thead>


        <tbody>

          {users.map(
            (user) => {
              const name =
                user.display_name ??
                user.full_name ??
                user.email ??
                "Unknown User";

              return (
                <tr
                  key={
                    user.user_id
                  }
                  className="border-t transition-colors duration-100 hover:bg-[var(--og-surface-soft)]"
                  style={{
                    borderColor:
                      "var(--og-border-soft)",
                  }}
                >

                  <td className="px-4 py-3.5">

                    <div className="flex items-center gap-3">

                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[9px] font-semibold"
                        style={{
                          color:
                            "var(--og-cyan-strong)",
                          background:
                            "var(--og-cyan-soft)",
                        }}
                      >
                        {initials(
                          name
                        )}
                      </div>


                      <div className="min-w-0">

                        <div className="og-text max-w-[220px] truncate text-[11px] font-semibold">
                          {name}
                        </div>

                        <div className="og-muted mt-1 max-w-[220px] truncate text-[8px]">
                          {user.email ??
                            "-"}
                        </div>

                      </div>

                    </div>

                  </td>


                  <td className="og-secondary px-4 py-3.5">
                    {user.employee_id ??
                      "-"}
                  </td>


                  <td className="px-4 py-3.5">

                    <div className="og-text text-[10px] font-medium">
                      {user.job_name ??
                        "-"}
                    </div>

                    {user.job_code && (
                      <div className="og-muted mt-1 text-[8px]">
                        {
                          user.job_code
                        }
                      </div>
                    )}

                  </td>


                  <td className="px-4 py-3.5">

                    <Badge
                      variant="neutral"
                    >
                      {user.user_type_code ??
                        "-"}
                    </Badge>

                  </td>


                  <td className="px-4 py-3.5">

                    {user.primary_role_name ? (
                      <div>

                        <div className="flex items-center gap-1.5">

                          <ShieldCheck
                            size={12}
                            strokeWidth={1.8}
                            style={{
                              color:
                                "var(--og-cyan-strong)",
                            }}
                          />

                          <span className="og-text text-[10px] font-medium">
                            {
                              user.primary_role_name
                            }
                          </span>

                        </div>


                        <div className="og-muted mt-1 text-[8px]">
                          {user.role_count ??
                            0}{" "}
                          assignment
                        </div>

                      </div>
                    ) : (
                      <span className="og-muted">
                        -
                      </span>
                    )}

                  </td>


                  <td className="og-secondary px-4 py-3.5">
                    {user.primary_scope_name ??
                      "GLOBAL"}
                  </td>


                  <td className="px-4 py-3.5">

                    <Badge
                      variant={
                        statusVariant(
                          user.status_code
                        )
                      }
                      dot
                    >
                      {user.status_code ??
                        "UNKNOWN"}
                    </Badge>

                  </td>


                  <td className="px-4 py-3.5 text-right">

                    <Link
                      href={`/admin/users/${user.user_id}`}
                      prefetch
                      title="Detail user"
                      className="og-ui-icon-button inline-flex h-8 w-8 items-center justify-center rounded-[9px]"
                    >
                      <ChevronRight
                        size={15}
                        strokeWidth={1.8}
                      />
                    </Link>

                  </td>

                </tr>
              );
            }
          )}

        </tbody>

      </table>
    </DataTableShell>
  );
}