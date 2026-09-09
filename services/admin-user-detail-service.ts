import {
  createClient,
} from "@/lib/supabase/server";


/* =========================================================
   TYPES
   ========================================================= */

export type AdminUserDetail = {
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

  organization_id:
    | string
    | null;

  organization_code:
    | string
    | null;

  organization_name:
    | string
    | null;

  organization_type:
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

  telegram_user_id:
    | number
    | null;

  status_code:
    | string
    | null;

  created_at:
    | string
    | null;

  updated_at:
    | string
    | null;
};


export type AdminUserAssignment = {
  assignment_id: string;
  user_id: string;

  role_id: string;

  role_code:
    | string
    | null;

  role_name:
    | string
    | null;

  role_scope_level:
    | string
    | null;

  scope_functloc_id:
    | string
    | null;

  scope_name:
    | string
    | null;

  include_children: boolean;
  is_primary: boolean;
  is_active: boolean;

  valid_from:
    | string
    | null;

  valid_until:
    | string
    | null;

  notes:
    | string
    | null;
};


export type AdminRoleOption = {
  role_id: string;
  role_code: string;
  role_name: string;
  scope_level: string;
};


export type AdminJobOption = {
  job_id: string;
  job_code: string;
  job_name: string;
};


export type AdminOrganizationOption = {
  organization_id: string;
  organization_code: string;
  organization_name: string;
  short_name:
    | string
    | null;
  organization_type: string;
  parent_organization_id:
    | string
    | null;
};


export type AdminScopeOption = {
  functloc_id: string;
  location_name: string;
  scope_level: string;
};


export type UpdateUserProfileInput = {
  userId: string;

  employeeId:
    | string
    | null;

  fullName: string;

  displayName:
    | string
    | null;

  jobId:
    | string
    | null;

  organizationId:
    | string
    | null;

  userTypeCode: string;

  phoneNumber:
    | string
    | null;

  telegramUsername:
    | string
    | null;

  telegramUserId:
    | number
    | null;
};


export type AssignUserRoleInput = {
  userId: string;
  roleCode: string;

  scopeFunctlocId:
    | string
    | null;

  includeChildren: boolean;
  isPrimary: boolean;

  validFrom:
    | string
    | null;

  validUntil:
    | string
    | null;

  notes:
    | string
    | null;
};


/* =========================================================
   HELPERS
   ========================================================= */



function asNumber(
  value: unknown
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}




/* =========================================================
   USER DETAIL
   ========================================================= */

export async function getAdminUserDetail(
  userId: string
) {
  const supabase =
    await createClient();


  const profilePromise =
    supabase
      .from("opg_user_profile")
      .select(`
        user_id,
        employee_id,
        full_name,
        display_name,
        job_id,
        organization_id,
        user_type_code,
        phone_number,
        telegram_username,
        telegram_user_id,
        status_code,
        created_at,
        updated_at,
        opg_job (
          job_code,
          job_name
        ),
        opg_organization (
          organization_code,
          organization_name,
          organization_type
        )
      `)
      .eq(
        "user_id",
        userId
      )
      .maybeSingle();


  const emailPromise =
    supabase.rpc(
      "opg_admin_list_users",
      {
        p_search:
          userId,

        p_limit:
          5,

        p_offset:
          0,
      }
    );


  const [
    profileResult,
    listResult,
  ] =
    await Promise.all([
      profilePromise,
      emailPromise,
    ]);


  if (
    profileResult.error
  ) {
    throw new Error(
      profileResult.error.message
    );
  }


  const profile =
    profileResult.data;


  if (!profile) {
    return null;
  }


  let email:
    | string
    | null =
    null;


  if (
    !listResult.error &&
    Array.isArray(
      listResult.data
    )
  ) {
    const exact =
      listResult.data.find(
        (item) =>
          item.user_id ===
          userId
      );

    email =
      exact?.email ??
      null;
  }


  const job =
    Array.isArray(
      profile.opg_job
    )
      ? profile.opg_job[0]
      : profile.opg_job;


  const organization =
    Array.isArray(
      profile.opg_organization
    )
      ? profile.opg_organization[0]
      : profile.opg_organization;


  const result:
    AdminUserDetail = {
      user_id:
        profile.user_id,

      email,

      employee_id:
        profile.employee_id,

      full_name:
        profile.full_name,

      display_name:
        profile.display_name,

      job_id:
        profile.job_id,

      job_code:
        job?.job_code ??
        null,

      job_name:
        job?.job_name ??
        null,

      organization_id:
        profile.organization_id,

      organization_code:
        organization
          ?.organization_code ??
        null,

      organization_name:
        organization
          ?.organization_name ??
        null,

      organization_type:
        organization
          ?.organization_type ??
        null,

      user_type_code:
        profile.user_type_code,

      phone_number:
        profile.phone_number,

      telegram_username:
        profile.telegram_username,

      telegram_user_id:
        asNumber(
          profile.telegram_user_id
        ),

      status_code:
        profile.status_code,

      created_at:
        profile.created_at,

      updated_at:
        profile.updated_at,
    };


  return result;
}


/* =========================================================
   ASSIGNMENTS
   ========================================================= */

export async function getAdminUserAssignments(
  userId: string
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.rpc(
      "opg_admin_user_assignments",
      {
        p_user_id:
          userId,

        p_include_inactive:
          true,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return (
    data ??
    []
  ).map(
    (
      item
    ): AdminUserAssignment => ({
      assignment_id:
        item.assignment_id,

      user_id:
        userId,

      role_id:
        item.role_id,

      role_code:
        item.role_code,

      role_name:
        item.role_name,

      role_scope_level:
        item.role_scope_level,

      scope_functloc_id:
        item.scope_functloc_id,

      scope_name:
        item.scope_name,

      include_children:
        item.include_children,

      is_primary:
        item.is_primary,

      is_active:
        item.is_active,

      valid_from:
        item.valid_from,

      valid_until:
        item.valid_until,

      notes:
        item.notes,
    })
  );
}


/* =========================================================
   ROLE OPTIONS
   ========================================================= */

export async function getAdminRoleOptions():
  Promise<AdminRoleOption[]> {
  const supabase =
    await createClient();


  const {
    data,
    error,
  } =
    await supabase
      .from(
        "opg_access_role"
      )
      .select(
        `
          role_id,
          role_code,
          role_name,
          scope_level
        `
      )
      .eq(
        "is_active",
        true
      )
      .order(
        "role_name",
        {
          ascending:
            true,
        }
      );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return (
    data ??
    []
  ).map(
    (
      role
    ) => ({
      role_id:
        role.role_id,

      role_code:
        role.role_code,

      role_name:
        role.role_name,

      scope_level:
        role.scope_level ??
        "FLEXIBLE",
    })
  );
}


/* =========================================================
   JOB OPTIONS
   ========================================================= */

export async function getAdminJobOptions() {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase
      .from(
        "opg_job"
      )
      .select(`
        job_id,
        job_code,
        job_name
      `)
      .eq(
        "is_active",
        true
      )
      .order(
        "sort_order",
        {
          ascending: true,
        }
      );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return (
    data ??
    []
  ).map(
    (
      job
    ): AdminJobOption => ({
      job_id:
        job.job_id,

      job_code:
        job.job_code,

      job_name:
        job.job_name,
    })
  );
}


/* =========================================================
   ORGANIZATION OPTIONS
   ========================================================= */

export async function getAdminOrganizationOptions() {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase
      .from(
        "opg_organization"
      )
      .select(`
        organization_id,
        organization_code,
        organization_name,
        short_name,
        organization_type,
        parent_organization_id
      `)
      .eq(
        "is_active",
        true
      )
      .order(
        "sort_order",
        {
          ascending: true,
        }
      )
      .order(
        "organization_name",
        {
          ascending: true,
        }
      );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return (
    data ??
    []
  ).map(
    (
      item
    ): AdminOrganizationOption => ({
      organization_id:
        item.organization_id,

      organization_code:
        item.organization_code,

      organization_name:
        item.organization_name,

      short_name:
        item.short_name,

      organization_type:
        item.organization_type,

      parent_organization_id:
        item.parent_organization_id,
    })
  );
}


/* =========================================================
   SCOPE OPTIONS
   ========================================================= */

export async function getAdminScopeOptions():
  Promise<AdminScopeOption[]> {
  const supabase =
    await createClient();


  const {
    data,
    error,
  } =
    await supabase
      .from(
        "mst_functloc"
      )
      .select(
        `
          functloc_id,
          location_name,
          nlevel,
          function_code
        `
      )
      .in(
        "function_code",
        [
          "O2",
          "B",
          "G",
        ]
      )
      .order(
        "location_name",
        {
          ascending:
            true,
        }
      );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return (
    data ??
    []
  )
    .map(
      (
        row
      ):
        AdminScopeOption |
        null => {

        const nlevel =
          Number(
            row.nlevel
          );


        const functionCode =
          String(
            row.function_code ??
            ""
          )
            .trim()
            .toUpperCase();


        let scopeLevel:
          | "UPT"
          | "ULTG"
          | "GI"
          | null =
          null;


        /*
         * UPT
         * nlevel       = 2.0
         * functionCode = O2
         */
        if (
          nlevel ===
            2 &&
          functionCode ===
            "O2"
        ) {
          scopeLevel =
            "UPT";
        }


        /*
         * ULTG
         * nlevel       = 3.0
         * functionCode = B
         */
        if (
          nlevel ===
            3 &&
          functionCode ===
            "B"
        ) {
          scopeLevel =
            "ULTG";
        }


        /*
         * GI
         * nlevel       = 3.0
         * functionCode = G
         */
        if (
          nlevel ===
            3 &&
          functionCode ===
            "G"
        ) {
          scopeLevel =
            "GI";
        }


        if (!scopeLevel) {
          return null;
        }


        return {
          functloc_id:
            row.functloc_id,

          location_name:
            row.location_name ??
            row.functloc_id,

          scope_level:
            scopeLevel,
        };
      }
    )
    .filter(
      (
        row
      ): row is AdminScopeOption =>
        row !==
        null
    );
}


/* =========================================================
   UPDATE PROFILE
   ========================================================= */

export async function updateAdminUserProfile(
  input: UpdateUserProfileInput
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.rpc(
      "opg_admin_upsert_user_profile",
      {
        p_user_id:
          input.userId,

        p_employee_id:
          input.employeeId ??
          "",

        p_full_name:
          input.fullName,

        p_display_name:
          input.displayName ??
          undefined,

        p_job_id:
          input.jobId ??
          undefined,

        p_organization_id:
          input.organizationId ??
          undefined,

        p_user_type_code:
          input.userTypeCode,

        p_phone_number:
          input.phoneNumber ??
          undefined,

        p_telegram_username:
          input.telegramUsername ??
          undefined,

        p_telegram_user_id:
          input.telegramUserId ??
          undefined,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data;
}


/* =========================================================
   USER STATUS
   ========================================================= */

export async function setAdminUserStatus(
  userId: string,
  statusCode: string
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.rpc(
      "opg_admin_set_user_status",
      {
        p_user_id:
          userId,

        p_status_code:
          statusCode,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data;
}


/* =========================================================
   ASSIGN ROLE
   ========================================================= */

export async function assignAdminUserRole(
  input: AssignUserRoleInput
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.rpc(
      "opg_admin_assign_role",
      {
        p_user_id:
          input.userId,

        p_role_code:
          input.roleCode,

        p_scope_functloc_id:
          input.scopeFunctlocId ??
          undefined,

        p_include_children:
          input.includeChildren,

        p_is_primary:
          input.isPrimary,

        p_valid_from:
          input.validFrom ??
          undefined,

        p_valid_until:
          input.validUntil ??
          undefined,

        p_notes:
          input.notes ??
          undefined,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data;
}


/* =========================================================
   DEACTIVATE ASSIGNMENT
   ========================================================= */

export async function deactivateAdminUserAssignment(
  assignmentId: string
) {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.rpc(
      "opg_admin_deactivate_assignment",
      {
        p_assignment_id:
          assignmentId,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data;
}