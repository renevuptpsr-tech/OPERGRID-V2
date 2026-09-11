"use server";

import {
  redirect,
} from "next/navigation";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  getUserDetailCapabilities,
} from "@/services/admin-user-detail-service";


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


function buildRedirect(
  userId: string,
  result:
    "success" |
    "error",
  message: string,
  action?: string
) {
  const params =
    new URLSearchParams({
      tab:
        "status",

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


export async function sendPasswordResetAction(
  formData: FormData
) {
  const userId =
    requiredValue(
      formData,
      "user_id"
    );

  try {
    /*
     * Password Recovery:
     * - own profile = allowed
     * - ADMIN       = allowed
     * - SUPER_ADMIN = allowed
     * - ordinary user viewing another user = read-only
     */
    const capabilities =
      await getUserDetailCapabilities(
        userId
      );

    if (
      !capabilities.can_password_recovery
    ) {
      throw new Error(
        "Password Recovery untuk user lain hanya dapat dilakukan oleh ADMIN atau SUPER_ADMIN."
      );
    }

    /*
     * Never trust an email supplied by the browser.
     * Resolve target email from Supabase Authentication.
     */
    const admin =
      createAdminClient();

    const {
      data:
        targetAuth,
      error:
        targetError,
    } =
      await admin.auth.admin
        .getUserById(
          userId
        );

    if (
      targetError ||
      !targetAuth.user?.email
    ) {
      throw new Error(
        targetError?.message ??
        "Email Authentication user tidak tersedia."
      );
    }

    const targetEmail =
      targetAuth.user.email;

    const supabase =
      await createClient();

    const {
      error,
    } =
      await supabase.auth
        .resetPasswordForEmail(
          targetEmail,
          {
            redirectTo:
              `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/auth/update-password`,
          }
        );

    if (error) {
      throw error;
    }

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Gagal mengirim reset password.";

    redirect(
      buildRedirect(
        userId,
        "error",
        message,
        "Reset Link Failed"
      )
    );
  }

  redirect(
    buildRedirect(
      userId,
      "success",
      "Link reset password berhasil dikirim ke email pengguna.",
      "Password Recovery"
    )
  );
}