import "server-only";

import {
  createClient,
} from "@/lib/supabase/server";


export async function getCanForceDeleteUsers() {
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

  return Boolean(
    data
  );
}


export async function forceDeleteV2User(
  userId:
    string
) {
  const supabase =
    await createClient();

  const {
    error,
  } =
    await supabase.rpc(
      "opg_superadmin_force_delete_v2_user",
      {
        p_user_id:
          userId,
      }
    );

  if (error) {
    throw new Error(
      error.message
    );
  }
}
