"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CirclePlus,
  KeyRound,
  Mail,
  MapPin,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import {
  useMemo,
  useState,
} from "react";

import {
  Badge,
  Button,
  FormField,
  Panel,
  SubmitButton,
} from "@/components/ui";

import {
  SearchableCombobox,
} from "@/components/ui/searchable-combobox";

import type {
  AdminJobOption,
  AdminOrganizationOption,
  AdminRoleOption,
  AdminScopeOption,
} from "@/services/admin-user-detail-service";

import {
  createUserAction,
} from "@/app/(platform)/admin/users/new/actions";


type CreateUserWizardProps = {
  jobs:
    AdminJobOption[];

  organizations:
    AdminOrganizationOption[];

  roles:
    AdminRoleOption[];

  scopes:
    AdminScopeOption[];

  existingAuthUserId:
    | string
    | null;

  initialEmail:
    string;

};


type Step =
  | 1
  | 2
  | 3
  | 4;


type DraftAssignment = {
  id: string;

  roleCode: string;

  scopeFunctlocId: string;

  includeChildren: boolean;

  isPrimary: boolean;

  validFrom: string;

  validUntil: string;

  notes: string;
};


const steps = [
  {
    number: 1,
    label:
      "Identity",
    icon:
      UserRound,
  },

  {
    number: 2,
    label:
      "Organization",
    icon:
      Building2,
  },

  {
    number: 3,
    label:
      "Initial Access",
    icon:
      KeyRound,
  },

  {
    number: 4,
    label:
      "Review",
    icon:
      ShieldCheck,
  },
] as const;


function createAssignment():
  DraftAssignment {
  return {
    id:
      crypto.randomUUID(),

    roleCode:
      "",

    scopeFunctlocId:
      "",

    includeChildren:
      true,

    isPrimary:
      false,

    validFrom:
      "",

    validUntil:
      "",

    notes:
      "",
  };
}


export function CreateUserWizard({
  jobs,
  organizations,
  roles,
  scopes,
  existingAuthUserId,
  initialEmail,

}: CreateUserWizardProps) {
  const [
    step,
    setStep,
  ] =
    useState<Step>(
      1
    );


  const [
    email,
    setEmail,
  ] =
    useState(
      initialEmail
    );


  const [
    fullName,
    setFullName,
  ] =
    useState(
      ""
    );


  const [
    displayName,
    setDisplayName,
  ] =
    useState(
      ""
    );


  const [
    employeeId,
    setEmployeeId,
  ] =
    useState(
      ""
    );


  const [
    jobId,
    setJobId,
  ] =
    useState(
      ""
    );


  const [
    phoneNumber,
    setPhoneNumber,
  ] =
    useState(
      ""
    );


  const [
    telegramUsername,
    setTelegramUsername,
  ] =
    useState(
      ""
    );


  const [
    telegramUserId,
    setTelegramUserId,
  ] =
    useState(
      ""
    );


  const [
    organizationId,
    setOrganizationId,
  ] =
    useState(
      ""
    );


  const [
    userTypeCode,
    setUserTypeCode,
  ] =
    useState(
      "EMPLOYEE"
    );


  const [
    statusCode,
    setStatusCode,
  ] =
    useState(
      "ACTIVE"
    );


  const [
    assignments,
    setAssignments,
  ] =
    useState<
      DraftAssignment[]
    >(
      []
    );


  const jobOptions =
    useMemo(
      () =>
        jobs.map(
          (
            job
          ) => ({
            value:
              job.job_id,

            label:
              job.job_name,

            description:
              job.job_code,
          })
        ),
      [
        jobs,
      ]
    );


  const selectedJob =
    jobs.find(
      (
        job
      ) =>
        job.job_id ===
        jobId
    );


  const selectedOrganization =
    organizations.find(
      (
        organization
      ) =>
        organization.organization_id ===
        organizationId
    );


  const canContinueIdentity =
    email.trim().length >
      3 &&
    email.includes(
      "@"
    ) &&
    fullName.trim().length >
      1;


  let assignmentValidation: {
    valid: boolean;
    message: string | null;
  } = {
    valid:
      true,

    message:
      null,
  };


  for (
    let index =
      0;
    index <
    assignments.length;
    index +=
      1
  ) {

    const assignment =
      assignments[
        index
      ];


    const role =
      roles.find(
        (
          item
        ) =>
          item.role_code ===
          assignment.roleCode
      );


    if (
      !assignment.roleCode
    ) {
      assignmentValidation = {
        valid:
          false,

        message:
          `Access #${index + 1}: Role belum dipilih.`,
      };

      break;
    }


    if (
      role &&
      role.scope_level !==
        "GLOBAL" &&
      !assignment
        .scopeFunctlocId
    ) {
      assignmentValidation = {
        valid:
          false,

        message:
          `Access #${index + 1}: Operational Scope wajib dipilih.`,
      };

      break;
    }


    if (
      assignment.validFrom &&
      assignment.validUntil &&
      assignment.validUntil <
        assignment.validFrom
    ) {
      assignmentValidation = {
        valid:
          false,

        message:
          `Access #${index + 1}: Valid Until tidak boleh lebih awal dari Valid From.`,
      };

      break;
    }
  }


  if (
    assignmentValidation.valid
  ) {

    const primaryCount =
      assignments.filter(
        (
          assignment
        ) =>
          assignment.isPrimary
      ).length;


    if (
      primaryCount >
      1
    ) {
      assignmentValidation = {
        valid:
          false,

        message:
          "Hanya satu access yang dapat dijadikan Primary Role.",
      };
    }
  }


  function next() {
    setStep(
      (
        current
      ) =>
        Math.min(
          4,
          current +
            1
        ) as Step
    );
  }


  function previous() {
    setStep(
      (
        current
      ) =>
        Math.max(
          1,
          current -
            1
        ) as Step
    );
  }


  function jumpTo(
    target:
      Step
  ) {
    if (
      target <
      step
    ) {
      setStep(
        target
      );
    }
  }


  function addAssignment() {
    const next =
      createAssignment();


    if (
      assignments.length ===
      0
    ) {
      next.isPrimary =
        true;
    }


    setAssignments(
      (
        current
      ) => [
        ...current,
        next,
      ]
    );
  }


  function removeAssignment(
    id: string
  ) {
    setAssignments(
      (
        current
      ) => {
        const removed =
          current.find(
            (
              item
            ) =>
              item.id ===
              id
          );


        const next =
          current.filter(
            (
              item
            ) =>
              item.id !==
              id
          );


        if (
          removed
            ?.isPrimary &&
          next.length >
            0 &&
          !next.some(
            (
              item
            ) =>
              item.isPrimary
          )
        ) {
          return next.map(
            (
              item,
              index
            ) => ({
              ...item,

              isPrimary:
                index ===
                0,
            })
          );
        }


        return next;
      }
    );
  }


  function patchAssignment(
    id: string,
    patch:
      Partial<
        DraftAssignment
      >
  ) {
    setAssignments(
      (
        current
      ) =>
        current.map(
          (
            item
          ) => {

            if (
              item.id !==
              id
            ) {
              return item;
            }


            return {
              ...item,
              ...patch,
            };
          }
        )
    );
  }


  function setPrimary(
    id: string
  ) {
    setAssignments(
      (
        current
      ) =>
        current.map(
          (
            item
          ) => ({
            ...item,

            isPrimary:
              item.id ===
              id,
          })
        )
    );
  }


  const serializedAssignments =
    JSON.stringify(
      assignments.map(
        (
          assignment
        ) => ({
          roleCode:
            assignment.roleCode,

          scopeFunctlocId:
            assignment
              .scopeFunctlocId ||
            null,

          includeChildren:
            assignment
              .includeChildren,

          isPrimary:
            assignment
              .isPrimary,

          validFrom:
            assignment.validFrom ||
            null,

          validUntil:
            assignment.validUntil ||
            null,

          notes:
            assignment.notes ||
            null,
        })
      )
    );


  return (
    <form
      action={
        createUserAction
      }
      className="space-y-4"
    >

      <input
        type="hidden"
        name="existing_auth_user_id"
        value={
          existingAuthUserId ??
          ""
        }
      />


      <input
        type="hidden"
        name="assignments_json"
        value={
          serializedAssignments
        }
      />


      {/* ===================================================
          WIZARD PROGRESS
         =================================================== */}

      <Panel
        variant="raised"
        padding="md"
      >

        <div className="grid grid-cols-4 gap-2">

          {steps.map(
            (
              item,
              index
            ) => {

              const Icon =
                item.icon;

              const active =
                step ===
                item.number;

              const complete =
                step >
                item.number;


              return (
                <button
                  key={
                    item.number
                  }
                  type="button"
                  onClick={() =>
                    jumpTo(
                      item.number as Step
                    )
                  }
                  className={[
                    "flex min-w-0 items-center gap-2 rounded-[11px] px-3 py-2.5 text-left transition",
                    active
                      ? "bg-[var(--og-cyan-soft)]"
                      : "",
                  ].join(
                    " "
                  )}
                >

                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]"
                    style={{
                      color:
                        active ||
                        complete
                          ? "var(--og-cyan-strong)"
                          : "var(--og-text-muted)",

                      background:
                        active ||
                        complete
                          ? "var(--og-cyan-soft)"
                          : "var(--og-surface-soft)",
                    }}
                  >
                    {complete ? (
                      <Check
                        size={13}
                        strokeWidth={2}
                      />
                    ) : (
                      <Icon
                        size={13}
                        strokeWidth={1.8}
                      />
                    )}
                  </div>


                  <div className="hidden min-w-0 sm:block">

                    <div className="og-muted text-[7px] font-semibold uppercase tracking-[0.08em]">
                      Step {index + 1}
                    </div>


                    <div
                      className={[
                        "mt-0.5 truncate text-[9px] font-semibold",
                        active
                          ? "text-[var(--og-cyan-strong)]"
                          : "og-secondary",
                      ].join(
                        " "
                      )}
                    >
                      {item.label}
                    </div>

                  </div>

                </button>
              );
            }
          )}

        </div>

      </Panel>


      {/* ===================================================
          STEP 1
         =================================================== */}

      <div
        hidden={
          step !==
          1
        }
      >

        <Panel
          variant="raised"
          padding="lg"
        >

          <StepHeading
            badge="Step 1 of 4"
            title="User Identity"
            description="Authentication identity dan informasi dasar pengguna."
          />


          <div className="grid gap-4 sm:grid-cols-2">

            <FormField
              label="Email"
              required
              helper="Digunakan untuk login dan menerima password setup link."
            >
              <input
                type="email"
                name="email"
                required
                value={
                  email
                }
                readOnly={
                  Boolean(
                    existingAuthUserId
                  )
                }
                onChange={(
                  event
                ) =>
                  setEmail(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>


            <FormField
              label="Full Name"
              required
            >
              <input
                type="text"
                name="full_name"
                required
                value={
                  fullName
                }
                onChange={(
                  event
                ) =>
                  setFullName(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>


            <FormField
              label="Display Name"
            >
              <input
                type="text"
                name="display_name"
                value={
                  displayName
                }
                onChange={(
                  event
                ) =>
                  setDisplayName(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>


            <FormField
              label="Employee ID"
            >
              <input
                type="text"
                name="employee_id"
                value={
                  employeeId
                }
                onChange={(
                  event
                ) =>
                  setEmployeeId(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>


            <FormField
              label="Jabatan"
              helper="Ketik nama atau kode jabatan untuk mencari."
            >
              <SearchableCombobox
                name="job_id"
                value={
                  jobId
                }
                onChange={
                  setJobId
                }
                options={
                  jobOptions
                }
                placeholder="Pilih Jabatan"
                searchPlaceholder="Cari jabatan..."
                emptyText="Jabatan tidak ditemukan."
              />
            </FormField>


            <FormField
              label="Phone Number"
            >
              <input
                type="text"
                name="phone_number"
                value={
                  phoneNumber
                }
                onChange={(
                  event
                ) =>
                  setPhoneNumber(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>


            <FormField
              label="Telegram Username"
              helper="Tanpa karakter @."
            >
              <input
                type="text"
                name="telegram_username"
                value={
                  telegramUsername
                }
                onChange={(
                  event
                ) =>
                  setTelegramUsername(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>


            <FormField
              label="Telegram User ID"
            >
              <input
                type="number"
                name="telegram_user_id"
                value={
                  telegramUserId
                }
                onChange={(
                  event
                ) =>
                  setTelegramUserId(
                    event.target.value
                  )
                }
                className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              />
            </FormField>

          </div>

        </Panel>

      </div>


      {/* ===================================================
          STEP 2
         =================================================== */}

      <div
        hidden={
          step !==
          2
        }
      >

        <Panel
          variant="raised"
          padding="lg"
        >

          <StepHeading
            badge="Step 2 of 4"
            title="Organization"
            description="Afiliasi organisasi, hubungan pengguna, dan initial account status."
          />


          <div className="grid gap-4 sm:grid-cols-2">

            <FormField
              label="Organization Affiliation"
            >
              <select
                name="organization_id"
                value={
                  organizationId
                }
                onChange={(
                  event
                ) =>
                  setOrganizationId(
                    event.target.value
                  )
                }
                className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              >

                <option value="">
                  Pilih Organization
                </option>


                {organizations.map(
                  (
                    organization
                  ) => (
                    <option
                      key={
                        organization.organization_id
                      }
                      value={
                        organization.organization_id
                      }
                    >
                      {organization.organization_name}
                      {" — "}
                      {organization.organization_type}
                    </option>
                  )
                )}

              </select>
            </FormField>


            <FormField
              label="User Relationship"
              required
            >
              <select
                name="user_type_code"
                required
                value={
                  userTypeCode
                }
                onChange={(
                  event
                ) =>
                  setUserTypeCode(
                    event.target.value
                  )
                }
                className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              >

                <option value="EMPLOYEE">
                  Employee
                </option>

                <option value="CONTRACTOR">
                  Contractor
                </option>

                <option value="EXTERNAL">
                  External
                </option>

                <option value="SYSTEM">
                  System
                </option>

              </select>
            </FormField>


            <FormField
              label="Initial Account Status"
              required
            >
              <select
                name="status_code"
                required
                value={
                  statusCode
                }
                onChange={(
                  event
                ) =>
                  setStatusCode(
                    event.target.value
                  )
                }
                className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
              >

                <option value="ACTIVE">
                  Active
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="INACTIVE">
                  Inactive
                </option>

              </select>
            </FormField>

          </div>

        </Panel>

      </div>


      {/* ===================================================
          STEP 3 - MULTIPLE ACCESS
         =================================================== */}

      <div
        hidden={
          step !==
          3
        }
      >

        <Panel
          variant="raised"
          padding="lg"
        >

          <div className="flex items-start justify-between gap-4">

            <StepHeading
              badge="Step 3 of 4"
              title="Initial Access"
              description="Tambahkan satu atau beberapa role assignment. Initial Access bersifat opsional."
            />


            <Button
              type="button"
              variant="secondary"
              leftIcon={
                <CirclePlus
                  size={14}
                />
              }
              onClick={
                addAssignment
              }
            >
              Add Access
            </Button>

          </div>


          {assignments.length ===
          0 ? (

            <div
              className="mt-2 rounded-[14px] border border-dashed px-5 py-9 text-center"
              style={{
                borderColor:
                  "var(--og-border)",
              }}
            >

              <KeyRound
                size={20}
                className="mx-auto"
                style={{
                  color:
                    "var(--og-text-muted)",
                }}
              />


              <div className="og-text mt-3 text-[10px] font-semibold">
                No Initial Access
              </div>


              <p className="og-muted mx-auto mt-1 max-w-[420px] text-[8px] leading-4">
                User dapat dibuat tanpa role assignment. Access dapat ditambahkan kemudian melalui User Detail.
              </p>


              <Button
                type="button"
                variant="secondary"
                leftIcon={
                  <CirclePlus
                    size={13}
                  />
                }
                onClick={
                  addAssignment
                }
                className="mt-4"
              >
                Add Initial Access
              </Button>

            </div>

          ) : (

            <div className="mt-2 space-y-3">

              {assignments.map(
                (
                  assignment,
                  index
                ) => (
                  <AccessCard
                    key={
                      assignment.id
                    }
                    index={
                      index
                    }
                    assignment={
                      assignment
                    }
                    roles={
                      roles
                    }
                    scopes={
                      scopes
                    }
                    onPatch={(
                      patch
                    ) =>
                      patchAssignment(
                        assignment.id,
                        patch
                      )
                    }
                    onPrimary={() =>
                      setPrimary(
                        assignment.id
                      )
                    }
                    onRemove={() =>
                      removeAssignment(
                        assignment.id
                      )
                    }
                  />
                )
              )}

            </div>

          )}


          {!assignmentValidation.valid && (
            <div
              className="mt-4 rounded-[10px] border px-3 py-2.5 text-[9px]"
              style={{
                color:
                  "var(--og-danger)",

                borderColor:
                  "color-mix(in srgb, var(--og-danger) 22%, transparent)",

                background:
                  "var(--og-danger-soft)",
              }}
            >
              {assignmentValidation.message}
            </div>
          )}

        </Panel>

      </div>


      {/* ===================================================
          STEP 4 - REVIEW
         =================================================== */}

      <div
        hidden={
          step !==
          4
        }
      >

        <Panel
          variant="raised"
          padding="lg"
        >

          <StepHeading
            badge="Final Review"
            title="Review & Create"
            description="Periksa profile, organization, dan seluruh access sebelum membuat user."
            success
          />


          <div className="grid gap-3 lg:grid-cols-2">

            <ReviewCard
              icon={
                <Mail
                  size={15}
                />
              }
              title="Identity"
              rows={[
                [
                  "Email",
                  email ||
                    "-",
                ],
                [
                  "Full Name",
                  fullName ||
                    "-",
                ],
                [
                  "Display Name",
                  displayName ||
                    fullName ||
                    "-",
                ],
                [
                  "Employee ID",
                  employeeId ||
                    "-",
                ],
                [
                  "Jabatan",
                  selectedJob
                    ?.job_name ??
                    "-",
                ],
              ]}
            />


            <ReviewCard
              icon={
                <Building2
                  size={15}
                />
              }
              title="Organization"
              rows={[
                [
                  "Organization",
                  selectedOrganization
                    ?.organization_name ??
                    "-",
                ],
                [
                  "Relationship",
                  userTypeCode,
                ],
                [
                  "Account Status",
                  statusCode,
                ],
              ]}
            />

          </div>


          <div className="mt-3">

            <div
              className="rounded-[13px] border p-4"
              style={{
                background:
                  "var(--og-surface-soft)",

                borderColor:
                  "var(--og-border-soft)",
              }}
            >

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-2">

                  <KeyRound
                    size={15}
                    style={{
                      color:
                        "var(--og-cyan-strong)",
                    }}
                  />


                  <div className="og-text text-[10px] font-semibold">
                    Initial Access
                  </div>

                </div>


                <Badge
                  variant={
                    assignments.length >
                    0
                      ? "info"
                      : "neutral"
                  }
                >
                  {assignments.length} Assignment
                </Badge>

              </div>


              {assignments.length ===
              0 ? (

                <p className="og-muted mt-3 text-[8px]">
                  User akan dibuat tanpa initial access.
                </p>

              ) : (

                <div className="mt-3 space-y-2">

                  {assignments.map(
                    (
                      assignment,
                      index
                    ) => {

                      const role =
                        roles.find(
                          (
                            item
                          ) =>
                            item.role_code ===
                            assignment.roleCode
                        );


                      const scope =
                        scopes.find(
                          (
                            item
                          ) =>
                            item.functloc_id ===
                            assignment.scopeFunctlocId
                        );


                      return (
                        <div
                          key={
                            assignment.id
                          }
                          className="flex items-start justify-between gap-4 rounded-[10px] border px-3 py-2.5"
                          style={{
                            borderColor:
                              "var(--og-border-soft)",

                            background:
                              "var(--og-surface-raised)",
                          }}
                        >

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              <span className="og-text text-[9px] font-semibold">
                                {role
                                  ?.role_name ??
                                  `Access #${index + 1}`}
                              </span>


                              {assignment.isPrimary && (
                                <Badge
                                  variant="info"
                                >
                                  Primary
                                </Badge>
                              )}

                            </div>


                            <div className="og-muted mt-1 flex items-center gap-1.5 text-[8px]">

                              <MapPin
                                size={10}
                              />

                              {role
                                ?.scope_level ===
                                "GLOBAL"
                                  ? "Global"
                                  : scope
                                      ?.location_name ??
                                    "-"}

                            </div>

                          </div>


                          <div className="og-muted shrink-0 text-right text-[8px]">
                            Access #{index + 1}
                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </div>

          </div>


          <div
            className="mt-3 rounded-[13px] border p-4"
            style={{
              background:
                "var(--og-cyan-soft)",

              borderColor:
                "color-mix(in srgb, var(--og-cyan-strong) 18%, transparent)",
            }}
          >

            <ShieldCheck
              size={18}
              style={{
                color:
                  "var(--og-cyan-strong)",
              }}
            />


            <div className="og-text mt-3 text-[10px] font-semibold">
              Secure Password Setup
            </div>


            <p className="og-muted mt-1 text-[8px] leading-4">
              Administrator tidak membuat password pengguna. Setelah user berhasil dibuat, link pembuatan password dikirim melalui email.
            </p>

          </div>

        </Panel>

      </div>


      {/* ===================================================
          FOOTER
         =================================================== */}

      <Panel
        variant="soft"
        padding="sm"
      >

        <div className="flex items-center justify-between gap-3">

          <div>

            {step >
              1 && (
              <Button
                type="button"
                variant="ghost"
                leftIcon={
                  <ArrowLeft
                    size={14}
                  />
                }
                onClick={
                  previous
                }
              >
                Back
              </Button>
            )}

          </div>


          {step <
            4 ? (

            <Button
              type="button"
              onClick={
                next
              }
              disabled={
                step ===
                1
                  ? !canContinueIdentity
                  : step ===
                      3
                    ? !assignmentValidation.valid
                    : false
              }
              leftIcon={
                <ArrowRight
                  size={14}
                />
              }
            >
              Continue
            </Button>

          ) : (

            <SubmitButton
              pendingText={
                existingAuthUserId
                  ? "Provisioning User..."
                  : "Creating User..."
              }
              leftIcon={
                <ShieldCheck
                  size={14}
                />
              }
              disabled={
                !assignmentValidation.valid
              }
            >
              {existingAuthUserId
                ? "Provision User"
                : "Create User"}
            </SubmitButton>

          )}

        </div>

      </Panel>

    </form>
  );
}


type AccessCardProps = {
  index: number;

  assignment:
    DraftAssignment;

  roles:
    AdminRoleOption[];

  scopes:
    AdminScopeOption[];

  onPatch: (
    patch:
      Partial<
        DraftAssignment
      >
  ) => void;

  onPrimary:
    () => void;

  onRemove:
    () => void;
};


function AccessCard({
  index,
  assignment,
  roles,
  scopes,
  onPatch,
  onPrimary,
  onRemove,
}: AccessCardProps) {
  const selectedRole =
    roles.find(
      (
        role
      ) =>
        role.role_code ===
        assignment.roleCode
    );


  const visibleScopes =
    useMemo(
      () => {

        if (
          !selectedRole ||
          selectedRole.scope_level ===
            "GLOBAL"
        ) {
          return [];
        }


        if (
          selectedRole.scope_level ===
          "FLEXIBLE"
        ) {
          return scopes;
        }


        return scopes.filter(
          (
            scope
          ) =>
            scope.scope_level ===
            selectedRole.scope_level
        );
      },
      [
        scopes,
        selectedRole,
      ]
    );


  return (
    <div
      className="rounded-[14px] border"
      style={{
        borderColor:
          assignment.isPrimary
            ? "color-mix(in srgb, var(--og-cyan-strong) 32%, var(--og-border))"
            : "var(--og-border)",
      }}
    >

      <div
        className="flex items-center justify-between gap-3 border-b px-4 py-3"
        style={{
          borderColor:
            "var(--og-border-soft)",

          background:
            assignment.isPrimary
              ? "var(--og-cyan-soft)"
              : "var(--og-surface-soft)",
        }}
      >

        <div className="flex items-center gap-2">

          <div className="og-text text-[10px] font-semibold">
            Access #{index + 1}
          </div>


          {assignment.isPrimary && (
            <Badge
              variant="info"
            >
              Primary
            </Badge>
          )}

        </div>


        <button
          type="button"
          onClick={
            onRemove
          }
          className="og-muted flex h-8 w-8 items-center justify-center rounded-[9px] transition hover:bg-[var(--og-danger-soft)] hover:text-[var(--og-danger)]"
          aria-label={`Remove Access ${index + 1}`}
        >
          <Trash2
            size={13}
          />
        </button>

      </div>


      <div className="grid gap-4 p-4 sm:grid-cols-2">

        <FormField
          label="Role"
          required
        >
          <SearchableCombobox
            value={
              assignment.roleCode
            }
            onChange={(
              roleCode
            ) => {
              onPatch({
                roleCode,

                scopeFunctlocId:
                  "",
              });
            }}
            options={
              roles.map(
                (
                  role
                ) => ({
                  value:
                    role.role_code,

                  label:
                    role.role_name,

                  description:
                    role.scope_level,
                })
              )
            }
            placeholder="Pilih Role"
            searchPlaceholder="Cari role..."
            emptyText="Role tidak ditemukan."
            allowClear
          />
        </FormField>


        <FormField
          label="Operational Scope"
          required={
            Boolean(
              selectedRole &&
              selectedRole.scope_level !==
                "GLOBAL"
            )
          }
          helper={
            selectedRole
              ?.scope_level ===
              "GLOBAL"
              ? "Role ini berlaku secara global."
              : undefined
          }
        >

          {selectedRole
            ?.scope_level ===
          "GLOBAL" ? (

            <div
              className="og-ui-input flex h-10 items-center gap-2 rounded-[10px] px-3"
            >
              <MapPin
                size={12}
                style={{
                  color:
                    "var(--og-cyan-strong)",
                }}
              />

              <div>
                <span className="og-secondary block text-[10px] font-medium">
                  Global Access
                </span>

                <span className="og-muted mt-0.5 block text-[8px]">
                  Operational Scope tidak diperlukan untuk role ini.
                </span>
              </div>
            </div>

          ) : (

            <SearchableCombobox
              value={
                assignment.scopeFunctlocId
              }
              onChange={(
                scopeFunctlocId
              ) =>
                onPatch({
                  scopeFunctlocId,
                })
              }
              options={
                visibleScopes.map(
                  (
                    scope
                  ) => ({
                    value:
                      scope.functloc_id,

                    label:
                      scope.location_name,

                    description:
                      scope.scope_level,
                  })
                )
              }
              placeholder={
                selectedRole
                  ? "Pilih Scope"
                  : "Pilih Role terlebih dahulu"
              }
              searchPlaceholder="Cari operational scope..."
              emptyText="Operational Scope tidak ditemukan."
              disabled={
                !selectedRole
              }
              allowClear
            />

          )}

        </FormField>


        <FormField
          label="Valid From"
        >
          <input
            type="date"
            value={
              assignment.validFrom
            }
            onChange={(
              event
            ) =>
              onPatch({
                validFrom:
                  event.target.value,
              })
            }
            className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
          />
        </FormField>


        <FormField
          label="Valid Until"
        >
          <input
            type="date"
            value={
              assignment.validUntil
            }
            onChange={(
              event
            ) =>
              onPatch({
                validUntil:
                  event.target.value,
              })
            }
            className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
          />
        </FormField>


        <div className="sm:col-span-2">

          <div className="grid gap-3 sm:grid-cols-2">

            <label
              className="flex cursor-pointer items-start gap-3 rounded-[11px] border p-3"
              style={{
                borderColor:
                  assignment.isPrimary
                    ? "color-mix(in srgb, var(--og-cyan-strong) 30%, var(--og-border))"
                    : "var(--og-border-soft)",

                background:
                  assignment.isPrimary
                    ? "var(--og-cyan-soft)"
                    : "var(--og-surface-soft)",
              }}
            >

              <input
                type="radio"
                name="initial_primary_assignment"
                checked={
                  assignment.isPrimary
                }
                onChange={
                  onPrimary
                }
                className="mt-0.5"
              />


              <span>

                <span className="og-text block text-[9px] font-semibold">
                  Primary Role
                </span>


                <span className="og-muted mt-0.5 block text-[8px] leading-4">
                  Role utama untuk identitas dan context user.
                </span>

              </span>

            </label>


            <label
              className="flex cursor-pointer items-start gap-3 rounded-[11px] border p-3"
              style={{
                borderColor:
                  "var(--og-border-soft)",

                background:
                  "var(--og-surface-soft)",
              }}
            >

              <input
                type="checkbox"
                checked={
                  assignment.includeChildren
                }
                onChange={(
                  event
                ) =>
                  onPatch({
                    includeChildren:
                      event.target.checked,
                  })
                }
                className="mt-0.5"
              />


              <span>

                <span className="og-text block text-[9px] font-semibold">
                  Include Child Scope
                </span>


                <span className="og-muted mt-0.5 block text-[8px] leading-4">
                  Berlaku ke unit turunan apabila role mendukung hierarchy.
                </span>

              </span>

            </label>

          </div>

        </div>


        <div className="sm:col-span-2">

          <FormField
            label="Assignment Notes"
          >
            <textarea
              rows={2}
              value={
                assignment.notes
              }
              onChange={(
                event
              ) =>
                onPatch({
                  notes:
                    event.target.value,
                })
              }
              className="og-ui-input w-full resize-none rounded-[10px] px-3 py-2.5 text-[10px] outline-none"
            />
          </FormField>

        </div>

      </div>

    </div>
  );
}


type StepHeadingProps = {
  badge: string;

  title: string;

  description: string;

  success?: boolean;
};


function StepHeading({
  badge,
  title,
  description,
  success =
    false,
}: StepHeadingProps) {
  return (
    <div className="mb-6">

      <Badge
        variant={
          success
            ? "success"
            : "info"
        }
      >
        {badge}
      </Badge>


      <h2 className="og-text mt-3 text-[16px] font-semibold">
        {title}
      </h2>


      <p className="og-muted mt-1 text-[9px] leading-4">
        {description}
      </p>

    </div>
  );
}


type ReviewCardProps = {
  title: string;

  icon:
    ReactNode;

  rows:
    Array<
      [
        string,
        string
      ]
    >;
};


function ReviewCard({
  title,
  icon,
  rows,
}: ReviewCardProps) {
  return (
    <div
      className="rounded-[13px] border p-4"
      style={{
        background:
          "var(--og-surface-soft)",

        borderColor:
          "var(--og-border-soft)",
      }}
    >

      <div className="flex items-center gap-2">

        <span
          style={{
            color:
              "var(--og-cyan-strong)",
          }}
        >
          {icon}
        </span>


        <div className="og-text text-[10px] font-semibold">
          {title}
        </div>

      </div>


      <div className="mt-3 space-y-2">

        {rows.map(
          (
            [
              label,
              value,
            ]
          ) => (
            <div
              key={
                label
              }
              className="flex items-start justify-between gap-4"
            >

              <span className="og-muted text-[8px]">
                {label}
              </span>


              <span className="og-secondary max-w-[65%] text-right text-[8px] font-medium">
                {value}
              </span>

            </div>
          )
        )}

      </div>

    </div>
  );
}