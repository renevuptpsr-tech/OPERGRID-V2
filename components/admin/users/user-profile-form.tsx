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

  user:
    AdminUserDetail;

  jobs:
    AdminJobOption[];

  organizations:
    AdminOrganizationOption[];

  canEditPersonal:
    boolean;

  canEditOrganization:
    boolean;

  canEditContact:
    boolean;
};

function organizationLabel(
  organization:
    AdminOrganizationOption,
) {
  const type =
    organization
      .organization_type
      .replaceAll(
        "_",
        " ",
      );

  return `${organization.organization_name} — ${type}`;
}

export function UserProfileForm({
  user,
  jobs,
  organizations,
  canEditPersonal,
  canEditOrganization,
  canEditContact,
}: UserProfileFormProps) {
  const canEditAny =
    canEditPersonal ||
    canEditOrganization ||
    canEditContact;
  return (
    <form
      action={
        updateUserProfileAction
      }
      className="og-user-profile-form"
    >
      <input
        type="hidden"
        name="user_id"
        value={
          user.user_id
        }
      />

      <div className="og-user-form-layout">
        <FormSection
          title="Personal Information"
          description={canEditPersonal ? "Informasi identitas utama pengguna OPERGRID." : "Read only — hanya SUPER_ADMIN yang dapat mengubah Personal Information."}
        >
          <div className="og-user-form-grid">
            <FormField
              label="Full Name"
              required
            >
              <input
                type="text"
                name="full_name"
              disabled={!canEditPersonal}
                required
                defaultValue={
                  user.full_name ??
                  ""
                }
                className="og-ui-input og-premium-form-control"
              />
            </FormField>

            <FormField
              label="Display Name"
              helper="Nama singkat yang ditampilkan pada antarmuka OPERGRID."
            >
              <input
                type="text"
                name="display_name"
              disabled={!canEditPersonal}
                defaultValue={
                  user.display_name ??
                  ""
                }
                className="og-ui-input og-premium-form-control"
              />
            </FormField>

            <FormField
              label="Employee ID"
            >
              <input
                type="text"
                name="employee_id"
              disabled={!canEditPersonal}
                defaultValue={
                  user.employee_id ??
                  ""
                }
                className="og-ui-input og-premium-form-control"
              />
            </FormField>

            <FormField
              label="Jabatan"
            >
              <select
                name="job_id"
              disabled={!canEditPersonal}
                defaultValue={
                  user.job_id ??
                  ""
                }
                className="og-ui-select og-premium-form-control"
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
                  ),
                )}
              </select>
            </FormField>
          </div>
        </FormSection>

        <FormSection
          title="Organization"
          description={canEditOrganization ? "Afiliasi perusahaan dalam struktur PLN Group, Holding, Subholding, atau entitas lainnya." : "Read only — perubahan Organization memerlukan ADMIN atau SUPER_ADMIN."}
        >
          <div className="og-user-form-grid">
            <FormField
              label="Organization Affiliation"
              helper="Menentukan perusahaan atau entitas organisasi pengguna."
            >
              <select
                name="organization_id"
              disabled={!canEditOrganization}
                defaultValue={
                  user.organization_id ??
                  ""
                }
                className="og-ui-select og-premium-form-control"
              >
                <option value="">
                  Pilih Organization
                </option>

                {organizations.map(
                  (
                    organization,
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
                        organization,
                      )}
                    </option>
                  ),
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
              disabled={!canEditOrganization}
                required
                defaultValue={
                  user.user_type_code ??
                  "EMPLOYEE"
                }
                className="og-ui-select og-premium-form-control"
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

          {user.organization_name ? (
            <div className="og-user-organization-summary">
              <div className="og-user-organization-icon">
                <Building2
                  size={15}
                  strokeWidth={1.9}
                />
              </div>

              <div>
                <strong>
                  {
                    user.organization_name
                  }
                </strong>

                <span>
                  {user.organization_type ??
                    "Organization"}
                </span>
              </div>

              <Badge variant="neutral">
                {user.user_type_code ??
                  "UNKNOWN"}
              </Badge>
            </div>
          ) : null}
        </FormSection>

        <FormSection
          title="Contact Information"
          description={canEditContact ? "Informasi komunikasi yang digunakan untuk kebutuhan operasional." : "Read only — Contact Information user lain tidak dapat diubah."}
        >
          <div className="og-user-form-grid">
            <FormField
              label="Phone Number"
            >
              <input
                type="text"
                name="phone_number"
              disabled={!canEditContact}
                defaultValue={
                  user.phone_number ??
                  ""
                }
                className="og-ui-input og-premium-form-control"
              />
            </FormField>

            <FormField
              label="Telegram Username"
              helper="Isi tanpa karakter @."
            >
              <input
                type="text"
                name="telegram_username"
              disabled={!canEditContact}
                placeholder="username"
                defaultValue={
                  user.telegram_username ??
                  ""
                }
                className="og-ui-input og-premium-form-control"
              />
            </FormField>

            <FormField
              label="Telegram User ID"
            >
              <input
                type="number"
                name="telegram_user_id"
              disabled={!canEditContact}
                defaultValue={
                  user.telegram_user_id ??
                  ""
                }
                className="og-ui-input og-premium-form-control"
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
                className="og-ui-input og-premium-form-control"
              />
            </FormField>
          </div>
        </FormSection>
      </div>

      {canEditAny ? (
      <StickyActionBar
        description="Perubahan disimpan pada OPERGRID User Profile."
      >
        <Button
          type="reset"
          variant="ghost"
          leftIcon={
            <RotateCcw
              size={14}
              strokeWidth={1.9}
            />
          }
        >
          Reset
        </Button>

        <SubmitButton
          pendingText="Saving profile..."
          leftIcon={
            <Save
              size={14}
              strokeWidth={1.9}
            />
          }
        >
          Save Changes
        </SubmitButton>
      </StickyActionBar>
      ) : null}
    </form>
  );
}