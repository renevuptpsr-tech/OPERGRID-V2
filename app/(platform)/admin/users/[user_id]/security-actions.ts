"use server";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/server";


function requiredValue(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(key);

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
  result: "success" | "error",
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

  const email =
    requiredValue(
      formData,
      "email"
    );


  const supabase =
    await createClient();


  const {
    error,
  } =
    await supabase.auth
      .resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/auth/update-password`,
        }
      );


  if (error) {
    redirect(
      buildRedirect(
        userId,
        "error",
        error.message,
        "Reset Link Failed"
      )
    );
  }


  redirect(
    buildRedirect(
      userId,
      "success",
      "Link reset password berhasil dikirim ke email pengguna."
    )
  );
}