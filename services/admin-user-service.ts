import {
  createClient,
} from "@/lib/supabase/server";


export type AdminUserRow = {
  user_id: string;

  email:
    | string
    | null;

  employee_id:
    | string
    | null;

  full_name:
    | string
    | null;

  display_name:
    | string
    | null;

  job_id:
    | string
    | null;

  job_code:
    | string
    | null;

  job_name:
    | string
    | null;

  user_type_code:
    | string
    | null;

  phone_number:
    | string
    | null;

  telegram_username:
    | string
    | null;

  status_code:
    | string
    | null;

  role_count:
    | number
    | null;

  primary_role_code:
    | string
    | null;

  primary_role_name:
    | string
    | null;

  primary_scope_name:
    | string
    | null;

  created_at:
    | string
    | null;

  updated_at:
    | string
    | null;
};


export type AdminUserFilters = {
  search?: string;
  status?: string;
  userType?: string;
};


function normalizeUser(
  value: Record<
    string,
    unknown
  >
): AdminUserRow {
  return {
    user_id:
      String(
        value.user_id ??
        ""
      ),

    email:
      value.email
        ? String(
            value.email
          )
        : null,

    employee_id:
      value.employee_id
        ? String(
            value.employee_id
          )
        : null,

    full_name:
      value.full_name
        ? String(
            value.full_name
          )
        : null,

    display_name:
      value.display_name
        ? String(
            value.display_name
          )
        : null,

    job_id:
      value.job_id
        ? String(
            value.job_id
          )
        : null,

    job_code:
      value.job_code
        ? String(
            value.job_code
          )
        : null,

    job_name:
      value.job_name
        ? String(
            value.job_name
          )
        : null,

    user_type_code:
      value.user_type_code
        ? String(
            value.user_type_code
          )
        : null,

    phone_number:
      value.phone_number
        ? String(
            value.phone_number
          )
        : null,

    telegram_username:
      value.telegram_username
        ? String(
            value.telegram_username
          )
        : null,

    status_code:
      value.status_code
        ? String(
            value.status_code
          )
        : null,

    role_count:
      typeof value.role_count ===
      "number"
        ? value.role_count
        : Number(
            value.role_count ??
            0
          ),

    primary_role_code:
      value.primary_role_code
        ? String(
            value.primary_role_code
          )
        : null,

    primary_role_name:
      value.primary_role_name
        ? String(
            value.primary_role_name
          )
        : null,

    primary_scope_name:
      value.primary_scope_name
        ? String(
            value.primary_scope_name
          )
        : null,

    created_at:
      value.created_at
        ? String(
            value.created_at
          )
        : null,

    updated_at:
      value.updated_at
        ? String(
            value.updated_at
          )
        : null,
  };
}


export async function listAdminUsers(
  filters: AdminUserFilters = {}
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase.rpc(
    "opg_admin_list_users",
    {
      p_search:
        filters.search?.trim() ||
        undefined,

      p_status_code:
        filters.status &&
        filters.status !==
          "ALL"
          ? filters.status
          : undefined,

      p_user_type_code:
        filters.userType &&
        filters.userType !==
          "ALL"
          ? filters.userType
          : undefined,
    }
  );

  if (error) {
    throw new Error(
      error.message
    );
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(
    (row) =>
      normalizeUser(
        row as Record<
          string,
          unknown
        >
      )
  );
}