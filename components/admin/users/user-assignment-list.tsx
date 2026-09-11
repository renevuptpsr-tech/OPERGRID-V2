import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import {
  Badge,
  EmptyState,
} from "@/components/ui";

import {
  ConfirmedServerAction,
} from "@/components/ui/confirmed-server-action";

import type {
  AdminUserAssignment,
} from "@/services/admin-user-detail-service";

import {
  deactivateUserAssignmentAction,
  deleteUserAssignmentAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";

type UserAssignmentListProps = {

  userId:
    string;

  assignments:
    AdminUserAssignment[];

  canDeactivate:
    boolean;

  canDelete:
    boolean;
};

function formatDate(
  value:
    | string
    | null,
) {
  if (!value) {
    return "No expiry";
  }

  return value.slice(
    0,
    10,
  );
}

export function UserAssignmentList({
  userId,
  assignments,
  canDeactivate,
  canDelete,
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
            strokeWidth={1.8}
          />
        }
        title="No role assignments"
        description="User belum memiliki role dan operational scope."
      />
    );
  }

  return (
    <div className="og-user-assignment-list">
      {assignments.map(
        (assignment) => {
          const roleName =
            assignment.role_name ??
            assignment.role_code ??
            "Unknown Role";

          const scopeName =
            assignment.scope_name ??
            "GLOBAL";

          return (
            <article
              key={
                assignment.assignment_id
              }
              className="og-user-assignment-card"
            >
              <div className="og-user-assignment-card-icon">
                <ShieldCheck
                  size={18}
                  strokeWidth={1.9}
                />
              </div>

              <div className="og-user-assignment-card-main">
                <div className="og-user-assignment-card-title">
                  <strong>
                    {roleName}
                  </strong>

                  <Badge variant="info">
                    {assignment.role_code ??
                      "-"}
                  </Badge>

                  {assignment.is_primary ? (
                    <Badge
                      variant="success"
                      dot
                    >
                      Primary
                    </Badge>
                  ) : null}

                  {!assignment.is_active ? (
                    <Badge variant="neutral">
                      Inactive
                    </Badge>
                  ) : null}
                </div>

                <div className="og-user-assignment-card-meta">
                  <span>
                    <Building2
                      size={13}
                    />

                    {scopeName}
                  </span>

                  <span>
                    <CalendarDays
                      size={13}
                    />

                    {formatDate(
                      assignment.valid_from,
                    )}

                    {" → "}

                    {formatDate(
                      assignment.valid_until,
                    )}
                  </span>

                  {assignment.include_children ? (
                    <span>
                      <CheckCircle2
                        size={13}
                      />

                      Child scope included
                    </span>
                  ) : null}
                </div>

                {assignment.notes ? (
                  <p className="og-user-assignment-notes">
                    {assignment.notes}
                  </p>
                ) : null}
              </div>

              {assignment.is_active && canDeactivate ? (
                <div className="og-user-assignment-card-action">
                  <ConfirmedServerAction
                    action={
                      deactivateUserAssignmentAction
                    }
                    fields={{
                      user_id:
                        userId,

                      assignment_id:
                        assignment.assignment_id,
                    }}
                    triggerLabel="Deactivate"
                    confirmTitle="Deactivate Role Assignment?"
                    confirmDescription={
                      <>
                        Role{" "}
                        <strong>
                          {roleName}
                        </strong>{" "}
                        pada scope{" "}
                        <strong>
                          {scopeName}
                        </strong>{" "}
                        akan dinonaktifkan.
                      </>
                    }
                    confirmLabel="Deactivate Assignment"
                    triggerVariant="ghost"
                    triggerSize="sm"
                    triggerIcon={
                      <Trash2
                        size={13}
                        strokeWidth={1.9}
                      />
                    }
                    className="og-user-assignment-deactivate"
                  >
                    <div className="og-sensitive-action-summary">
                      <span>
                        Role
                        <strong>
                          {roleName}
                        </strong>
                      </span>

                      <span>
                        Scope
                        <strong>
                          {scopeName}
                        </strong>
                      </span>
                    </div>

                    <p className="og-sensitive-action-note">
                      Assignment tidak dihapus dari database.
                      Statusnya hanya dinonaktifkan sehingga tetap
                      tersedia untuk audit dan riwayat akses.
                    </p>
                  </ConfirmedServerAction>
                </div>
              ) : null}

              {!assignment.is_active && canDelete ? (
                <div className="og-user-assignment-card-action">
                  <ConfirmedServerAction
                    action={
                      deleteUserAssignmentAction
                    }
                    fields={{
                      user_id:
                        userId,

                      assignment_id:
                        assignment.assignment_id,
                    }}
                    triggerLabel="Delete Assignment"
                    confirmTitle="Delete Role Assignment Permanently?"
                    confirmDescription={
                      <>
                        Role{" "}
                        <strong>
                          {roleName}
                        </strong>{" "}
                        pada scope{" "}
                        <strong>
                          {scopeName}
                        </strong>{" "}
                        akan dihapus permanen dari Role Assignment.
                      </>
                    }
                    confirmLabel="Delete Permanently"
                    triggerVariant="danger"
                    triggerSize="sm"
                    triggerIcon={
                      <Trash2
                        size={13}
                        strokeWidth={1.9}
                      />
                    }
                    className="og-user-assignment-deactivate"
                  >
                    <div className="og-sensitive-action-summary">
                      <span>
                        Role
                        <strong>
                          {roleName}
                        </strong>
                      </span>

                      <span>
                        Scope
                        <strong>
                          {scopeName}
                        </strong>
                      </span>
                    </div>

                    <p className="og-sensitive-action-note">
                      Assignment ini sudah inactive dan akan dihapus
                      permanen dari database. Tindakan ini hanya tersedia
                      untuk SUPER_ADMIN.
                    </p>
                  </ConfirmedServerAction>
                </div>
              ) : null}
            </article>
          );
        },
      )}
    </div>
  );
}