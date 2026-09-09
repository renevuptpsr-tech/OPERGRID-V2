import "server-only";

import ExcelJS from "exceljs";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient,
} from "@/lib/supabase/server";

import type {
  UserImportAction,
  UserImportAssignmentPreview,
  UserImportPreviewResult,
  UserImportPreviewRow,
  UserImportSeverity,
} from "@/types/admin-user-import";


type ScopeLevel =
  | "UPT"
  | "ULTG"
  | "GI";


type ParsedUser = {
  rowNumber: number;

  email: string;

  fullName: string;

  displayName:
    | string
    | null;

  employeeId:
    | string
    | null;

  jobName:
    | string
    | null;

  organizationName:
    | string
    | null;

  userRelationship: string;

  accountStatus: string;

  phoneNumber:
    | string
    | null;

  telegramUsername:
    | string
    | null;

  telegramUserId:
    | string
    | null;
};


type ParsedAccess = {
  rowNumber: number;

  email: string;

  roleName: string;

  scopeName:
    | string
    | null;

  primary: boolean;

  includeChildren: boolean;

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


const EXPECTED_USERS_HEADERS = [
  "Email *",
  "Full Name *",
  "Display Name",
  "Employee ID",
  "Jabatan",
  "Organization",
  "User Relationship *",
  "Account Status *",
  "Phone Number",
  "Telegram Username",
  "Telegram User ID",
];


const EXPECTED_ACCESS_HEADERS = [
  "Email *",
  "Role *",
  "Operational Scope",
  "Primary *",
  "Include Children *",
  "Valid From",
  "Valid Until",
  "Notes",
];


function normalize(
  value:
    string |
    null |
    undefined
) {
  return (
    value ??
    ""
  )
    .trim()
    .toLowerCase();
}


function cellText(
  row:
    ExcelJS.Row,
  column:
    number
) {
  return row
    .getCell(
      column
    )
    .text
    .trim();
}


function nullableText(
  value:
    string
) {
  const normalized =
    value.trim();


  return normalized
    ? normalized
    : null;
}


function yesNo(
  value:
    string
) {
  return normalize(
    value
  ) ===
    "yes";
}


function excelDateToIso(
  cell:
    ExcelJS.Cell
):
  string |
  null {
  const value =
    cell.value;


  if (
    value instanceof
    Date
  ) {
    return value
      .toISOString()
      .slice(
        0,
        10
      );
  }


  const text =
    cell.text
      .trim();


  if (!text) {
    return null;
  }


  /*
   * ISO yyyy-mm-dd
   */
  const isoMatch =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(
      text
    );


  if (isoMatch) {
    return text;
  }


  /*
   * dd/mm/yyyy
   */
  const dateMatch =
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(
      text
    );


  if (dateMatch) {

    const [
      ,
      day,
      month,
      year,
    ] =
      dateMatch;


    return `${year}-${month.padStart(
      2,
      "0"
    )}-${day.padStart(
      2,
      "0"
    )}`;
  }


  return text;
}


function scopeLevelFromFunctloc(
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


function validateHeaders(
  sheet:
    ExcelJS.Worksheet,
  expected:
    string[]
) {
  const actual =
    expected.map(
      (
        _,
        index
      ) =>
        cellText(
          sheet.getRow(
            1
          ),
          index + 1
        )
    );


  const invalid =
    expected.filter(
      (
        header,
        index
      ) =>
        actual[
          index
        ] !==
        header
    );


  if (
    invalid.length >
    0
  ) {
    throw new Error(
      `Header sheet ${sheet.name} tidak sesuai template OPERGRID. Download template terbaru dan jangan mengubah nama kolom.`
    );
  }
}


function parseUsers(
  sheet:
    ExcelJS.Worksheet
):
  ParsedUser[] {
  const result:
    ParsedUser[] =
    [];


  for (
    let rowNumber =
      2;
    rowNumber <=
      sheet.rowCount;
    rowNumber +=
      1
  ) {

    const row =
      sheet.getRow(
        rowNumber
      );


    const email =
      cellText(
        row,
        1
      );


    const fullName =
      cellText(
        row,
        2
      );


    /*
     * Ignore template example row.
     */
    if (
      normalize(
        email
      ) ===
        "user.name@pln.co.id" &&
      normalize(
        fullName
      ) ===
        "nama lengkap"
    ) {
      continue;
    }


    const hasAnyValue =
      Array.from(
        {
          length:
            11,
        },
        (
          _,
          index
        ) =>
          cellText(
            row,
            index + 1
          )
      ).some(
        Boolean
      );


    if (
      !hasAnyValue
    ) {
      continue;
    }


    result.push({
      rowNumber,

      email:
        email
          .trim()
          .toLowerCase(),

      fullName,

      displayName:
        nullableText(
          cellText(
            row,
            3
          )
        ),

      employeeId:
        nullableText(
          cellText(
            row,
            4
          )
        ),

      jobName:
        nullableText(
          cellText(
            row,
            5
          )
        ),

      organizationName:
        nullableText(
          cellText(
            row,
            6
          )
        ),

      userRelationship:
        cellText(
          row,
          7
        ),

      accountStatus:
        cellText(
          row,
          8
        ),

      phoneNumber:
        nullableText(
          cellText(
            row,
            9
          )
        ),

      telegramUsername:
        nullableText(
          cellText(
            row,
            10
          )
        ),

      telegramUserId:
        nullableText(
          cellText(
            row,
            11
          )
        ),
    });
  }


  return result;
}


function parseAccess(
  sheet:
    ExcelJS.Worksheet
):
  ParsedAccess[] {
  const result:
    ParsedAccess[] =
    [];


  for (
    let rowNumber =
      2;
    rowNumber <=
      sheet.rowCount;
    rowNumber +=
      1
  ) {

    const row =
      sheet.getRow(
        rowNumber
      );


    const email =
      cellText(
        row,
        1
      );


    /*
     * Ignore example row.
     */
    if (
      normalize(
        email
      ) ===
      "user.name@pln.co.id"
    ) {
      continue;
    }


    const hasAnyValue =
      Array.from(
        {
          length:
            8,
        },
        (
          _,
          index
        ) =>
          cellText(
            row,
            index + 1
          )
      ).some(
        Boolean
      );


    if (
      !hasAnyValue
    ) {
      continue;
    }


    result.push({
      rowNumber,

      email:
        email
          .trim()
          .toLowerCase(),

      roleName:
        cellText(
          row,
          2
        ),

      scopeName:
        nullableText(
          cellText(
            row,
            3
          )
        ),

      primary:
        yesNo(
          cellText(
            row,
            4
          )
        ),

      includeChildren:
        yesNo(
          cellText(
            row,
            5
          )
        ),

      validFrom:
        excelDateToIso(
          row.getCell(
            6
          )
        ),

      validUntil:
        excelDateToIso(
          row.getCell(
            7
          )
        ),

      notes:
        nullableText(
          cellText(
            row,
            8
          )
        ),
    });
  }


  return result;
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
      "Hanya Super Administrator yang dapat melakukan User Import."
    );
  }
}


export async function previewUserImport(
  fileName:
    string,
  buffer:
    Uint8Array
):
  Promise<UserImportPreviewResult> {
  await assertSuperAdmin();


  const workbook =
    new ExcelJS.Workbook();


  await workbook.xlsx.load(
    buffer as unknown as ArrayBuffer
  );


  const usersSheet =
    workbook.getWorksheet(
      "USERS"
    );


  const accessSheet =
    workbook.getWorksheet(
      "ACCESS"
    );


  if (
    !usersSheet ||
    !accessSheet
  ) {
    throw new Error(
      "File tidak memiliki sheet USERS dan ACCESS yang diwajibkan."
    );
  }


  validateHeaders(
    usersSheet,
    EXPECTED_USERS_HEADERS
  );


  validateHeaders(
    accessSheet,
    EXPECTED_ACCESS_HEADERS
  );


  const users =
    parseUsers(
      usersSheet
    );


  const access =
    parseAccess(
      accessSheet
    );


  if (
    users.length ===
    0
  ) {
    throw new Error(
      "Sheet USERS tidak memiliki data user untuk diproses."
    );
  }


  const admin =
    createAdminClient();


  const [
    jobsResult,
    organizationsResult,
    rolesResult,
    scopesResult,
    profilesResult,
    assignmentsResult,
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
        ),

      admin
        .from(
          "opg_organization"
        )
        .select(
          `
            organization_id,
            organization_name,
            organization_code
          `
        )
        .eq(
          "is_active",
          true
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
        ),

      admin
        .from(
          "opg_user_profile"
        )
        .select(
          `
            user_id,
            status_code
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
            is_primary,
            is_active,
            valid_from,
            valid_until
          `
        ),
    ]);


  const databaseErrors = [
    jobsResult.error,
    organizationsResult.error,
    rolesResult.error,
    scopesResult.error,
    profilesResult.error,
    assignmentsResult.error,
  ].filter(
    Boolean
  );


  if (
    databaseErrors.length >
    0
  ) {
    throw new Error(
      databaseErrors[
        0
      ]?.message ??
      "Gagal membaca reference data OPERGRID."
    );
  }


  /* ========================================================
     AUTH USERS
     ======================================================== */

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


  const authByEmail =
    new Map(
      authUsers
        .filter(
          (
            user
          ) =>
            Boolean(
              user.email
            )
        )
        .map(
          (
            user
          ) => [
            normalize(
              user.email
            ),
            user,
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


  const assignmentsByUserId =
    new Map<
      string,
      NonNullable<
        typeof assignmentsResult.data
      >
    >();


  for (
    const assignment
    of (
      assignmentsResult.data ??
      []
    )
  ) {

    const existing =
      assignmentsByUserId.get(
        assignment.user_id
      ) ??
      [];


    existing.push(
      assignment
    );


    assignmentsByUserId.set(
      assignment.user_id,
      existing
    );
  }


  const jobByName =
    new Map(
      (
        jobsResult.data ??
        []
      ).map(
        (
          job
        ) => [
          normalize(
            job.job_name
          ),
          job,
        ]
      )
    );


  const organizationByName =
    new Map(
      (
        organizationsResult.data ??
        []
      ).map(
        (
          organization
        ) => [
          normalize(
            organization.organization_name
          ),
          organization,
        ]
      )
    );


  const roleByName =
    new Map(
      (
        rolesResult.data ??
        []
      ).map(
        (
          role
        ) => [
          normalize(
            role.role_name
          ),
          role,
        ]
      )
    );


  const scopeByName =
    new Map<
      string,
      {
        functloc_id: string;
        location_name: string | null;
        scope_level: ScopeLevel;
      }
    >();


  for (
    const scope
    of (
      scopesResult.data ??
      []
    )
  ) {

    const scopeLevel =
      scopeLevelFromFunctloc(
        scope.nlevel,
        scope.function_code
      );


    if (
      !scopeLevel
    ) {
      continue;
    }


    scopeByName.set(
      normalize(
        scope.location_name
      ),
      {
        functloc_id:
          scope.functloc_id,

        location_name:
          scope.location_name,

        scope_level:
          scopeLevel,
      }
    );
  }


  /* ========================================================
     BASIC FILE VALIDATION
     ======================================================== */

  const globalErrors:
    string[] =
    [];


  const duplicateUserEmails =
    new Set<string>();


  const emailCount =
    new Map<
      string,
      number
    >();


  for (
    const user
    of users
  ) {

    const key =
      normalize(
        user.email
      );


    emailCount.set(
      key,
      (
        emailCount.get(
          key
        ) ??
        0
      ) + 1
    );
  }


  for (
    const [
      email,
      count,
    ]
    of emailCount
  ) {

    if (
      email &&
      count >
        1
    ) {
      duplicateUserEmails.add(
        email
      );
    }
  }


  const userEmails =
    new Set(
      users.map(
        (
          user
        ) =>
          normalize(
            user.email
          )
      )
    );


  for (
    const assignment
    of access
  ) {

    if (
      assignment.email &&
      !userEmails.has(
        normalize(
          assignment.email
        )
      )
    ) {
      globalErrors.push(
        `ACCESS row ${assignment.rowNumber}: email ${assignment.email} tidak ditemukan pada sheet USERS.`
      );
    }
  }


  /* ========================================================
     BUILD USER PREVIEW
     ======================================================== */

  const rows:
    UserImportPreviewRow[] =
    users.map(
      (
        user
      ) => {

        const errors:
          string[] =
          [];


        const warnings:
          string[] =
          [];


        const emailKey =
          normalize(
            user.email
          );


        if (
          !user.email
        ) {
          errors.push(
            "Email wajib diisi."
          );
        }
        else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            user.email
          )
        ) {
          errors.push(
            "Format email tidak valid."
          );
        }


        if (
          duplicateUserEmails.has(
            emailKey
          )
        ) {
          errors.push(
            "Email muncul lebih dari satu kali pada sheet USERS."
          );
        }


        if (
          !user.fullName
        ) {
          errors.push(
            "Full Name wajib diisi."
          );
        }


        const job =
          user.jobName
            ? jobByName.get(
                normalize(
                  user.jobName
                )
              )
            : null;


        if (
          user.jobName &&
          !job
        ) {
          errors.push(
            `Jabatan "${user.jobName}" tidak ditemukan pada master OPERGRID.`
          );
        }


        const organization =
          user.organizationName
            ? organizationByName.get(
                normalize(
                  user.organizationName
                )
              )
            : null;


        if (
          user.organizationName &&
          !organization
        ) {
          errors.push(
            `Organization "${user.organizationName}" tidak ditemukan.`
          );
        }


        const relationship =
          user.userRelationship
            .trim()
            .toUpperCase();


        if (
          ![
            "EMPLOYEE",
            "CONTRACTOR",
            "EXTERNAL",
            "SYSTEM",
          ].includes(
            relationship
          )
        ) {
          errors.push(
            "User Relationship tidak valid."
          );
        }


        const status =
          user.accountStatus
            .trim()
            .toUpperCase();


        if (
          ![
            "ACTIVE",
            "PENDING",
            "INACTIVE",
          ].includes(
            status
          )
        ) {
          errors.push(
            "Account Status tidak valid."
          );
        }


        const authUser =
          authByEmail.get(
            emailKey
          );


        const profile =
          authUser
            ? profileByUserId.get(
                authUser.id
              )
            : null;


        const existingAssignments =
          authUser
            ? assignmentsByUserId.get(
                authUser.id
              ) ??
              []
            : [];


        const activeExistingAssignments =
          existingAssignments.filter(
            (
              assignment
            ) =>
              assignment.is_active
          );


        const sourceAssignments =
          access.filter(
            (
              assignment
            ) =>
              normalize(
                assignment.email
              ) ===
              emailKey
          );


        const primaryCount =
          sourceAssignments.filter(
            (
              assignment
            ) =>
              assignment.primary
          ).length;


        if (
          primaryCount >
          1
        ) {
          errors.push(
            "Hanya satu Initial Access yang boleh Primary = YES."
          );
        }


        if (
          sourceAssignments.length >
            0 &&
          primaryCount ===
            0
        ) {
          warnings.push(
            "Tidak ada access yang ditetapkan sebagai Primary."
          );
        }


        const assignments:
          UserImportAssignmentPreview[] =
          sourceAssignments.map(
            (
              assignment
            ) => {

              const assignmentErrors:
                string[] =
                [];


              const assignmentWarnings:
                string[] =
                [];


              const role =
                roleByName.get(
                  normalize(
                    assignment.roleName
                  )
                );


              if (
                !assignment.roleName
              ) {
                assignmentErrors.push(
                  "Role wajib dipilih."
                );
              }
              else if (
                !role
              ) {
                assignmentErrors.push(
                  `Role "${assignment.roleName}" tidak ditemukan.`
                );
              }


              const roleScopeLevel =
                role
                  ?.scope_level ??
                null;


              const scope =
                assignment.scopeName
                  ? scopeByName.get(
                      normalize(
                        assignment.scopeName
                      )
                    )
                  : null;


              if (
                roleScopeLevel ===
                "GLOBAL"
              ) {

                if (
                  assignment.scopeName
                ) {
                  assignmentErrors.push(
                    "Role GLOBAL tidak boleh memiliki Operational Scope."
                  );
                }

              }
              else if (
                role
              ) {

                if (
                  !assignment.scopeName
                ) {
                  assignmentErrors.push(
                    "Operational Scope wajib dipilih untuk role ini."
                  );
                }
                else if (
                  !scope
                ) {
                  assignmentErrors.push(
                    `Operational Scope "${assignment.scopeName}" tidak ditemukan.`
                  );
                }
                else if (
                  roleScopeLevel !==
                    "FLEXIBLE" &&
                  scope.scope_level !==
                    roleScopeLevel
                ) {
                  assignmentErrors.push(
                    `Scope ${scope.scope_level} tidak sesuai dengan role ${roleScopeLevel}.`
                  );
                }
              }


              if (
                assignment.validFrom &&
                assignment.validUntil &&
                assignment.validUntil <
                  assignment.validFrom
              ) {
                assignmentErrors.push(
                  "Valid Until tidak boleh lebih awal dari Valid From."
                );
              }


              const alreadyExists =
                Boolean(
                  authUser &&
                  role &&
                  existingAssignments.some(
                    (
                      existing
                    ) =>
                      existing.is_active &&
                      existing.role_id ===
                        role.role_id &&
                      (
                        existing.scope_functloc_id ??
                        null
                      ) ===
                        (
                          scope
                            ?.functloc_id ??
                          null
                        )
                  )
                );


              if (
                alreadyExists
              ) {
                assignmentWarnings.push(
                  "Assignment aktif yang sama sudah tersedia."
                );
              }


              return {
                rowNumber:
                  assignment.rowNumber,

                roleName:
                  assignment.roleName,

                roleCode:
                  role
                    ?.role_code ??
                  null,

                roleScopeLevel,

                scopeName:
                  assignment.scopeName,

                scopeFunctlocId:
                  scope
                    ?.functloc_id ??
                  null,

                primary:
                  assignment.primary,

                includeChildren:
                  assignment.includeChildren,

                validFrom:
                  assignment.validFrom,

                validUntil:
                  assignment.validUntil,

                notes:
                  assignment.notes,

                alreadyExists,

                errors:
                  assignmentErrors,

                warnings:
                  assignmentWarnings,
              };
            }
          );


        for (
          const assignment
          of assignments
        ) {
          errors.push(
            ...assignment.errors.map(
              (
                message
              ) =>
                `ACCESS row ${assignment.rowNumber}: ${message}`
            )
          );


          warnings.push(
            ...assignment.warnings.map(
              (
                message
              ) =>
                `ACCESS row ${assignment.rowNumber}: ${message}`
            )
          );
        }


        let action:
          UserImportAction;


        if (
          !authUser
        ) {
          action =
            "CREATE_USER";
        }
        else if (
          !profile
        ) {
          action =
            "PROVISION";
        }
        else if (
          activeExistingAssignments.length ===
            0
        ) {
          action =
            sourceAssignments.length >
              0
              ? "ADD_ACCESS"
              : "NO_CHANGE";
        }
        else {

          const hasNewAssignment =
            assignments.some(
              (
                assignment
              ) =>
                !assignment.alreadyExists
            );


          action =
            hasNewAssignment
              ? "UPDATE_ACCESS"
              : "NO_CHANGE";
        }


        if (
          profile &&
          activeExistingAssignments.length >
            0
        ) {
          warnings.push(
            "User sudah memiliki OPERGRID Profile dan active access. Import hanya boleh menambahkan access baru; existing access tidak dihapus pada preview ini."
          );
        }


        if (
          action ===
          "NO_CHANGE"
        ) {
          warnings.push(
            "Tidak ada perubahan access baru yang terdeteksi."
          );
        }


        let severity:
          UserImportSeverity =
          "READY";


        if (
          errors.length >
          0
        ) {
          severity =
            "ERROR";
        }
        else if (
          warnings.length >
          0
        ) {
          severity =
            "WARNING";
        }


        return {
          rowNumber:
            user.rowNumber,

          email:
            user.email,

          fullName:
            user.fullName,

          displayName:
            user.displayName,

          employeeId:
            user.employeeId,

          jobName:
            user.jobName,

          jobId:
            job
              ?.job_id ??
            null,

          organizationName:
            user.organizationName,

          organizationId:
            organization
              ?.organization_id ??
            null,

          userRelationship:
            relationship,

          accountStatus:
            status,

          phoneNumber:
            user.phoneNumber,

          telegramUsername:
            user.telegramUsername,

          telegramUserId:
            user.telegramUserId,

          authUserId:
            authUser
              ?.id ??
            null,

          hasAuthAccount:
            Boolean(
              authUser
            ),

          hasProfile:
            Boolean(
              profile
            ),

          activeAssignmentCount:
            activeExistingAssignments.length,

          action,

          severity,

          errors,

          warnings,

          assignments,
        };
      }
    );


  return {
    fileName,

    generatedAt:
      new Date()
        .toISOString(),

    summary: {
      totalUsers:
        rows.length,

      readyUsers:
        rows.filter(
          (
            row
          ) =>
            row.severity ===
            "READY"
        ).length,

      warningUsers:
        rows.filter(
          (
            row
          ) =>
            row.severity ===
            "WARNING"
        ).length,

      errorUsers:
        rows.filter(
          (
            row
          ) =>
            row.severity ===
            "ERROR"
        ).length,

      createUsers:
        rows.filter(
          (
            row
          ) =>
            row.action ===
            "CREATE_USER"
        ).length,

      provisionUsers:
        rows.filter(
          (
            row
          ) =>
            row.action ===
            "PROVISION"
        ).length,

      accessUsers:
        rows.filter(
          (
            row
          ) =>
            row.action ===
              "ADD_ACCESS" ||
            row.action ===
              "UPDATE_ACCESS"
        ).length,

      noChangeUsers:
        rows.filter(
          (
            row
          ) =>
            row.action ===
            "NO_CHANGE"
        ).length,

      totalAssignments:
        rows.reduce(
          (
            total,
            row
          ) =>
            total +
            row.assignments.length,
          0
        ),
    },

    globalErrors,

    rows,
  };
}