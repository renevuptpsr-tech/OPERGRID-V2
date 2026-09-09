import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserContext() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const [
    { data: profileData, error: profileError },
    { data: assignmentData, error: assignmentError },
    { data: moduleAccessData, error: moduleAccessError },
    { data: preferenceData, error: preferenceError },
  ] = await Promise.all([
    supabase.rpc("opg_fn_my_profile"),
    supabase.rpc("opg_fn_my_assignments"),
    supabase.rpc("opg_fn_my_module_access"),
    supabase.rpc("opg_fn_my_preference"),
  ]);

  return {
    user,
    profile: profileData?.[0] ?? null,
    assignments: assignmentData ?? [],
    moduleAccess: moduleAccessData ?? [],
    preference: preferenceData?.[0] ?? null,

    errors: {
      profile: profileError?.message ?? null,
      assignments: assignmentError?.message ?? null,
      moduleAccess: moduleAccessError?.message ?? null,
      preference: preferenceError?.message ?? null,
    },
  };
}

export type CurrentUserContext = NonNullable<
  Awaited<ReturnType<typeof getCurrentUserContext>>
>;