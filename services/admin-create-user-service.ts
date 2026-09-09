import "server-only";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  assignAdminUserRole,
  setAdminUserStatus,
  updateAdminUserProfile,
} from "@/services/admin-user-detail-service";


export type CreateUserAssignmentInput = {
  roleCode: string;

  scopeFunctlocId:
    | string
    | null;

  includeChildren: boolean;

  isPrimary: boolean;

  validFrom:
    | string
    | null;

  validUntil:
    | string
    | null;

  notes:
    | string
    | null;
};


export type CreateOpergridUserInput = {
  existingAuthUserId:
    | string
    | null;

  email: string;

  employeeId:
    | string
    | null;

  fullName: string;

  displayName:
    | string
    | null;

  jobId:
    | string
    | null;

  organizationId:
    | string
    | null;

  userTypeCode: string;

  phoneNumber:
    | string
    | null;

  telegramUsername:
    | string
    | null;

  telegramUserId:
    | number
    | null;

  statusCode: string;

  assignments:
    CreateUserAssignmentInput[];
};


async function assertCanCreateUser() {
  const supabase =
    await createClient();


  const {
    data,
    error,
  } =
    await supabase.rpc(
      "opg_fn_is_super_admin"
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  if (!data) {
    throw new Error(
      "Hanya Super Administrator yang dapat membuat atau memprovision user."
    );
  }
}


function validateAssignments(
  assignments:
    CreateUserAssignmentInput[]
) {
  const primaryCount =
    assignments.filter(
      (
        assignment
      ) =>
        assignment.isPrimary
    ).length;


  if (
    primaryCount >
    1
  ) {
    throw new Error(
      "Hanya satu Initial Access yang dapat dijadikan Primary Role."
    );
  }


  for (
    const assignment
    of assignments
  ) {

    if (
      !assignment.roleCode.trim()
    ) {
      throw new Error(
        "Role pada Initial Access wajib dipilih."
      );
    }


    if (
      assignment.validFrom &&
      assignment.validUntil &&
      assignment.validUntil <
        assignment.validFrom
    ) {
      throw new Error(
        "Valid Until tidak boleh lebih awal dari Valid From."
      );
    }
  }
}


export async function createOpergridUser(
  input:
    CreateOpergridUserInput
) {
  await assertCanCreateUser();


  validateAssignments(
    input.assignments
  );


  const admin =
    createAdminClient();


  let userId:
    | string
    | null =
    null;


  let authUserCreatedByThisOperation =
    false;


  try {

    /* =====================================================
       1. AUTH IDENTITY
       ===================================================== */

    if (
      input.existingAuthUserId
    ) {

      const {
        data,
        error,
      } =
        await admin.auth.admin
          .getUserById(
            input.existingAuthUserId
          );


      if (
        error ||
        !data.user
      ) {
        throw new Error(
          error?.message ??
          "Existing Supabase Auth user tidak ditemukan."
        );
      }


      const existingEmail =
        data.user.email
          ?.trim()
          .toLowerCase();


      if (
        existingEmail !==
        input.email
          .trim()
          .toLowerCase()
      ) {
        throw new Error(
          "Email tidak sesuai dengan existing authentication account."
        );
      }


      userId =
        data.user.id;


      /*
       * Do not provision twice.
       */
      const {
        data: existingProfile,
        error: profileCheckError,
      } =
        await admin
          .from(
            "opg_user_profile"
          )
          .select(
            "user_id"
          )
          .eq(
            "user_id",
            userId
          )
          .maybeSingle();


      if (profileCheckError) {
        throw new Error(
          profileCheckError.message
        );
      }


      if (existingProfile) {
        throw new Error(
          "Authentication account ini sudah memiliki OPERGRID Profile. Buka User Detail untuk melakukan perubahan."
        );
      }

    } else {

      const {
        data,
        error,
      } =
        await admin.auth.admin
          .createUser({
            email:
              input.email,

            email_confirm:
              true,

            user_metadata: {
              full_name:
                input.fullName,

              display_name:
                input.displayName ??
                input.fullName,
            },
          });


      if (
        error ||
        !data.user
      ) {
        throw new Error(
          error?.message ??
          "Gagal membuat authentication user."
        );
      }


      userId =
        data.user.id;


      authUserCreatedByThisOperation =
        true;
    }


    /* =====================================================
       2. OPERGRID PROFILE
       ===================================================== */

    await updateAdminUserProfile({
      userId,

      employeeId:
        input.employeeId,

      fullName:
        input.fullName,

      displayName:
        input.displayName,

      jobId:
        input.jobId,

      organizationId:
        input.organizationId,

      userTypeCode:
        input.userTypeCode,

      phoneNumber:
        input.phoneNumber,

      telegramUsername:
        input.telegramUsername,

      telegramUserId:
        input.telegramUserId,
    });


    /* =====================================================
       3. PROFILE STATUS
       ===================================================== */

    if (
      input.statusCode !==
      "ACTIVE"
    ) {
      await setAdminUserStatus(
        userId,
        input.statusCode
      );
    }


    /* =====================================================
       4. MULTIPLE INITIAL ACCESS
       ===================================================== */

    for (
      const assignment
      of input.assignments
    ) {
      await assignAdminUserRole({
        userId,

        roleCode:
          assignment.roleCode,

        scopeFunctlocId:
          assignment.scopeFunctlocId,

        includeChildren:
          assignment.includeChildren,

        isPrimary:
          assignment.isPrimary,

        validFrom:
          assignment.validFrom,

        validUntil:
          assignment.validUntil,

        notes:
          assignment.notes,
      });
    }


    /* =====================================================
       5. PASSWORD SETUP
       Only for NEW auth accounts.
       Existing Auth users keep their existing credentials.
       ===================================================== */

    let passwordEmailSent =
      false;


    let passwordEmailError:
      string |
      null =
      null;


    if (
      authUserCreatedByThisOperation
    ) {

      const supabase =
        await createClient();


      const siteUrl =
        process.env
          .NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3000";


      const {
        error,
      } =
        await supabase.auth
          .resetPasswordForEmail(
            input.email,
            {
              redirectTo:
                `${siteUrl}/auth/callback?next=/auth/update-password`,
            }
          );


      passwordEmailSent =
        !error;


      passwordEmailError =
        error?.message ??
        null;
    }


    return {
      userId,

      provisionedExistingAuthUser:
        !authUserCreatedByThisOperation,

      passwordEmailSent,

      passwordEmailError,
    };

  } catch (error) {

    /*
     * Critical rule:
     *
     * Delete Auth user ONLY when it was created
     * by this Create User operation.
     *
     * Existing Auth accounts must NEVER be deleted
     * when provisioning fails.
     */
    if (
      userId &&
      authUserCreatedByThisOperation
    ) {

      try {
        await admin.auth.admin
          .deleteUser(
            userId
          );
      } catch {
        /*
         * Preserve original error.
         */
      }
    }


    throw error;
  }
}