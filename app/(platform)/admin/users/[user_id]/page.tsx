import {
  ArrowLeft,
  AtSign,
  BriefcaseBusiness,
  Building2,
  Mail,
} from "lucide-react";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import {
  Badge,
  Panel,
} from "@/components/ui";

import {
  getAdminJobOptions,
  getAdminOrganizationOptions,
  getAdminRoleOptions,
  getAdminScopeOptions,
  getAdminUserAssignments,
  getAdminUserDetail,
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


function statusVariant(
  status:
    | string
    | null
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
    | undefined
): UserTab {
  if (
    value ===
      "access" ||
    value ===
      "status"
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
      query.tab
    );


  /*
   * All independent requests execute in parallel.
   */

  const [
    user,
    assignments,
    roles,
    jobs,
    organizations,
    scopes,
  ] =
    await Promise.all([
      getAdminUserDetail(
        userId
      ),

      getAdminUserAssignments(
        userId
      ),

      getAdminRoleOptions(),

      getAdminJobOptions(),

      getAdminOrganizationOptions(),

      getAdminScopeOptions(),
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
        assignment.is_active
    );


  const profileContent = (
    <UserProfileForm
      user={
        user
      }
      jobs={
        jobs
      }
      organizations={
        organizations
      }
    />
  );


  const accessContent = (
    <div className="py-6">

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h3 className="og-text text-[13px] font-semibold">
            Access & Role
          </h3>

          <p className="og-muted mt-1 text-[9px]">
            Kelola role, operational scope, dan masa berlaku akses pengguna.
          </p>
        </div>


        <UserAssignmentModal
          userId={
            user.user_id
          }
          roles={
            roles
          }
          scopes={
            scopes
          }
        />

      </div>


      <UserAssignmentList
        userId={
          user.user_id
        }
        assignments={
          assignments
        }
      />

    </div>
  );


  const statusContent = (
    <div className="py-6">

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
        }
      />

    </div>
  );


  return (
    <div className="space-y-4">

      <ActionResultModal />

      <Link
        href="/admin/users"
        prefetch
        className="og-secondary inline-flex items-center gap-2 text-[10px] font-medium hover:text-[var(--og-cyan-strong)]"
      >
        <ArrowLeft
          size={14}
          strokeWidth={1.8}
        />

        User Management
      </Link>


      {/* =====================================================
          USER HEADER
         ===================================================== */}

      <Panel
        variant="raised"
        padding="lg"
      >

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[15px] text-[14px] font-semibold"
            style={{
              color:
                "#eafaff",

              background:
                "linear-gradient(145deg,#17364f,#0f263b)",
            }}
          >
            {initials(
              displayName
            )}
          </div>


          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="og-text truncate text-[18px] font-semibold tracking-[-0.02em]">
                {displayName}
              </h2>


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

            </div>


            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">

              <span className="og-muted flex items-center gap-1.5 text-[9px]">
                <Mail
                  size={12}
                />

                {user.email ??
                  "-"}
              </span>


              <span className="og-muted flex items-center gap-1.5 text-[9px]">
                <BriefcaseBusiness
                  size={12}
                />

                {user.job_name ??
                  "Tanpa Jabatan"}
              </span>


              <span className="og-muted flex items-center gap-1.5 text-[9px]">
                <Building2
                  size={12}
                />

                {user.organization_name ??
                  "Organization belum ditentukan"}
              </span>


              <span className="og-muted flex items-center gap-1.5 text-[9px]">
                <AtSign
                  size={12}
                />

                {user.telegram_username
                  ? `@${user.telegram_username}`
                  : "-"}
              </span>

            </div>

          </div>


          <div className="flex shrink-0 flex-wrap items-center gap-2">

            <Badge
              variant="neutral"
            >
              {user.user_type_code ??
                "UNKNOWN"}
            </Badge>


            {user.organization_type && (
              <Badge
                variant="info"
              >
                {user.organization_type}
              </Badge>
            )}


            <Badge
              variant="info"
            >
              {activeAssignments.length} Active Role
            </Badge>

          </div>

        </div>

      </Panel>


      {/* =====================================================
          INSTANT CLIENT TABS
         ===================================================== */}

      <Panel
        variant="raised"
        padding="none"
        className="overflow-visible"
      >

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

      </Panel>

    </div>
  );
}