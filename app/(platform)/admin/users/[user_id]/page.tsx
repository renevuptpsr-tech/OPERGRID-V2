import {
  ArrowLeft,
  AtSign,
  BriefcaseBusiness,
  Building2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  Badge,
} from "@/components/ui";

import {
  getAdminJobOptions,
  getAdminOrganizationOptions,
  getAdminRoleOptions,
  getAdminScopeOptions,
  getAdminUserAssignments,
  getAdminUserDetail,
  getUserDetailCapabilities,
} from "@/services/admin-user-detail-service";

import {
  UserAssignmentList,
} from "@/components/admin/users/user-assignment-list";

import {
  UserAssignmentModal,
} from "@/components/admin/users/user-assignment-modal";

import {
  UserDetailTabs,
} from "@/components/admin/users/user-detail-tabs";

import {
  UserProfileForm,
} from "@/components/admin/users/user-profile-form";

import {
  UserStatusForm,
} from "@/components/admin/users/user-status-form";

import {
  ActionResultModal,
} from "@/components/ui/action-result-modal";

type UserTab =
  | "profile"
  | "access"
  | "status";

type PageProps = {
  params:
    Promise<{
      user_id: string;
    }>;

  searchParams:
    Promise<{
      tab?: string;
      status?: string;
      message?: string;
    }>;
};

function initials(
  value: string,
) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (part) =>
        part
          .charAt(0)
          .toUpperCase(),
    )
    .join("");
}

function statusVariant(
  status:
    | string
    | null,
) {
  if (
    status ===
    "ACTIVE"
  ) {
    return "success" as const;
  }

  if (
    status ===
    "SUSPENDED"
  ) {
    return "danger" as const;
  }

  if (
    status ===
    "PENDING"
  ) {
    return "warning" as const;
  }

  return "neutral" as const;
}

function resolveTab(
  value:
    | string
    | undefined,
): UserTab {
  if (
    value === "access" ||
    value === "status"
  ) {
    return value;
  }

  return "profile";
}

export default async function UserDetailPage({
  params,
  searchParams,
}: PageProps) {
  const [
    routeParams,
    query,
  ] =
    await Promise.all([
      params,
      searchParams,
    ]);

  const userId =
    routeParams.user_id;

  const initialTab =
    resolveTab(
      query.tab,
    );

  const [
    user,
    assignments,
    roles,
    jobs,
    organizations,
    scopes,
    capabilities,
  ] =
    await Promise.all([
      getAdminUserDetail(
        userId,
      ),
      getAdminUserAssignments(
        userId,
      ),
      getAdminRoleOptions(),
      getAdminJobOptions(),
      getAdminOrganizationOptions(),
      getAdminScopeOptions(),

      getUserDetailCapabilities(
        userId
      ),
    ]);

  if (!user) {
    notFound();
  }

  const displayName =
    user.display_name ??
    user.full_name ??
    user.email ??
    "User";

  const activeAssignments =
    assignments.filter(
      (assignment) =>
        assignment.is_active,
    );

  const profileContent = (
    <UserProfileForm
      user={user}
      jobs={jobs}
      organizations={
        organizations
      }
      canEditPersonal={
        capabilities.can_edit_personal
      }
      canEditOrganization={
        capabilities.can_edit_organization
      }
      canEditContact={
        capabilities.can_edit_contact
      }
    />
  );

  const accessContent = (
    <div className="og-user-detail-section">
      <div className="og-user-detail-section-header">
        <div>
          <h3>
            Access & Role
          </h3>

          <p>
            Kelola role, operational scope,
            primary assignment, dan masa
            berlaku akses pengguna.
          </p>
        </div>

        {capabilities.can_add_role ? (
          <UserAssignmentModal
                    userId={
                      user.user_id
                    }
                    roles={roles}
                    scopes={scopes}
                  />
        ) : null}
      </div>

      <UserAssignmentList
        userId={
          user.user_id
        }
        assignments={
          assignments
        }        canDeactivate={
          capabilities.can_deactivate_assignment
        }
        canDelete={
          capabilities.can_delete_assignment
        }
      />
    </div>
  );

  const statusContent = (
    <UserStatusForm
      userId={
        user.user_id
      }
      statusCode={
        user.status_code
      }
      email={
        user.email
      }
      message={
        query.message ??
        null
      }
      messageStatus={
        query.status ??
        null
      }        canChangeStatus={
          capabilities.can_change_status
        }
        canPasswordRecovery={
          capabilities.can_password_recovery
        }
      />
  );

  return (
    <div className="og-user-detail-page">
      <ActionResultModal />

      <Link
        href="/admin/users"
        prefetch
        className="og-user-detail-back"
      >
        <ArrowLeft
          size={15}
          strokeWidth={1.9}
        />

        User Management
      </Link>

      <section className="og-user-detail-hero">
        <div className="og-user-detail-hero-main">
          <div className="og-user-detail-avatar">
            {initials(
              displayName,
            )}
          </div>

          <div className="og-user-detail-identity">
            <div className="og-user-detail-name-row">
              <h1>
                {displayName}
              </h1>

              <Badge
                variant={
                  statusVariant(
                    user.status_code,
                  )
                }
                dot
              >
                {user.status_code ??
                  "UNKNOWN"}
              </Badge>
            </div>

            <div className="og-user-detail-meta">
              <span>
                <Mail
                  size={13}
                  strokeWidth={1.8}
                />

                {user.email ??
                  "-"}
              </span>

              <span>
                <BriefcaseBusiness
                  size={13}
                  strokeWidth={1.8}
                />

                {user.job_name ??
                  "Tanpa Jabatan"}
              </span>

              <span>
                <Building2
                  size={13}
                  strokeWidth={1.8}
                />

                {user.organization_name ??
                  "Organization belum ditentukan"}
              </span>

              <span>
                <AtSign
                  size={13}
                  strokeWidth={1.8}
                />

                {user.telegram_username
                  ? `@${user.telegram_username}`
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="og-user-detail-hero-summary">
          <div className="og-user-detail-summary-item">
            <span>
              User Relationship
            </span>

            <strong>
              {user.user_type_code ??
                "UNKNOWN"}
            </strong>
          </div>

          <div className="og-user-detail-summary-item">
            <span>
              Organization Type
            </span>

            <strong>
              {user.organization_type ??
                "—"}
            </strong>
          </div>

          <div className="og-user-detail-summary-item">
            <span>
              Active Roles
            </span>

            <strong>
              <ShieldCheck
                size={14}
                strokeWidth={1.9}
              />

              {
                activeAssignments.length
              }
            </strong>
          </div>
        </div>
      </section>

      <section className="og-user-detail-workspace">
        <UserDetailTabs
          initialTab={
            initialTab
          }
          assignmentCount={
            activeAssignments.length
          }
          profileContent={
            profileContent
          }
          accessContent={
            accessContent
          }
          statusContent={
            statusContent
          }
        />
      </section>
    </div>
  );
}