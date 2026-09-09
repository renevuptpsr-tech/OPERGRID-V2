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


function resultUrl(
  status: string,
  message: string
) {
  const params =
    new URLSearchParams({
      status,
      message,
    });

  return `/auth/update-password?${params.toString()}`;
}


export async function updateRecoveredPasswordAction(
  formData: FormData
) {
  const password =
    requiredValue(
      formData,
      "password"
    );

  const confirmation =
    requiredValue(
      formData,
      "confirm_password"
    );


  if (
    password.length <
    8
  ) {
    redirect(
      resultUrl(
        "error",
        "Password minimal 8 karakter."
      )
    );
  }


  if (
    password !==
    confirmation
  ) {
    redirect(
      resultUrl(
        "error",
        "Konfirmasi password tidak sama."
      )
    );
  }


  const supabase =
    await createClient();


  const {
    data: authData,
    error: authError,
  } =
    await supabase.auth
      .getUser();


  if (
    authError ||
    !authData.user
  ) {
    redirect(
      resultUrl(
        "error",
        "Session reset password tidak tersedia atau sudah kedaluwarsa."
      )
    );
  }


  const {
    error,
  } =
    await supabase.auth
      .updateUser({
        password,
      });


  if (error) {
    redirect(
      resultUrl(
        "error",
        error.message
      )
    );
  }


  /*
   * End recovery session.
   * User signs in again with the new password.
   */
  await supabase.auth
    .signOut();


  const params =
    new URLSearchParams({
      password_updated:
        "1",
    });


  redirect(
    `/login?${params.toString()}`
  );
}