import "server-only";

import ExcelJS from "exceljs";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  getAdminUserDirectory,
} from "@/services/admin-user-directory-service";


function text(
  value:
    string |
    null |
    undefined
) {
  return value ??
    "";
}


function dateText(
  value:
    string |
    null |
    undefined
) {
  if (!value) {
    return "";
  }


  const parsed =
    new Date(
      value
    );


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return value;
  }


  return parsed
    .toISOString()
    .slice(
      0,
      10
    );
}


function styleHeader(
  row:
    ExcelJS.Row
) {
  row.height =
    26;


  row.eachCell(
    (
      cell
    ) => {

      cell.font = {
        bold:
          true,

        size:
          10,

        color: {
          argb:
            "FFFFFFFF",
        },
      };


      cell.fill = {
        type:
          "pattern",

        pattern:
          "solid",

        fgColor: {
          argb:
            "FF10253A",
        },
      };


      cell.alignment = {
        vertical:
          "middle",
      };


      cell.border = {
        bottom: {
          style:
            "thin",

          color: {
            argb:
              "FF20B7D8",
          },
        },
      };
    }
  );
}


function styleBody(
  sheet:
    ExcelJS.Worksheet,
  startRow:
    number,
  endRow:
    number,
  lastColumn:
    number
) {
  for (
    let rowIndex =
      startRow;
    rowIndex <=
      endRow;
    rowIndex +=
      1
  ) {

    const row =
      sheet.getRow(
        rowIndex
      );


    row.height =
      21;


    for (
      let columnIndex =
        1;
      columnIndex <=
        lastColumn;
      columnIndex +=
        1
    ) {

      const cell =
        row.getCell(
          columnIndex
        );


      cell.font = {
        size:
          9,
      };


      cell.alignment = {
        vertical:
          "middle",

        wrapText:
          false,
      };


      cell.border = {
        bottom: {
          style:
            "hair",

          color: {
            argb:
              "FFE4E7EC",
          },
        },
      };
    }
  }
}


async function assertSuperAdmin() {
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
      "Hanya Super Administrator yang dapat mengunduh User Data."
    );
  }
}


export async function generateAdminUserExport() {
  await assertSuperAdmin();


  const [
    users,
    accessData,
  ] =
    await Promise.all([
      getAdminUserDirectory(),

      getAccessExportData(),
    ]);


  const workbook =
    new ExcelJS.Workbook();


  workbook.creator =
    "OPERGRID";

  workbook.company =
    "OPERGRID";

  workbook.title =
    "OPERGRID User Data";

  workbook.subject =
    "User Directory and Access Assignments";

  workbook.created =
    new Date();


  /* ========================================================
     SUMMARY
     ======================================================== */

  const summary =
    workbook.addWorksheet(
      "SUMMARY"
    );


  summary.columns = [
    {
      width:
        30,
    },
    {
      width:
        18,
    },
  ];


  summary.mergeCells(
    "A1:B1"
  );


  summary.getCell(
    "A1"
  ).value =
    "OPERGRID USER DATA";


  summary.getCell(
    "A1"
  ).font = {
    bold:
      true,

    size:
      18,

    color: {
      argb:
        "FF10253A",
    },
  };


  summary.getCell(
    "A2"
  ).value =
    "Generated At";

  summary.getCell(
    "B2"
  ).value =
    new Date();


  summary.getCell(
    "B2"
  ).numFmt =
    "dd/mm/yyyy hh:mm";


  const assigned =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
        "ASSIGNED"
    ).length;


  const pending =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
        "PENDING_PROVISIONING"
    ).length;


  const unassigned =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
        "UNASSIGNED"
    ).length;


  const inactive =
    users.filter(
      (
        user
      ) =>
        user.directory_state ===
        "INACTIVE"
    ).length;


  const summaryRows = [
    [
      "Total Authentication Users",
      users.length,
    ],
    [
      "Assigned",
      assigned,
    ],
    [
      "Pending Provisioning",
      pending,
    ],
    [
      "Unassigned / No Access",
      unassigned,
    ],
    [
      "Inactive",
      inactive,
    ],
    [
      "Total Access Assignments",
      accessData.length,
    ],
  ];


  summary.addRow(
    []
  );


  for (
    const item
    of summaryRows
  ) {
    summary.addRow(
      item
    );
  }


  /* ========================================================
     USERS
     ======================================================== */

  const userSheet =
    workbook.addWorksheet(
      "USERS",
      {
        views: [
          {
            state:
              "frozen",

            ySplit:
              1,
          },
        ],
      }
    );


  userSheet.columns = [
    {
      header:
        "Email",
      width:
        32,
    },
    {
      header:
        "Full Name",
      width:
        30,
    },
    {
      header:
        "Display Name",
      width:
        24,
    },
    {
      header:
        "Employee ID",
      width:
        18,
    },
    {
      header:
        "Organization",
      width:
        34,
    },
    {
      header:
        "User Relationship",
      width:
        20,
    },
    {
      header:
        "Profile Status",
      width:
        18,
    },
    {
      header:
        "Directory Status",
      width:
        22,
    },
    {
      header:
        "Primary Role",
      width:
        28,
    },
    {
      header:
        "Active Assignment Count",
      width:
        22,
    },
    {
      header:
        "Auth Created At",
      width:
        18,
    },
    {
      header:
        "Profile Updated At",
      width:
        18,
    },
    {
      header:
        "User ID",
      width:
        40,
    },
  ];


  styleHeader(
    userSheet.getRow(
      1
    )
  );


  for (
    const user
    of users
  ) {

    userSheet.addRow(
      [
        user.email,
        text(
          user.full_name
        ),
        text(
          user.display_name
        ),
        text(
          user.employee_id
        ),
        text(
          user.organization_name
        ),
        text(
          user.user_type_code
        ),
        text(
          user.profile_status_code
        ),
        user.directory_state,
        text(
          user.primary_role_name
        ),
        user.active_assignment_count,
        dateText(
          user.auth_created_at
        ),
        dateText(
          user.profile_updated_at
        ),
        user.user_id,
      ]
    );
  }


  if (
    userSheet.rowCount >
    1
  ) {
    styleBody(
      userSheet,
      2,
      userSheet.rowCount,
      13
    );
  }


  userSheet.autoFilter = {
    from:
      "A1",

    to:
      "M1",
  };


  userSheet.getColumn(
    4
  ).numFmt =
    "@";

  userSheet.getColumn(
    13
  ).numFmt =
    "@";


  /* ========================================================
     ACCESS
     ======================================================== */

  const accessSheet =
    workbook.addWorksheet(
      "ACCESS",
      {
        views: [
          {
            state:
              "frozen",

            ySplit:
              1,
          },
        ],
      }
    );


  accessSheet.columns = [
    {
      header:
        "Email",
      width:
        32,
    },
    {
      header:
        "Full Name",
      width:
        30,
    },
    {
      header:
        "Role Code",
      width:
        22,
    },
    {
      header:
        "Role Name",
      width:
        28,
    },
    {
      header:
        "Scope Level",
      width:
        16,
    },
    {
      header:
        "Operational Scope",
      width:
        36,
    },
    {
      header:
        "Scope Functloc ID",
      width:
        28,
    },
    {
      header:
        "Primary",
      width:
        12,
    },
    {
      header:
        "Include Children",
      width:
        18,
    },
    {
      header:
        "Active",
      width:
        12,
    },
    {
      header:
        "Valid From",
      width:
        16,
    },
    {
      header:
        "Valid Until",
      width:
        16,
    },
    {
      header:
        "Notes",
      width:
        40,
    },
    {
      header:
        "User ID",
      width:
        40,
    },
  ];


  styleHeader(
    accessSheet.getRow(
      1
    )
  );


  for (
    const assignment
    of accessData
  ) {

    accessSheet.addRow(
      [
        assignment.email,
        assignment.fullName,
        assignment.roleCode,
        assignment.roleName,
        assignment.scopeLevel,
        assignment.scopeName,
        assignment.scopeFunctlocId,
        assignment.isPrimary
          ? "YES"
          : "NO",
        assignment.includeChildren
          ? "YES"
          : "NO",
        assignment.isActive
          ? "YES"
          : "NO",
        assignment.validFrom,
        assignment.validUntil,
        assignment.notes,
        assignment.userId,
      ]
    );
  }


  if (
    accessSheet.rowCount >
    1
  ) {
    styleBody(
      accessSheet,
      2,
      accessSheet.rowCount,
      14
    );
  }


  accessSheet.autoFilter = {
    from:
      "A1",

    to:
      "N1",
  };


  accessSheet.getColumn(
    7
  ).numFmt =
    "@";

  accessSheet.getColumn(
    14
  ).numFmt =
    "@";


  const buffer =
    await workbook.xlsx
      .writeBuffer();


  return Buffer.from(
    buffer
  );
}


async function getAccessExportData() {
  const admin =
    createAdminClient();


  const [
    profilesResult,
    assignmentsResult,
    rolesResult,
    scopesResult,
  ] =
    await Promise.all([
      admin
        .from(
          "opg_user_profile"
        )
        .select(
          `
            user_id,
            full_name
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
            scope_functloc_id,
            include_children,
            is_primary,
            is_active,
            valid_from,
            valid_until,
            notes
          `
        )
        .order(
          "user_id"
        ),

      admin
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
        ),

      admin
        .from(
          "mst_functloc"
        )
        .select(
          `
            functloc_id,
            location_name
          `
        ),
    ]);


  if (
    profilesResult.error
  ) {
    throw new Error(
      profilesResult.error.message
    );
  }


  if (
    assignmentsResult.error
  ) {
    throw new Error(
      assignmentsResult.error.message
    );
  }


  if (
    rolesResult.error
  ) {
    throw new Error(
      rolesResult.error.message
    );
  }


  if (
    scopesResult.error
  ) {
    throw new Error(
      scopesResult.error.message
    );
  }


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


    if (
      page >
      20
    ) {
      break;
    }
  }


  const emailByUserId =
    new Map(
      authUsers.map(
        (
          user
        ) => [
          user.id,
          user.email ??
          "",
        ]
      )
    );


  const profileByUserId =
    new Map(
      (
        profilesResult.data ??
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


  const roleById =
    new Map(
      (
        rolesResult.data ??
        []
      ).map(
        (
          role
        ) => [
          role.role_id,
          role,
        ]
      )
    );


  const scopeById =
    new Map(
      (
        scopesResult.data ??
        []
      ).map(
        (
          scope
        ) => [
          scope.functloc_id,
          scope.location_name ??
          scope.functloc_id,
        ]
      )
    );


  return (
    assignmentsResult.data ??
    []
  ).map(
    (
      assignment
    ) => {

      const role =
        roleById.get(
          assignment.role_id
        );


      const profile =
        profileByUserId.get(
          assignment.user_id
        );


      return {
        userId:
          assignment.user_id,

        email:
          emailByUserId.get(
            assignment.user_id
          ) ??
          "",

        fullName:
          profile
            ?.full_name ??
          "",

        roleCode:
          role
            ?.role_code ??
          "",

        roleName:
          role
            ?.role_name ??
          "",

        scopeLevel:
          role
            ?.scope_level ??
          "",

        scopeName:
          assignment.scope_functloc_id
            ? scopeById.get(
                assignment.scope_functloc_id
              ) ??
              assignment.scope_functloc_id
            : "",

        scopeFunctlocId:
          assignment.scope_functloc_id ??
          "",

        isPrimary:
          assignment.is_primary,

        includeChildren:
          assignment.include_children,

        isActive:
          assignment.is_active,

        validFrom:
          assignment.valid_from ??
          "",

        validUntil:
          assignment.valid_until ??
          "",

        notes:
          assignment.notes ??
          "",
      };
    }
  );
}