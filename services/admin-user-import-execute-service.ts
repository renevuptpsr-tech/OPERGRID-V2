import "server-only";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  createOpergridUser,
} from "@/services/admin-create-user-service";

import {
  previewUserImport,
} from "@/services/admin-user-import-preview-service";

import type {
  UserImportAction,
  UserImportPreviewRow,
} from "@/types/admin-user-import";


export type UserImportExecuteStatus =
  | "SUCCESS"
  | "FAILED"
  | "SKIPPED";


export type UserImportExecuteRowResult = {
  rowNumber: number;
  email: string;
  action: UserImportAction;
  status: UserImportExecuteStatus;
  message: string;
  userId: string | null;
  addedAssignments: number;
};


export type UserImportExecuteResult = {
  fileName: string;
  executedAt: string;
  summary: {
    totalUsers: number;
    successUsers: number;
    failedUsers: number;
    skippedUsers: number;
    addedAssignments: number;
  };
  rows: UserImportExecuteRowResult[];
};


async function assertCanExecuteImport() {
  const supabase =
    await createClient();

  const {
    data: allowed,
    error: allowedError,
  } =
    await supabase.rpc(
      "opg_fn_is_admin_or_super_admin"
    );

  if (allowedError) {
    throw new Error(
      allowedError.message
    );
  }

  if (!allowed) {
    throw new Error(
      "Hanya Administrator atau Super Administrator yang dapat menjalankan Bulk Import User."
    );
  }

  const {
    data: isSuperAdmin,
    error: superAdminError,
  } =
    await supabase.rpc(
      "opg_fn_is_super_admin"
    );

  if (superAdminError) {
    throw new Error(
      superAdminError.message
    );
  }

  return Boolean(
    isSuperAdmin
  );
}


function parseTelegramUserId(
  value:
    | string
    | null
) {
  if (!value) {
    return null;
  }

  const parsed =
    Number(value);

  if (
    !Number.isSafeInteger(
      parsed
    )
  ) {
    throw new Error(
      "Telegram User ID tidak valid."
    );
  }

  return parsed;
}


function getNewAssignments(
  row:
    UserImportPreviewRow
) {
  return row.assignments.filter(
    (assignment) =>
      !assignment.alreadyExists &&
      assignment.errors.length === 0
  );
}


function assertPrivilegedRolesAllowed(
  row:
    UserImportPreviewRow,
  isSuperAdmin:
    boolean
) {
  if (isSuperAdmin) {
    return;
  }

  const privileged =
    row.assignments.some(
      (assignment) => {
        const role =
          assignment.roleCode
            ?.trim()
            .toUpperCase();

        return (
          role === "ADMIN" ||
          role === "SUPER_ADMIN"
        );
      }
    );

  if (privileged) {
    throw new Error(
      "Hanya Super Administrator yang dapat memberikan role ADMIN atau SUPER_ADMIN."
    );
  }
}


async function addImportAssignment(
  userId:
    string,
  assignment:
    UserImportPreviewRow["assignments"][number]
) {
  if (!assignment.roleCode) {
    throw new Error(
      "Role assignment tidak valid."
    );
  }

  const supabase =
    await createClient();

  const {
    error,
  } =
    await supabase.rpc(
      "opg_user_import_add_only_assignment",
      {
        p_user_id:
          userId,

        p_role_code:
          assignment.roleCode,

        p_scope_functloc_id:
          assignment.scopeFunctlocId ??
          undefined,

        p_include_children:
          assignment.includeChildren,

        p_is_primary:
          assignment.primary,

        p_valid_from:
          assignment.validFrom ??
          undefined,

        p_valid_until:
          assignment.validUntil ??
          undefined,

        p_notes:
          assignment.notes ??
          undefined,
      }
    );

  if (error) {
    throw new Error(
      error.message
    );
  }
}


async function executeRow(
  row:
    UserImportPreviewRow,
  isSuperAdmin:
    boolean
): Promise<UserImportExecuteRowResult> {
  if (row.severity === "ERROR") {
    return {
      rowNumber:
        row.rowNumber,
      email:
        row.email,
      action:
        row.action,
      status:
        "SKIPPED",
      message:
        row.errors.join(" | ") ||
        "Row memiliki validation error.",
      userId:
        row.authUserId,
      addedAssignments:
        0,
    };
  }

  if (row.action === "NO_CHANGE") {
    return {
      rowNumber:
        row.rowNumber,
      email:
        row.email,
      action:
        row.action,
      status:
        "SKIPPED",
      message:
        "Tidak ada perubahan yang diperlukan.",
      userId:
        row.authUserId,
      addedAssignments:
        0,
    };
  }

  try {
    assertPrivilegedRolesAllowed(
      row,
      isSuperAdmin
    );

    const assignments =
      getNewAssignments(
        row
      );

    if (
      row.action === "CREATE_USER" ||
      row.action === "PROVISION"
    ) {
      const created =
        await createOpergridUser({
          existingAuthUserId:
            row.action === "PROVISION"
              ? row.authUserId
              : null,

          email:
            row.email,

          employeeId:
            row.employeeId,

          fullName:
            row.fullName,

          displayName:
            row.displayName,

          jobId:
            row.jobId,

          organizationId:
            row.organizationId,

          userTypeCode:
            row.userRelationship ||
            "EMPLOYEE",

          phoneNumber:
            row.phoneNumber,

          telegramUsername:
            row.telegramUsername,

          telegramUserId:
            parseTelegramUserId(
              row.telegramUserId
            ),

          statusCode:
            row.accountStatus ||
            "ACTIVE",

          assignments:
            assignments.map(
              (assignment) => {
                if (!assignment.roleCode) {
                  throw new Error(
                    "Role assignment tidak valid."
                  );
                }

                return {
                  roleCode:
                    assignment.roleCode,

                  scopeFunctlocId:
                    assignment.scopeFunctlocId,

                  includeChildren:
                    assignment.includeChildren,

                  isPrimary:
                    assignment.primary,

                  validFrom:
                    assignment.validFrom,

                  validUntil:
                    assignment.validUntil,

                  notes:
                    assignment.notes,
                };
              }
            ),
        });

      return {
        rowNumber:
          row.rowNumber,
        email:
          row.email,
        action:
          row.action,
        status:
          "SUCCESS",
        message:
          row.action === "CREATE_USER"
            ? "User berhasil dibuat."
            : "Existing Auth user berhasil diprovision.",
        userId:
          created.userId,
        addedAssignments:
          assignments.length,
      };
    }

    if (
      row.action === "ADD_ACCESS" ||
      row.action === "UPDATE_ACCESS"
    ) {
      if (!row.authUserId) {
        throw new Error(
          "Authentication User ID tidak tersedia."
        );
      }

      let addedAssignments =
        0;

      for (
        const assignment
        of assignments
      ) {
        await addImportAssignment(
          row.authUserId,
          assignment
        );

        addedAssignments +=
          1;
      }

      return {
        rowNumber:
          row.rowNumber,
        email:
          row.email,
        action:
          row.action,
        status:
          "SUCCESS",
        message:
          addedAssignments > 0
            ? `${addedAssignments} access baru berhasil ditambahkan.`
            : "Tidak ada access baru yang perlu ditambahkan.",
        userId:
          row.authUserId,
        addedAssignments,
      };
    }

    throw new Error(
      "Import action tidak dikenali."
    );

  } catch (error) {
    return {
      rowNumber:
        row.rowNumber,
      email:
        row.email,
      action:
        row.action,
      status:
        "FAILED",
      message:
        error instanceof Error
          ? error.message
          : "Import user gagal.",
      userId:
        row.authUserId,
      addedAssignments:
        0,
    };
  }
}


export async function executeUserImport(
  fileName:
    string,
  bytes:
    Uint8Array
): Promise<UserImportExecuteResult> {
  const isSuperAdmin =
    await assertCanExecuteImport();

  /*
   * Critical safety rule:
   * never trust the browser preview.
   * The Excel file is parsed and validated again on the server.
   */
  const preview =
    await previewUserImport(
      fileName,
      bytes
    );

  if (
    preview.globalErrors.length >
    0
  ) {
    throw new Error(
      preview.globalErrors.join(
        " | "
      )
    );
  }

  const rows:
    UserImportExecuteRowResult[] =
    [];

  for (
    const row
    of preview.rows
  ) {
    rows.push(
      await executeRow(
        row,
        isSuperAdmin
      )
    );
  }

  return {
    fileName:
      preview.fileName,

    executedAt:
      new Date().toISOString(),

    summary: {
      totalUsers:
        rows.length,

      successUsers:
        rows.filter(
          (row) =>
            row.status ===
            "SUCCESS"
        ).length,

      failedUsers:
        rows.filter(
          (row) =>
            row.status ===
            "FAILED"
        ).length,

      skippedUsers:
        rows.filter(
          (row) =>
            row.status ===
            "SKIPPED"
        ).length,

      addedAssignments:
        rows.reduce(
          (total, row) =>
            total +
            row.addedAssignments,
          0
        ),
    },

    rows,
  };
}
