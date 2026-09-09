"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createOpergridUser,
  type CreateUserAssignmentInput,
} from "@/services/admin-create-user-service";


function requiredValue(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(
      key
    );


  if (
    typeof value !==
      "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${key} wajib diisi.`
    );
  }


  return value.trim();
}


function valueOrNull(
  value:
    | FormDataEntryValue
    | null
) {
  if (
    typeof value !==
    "string"
  ) {
    return null;
  }


  const normalized =
    value.trim();


  return normalized ||
    null;
}


function optionalNumber(
  value:
    | FormDataEntryValue
    | null
) {
  const text =
    valueOrNull(
      value
    );


  if (!text) {
    return null;
  }


  const parsed =
    Number(
      text
    );


  if (
    !Number.isFinite(
      parsed
    )
  ) {
    throw new Error(
      "Telegram User ID tidak valid."
    );
  }


  return parsed;
}


function parseAssignments(
  formData:
    FormData
): CreateUserAssignmentInput[] {
  const raw =
    formData.get(
      "assignments_json"
    );


  if (
    typeof raw !==
      "string" ||
    !raw.trim()
  ) {
    return [];
  }


  let parsed:
    unknown;


  try {
    parsed =
      JSON.parse(
        raw
      );
  } catch {
    throw new Error(
      "Format Initial Access tidak valid."
    );
  }


  if (
    !Array.isArray(
      parsed
    )
  ) {
    throw new Error(
      "Initial Access tidak valid."
    );
  }


  return parsed.map(
    (
      item,
      index
    ) => {

      if (
        !item ||
        typeof item !==
          "object"
      ) {
        throw new Error(
          `Initial Access #${index + 1} tidak valid.`
        );
      }


      const record =
        item as Record<
          string,
          unknown
        >;


      const roleCode =
        typeof record.roleCode ===
          "string"
          ? record.roleCode.trim()
          : "";


      if (!roleCode) {
        throw new Error(
          `Role pada Initial Access #${index + 1} wajib dipilih.`
        );
      }


      return {
        roleCode,

        scopeFunctlocId:
          typeof record.scopeFunctlocId ===
            "string" &&
          record.scopeFunctlocId.trim()
            ? record.scopeFunctlocId.trim()
            : null,

        includeChildren:
          record.includeChildren ===
          true,

        isPrimary:
          record.isPrimary ===
          true,

        validFrom:
          typeof record.validFrom ===
            "string" &&
          record.validFrom.trim()
            ? record.validFrom.trim()
            : null,

        validUntil:
          typeof record.validUntil ===
            "string" &&
          record.validUntil.trim()
            ? record.validUntil.trim()
            : null,

        notes:
          typeof record.notes ===
            "string" &&
          record.notes.trim()
            ? record.notes.trim()
            : null,
      };
    }
  );
}


function errorUrl(
  message:
    string
) {
  const params =
    new URLSearchParams({
      result:
        "error",

      action:
        "User Provisioning Failed",

      message,
    });


  return `/admin/users/new?${params.toString()}`;
}


export async function createUserAction(
  formData:
    FormData
) {
  try {

    const existingAuthUserId =
      valueOrNull(
        formData.get(
          "existing_auth_user_id"
        )
      );


    const email =
      requiredValue(
        formData,
        "email"
      )
        .toLowerCase();


    const fullName =
      requiredValue(
        formData,
        "full_name"
      );


    const userTypeCode =
      requiredValue(
        formData,
        "user_type_code"
      );


    const statusCode =
      requiredValue(
        formData,
        "status_code"
      );


    const assignments =
      parseAssignments(
        formData
      );


    const result =
      await createOpergridUser({
        existingAuthUserId,

        email,

        employeeId:
          valueOrNull(
            formData.get(
              "employee_id"
            )
          ),

        fullName,

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

        organizationId:
          valueOrNull(
            formData.get(
              "organization_id"
            )
          ),

        userTypeCode,

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

        statusCode,

        assignments,
      });


    revalidatePath(
      "/admin/users"
    );


    revalidatePath(
      `/admin/users/${result.userId}`
    );


    const message =
      result.provisionedExistingAuthUser
        ? assignments.length >
          0
          ? `Existing authentication account berhasil diprovision dengan ${assignments.length} access assignment.`
          : "Existing authentication account berhasil diprovision ke OPERGRID tanpa initial access."
        : result.passwordEmailSent
          ? assignments.length >
            0
            ? `User baru berhasil dibuat dengan ${assignments.length} initial access dan password setup link telah dikirim melalui email.`
            : "User baru berhasil dibuat tanpa initial access dan password setup link telah dikirim melalui email."
          : "User baru berhasil dibuat, tetapi email setup password belum terkirim. Kirim ulang melalui Account Status.";


    const resultType =
      (
        !result.provisionedExistingAuthUser &&
        !result.passwordEmailSent
      )
        ? "warning"
        : "success";


    const params =
      new URLSearchParams({
        tab:
          "profile",

        result:
          resultType,

        action:
          result.provisionedExistingAuthUser
            ? "User Provisioned"
            : "User Created",

        message,
      });


    redirect(
      `/admin/users/${result.userId}?${params.toString()}`
    );

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Gagal membuat atau memprovision user OPERGRID.";


    redirect(
      errorUrl(
        message
      )
    );
  }
}