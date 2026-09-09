import "server-only";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient,
} from "@/lib/supabase/server";


export type UserDirectoryState =
  | "PENDING_PROVISIONING"
  | "UNASSIGNED"
  | "ASSIGNED"
  | "INACTIVE";


export type AdminUserDirectoryRow = {
  user_id: string;

  email: string;

  full_name:
    | string
    | null;

  display_name:
    | string
    | null;

  employee_id:
    | string
    | null;

  organization_name:
    | string
    | null;

  user_type_code:
    | string
    | null;

  profile_status_code:
    | string
    | null;

  directory_state:
    UserDirectoryState;

  active_assignment_count:
    number;

  primary_role_name:
    | string
    | null;

  auth_created_at:
    string;

  profile_updated_at:
    | string
    | null;
};


async function assertCanViewAuthDirectory() {
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


  if (!data) {
    throw new Error(
      "Hanya Super Administrator yang dapat melihat Authentication Directory."
    );
  }
}


function assignmentIsCurrentlyActive(
  assignment: {
    is_active: boolean;
    valid_from: string | null;
    valid_until: string | null;
  }
) {
  if (
    !assignment.is_active
  ) {
    return false;
  }


  const today =
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );


  if (
    assignment.valid_from &&
    assignment.valid_from >
      today
  ) {
    return false;
  }


  if (
    assignment.valid_until &&
    assignment.valid_until <
      today
  ) {
    return false;
  }


  return true;
}


export async function getAdminUserDirectory():
  Promise<AdminUserDirectoryRow[]> {
  await assertCanViewAuthDirectory();


  const admin =
    createAdminClient();


  /*
   * Fetch all Auth users.
   * Supabase Auth Admin API is paginated.
   */
  const authUsers = [];

  let page =
    1;

  const perPage =
    1000;


  while (true) {

    const {
      data,
      error,
    } =
      await admin.auth.admin
        .listUsers({
          page,
          perPage,
        });


    if (error) {
      throw new Error(
        error.message
      );
    }


    authUsers.push(
      ...data.users
    );


    if (
      data.users.length <
      perPage
    ) {
      break;
    }


    page +=
      1;


    /*
     * Safety guard.
     */
    if (
      page >
      20
    ) {
      break;
    }
  }


  const [
    profileResult,
    assignmentResult,
    roleResult,
    organizationResult,
  ] =
    await Promise.all([
      admin
        .from(
          "opg_user_profile"
        )
        .select(
          `
            user_id,
            employee_id,
            full_name,
            display_name,
            organization_id,
            user_type_code,
            status_code,
            updated_at
          `
        ),

      admin
        .from(
          "opg_user_role_assignment"
        )
        .select(
          `
            user_id,
            role_id,
            is_primary,
            is_active,
            valid_from,
            valid_until
          `
        ),

      admin
        .from(
          "opg_access_role"
        )
        .select(
          `
            role_id,
            role_name
          `
        ),

      admin
        .from(
          "opg_organization"
        )
        .select(
          `
            organization_id,
            organization_name
          `
        ),
    ]);


  if (
    profileResult.error
  ) {
    throw new Error(
      profileResult.error.message
    );
  }


  if (
    assignmentResult.error
  ) {
    throw new Error(
      assignmentResult.error.message
    );
  }


  if (
    roleResult.error
  ) {
    throw new Error(
      roleResult.error.message
    );
  }


  if (
    organizationResult.error
  ) {
    throw new Error(
      organizationResult.error.message
    );
  }


  const profileMap =
    new Map(
      (
        profileResult.data ??
        []
      ).map(
        (
          profile
        ) => [
          profile.user_id,
          profile,
        ]
      )
    );


  const roleMap =
    new Map(
      (
        roleResult.data ??
        []
      ).map(
        (
          role
        ) => [
          role.role_id,
          role.role_name,
        ]
      )
    );


  const organizationMap =
    new Map(
      (
        organizationResult.data ??
        []
      ).map(
        (
          organization
        ) => [
          organization.organization_id,
          organization.organization_name,
        ]
      )
    );


  const assignmentMap =
    new Map<
      string,
      typeof assignmentResult.data
    >();


  for (
    const assignment
    of (
      assignmentResult.data ??
      []
    )
  ) {

    const current =
      assignmentMap.get(
        assignment.user_id
      ) ??
      [];


    current.push(
      assignment
    );


    assignmentMap.set(
      assignment.user_id,
      current
    );
  }


  return authUsers
    .map(
      (
        authUser
      ):
        AdminUserDirectoryRow => {

        const profile =
          profileMap.get(
            authUser.id
          );


        const assignments =
          assignmentMap.get(
            authUser.id
          ) ??
          [];


        const activeAssignments =
          assignments.filter(
            assignmentIsCurrentlyActive
          );


        const primaryAssignment =
          activeAssignments.find(
            (
              assignment
            ) =>
              assignment.is_primary
          ) ??
          activeAssignments[
            0
          ] ??
          null;


        let directoryState:
          UserDirectoryState;


        if (!profile) {

          directoryState =
            "PENDING_PROVISIONING";

        } else if (
          profile.status_code !==
          "ACTIVE"
        ) {

          directoryState =
            "INACTIVE";

        } else if (
          activeAssignments.length ===
          0
        ) {

          directoryState =
            "UNASSIGNED";

        } else {

          directoryState =
            "ASSIGNED";
        }


        return {
          user_id:
            authUser.id,

          email:
            authUser.email ??
            "-",

          full_name:
            profile
              ?.full_name ??
            null,

          display_name:
            profile
              ?.display_name ??
            null,

          employee_id:
            profile
              ?.employee_id ??
            null,

          organization_name:
            profile
              ?.organization_id
              ? organizationMap.get(
                  profile.organization_id
                ) ??
                null
              : null,

          user_type_code:
            profile
              ?.user_type_code ??
            null,

          profile_status_code:
            profile
              ?.status_code ??
            null,

          directory_state:
            directoryState,

          active_assignment_count:
            activeAssignments.length,

          primary_role_name:
            primaryAssignment
              ? roleMap.get(
                  primaryAssignment.role_id
                ) ??
                null
              : null,

          auth_created_at:
            authUser.created_at,

          profile_updated_at:
            profile
              ?.updated_at ??
            null,
        };
      }
    )
    .sort(
      (
        a,
        b
      ) =>
        (
          a.full_name ??
          a.email
        ).localeCompare(
          b.full_name ??
          b.email
        )
    );
}