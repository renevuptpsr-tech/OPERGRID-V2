import {
  Building2,
  RotateCcw,
  Save,
} from "lucide-react";

import {
  Badge,
  Button,
  FormField,
  FormSection,
  StickyActionBar,
  SubmitButton,
} from "@/components/ui";

import type {
  AdminJobOption,
  AdminOrganizationOption,
  AdminUserDetail,
} from "@/services/admin-user-detail-service";

import {
  updateUserProfileAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";


type UserProfileFormProps = {
  user: AdminUserDetail;
  jobs: AdminJobOption[];
  organizations: AdminOrganizationOption[];
};


function organizationLabel(
  organization: AdminOrganizationOption
) {
  const type =
    organization
      .organization_type
      .replaceAll(
        "_",
        " "
      );

  return `${organization.organization_name} — ${type}`;
}


export function UserProfileForm({
  user,
  jobs,
  organizations,
}: UserProfileFormProps) {
  return (
    <form
      action={
        updateUserProfileAction
      }
    >

      <input
        type="hidden"
        name="user_id"
        value={
          user.user_id
        }
      />


      <FormSection
        title="Personal Information"
        description="Informasi identitas utama pengguna OPERGRID."
      >
        <div className="grid gap-4 sm:grid-cols-2">

          <FormField
            label="Full Name"
            required
          >
            <input
              type="text"
              name="full_name"
              required
              defaultValue={
                user.full_name ??
                ""
              }
              className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
            />
          </FormField>


          <FormField
            label="Display Name"
            helper="Nama singkat yang ditampilkan pada antarmuka OPERGRID."
          >
            <input
              type="text"
              name="display_name"
              defaultValue={
                user.display_name ??
                ""
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
              defaultValue={
                user.employee_id ??
                ""
              }
              className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
            />
          </FormField>


          <FormField
            label="Jabatan"
          >
            <select
              name="job_id"
              defaultValue={
                user.job_id ??
                ""
              }
              className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
            >
              <option value="">
                Tanpa Jabatan
              </option>

              {jobs.map(
                (job) => (
                  <option
                    key={
                      job.job_id
                    }
                    value={
                      job.job_id
                    }
                  >
                    {job.job_name}
                  </option>
                )
              )}
            </select>
          </FormField>

        </div>
      </FormSection>


      <FormSection
        title="Organization"
        description="Afiliasi perusahaan dalam struktur PLN Group, Holding, Subholding, atau entitas lainnya."
      >
        <div className="grid gap-4 sm:grid-cols-2">

          <FormField
            label="Organization Affiliation"
            helper="Menentukan perusahaan atau entitas organisasi pengguna."
          >
            <select
              name="organization_id"
              defaultValue={
                user.organization_id ??
                ""
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
                    {organizationLabel(
                      organization
                    )}
                  </option>
                )
              )}
            </select>
          </FormField>


          <FormField
            label="User Relationship"
            required
            helper="Hubungan pengguna terhadap organisasi, terpisah dari struktur Holding/Subholding."
          >
            <select
              name="user_type_code"
              required
              defaultValue={
                user.user_type_code ??
                "EMPLOYEE"
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

        </div>


        {user.organization_name && (
          <div className="mt-4 flex flex-wrap items-center gap-2">

            <div
              className="flex h-8 w-8 items-center justify-center rounded-[9px]"
              style={{
                color:
                  "var(--og-cyan-strong)",

                background:
                  "var(--og-cyan-soft)",
              }}
            >
              <Building2
                size={14}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <div className="og-text text-[10px] font-medium">
                {user.organization_name}
              </div>

              <div className="og-muted mt-0.5 text-[8px] uppercase tracking-[0.08em]">
                {user.organization_type ??
                  "Organization"}
              </div>
            </div>

            <Badge
              variant="neutral"
              className="ml-1"
            >
              {user.user_type_code ??
                "UNKNOWN"}
            </Badge>

          </div>
        )}

      </FormSection>


      <FormSection
        title="Contact Information"
        description="Informasi komunikasi yang digunakan untuk kebutuhan operasional."
      >
        <div className="grid gap-4 sm:grid-cols-2">

          <FormField
            label="Phone Number"
          >
            <input
              type="text"
              name="phone_number"
              defaultValue={
                user.phone_number ??
                ""
              }
              className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
            />
          </FormField>


          <FormField
            label="Telegram Username"
            helper="Isi tanpa karakter @."
          >
            <input
              type="text"
              name="telegram_username"
              placeholder="username"
              defaultValue={
                user.telegram_username ??
                ""
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
              defaultValue={
                user.telegram_user_id ??
                ""
              }
              className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
            />
          </FormField>


          <FormField
            label="Email"
            helper="Email berasal dari Supabase Authentication dan tidak diedit melalui Profile."
          >
            <input
              type="email"
              value={
                user.email ??
                ""
              }
              disabled
              readOnly
              className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
            />
          </FormField>

        </div>
      </FormSection>


      <StickyActionBar
        description="Perubahan disimpan pada OPERGRID User Profile."
      >

        <Button
          type="reset"
          variant="ghost"
          leftIcon={
            <RotateCcw
              size={14}
              strokeWidth={1.8}
            />
          }
        >
          Reset
        </Button>


        <SubmitButton
          pendingText="Saving..."
          leftIcon={
            <Save
              size={14}
              strokeWidth={1.8}
            />
          }
        >
          Save Changes
        </SubmitButton>

      </StickyActionBar>

    </form>
  );
}