"use server";

import { createClient } from "@/lib/supabase/server";

export type AppTheme =
  | "light"
  | "dark"
  | "system";

export async function updateMyTheme(
  theme: AppTheme
) {
  const supabase = await createClient();

  const normalizedTheme =
    theme.toUpperCase() as
      | "LIGHT"
      | "DARK"
      | "SYSTEM";

  const { error } = await supabase.rpc(
    "opg_fn_set_my_theme",
    {
      p_theme: normalizedTheme,
    }
  );

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    error: null,
  };
}