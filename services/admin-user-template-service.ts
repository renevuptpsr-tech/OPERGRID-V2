import "server-only";

import ExcelJS from "exceljs";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient,
} from "@/lib/supabase/server";


type ScopeLevel =
  | "UPT"
  | "ULTG"
  | "GI";


type ScopeReference = {
  functlocId: string;
  locationName: string;
  scopeLevel: ScopeLevel;
};


type RoleReference = {
  roleCode: string;
  roleName: string;
  scopeLevel: string;
  excelRangeName: string;
};


const USER_MAX_ROW =
  1000;

const ACCESS_MAX_ROW =
  3000;


function normalizeScopeLevel(
  nlevel:
    string |
    number |
    null,
  functionCode:
    string |
    null
):
  ScopeLevel |
  null {
  const level =
    Number(
      nlevel
    );

  const code =
    String(
      functionCode ??
      ""
    )
      .trim()
      .toUpperCase();


  if (
    level === 2 &&
    code === "O2"
  ) {
    return "UPT";
  }


  if (
    level === 3 &&
    code === "B"
  ) {
    return "ULTG";
  }


  if (
    level === 3 &&
    code === "G"
  ) {
    return "GI";
  }


  return null;
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
      "Hanya Super Administrator yang dapat mengunduh User Import Template."
    );
  }
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

        color: {
          argb:
            "FFFFFFFF",
        },

        size:
          10,
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

        horizontal:
          "left",
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


function styleTitle(
  cell:
    ExcelJS.Cell
) {
  cell.font = {
    bold:
      true,

    size:
      18,

    color: {
      argb:
        "FF10253A",
    },
  };
}



function applyTableBodyStyle(
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
      22;


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



function addListValidation(
  sheet:
    ExcelJS.Worksheet,
  range:
    string,
  formula:
    string,
  promptTitle:
    string,
  prompt:
    string
) {
  /*
   * ExcelJS typings do not expose Worksheet.dataValidations.
   * Apply validation directly to each cell instead.
   *
   * OPERGRID currently uses same-column ranges such as:
   * E2:E1000
   * B2:B3000
   */
  const match =
    /^([A-Z]+)(\d+):([A-Z]+)(\d+)$/.exec(
      range
    );


  if (!match) {
    throw new Error(
      `Invalid Excel validation range: ${range}`
    );
  }


  const [
    ,
    startColumn,
    startRowText,
    endColumn,
    endRowText,
  ] =
    match;


  if (
    startColumn !==
    endColumn
  ) {
    throw new Error(
      `OPERGRID list validation currently requires a single-column range: ${range}`
    );
  }


  const startRow =
    Number(
      startRowText
    );


  const endRow =
    Number(
      endRowText
    );


  for (
    let rowIndex =
      startRow;
    rowIndex <=
      endRow;
    rowIndex +=
      1
  ) {

    sheet.getCell(
      `${startColumn}${rowIndex}`
    ).dataValidation = {
      type:
        "list",

      allowBlank:
        true,

      formulae: [
        formula,
      ],

      showErrorMessage:
        true,

      errorStyle:
        "stop",

      errorTitle:
        "Invalid Value",

      error:
        "Pilih nilai dari dropdown OPERGRID.",

      showInputMessage:
        true,

      promptTitle,

      prompt,
    };
  }
}


export async function generateUserImportTemplate() {
  await assertSuperAdmin();


  const admin =
    createAdminClient();


  const [
    jobsResult,
    organizationsResult,
    rolesResult,
    scopesResult,
  ] =
    await Promise.all([
      admin
        .from(
          "opg_job"
        )
        .select(
          `
            job_id,
            job_code,
            job_name
          `
        )
        .eq(
          "is_active",
          true
        )
        .order(
          "job_name"
        ),

      admin
        .from(
          "opg_organization"
        )
        .select(
          `
            organization_id,
            organization_code,
            organization_name,
            organization_type
          `
        )
        .eq(
          "is_active",
          true
        )
        .order(
          "organization_name"
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
        )
        .eq(
          "is_active",
          true
        )
        .order(
          "role_name"
        ),

      admin
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
          "location_name"
        ),
    ]);


  if (
    jobsResult.error
  ) {
    throw new Error(
      jobsResult.error.message
    );
  }


  if (
    organizationsResult.error
  ) {
    throw new Error(
      organizationsResult.error.message
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


  const scopes:
    ScopeReference[] =
    (
      scopesResult.data ??
      []
    )
      .map(
        (
          row
        ):
          ScopeReference |
          null => {

          const scopeLevel =
            normalizeScopeLevel(
              row.nlevel,
              row.function_code
            );


          if (
            !scopeLevel
          ) {
            return null;
          }


          return {
            functlocId:
              row.functloc_id,

            locationName:
              row.location_name ??
              row.functloc_id,

            scopeLevel,
          };
        }
      )
      .filter(
        (
          value
        ): value is ScopeReference =>
          value !==
          null
      );


  const scopeUpt =
    scopes.filter(
      (
        item
      ) =>
        item.scopeLevel ===
        "UPT"
    );


  const scopeUltg =
    scopes.filter(
      (
        item
      ) =>
        item.scopeLevel ===
        "ULTG"
    );


  const scopeGi =
    scopes.filter(
      (
        item
      ) =>
        item.scopeLevel ===
        "GI"
    );


  const scopeAll = [
    ...scopeUpt,
    ...scopeUltg,
    ...scopeGi,
  ];


  const roles:
    RoleReference[] =
    (
      rolesResult.data ??
      []
    ).map(
      (
        role
      ) => {

        let excelRangeName =
          "SCOPE_NONE";


        switch (
          role.scope_level
        ) {

          case "UPT":
            excelRangeName =
              "SCOPE_UPT";
            break;

          case "ULTG":
            excelRangeName =
              "SCOPE_ULTG";
            break;

          case "GI":
            excelRangeName =
              "SCOPE_GI";
            break;

          case "FLEXIBLE":
            excelRangeName =
              "SCOPE_ALL";
            break;

          case "GLOBAL":
          default:
            excelRangeName =
              "SCOPE_NONE";
            break;
        }


        return {
          roleCode:
            role.role_code,

          roleName:
            role.role_name,

          scopeLevel:
            role.scope_level ??
            "FLEXIBLE",

          excelRangeName,
        };
      }
    );


  const workbook =
    new ExcelJS.Workbook();


  workbook.creator =
    "OPERGRID";

  workbook.company =
    "OPERGRID";

  workbook.title =
    "OPERGRID User Import Template";

  workbook.subject =
    "Bulk User Provisioning and Access Assignment";

  workbook.created =
    new Date();


  /* ========================================================
     README
     ======================================================== */

  const readme =
    workbook.addWorksheet(
      "README",
      {
        properties: {
          tabColor: {
            argb:
              "FF20B7D8",
          },
        },
      }
    );


  readme.columns = [
    {
      width:
        5,
    },
    {
      width:
        28,
    },
    {
      width:
        88,
    },
  ];


  readme.mergeCells(
    "B2:C2"
  );

  readme.getCell(
    "B2"
  ).value =
    "OPERGRID USER IMPORT TEMPLATE";

  styleTitle(
    readme.getCell(
      "B2"
    )
  );


  readme.mergeCells(
    "B3:C3"
  );

  readme.getCell(
    "B3"
  ).value =
    "Bulk provisioning, profile setup, and multiple operational access assignments.";

  readme.getCell(
    "B3"
  ).font = {
    size:
      9,

    color: {
      argb:
        "FF667085",
    },
  };


  readme.getCell(
    "B5"
  ).value =
    "RULE";

  readme.getCell(
    "C5"
  ).value =
    "DESCRIPTION";

  styleHeader(
    readme.getRow(
      5
    )
  );


  const instructions = [
    [
      "1",
      "Jangan mengubah nama sheet USERS, ACCESS, atau kolom template.",
    ],
    [
      "2",
      "Satu email hanya boleh muncul satu kali pada sheet USERS.",
    ],
    [
      "3",
      "Satu email boleh muncul berkali-kali pada ACCESS untuk multiple role assignment.",
    ],
    [
      "4",
      "Gunakan dropdown yang tersedia. Jangan mengetik nilai referensi yang tidak ada.",
    ],
    [
      "5",
      "Hanya satu Access per user yang boleh memiliki Primary = YES.",
    ],
    [
      "6",
      "SUPER_ADMIN / role GLOBAL tidak memerlukan Operational Scope.",
    ],
    [
      "7",
      "Role UPT hanya dapat memilih UPT. Role ULTG hanya ULTG. Role GI hanya GI.",
    ],
    [
      "8",
      "Role FLEXIBLE dapat memilih UPT, ULTG, atau GI.",
    ],
    [
      "9",
      "User yang sudah ada di Supabase Auth akan diprovision, bukan dibuat ulang.",
    ],
    [
      "10",
      "User yang sudah memiliki OPERGRID Profile akan diproses sesuai access/import policy pada tahap preview.",
    ],
    [
      "11",
      "Jangan menghapus atau mengubah sheet REF_* karena digunakan oleh dropdown.",
    ],
  ];


  for (
    const instruction
    of instructions
  ) {
    readme.addRow(
      [
        "",
        ...instruction,
      ]
    );
  }



  /* ========================================================
     USERS
     ======================================================== */

  const users =
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

        properties: {
          tabColor: {
            argb:
              "FF24CBBB",
          },
        },
      }
    );


  users.columns = [
    {
      header:
        "Email *",
      key:
        "email",
      width:
        32,
    },
    {
      header:
        "Full Name *",
      key:
        "full_name",
      width:
        30,
    },
    {
      header:
        "Display Name",
      key:
        "display_name",
      width:
        24,
    },
    {
      header:
        "Employee ID",
      key:
        "employee_id",
      width:
        18,
    },
    {
      header:
        "Jabatan",
      key:
        "job",
      width:
        34,
    },
    {
      header:
        "Organization",
      key:
        "organization",
      width:
        34,
    },
    {
      header:
        "User Relationship *",
      key:
        "user_relationship",
      width:
        20,
    },
    {
      header:
        "Account Status *",
      key:
        "status",
      width:
        18,
    },
    {
      header:
        "Phone Number",
      key:
        "phone",
      width:
        20,
    },
    {
      header:
        "Telegram Username",
      key:
        "telegram_username",
      width:
        22,
    },
    {
      header:
        "Telegram User ID",
      key:
        "telegram_user_id",
      width:
        20,
    },
  ];


  styleHeader(
    users.getRow(
      1
    )
  );


  applyTableBodyStyle(
    users,
    2,
    USER_MAX_ROW,
    11
  );


  users.getColumn(
    "email"
  ).numFmt =
    "@";

  users.getColumn(
    "employee_id"
  ).numFmt =
    "@";

  users.getColumn(
    "phone"
  ).numFmt =
    "@";

  users.getColumn(
    "telegram_username"
  ).numFmt =
    "@";

  users.getColumn(
    "telegram_user_id"
  ).numFmt =
    "@";


  /* ========================================================
     ACCESS
     ======================================================== */

  const access =
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

        properties: {
          tabColor: {
            argb:
              "FF20B7D8",
          },
        },
      }
    );


  access.columns = [
    {
      header:
        "Email *",
      key:
        "email",
      width:
        32,
    },
    {
      header:
        "Role *",
      key:
        "role",
      width:
        28,
    },
    {
      header:
        "Operational Scope",
      key:
        "scope",
      width:
        36,
    },
    {
      header:
        "Primary *",
      key:
        "primary",
      width:
        13,
    },
    {
      header:
        "Include Children *",
      key:
        "include_children",
      width:
        18,
    },
    {
      header:
        "Valid From",
      key:
        "valid_from",
      width:
        16,
    },
    {
      header:
        "Valid Until",
      key:
        "valid_until",
      width:
        16,
    },
    {
      header:
        "Notes",
      key:
        "notes",
      width:
        42,
    },
  ];


  styleHeader(
    access.getRow(
      1
    )
  );


  applyTableBodyStyle(
    access,
    2,
    ACCESS_MAX_ROW,
    8
  );


  access.getColumn(
    "email"
  ).numFmt =
    "@";

  access.getColumn(
    "valid_from"
  ).numFmt =
    "dd/mm/yyyy";

  access.getColumn(
    "valid_until"
  ).numFmt =
    "dd/mm/yyyy";


  /* ========================================================
     HIDDEN REFERENCE SHEETS
     ======================================================== */

  const refJob =
    workbook.addWorksheet(
      "REF_JOB"
    );


  refJob.addRow(
    [
      "JOB_NAME",
      "JOB_CODE",
      "JOB_ID",
    ]
  );


  for (
    const job
    of (
      jobsResult.data ??
      []
    )
  ) {
    refJob.addRow(
      [
        job.job_name,
        job.job_code,
        job.job_id,
      ]
    );
  }


  const refOrganization =
    workbook.addWorksheet(
      "REF_ORGANIZATION"
    );


  refOrganization.addRow(
    [
      "ORGANIZATION_NAME",
      "ORGANIZATION_CODE",
      "ORGANIZATION_TYPE",
      "ORGANIZATION_ID",
    ]
  );


  for (
    const organization
    of (
      organizationsResult.data ??
      []
    )
  ) {
    refOrganization.addRow(
      [
        organization.organization_name,
        organization.organization_code,
        organization.organization_type,
        organization.organization_id,
      ]
    );
  }


  const refRole =
    workbook.addWorksheet(
      "REF_ROLE"
    );


  refRole.addRow(
    [
      "ROLE_NAME",
      "ROLE_CODE",
      "SCOPE_RANGE",
      "SCOPE_LEVEL",
    ]
  );


  for (
    const role
    of roles
  ) {
    refRole.addRow(
      [
        role.roleName,
        role.roleCode,
        role.excelRangeName,
        role.scopeLevel,
      ]
    );
  }


  function createScopeSheet(
    sheetName:
      string,
    data:
      ScopeReference[]
  ) {
    const sheet =
      workbook.addWorksheet(
        sheetName
      );


    sheet.addRow(
      [
        "LOCATION_NAME",
        "FUNCTLOC_ID",
        "SCOPE_LEVEL",
      ]
    );


    for (
      const item
      of data
    ) {
      sheet.addRow(
        [
          item.locationName,
          item.functlocId,
          item.scopeLevel,
        ]
      );
    }


    return sheet;
  }


  const refScopeUpt =
    createScopeSheet(
      "REF_SCOPE_UPT",
      scopeUpt
    );


  const refScopeUltg =
    createScopeSheet(
      "REF_SCOPE_ULTG",
      scopeUltg
    );


  const refScopeGi =
    createScopeSheet(
      "REF_SCOPE_GI",
      scopeGi
    );


  const refScopeAll =
    createScopeSheet(
      "REF_SCOPE_ALL",
      scopeAll
    );


  const refScopeNone =
    workbook.addWorksheet(
      "REF_SCOPE_NONE"
    );


  refScopeNone.addRow(
    [
      "LOCATION_NAME",
    ]
  );


  /*
   * Excel requires a valid list range.
   * Blank value is intentional for GLOBAL role.
   */
  refScopeNone.addRow(
    [
      "",
    ]
  );


  const refStatic =
    workbook.addWorksheet(
      "REF_STATIC"
    );


  refStatic.addRow(
    [
      "USER_RELATIONSHIP",
      "ACCOUNT_STATUS",
      "YES_NO",
    ]
  );


  const relationshipValues = [
    "EMPLOYEE",
    "CONTRACTOR",
    "EXTERNAL",
    "SYSTEM",
  ];


  const statusValues = [
    "ACTIVE",
    "PENDING",
    "INACTIVE",
  ];


  const yesNoValues = [
    "YES",
    "NO",
  ];


  const staticRowCount =
    Math.max(
      relationshipValues.length,
      statusValues.length,
      yesNoValues.length
    );


  for (
    let index =
      0;
    index <
      staticRowCount;
    index +=
      1
  ) {
    refStatic.addRow(
      [
        relationshipValues[
          index
        ] ??
          "",

        statusValues[
          index
        ] ??
          "",

        yesNoValues[
          index
        ] ??
          "",
      ]
    );
  }


  /* ========================================================
     NAMED RANGES
     ======================================================== */

  const jobEndRow =
    Math.max(
      2,
      refJob.rowCount
    );


  const organizationEndRow =
    Math.max(
      2,
      refOrganization.rowCount
    );


  const roleEndRow =
    Math.max(
      2,
      refRole.rowCount
    );


  const uptEndRow =
    Math.max(
      2,
      refScopeUpt.rowCount
    );


  const ultgEndRow =
    Math.max(
      2,
      refScopeUltg.rowCount
    );


  const giEndRow =
    Math.max(
      2,
      refScopeGi.rowCount
    );


  const allEndRow =
    Math.max(
      2,
      refScopeAll.rowCount
    );


  workbook.definedNames.add(
    `REF_JOB!$A$2:$A$${jobEndRow}`,
    "JOBS"
  );


  workbook.definedNames.add(
    `REF_ORGANIZATION!$A$2:$A$${organizationEndRow}`,
    "ORGANIZATIONS"
  );


  workbook.definedNames.add(
    `REF_ROLE!$A$2:$A$${roleEndRow}`,
    "ROLES"
  );


  workbook.definedNames.add(
    `REF_SCOPE_UPT!$A$2:$A$${uptEndRow}`,
    "SCOPE_UPT"
  );


  workbook.definedNames.add(
    `REF_SCOPE_ULTG!$A$2:$A$${ultgEndRow}`,
    "SCOPE_ULTG"
  );


  workbook.definedNames.add(
    `REF_SCOPE_GI!$A$2:$A$${giEndRow}`,
    "SCOPE_GI"
  );


  workbook.definedNames.add(
    `REF_SCOPE_ALL!$A$2:$A$${allEndRow}`,
    "SCOPE_ALL"
  );


  workbook.definedNames.add(
    "REF_SCOPE_NONE!$A$2:$A$2",
    "SCOPE_NONE"
  );


  workbook.definedNames.add(
    "REF_STATIC!$A$2:$A$5",
    "USER_RELATIONSHIPS"
  );


  workbook.definedNames.add(
    "REF_STATIC!$B$2:$B$4",
    "ACCOUNT_STATUSES"
  );


  workbook.definedNames.add(
    "REF_STATIC!$C$2:$C$3",
    "YES_NO"
  );


  /* ========================================================
     USERS DATA VALIDATION
     ======================================================== */

  addListValidation(
    users,
    `E2:E${USER_MAX_ROW}`,
    "=JOBS",
    "Jabatan",
    "Pilih Jabatan dari master OPERGRID."
  );


  addListValidation(
    users,
    `F2:F${USER_MAX_ROW}`,
    "=ORGANIZATIONS",
    "Organization",
    "Pilih Organization dari master OPERGRID."
  );


  addListValidation(
    users,
    `G2:G${USER_MAX_ROW}`,
    "=USER_RELATIONSHIPS",
    "User Relationship",
    "Pilih hubungan user terhadap organization."
  );


  addListValidation(
    users,
    `H2:H${USER_MAX_ROW}`,
    "=ACCOUNT_STATUSES",
    "Account Status",
    "Pilih initial account status."
  );


  /* ========================================================
     ACCESS DATA VALIDATION
     ======================================================== */

  addListValidation(
    access,
    `B2:B${ACCESS_MAX_ROW}`,
    "=ROLES",
    "Role",
    "Pilih role OPERGRID."
  );


  addListValidation(
    access,
    `D2:D${ACCESS_MAX_ROW}`,
    "=YES_NO",
    "Primary Role",
    "Hanya satu access per email yang boleh YES."
  );


  addListValidation(
    access,
    `E2:E${ACCESS_MAX_ROW}`,
    "=YES_NO",
    "Include Children",
    "Pilih YES atau NO."
  );


  /*
   * DEPENDENT OPERATIONAL SCOPE
   *
   * Column B = Role Name
   *
   * REF_ROLE:
   * A = Role Name
   * C = Named scope range
   *
   * Example:
   * Admin UPT        -> SCOPE_UPT
   * Inspector GI     -> SCOPE_GI
   * Monitoring       -> SCOPE_ALL
   * Super Admin      -> SCOPE_NONE
   *
   * VLOOKUP returns the named range key,
   * then INDIRECT resolves that list.
   */
  for (
    let row =
      2;
    row <=
      ACCESS_MAX_ROW;
    row +=
      1
  ) {

    const formula =
      `=INDIRECT(IFERROR(VLOOKUP($B${row},REF_ROLE!$A$2:$C$${roleEndRow},3,FALSE),"SCOPE_NONE"))`;


    access.getCell(
      `C${row}`
    ).dataValidation = {
      type:
        "list",

      allowBlank:
        true,

      formulae: [
        formula,
      ],

      showErrorMessage:
        true,

      errorStyle:
        "stop",

      errorTitle:
        "Invalid Operational Scope",

      error:
        "Operational Scope tidak sesuai dengan Role yang dipilih.",

      showInputMessage:
        true,

      promptTitle:
        "Operational Scope",

      prompt:
        "Dropdown Scope otomatis mengikuti Role.",
    };
  }


  /* ========================================================
     EXAMPLE ROWS
     ======================================================== */

  users.getRow(
    2
  ).values = [
    "user.name@pln.co.id",
    "Nama Lengkap",
    "Nama Panggilan",
    "12345678",
    "",
    "",
    "EMPLOYEE",
    "ACTIVE",
    "",
    "",
    "",
  ];


  users.getRow(
    2
  ).font = {
    italic:
      true,

    color: {
      argb:
        "FF98A2B3",
    },

    size:
      9,
  };


  access.getRow(
    2
  ).values = [
    "user.name@pln.co.id",
    "",
    "",
    "YES",
    "YES",
    "",
    "",
    "",
  ];


  access.getRow(
    2
  ).font = {
    italic:
      true,

    color: {
      argb:
        "FF98A2B3",
    },

    size:
      9,
  };


  /*
   * Re-apply validation because row values were written
   * after the range-level validation.
   */
  addListValidation(
    access,
    `B2:B${ACCESS_MAX_ROW}`,
    "=ROLES",
    "Role",
    "Pilih role OPERGRID."
  );


  addListValidation(
    access,
    `D2:D${ACCESS_MAX_ROW}`,
    "=YES_NO",
    "Primary Role",
    "Hanya satu access per email yang boleh YES."
  );


  addListValidation(
    access,
    `E2:E${ACCESS_MAX_ROW}`,
    "=YES_NO",
    "Include Children",
    "Pilih YES atau NO."
  );


  /* ========================================================
     CONDITIONAL FORMATTING / UX
     ======================================================== */

  users.addConditionalFormatting({
    ref:
      `A2:H${USER_MAX_ROW}`,

    rules: [
      {
        type:
          "expression",

        priority:
          1,

        formulae: [
          'AND($A2<>"",$B2="")',
        ],

        style: {
          fill: {
            type:
              "pattern",

            pattern:
              "solid",

            bgColor: {
              argb:
                "FFFFE4E6",
            },
          },
        },
      },
    ],
  });


  access.addConditionalFormatting({
    ref:
      `A2:E${ACCESS_MAX_ROW}`,

    rules: [
      {
        type:
          "expression",

        priority:
          1,

        formulae: [
          'AND($A2<>"",$B2="")',
        ],

        style: {
          fill: {
            type:
              "pattern",

            pattern:
              "solid",

            bgColor: {
              argb:
                "FFFFE4E6",
            },
          },
        },
      },
    ],
  });


  /* ========================================================
     AUTO FILTER
     ======================================================== */

  users.autoFilter = {
    from:
      "A1",

    to:
      "K1",
  };


  access.autoFilter = {
    from:
      "A1",

    to:
      "H1",
  };


  /* ========================================================
     HIDE REFERENCE SHEETS
     ======================================================== */

  const hiddenSheets = [
    refJob,
    refOrganization,
    refRole,
    refScopeUpt,
    refScopeUltg,
    refScopeGi,
    refScopeAll,
    refScopeNone,
    refStatic,
  ];


  for (
    const sheet
    of hiddenSheets
  ) {
    sheet.state =
      "veryHidden";
  }


  /* ========================================================
     FINAL
     ======================================================== */
  const buffer =
    await workbook.xlsx
      .writeBuffer();


  return Buffer.from(
    buffer
  );
}