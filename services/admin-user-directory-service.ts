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


export type DirectoryScopeLevel =
  | "GLOBAL"
  | "UPT"
  | "ULTG"
  | "GI"
  | "OTHER";


export type AdminDirectoryRole = {
  role_id:
    string;

  role_code:
    string;

  role_name:
    string;
};


export type AdminDirectoryScope = {
  functloc_id:
    | string
    | null;

  location_name:
    string;

  scope_level:
    DirectoryScopeLevel;

  include_children:
    boolean;

  child_count:
    number;
};


export type AdminUserDirectoryRow = {
  user_id:
    string;

  email:
    string;

  full_name:
    | string
    | null;

  display_name:
    | string
    | null;

  employee_id:
    | string
    | null;

  /*
   * Transitional compatibility field.
   *
   * Stage 2C.3 will stop rendering Organization
   * and replace it with assigned_scopes.
   */
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

  /*
   * Kept temporarily for Stage 2A UI compatibility.
   * Stage 2C.3 will render roles[] instead.
   */
  primary_role_name:
    | string
    | null;

  /*
   * Distinct currently active role catalogue
   * for this user.
   */
  roles:
    AdminDirectoryRole[];

  /*
   * Raw operational scopes stored on active assignments.
   * Duplicate assignments at the same scope are collapsed.
   */
  assigned_scopes:
    AdminDirectoryScope[];

  /*
   * Effective operational access.
   *
   * When include_children=true:
   * UPT expands to descendant ULTG + GI.
   * ULTG expands to descendant GI.
   */
  effective_scope_ids:
    string[];

  effective_upt_scope_ids:
    string[];

  effective_ultg_scope_ids:
    string[];

  effective_gi_scope_ids:
    string[];

  has_global_scope:
    boolean;

  auth_created_at:
    string;

  profile_updated_at:
    | string
    | null;
};


export type AdminDirectoryScopeHierarchyNode = {
  functloc_id:
    string;

  location_name:
    string;

  scope_level:
    Exclude<
      DirectoryScopeLevel,
      "GLOBAL"
    >;

  parent_scope_functloc_id:
    | string
    | null;

  upt_functloc_id:
    | string
    | null;

  ultg_functloc_id:
    | string
    | null;

  gi_functloc_id:
    | string
    | null;
};


type AssignmentRow = {
  user_id:
    string;

  role_id:
    string;

  scope_functloc_id:
    | string
    | null;

  include_children:
    boolean;

  is_primary:
    boolean;

  is_active:
    boolean;

  valid_from:
    | string
    | null;

  valid_until:
    | string
    | null;
};


type RoleRow = {
  role_id:
    string;

  role_code:
    string;

  role_name:
    string;
};


async function assertAuthenticatedDirectoryViewer() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth
      .getUser();

  if (
    error ||
    !user
  ) {
    throw new Error(
      "Authentication required to view User Directory.",
    );
  }

  return user;
}


function assignmentIsCurrentlyActive(
  assignment: {
    is_active:
      boolean;

    valid_from:
      | string
      | null;

    valid_until:
      | string
      | null;
  },
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
        10,
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


function buildScopeHierarchy(
  rows:
    Array<{
      functloc_id:
        string;

      location_name:
        string
        | null;

      nlevel:
        number
        | string
        | null;

      function_code:
        string
        | null;

      sup_functloc_id:
        string
        | null;

      bc_flc:
        string
        | null;
    }>,
) {
  const uptRows =
    rows.filter(
      (row) =>
        Number(
          row.nlevel,
        ) === 2 &&
        String(
          row.function_code ??
          "",
        )
          .trim()
          .toUpperCase() ===
          "O2",
    );

  const ultgRows =
    rows.filter(
      (row) =>
        Number(
          row.nlevel,
        ) === 3 &&
        String(
          row.function_code ??
          "",
        )
          .trim()
          .toUpperCase() ===
          "B",
    );

  const giRows =
    rows.filter(
      (row) =>
        Number(
          row.nlevel,
        ) === 3 &&
        String(
          row.function_code ??
          "",
        )
          .trim()
          .toUpperCase() ===
          "G",
    );

  const ultgMap =
    new Map(
      ultgRows.map(
        (row) => [
          row.functloc_id,
          row,
        ],
      ),
    );

  const nodes:
    AdminDirectoryScopeHierarchyNode[] = [];

  for (
    const row
    of uptRows
  ) {
    nodes.push({
      functloc_id:
        row.functloc_id,

      location_name:
        row.location_name ??
        row.functloc_id,

      scope_level:
        "UPT",

      parent_scope_functloc_id:
        null,

      upt_functloc_id:
        row.functloc_id,

      ultg_functloc_id:
        null,

      gi_functloc_id:
        null,
    });
  }

  for (
    const row
    of ultgRows
  ) {
    nodes.push({
      functloc_id:
        row.functloc_id,

      location_name:
        row.location_name ??
        row.functloc_id,

      scope_level:
        "ULTG",

      parent_scope_functloc_id:
        row.sup_functloc_id,

      upt_functloc_id:
        row.sup_functloc_id,

      ultg_functloc_id:
        row.functloc_id,

      gi_functloc_id:
        null,
    });
  }

  for (
    const row
    of giRows
  ) {
    const ultg =
      row.bc_flc
        ? ultgMap.get(
            row.bc_flc,
          )
        : undefined;

    nodes.push({
      functloc_id:
        row.functloc_id,

      location_name:
        row.location_name ??
        row.functloc_id,

      scope_level:
        "GI",

      /*
       * IMPORTANT:
       * GI raw sup_functloc_id points to UPT.
       * Operational GI -> ULTG relation is bc_flc.
       */
      parent_scope_functloc_id:
        row.bc_flc,

      upt_functloc_id:
        ultg
          ?.sup_functloc_id ??
        row.sup_functloc_id,

      ultg_functloc_id:
        row.bc_flc,

      gi_functloc_id:
        row.functloc_id,
    });
  }

  const nodeMap =
    new Map(
      nodes.map(
        (node) => [
          node.functloc_id,
          node,
        ],
      ),
    );

  return {
    nodes,
    nodeMap,
  };
}


function effectiveScopeNodes(
  scopeId:
    string,
  includeChildren:
    boolean,
  nodes:
    AdminDirectoryScopeHierarchyNode[],
  nodeMap:
    Map<
      string,
      AdminDirectoryScopeHierarchyNode
    >,
) {
  const assigned =
    nodeMap.get(
      scopeId,
    );

  if (!assigned) {
    return [];
  }

  if (
    !includeChildren
  ) {
    return [
      assigned,
    ];
  }

  if (
    assigned.scope_level ===
    "UPT"
  ) {
    return nodes.filter(
      (node) =>
        node.functloc_id ===
          assigned.functloc_id ||
        node.upt_functloc_id ===
          assigned.functloc_id,
    );
  }

  if (
    assigned.scope_level ===
    "ULTG"
  ) {
    return nodes.filter(
      (node) =>
        node.functloc_id ===
          assigned.functloc_id ||
        node.ultg_functloc_id ===
          assigned.functloc_id,
    );
  }

  return [
    assigned,
  ];
}


function uniqueByKey<T>(
  rows:
    T[],
  key:
    (
      row:
        T,
    ) => string,
) {
  const seen =
    new Set<string>();

  return rows.filter(
    (row) => {
      const value =
        key(
          row,
        );

      if (
        seen.has(
          value,
        )
      ) {
        return false;
      }

      seen.add(
        value,
      );

      return true;
    },
  );
}


export async function getAdminUserDirectory():
  Promise<
    AdminUserDirectoryRow[]
  > {
  /*
   * Directory visibility is GLOBAL
   * for every authenticated OPERGRID user.
   *
   * Mutation permissions remain restricted
   * separately in their own server actions.
   */
  await assertAuthenticatedDirectoryViewer();

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
        error.message,
      );
    }

    authUsers.push(
      ...data.users,
    );

    if (
      data.users.length <
      perPage
    ) {
      break;
    }

    page +=
      1;

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
    functlocResult,
  ] =
    await Promise.all([
      admin
        .from(
          "opg_user_profile",
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
          `,
        ),

      admin
        .from(
          "opg_user_role_assignment",
        )
        .select(
          `
            user_id,
            role_id,
            scope_functloc_id,
            include_children,
            is_primary,
            is_active,
            valid_from,
            valid_until
          `,
        ),

      admin
        .from(
          "opg_access_role",
        )
        .select(
          `
            role_id,
            role_code,
            role_name
          `,
        )
        .eq(
          "is_active",
          true,
        ),

      admin
        .from(
          "opg_organization",
        )
        .select(
          `
            organization_id,
            organization_name
          `,
        ),

      admin
        .from(
          "mst_functloc",
        )
        .select(
          `
            functloc_id,
            location_name,
            nlevel,
            function_code,
            sup_functloc_id,
            bc_flc
          `,
        )
        .or(
          [
            "and(nlevel.eq.2,function_code.eq.O2)",
            "and(nlevel.eq.3,function_code.eq.B)",
            "and(nlevel.eq.3,function_code.eq.G)",
          ].join(
            ",",
          ),
        ),
    ]);

  if (
    profileResult.error
  ) {
    throw new Error(
      profileResult.error.message,
    );
  }

  if (
    assignmentResult.error
  ) {
    throw new Error(
      assignmentResult.error.message,
    );
  }

  if (
    roleResult.error
  ) {
    throw new Error(
      roleResult.error.message,
    );
  }

  if (
    organizationResult.error
  ) {
    throw new Error(
      organizationResult.error.message,
    );
  }

  if (
    functlocResult.error
  ) {
    throw new Error(
      functlocResult.error.message,
    );
  }

  const profileMap =
    new Map(
      (
        profileResult.data ??
        []
      ).map(
        (
          profile,
        ) => [
          profile.user_id,
          profile,
        ],
      ),
    );

  const roleMap =
    new Map<
      string,
      RoleRow
    >(
      (
        roleResult.data ??
        []
      ).map(
        (
          role,
        ) => [
          role.role_id,
          {
            role_id:
              role.role_id,

            role_code:
              role.role_code,

            role_name:
              role.role_name,
          },
        ],
      ),
    );

  const organizationMap =
    new Map(
      (
        organizationResult.data ??
        []
      ).map(
        (
          organization,
        ) => [
          organization.organization_id,
          organization.organization_name,
        ],
      ),
    );

  const {
    nodes:
      scopeNodes,

    nodeMap:
      scopeNodeMap,
  } =
    buildScopeHierarchy(
      functlocResult.data ??
      [],
    );

  const assignmentMap =
    new Map<
      string,
      AssignmentRow[]
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
        assignment.user_id,
      ) ??
      [];

    current.push({
      user_id:
        assignment.user_id,

      role_id:
        assignment.role_id,

      scope_functloc_id:
        assignment.scope_functloc_id,

      include_children:
        assignment.include_children,

      is_primary:
        assignment.is_primary,

      is_active:
        assignment.is_active,

      valid_from:
        assignment.valid_from,

      valid_until:
        assignment.valid_until,
    });

    assignmentMap.set(
      assignment.user_id,
      current,
    );
  }

  return authUsers
    .map(
      (
        authUser,
      ):
        AdminUserDirectoryRow => {
        const profile =
          profileMap.get(
            authUser.id,
          );

        const assignments =
          assignmentMap.get(
            authUser.id,
          ) ??
          [];

        const activeAssignments =
          assignments.filter(
            assignmentIsCurrentlyActive,
          );

        const primaryAssignment =
          activeAssignments.find(
            (
              assignment,
            ) =>
              assignment.is_primary,
          ) ??
          activeAssignments[
            0
          ] ??
          null;

        const roles =
          uniqueByKey(
            activeAssignments
              .map(
                (
                  assignment,
                ) =>
                  roleMap.get(
                    assignment.role_id,
                  ),
              )
              .filter(
                (
                  role,
                ): role is RoleRow =>
                  Boolean(
                    role,
                  ),
              )
              .map(
                (
                  role,
                ):
                  AdminDirectoryRole => ({
                  role_id:
                    role.role_id,

                  role_code:
                    role.role_code,

                  role_name:
                    role.role_name,
                }),
              ),
            (
              role,
            ) =>
              role.role_id,
          )
            .sort(
              (
                a,
                b,
              ) =>
                a.role_name.localeCompare(
                  b.role_name,
                ),
            );

        const hasGlobalScope =
          activeAssignments.some(
            (
              assignment,
            ) =>
              assignment.scope_functloc_id ===
              null,
          );

        const assignedScopes:
          AdminDirectoryScope[] =
          uniqueByKey(
            activeAssignments
              .filter(
                (
                  assignment,
                ) =>
                  assignment.scope_functloc_id !==
                  null,
              )
              .map(
                (
                  assignment,
                ) => {
                  const scopeId =
                    assignment.scope_functloc_id as string;

                  const scope =
                    scopeNodeMap.get(
                      scopeId,
                    );

                  const effective =
                    effectiveScopeNodes(
                      scopeId,
                      assignment.include_children,
                      scopeNodes,
                      scopeNodeMap,
                    );

                  return {
                    functloc_id:
                      scopeId,

                    location_name:
                      scope
                        ?.location_name ??
                      scopeId,

                    scope_level:
                      scope
                        ?.scope_level ??
                      "OTHER",

                    include_children:
                      assignment.include_children,

                    child_count:
                      Math.max(
                        0,
                        effective.length -
                          1,
                      ),
                  } satisfies AdminDirectoryScope;
                },
              ),
            (
              scope,
            ) =>
              scope.functloc_id ??
              "GLOBAL",
          );

        if (
          hasGlobalScope
        ) {
          assignedScopes.unshift({
            functloc_id:
              null,

            location_name:
              "GLOBAL",

            scope_level:
              "GLOBAL",

            include_children:
              true,

            child_count:
              scopeNodes.length,
          });
        }

        const effectiveNodes =
          uniqueByKey(
            activeAssignments.flatMap(
              (
                assignment,
              ) => {
                if (
                  !assignment.scope_functloc_id
                ) {
                  return scopeNodes;
                }

                return effectiveScopeNodes(
                  assignment.scope_functloc_id,
                  assignment.include_children,
                  scopeNodes,
                  scopeNodeMap,
                );
              },
            ),
            (
              scope,
            ) =>
              scope.functloc_id,
          );

        const effectiveScopeIds =
          effectiveNodes.map(
            (
              scope,
            ) =>
              scope.functloc_id,
          );

        const effectiveUptScopeIds =
          effectiveNodes
            .filter(
              (
                scope,
              ) =>
                scope.scope_level ===
                "UPT",
            )
            .map(
              (
                scope,
              ) =>
                scope.functloc_id,
            );

        const effectiveUltgScopeIds =
          effectiveNodes
            .filter(
              (
                scope,
              ) =>
                scope.scope_level ===
                "ULTG",
            )
            .map(
              (
                scope,
              ) =>
                scope.functloc_id,
            );

        const effectiveGiScopeIds =
          effectiveNodes
            .filter(
              (
                scope,
              ) =>
                scope.scope_level ===
                "GI",
            )
            .map(
              (
                scope,
              ) =>
                scope.functloc_id,
            );

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

        const primaryRole =
          primaryAssignment
            ? roleMap.get(
                primaryAssignment.role_id,
              )
            : null;

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
                  profile.organization_id,
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
            primaryRole
              ?.role_name ??
            null,

          roles,

          assigned_scopes:
            assignedScopes,

          effective_scope_ids:
            effectiveScopeIds,

          effective_upt_scope_ids:
            effectiveUptScopeIds,

          effective_ultg_scope_ids:
            effectiveUltgScopeIds,

          effective_gi_scope_ids:
            effectiveGiScopeIds,

          has_global_scope:
            hasGlobalScope,

          auth_created_at:
            authUser.created_at,

          profile_updated_at:
            profile
              ?.updated_at ??
            null,
        };
      },
    )
    .sort(
      (
        a,
        b,
      ) =>
        (
          a.full_name ??
          a.email
        ).localeCompare(
          b.full_name ??
          b.email,
        ),
    );
}
/* =========================================================
   DIRECTORY FILTER REFERENCE
   ========================================================= */

export async function getAdminDirectoryScopeHierarchy():
  Promise<AdminDirectoryScopeHierarchyNode[]> {
  await assertAuthenticatedDirectoryViewer();

  const admin =
    createAdminClient();

  const {
    data,
    error,
  } =
    await admin
      .from(
        "mst_functloc",
      )
      .select(
        `
          functloc_id,
          location_name,
          nlevel,
          function_code,
          sup_functloc_id,
          bc_flc
        `,
      )
      .or(
        [
          "and(nlevel.eq.2,function_code.eq.O2)",
          "and(nlevel.eq.3,function_code.eq.B)",
          "and(nlevel.eq.3,function_code.eq.G)",
        ].join(
          ",",
        ),
      );

  if (error) {
    throw new Error(
      error.message,
    );
  }

  const {
    nodes,
  } =
    buildScopeHierarchy(
      data ??
      [],
    );

  return nodes.sort(
    (
      a,
      b,
    ) => {
      const levelOrder:
        Record<
          AdminDirectoryScopeHierarchyNode["scope_level"],
          number
        > = {
          UPT: 1,
          ULTG: 2,
          GI: 3,
          OTHER: 4,
        };

      const levelDiff =
        levelOrder[
          a.scope_level
        ] -
        levelOrder[
          b.scope_level
        ];

      if (
        levelDiff !==
        0
      ) {
        return levelDiff;
      }

      return a.location_name.localeCompare(
        b.location_name,
      );
    },
  );
}


/* =========================================================
   DIRECTORY VIEWER CAPABILITIES
   ========================================================= */

export type UserDirectoryCapabilities = {
  can_manage_users:
    boolean;

  can_export_users:
    boolean;
};


export async function getUserDirectoryCapabilities():
  Promise<UserDirectoryCapabilities> {
  const viewer =
    await assertAuthenticatedDirectoryViewer();

  const admin =
    createAdminClient();

  const {
    data:
      assignments,
    error:
      assignmentError,
  } =
    await admin
      .from(
        "opg_user_role_assignment",
      )
      .select(
        `
          role_id,
          is_active,
          valid_from,
          valid_until
        `,
      )
      .eq(
        "user_id",
        viewer.id,
      );

  if (
    assignmentError
  ) {
    throw new Error(
      assignmentError.message,
    );
  }

  const activeAssignments =
    (
      assignments ??
      []
    ).filter(
      assignmentIsCurrentlyActive,
    );

  const roleIds =
    Array.from(
      new Set(
        activeAssignments.map(
          (
            assignment,
          ) =>
            assignment.role_id,
        ),
      ),
    );

  if (
    roleIds.length ===
    0
  ) {
    return {
      can_manage_users:
        false,

      can_export_users:
        true,
    };
  }

  const {
    data:
      roles,
    error:
      roleError,
  } =
    await admin
      .from(
        "opg_access_role",
      )
      .select(
        `
          role_id,
          role_code
        `,
      )
      .in(
        "role_id",
        roleIds,
      )
      .eq(
        "is_active",
        true,
      );

  if (
    roleError
  ) {
    throw new Error(
      roleError.message,
    );
  }

  const roleCodes =
    new Set(
      (
        roles ??
        []
      ).map(
        (
          role,
        ) =>
          role.role_code,
      ),
    );

  return {
    can_manage_users:
      roleCodes.has(
        "ADMIN",
      ) ||
      roleCodes.has(
        "SUPER_ADMIN",
      ),

    /*
     * Export is global for every authenticated user.
     */
    can_export_users:
      true,
  };
}