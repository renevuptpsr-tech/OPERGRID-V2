import {
  ArrowLeft,
  KeyRound,
} from "lucide-react";

import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  ActionResultModal,
} from "@/components/ui/action-result-modal";

import {
  CreateUserWizard,
} from "@/components/admin/users/create-user-wizard";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  getAdminJobOptions,
  getAdminOrganizationOptions,
  getAdminRoleOptions,
  getAdminScopeOptions,
} from "@/services/admin-user-detail-service";


type CreateUserPageProps = {
  searchParams:
    Promise<{
      existing_auth_user_id?:
        string;

      email?:
        string;
    }>;
};


export default async function CreateUserPage({
  searchParams,
}: CreateUserPageProps) {
  const query =
    await searchParams;


  const existingAuthUserId =
    query.existing_auth_user_id ??
    null;


  const initialEmail =
    query.email ??
    "";


  /*
   * Existing Auth user may already have an OPERGRID profile.
   * In that case this is not a provisioning operation anymore.
   * Send administrator directly to Access & Role.
   */
  if (
    existingAuthUserId
  ) {

    const supabase =
      await createClient();


    const {
      data: existingProfile,
      error: profileError,
    } =
      await supabase
        .from(
          "opg_user_profile"
        )
        .select(
          "user_id"
        )
        .eq(
          "user_id",
          existingAuthUserId
        )
        .maybeSingle();


    if (profileError) {
      throw new Error(
        profileError.message
      );
    }


    if (
      existingProfile
    ) {

      const params =
        new URLSearchParams({
          tab:
            "access",

          result:
            "info",

          action:
            "User Already Provisioned",

          message:
            "User sudah memiliki OPERGRID Profile. Tambahkan atau kelola operational access melalui Access & Role.",
        });


      redirect(
        `/admin/users/${existingAuthUserId}?${params.toString()}`
      );
    }
  }


  const [
    jobs,
    organizations,
    roles,
    scopes,
  ] =
    await Promise.all([
      getAdminJobOptions(),
      getAdminOrganizationOptions(),
      getAdminRoleOptions(),
      getAdminScopeOptions(),
    ]);


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


      {existingAuthUserId && (
        <div
          className="rounded-[12px] border px-4 py-3"
          style={{
            borderColor:
              "var(--og-border-soft)",

            background:
              "var(--og-surface-soft)",
          }}
        >
          <div className="og-text text-[10px] font-semibold">
            Provision Existing User
          </div>

          <div className="og-muted mt-1 text-[8px]">
            Connect an existing Supabase authentication identity to OPERGRID profile and access.
          </div>
        </div>
      )}


      {existingAuthUserId && (
        <div
          className="flex items-start gap-3 rounded-[13px] border p-4"
          style={{
            color:
              "var(--og-text)",

            background:
              "var(--og-cyan-soft)",

            borderColor:
              "color-mix(in srgb, var(--og-cyan-strong) 22%, transparent)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
            style={{
              color:
                "var(--og-cyan-strong)",

              background:
                "var(--og-surface-raised)",
            }}
          >
            <KeyRound
              size={14}
            />
          </div>


          <div>

            <div className="text-[10px] font-semibold">
              Existing Authentication Account
            </div>

            <div className="og-muted mt-1 text-[8px] leading-4">
              {initialEmail}. Authentication identity ini tidak akan dibuat ulang dan password existing tidak akan diubah.
            </div>

          </div>
        </div>
      )}


      <CreateUserWizard
        jobs={
          jobs
        }
        organizations={
          organizations
        }
        roles={
          roles
        }
        scopes={
          scopes
        }
        existingAuthUserId={
          existingAuthUserId
        }
        initialEmail={
          initialEmail
        }
      />

    </div>
  );
}