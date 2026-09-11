"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  assignAdminUserRole,
  deactivateAdminUserAssignment,
  setAdminUserStatus,
  updateUserPersonalInformation,
  updateUserOrganization,
  updateUserContactInformation,
  getUserDetailCapabilities,
  deleteAdminUserAssignment,
} from "@/services/admin-user-detail-service";


function requiredValue(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(key);

  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${key} wajib diisi.`
    );
  }

  return value.trim();
}


function valueOrNull(
  value: FormDataEntryValue | null
) {
  if (
    typeof value !== "string"
  ) {
    return null;
  }

  const normalized =
    value.trim();

  return normalized ||
    null;
}


function optionalNumber(
  value: FormDataEntryValue | null
) {
  const text =
    valueOrNull(value);

  if (!text) {
    return null;
  }

  const parsed =
    Number(text);

  if (
    !Number.isFinite(parsed)
  ) {
    throw new Error(
      "Nilai angka tidak valid."
    );
  }

  return parsed;
}


function checkboxValue(
  value: FormDataEntryValue | null
) {
  return (
    value === "on" ||
    value === "true" ||
    value === "1"
  );
}


function resultUrl(
  userId: string,
  tab: string,
  result: "success" | "error",
  message: string,
  action?: string
) {
  const params =
    new URLSearchParams({
      tab,
      result,
      message,
    });


  if (action) {
    params.set(
      "action",
      action
    );
  }


  return `/admin/users/${userId}?${params.toString()}`;
}


/* =========================================================
   UPDATE PROFILE
   ========================================================= */

export async function updateUserProfileAction(
  formData: FormData
) {
  const userId =
    requiredValue(
      formData,
      "user_id"
    );

  try {
    const capabilities =
      await getUserDetailCapabilities(
        userId
      );

    let changed =
      false;

    /*
     * PERSONAL INFORMATION
     * SUPER_ADMIN only.
     *
     * Disabled HTML controls are not submitted,
     * but backend capability remains the authority.
     */
    if (
      capabilities.can_edit_personal
    ) {
      await updateUserPersonalInformation({
        userId,

        employeeId:
          valueOrNull(
            formData.get(
              "employee_id"
            )
          ),

        fullName:
          requiredValue(
            formData,
            "full_name"
          ),

        displayName:
          valueOrNull(
            formData.get(
              "display_name"
            )
          ),

        jobId:
          valueOrNull(
            formData.get(
              "job_id"
            )
          ),
      });

      changed =
        true;
    }

    /*
     * ORGANIZATION
     * ADMIN / SUPER_ADMIN.
     */
    if (
      capabilities.can_edit_organization
    ) {
      await updateUserOrganization({
        userId,

        organizationId:
          valueOrNull(
            formData.get(
              "organization_id"
            )
          ),

        userTypeCode:
          requiredValue(
            formData,
            "user_type_code"
          ),
      });

      changed =
        true;
    }

    /*
     * CONTACT INFORMATION
     * Own profile / ADMIN / SUPER_ADMIN.
     */
    if (
      capabilities.can_edit_contact
    ) {
      await updateUserContactInformation({
        userId,

        phoneNumber:
          valueOrNull(
            formData.get(
              "phone_number"
            )
          ),

        telegramUsername:
          valueOrNull(
            formData.get(
              "telegram_username"
            )
          ),

        telegramUserId:
          optionalNumber(
            formData.get(
              "telegram_user_id"
            )
          ),
      });

      changed =
        true;
    }

    if (!changed) {
      throw new Error(
        "User Detail ini hanya dapat dilihat dalam mode read-only."
      );
    }

    revalidatePath(
      `/admin/users/${userId}`
    );

    revalidatePath(
      "/admin/users"
    );

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Gagal menyimpan perubahan profile.";

    redirect(
      resultUrl(
        userId,
        "profile",
        "error",
        message
      )
    );
  }

  redirect(
    resultUrl(
      userId,
      "profile",
      "success",
      "Perubahan User Detail berhasil disimpan.",
      "Profile Updated"
    )
  );
}

/* =========================================================
   UPDATE ACCOUNT STATUS
   ========================================================= */

export async function setUserStatusAction(
  formData: FormData
) {
  const userId =
    requiredValue(
      formData,
      "user_id"
    );


  try {

    const statusCode =
      requiredValue(
        formData,
        "status_code"
      );


    await setAdminUserStatus(
      userId,
      statusCode
    );


    revalidatePath(
      `/admin/users/${userId}`
    );

    revalidatePath(
      "/admin/users"
    );

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Gagal memperbarui status akun.";

    redirect(
      resultUrl(
        userId,
        "status",
        "error",
        message
      )
    );
  }


  redirect(
    resultUrl(
      userId,
      "status",
      "success",
      "Status akun berhasil diperbarui.",
      "Account Status Updated"
    )
  );
}


/* =========================================================
   ASSIGN ROLE
   ========================================================= */

export async function assignUserRoleAction(
  formData: FormData
) {
  const userId =
    requiredValue(
      formData,
      "user_id"
    );


  try {

    const roleCode =
      requiredValue(
        formData,
        "role_code"
      );


    await assignAdminUserRole({
      userId,

      roleCode,

      scopeFunctlocId:
        valueOrNull(
          formData.get(
            "scope_functloc_id"
          )
        ),

      includeChildren:
        checkboxValue(
          formData.get(
            "include_children"
          )
        ),

      isPrimary:
        checkboxValue(
          formData.get(
            "is_primary"
          )
        ),

      validFrom:
        valueOrNull(
          formData.get(
            "valid_from"
          )
        ),

      validUntil:
        valueOrNull(
          formData.get(
            "valid_until"
          )
        ),

      notes:
        valueOrNull(
          formData.get(
            "notes"
          )
        ),
    });


    revalidatePath(
      `/admin/users/${userId}`
    );

    revalidatePath(
      "/admin/users"
    );

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Gagal menambahkan role assignment.";

    redirect(
      resultUrl(
        userId,
        "access",
        "error",
        message
      )
    );
  }


  redirect(
    resultUrl(
      userId,
      "access",
      "success",
      "Role assignment berhasil ditambahkan.",
      "Role Assigned"
    )
  );
}


/* =========================================================
   DEACTIVATE ASSIGNMENT
   ========================================================= */

export async function deactivateUserAssignmentAction(
  formData: FormData
) {
  const userId =
    requiredValue(
      formData,
      "user_id"
    );


  try {

    const assignmentId =
      requiredValue(
        formData,
        "assignment_id"
      );


    await deactivateAdminUserAssignment(
      assignmentId
    );


    revalidatePath(
      `/admin/users/${userId}`
    );

    revalidatePath(
      "/admin/users"
    );

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Gagal menonaktifkan assignment.";

    redirect(
      resultUrl(
        userId,
        "access",
        "error",
        message
      )
    );
  }


  redirect(
    resultUrl(
      userId,
      "access",
      "success",
      "Role assignment berhasil dinonaktifkan.",
      "Assignment Deactivated"
    )
  );
}
/* =========================================================
   DELETE ASSIGNMENT
   SUPER_ADMIN ONLY
   ========================================================= */

export async function deleteUserAssignmentAction(
  formData: FormData
) {
  const userId =
    requiredValue(
      formData,
      "user_id"
    );

  try {
    const assignmentId =
      requiredValue(
        formData,
        "assignment_id"
      );

    const capabilities =
      await getUserDetailCapabilities(
        userId
      );

    if (
      !capabilities.can_delete_assignment
    ) {
      throw new Error(
        "Hanya SUPER_ADMIN yang dapat menghapus Role Assignment."
      );
    }

    await deleteAdminUserAssignment(
      assignmentId
    );

    revalidatePath(
      `/admin/users/${userId}`
    );

    revalidatePath(
      "/admin/users"
    );

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Gagal menghapus role assignment.";

    redirect(
      resultUrl(
        userId,
        "access",
        "error",
        message
      )
    );
  }

  redirect(
    resultUrl(
      userId,
      "access",
      "success",
      "Role assignment berhasil dihapus.",
      "Assignment Deleted"
    )
  );
}