import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  Badge,
  Button,
  EmptyState,
} from "@/components/ui";

import type {
  AdminUserAssignment,
} from "@/services/admin-user-detail-service";

import {
  deactivateUserAssignmentAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";


type UserAssignmentListProps = {
  userId: string;
  assignments: AdminUserAssignment[];
};


function formatDate(
  value:
    | string
    | null
) {
  if (!value) {
    return "No expiry";
  }

  return value.slice(
    0,
    10
  );
}


export function UserAssignmentList({
  userId,
  assignments,
}: UserAssignmentListProps) {
  if (
    assignments.length ===
    0
  ) {
    return (
      <EmptyState
        icon={
          <ShieldCheck
            size={19}
            strokeWidth={1.7}
          />
        }
        title="No role assignments"
        description="User belum memiliki role dan operational scope."
      />
    );
  }


  return (
    <div className="space-y-3">

      {assignments.map(
        (assignment) => (
          <div
            key={
              assignment.assignment_id
            }
            className="og-assignment-card rounded-[13px] border p-4"
          >

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
                style={{
                  color:
                    "var(--og-cyan-strong)",

                  background:
                    "var(--og-cyan-soft)",
                }}
              >
                <ShieldCheck
                  size={17}
                  strokeWidth={1.8}
                />
              </div>


              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="og-text text-[11px] font-semibold">
                    {assignment.role_name ??
                      assignment.role_code ??
                      "Unknown Role"}
                  </span>

                  <Badge
                    variant="info"
                  >
                    {assignment.role_code ??
                      "-"}
                  </Badge>

                  {assignment.is_primary && (
                    <Badge
                      variant="success"
                      dot
                    >
                      Primary
                    </Badge>
                  )}

                  {!assignment.is_active && (
                    <Badge
                      variant="neutral"
                    >
                      Inactive
                    </Badge>
                  )}

                </div>


                <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">

                  <span className="og-muted flex items-center gap-1.5 text-[9px]">
                    <Building2
                      size={12}
                    />

                    {assignment.scope_name ??
                      "GLOBAL"}
                  </span>

                  <span className="og-muted flex items-center gap-1.5 text-[9px]">
                    <CalendarDays
                      size={12}
                    />

                    {formatDate(
                      assignment.valid_from
                    )}
                    {" → "}
                    {formatDate(
                      assignment.valid_until
                    )}
                  </span>

                  {assignment.include_children && (
                    <span className="og-muted flex items-center gap-1.5 text-[9px]">
                      <CheckCircle2
                        size={12}
                      />

                      Child scope included
                    </span>
                  )}

                </div>


                {assignment.notes && (
                  <p className="og-muted mt-2.5 text-[8px]">
                    {assignment.notes}
                  </p>
                )}

              </div>


              {assignment.is_active && (
                <form
                  action={
                    deactivateUserAssignmentAction
                  }
                  className="shrink-0"
                >

                  <input
                    type="hidden"
                    name="user_id"
                    value={
                      userId
                    }
                  />

                  <input
                    type="hidden"
                    name="assignment_id"
                    value={
                      assignment.assignment_id
                    }
                  />

                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    leftIcon={
                      <Trash2
                        size={13}
                        strokeWidth={1.8}
                      />
                    }
                    className="text-[var(--og-danger)]"
                  >
                    Deactivate
                  </Button>

                </form>
              )}

            </div>

          </div>
        )
      )}

    </div>
  );
}