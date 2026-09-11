"use client";

import {
  CircleCheck,
  CirclePause,
  KeyRound,
  MailCheck,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Badge,
  FormField,
} from "@/components/ui";

import {
  ConfirmedServerAction,
} from "@/components/ui/confirmed-server-action";

import {
  setUserStatusAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";

import {
  sendPasswordResetAction,
} from "@/app/(platform)/admin/users/[user_id]/security-actions";

type UserStatusFormProps = {

  userId:
    string;

  statusCode:
    | string
    | null;

  email:
    | string
    | null;

  message:
    | string
    | null;

  messageStatus:
    | string
    | null;

  canChangeStatus:
    boolean;

  canPasswordRecovery:
    boolean;
};

function statusLabel(
  value:
    string,
) {
  if (
    value ===
    "ACTIVE"
  ) {
    return "Active";
  }

  if (
    value ===
    "INACTIVE"
  ) {
    return "Inactive";
  }

  if (
    value ===
    "SUSPENDED"
  ) {
    return "Suspended";
  }

  if (
    value ===
    "PENDING"
  ) {
    return "Pending";
  }

  return value;
}

export function UserStatusForm({
  userId,
  statusCode,
  email,
  message,
  messageStatus,
  canChangeStatus,
  canPasswordRecovery,
}: UserStatusFormProps) {
  const currentStatus =
    statusCode ??
    "ACTIVE";

  const [
    selectedStatus,
    setSelectedStatus,
  ] =
    useState(
      currentStatus,
    );

  const active =
    currentStatus ===
    "ACTIVE";

  const statusChanged =
    selectedStatus !==
    currentStatus;

  return (
    <div className="og-user-status">
      {message ? (
        <div
          className="og-user-status-message"
          data-variant={
            messageStatus ===
            "success"
              ? "success"
              : "danger"
          }
        >
          <div className="og-user-status-message-icon">
            <MailCheck
              size={16}
              strokeWidth={1.9}
            />
          </div>

          <div>
            <strong>
              {messageStatus ===
              "success"
                ? "Success"
                : "Action Failed"}
            </strong>

            <p>
              {message}
            </p>
          </div>
        </div>
      ) : null}

      <div className="og-account-control-grid">
        <section className="og-account-control-panel">
          <header className="og-account-control-header">
            <div className="og-account-control-heading-icon">
              <ShieldCheck
                size={17}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <span className="og-account-control-eyebrow">
                Account Control
              </span>

              <h3>
                Account Status
              </h3>

              <p>
                Atur availability akun untuk
                mengakses OPERGRID tanpa mengubah
                role dan operational scope.
              </p>
            </div>
          </header>

          <div
            className="og-user-account-state"
            data-active={
              active ||
              undefined
            }
          >
            <div className="og-user-account-state-icon">
              {active ? (
                <CircleCheck
                  size={20}
                  strokeWidth={1.9}
                />
              ) : (
                <CirclePause
                  size={20}
                  strokeWidth={1.9}
                />
              )}
            </div>

            <div className="og-user-account-state-copy">
              <span className="og-account-state-label">
                Current Status
              </span>

              <div className="og-user-account-state-title">
                <strong>
                  {active
                    ? "Account Operational"
                    : "Account Restricted"}
                </strong>

                <Badge
                  variant={
                    active
                      ? "success"
                      : "warning"
                  }
                  dot
                >
                  {currentStatus}
                </Badge>
              </div>

              <p>
                {active
                  ? "User dapat mengakses OPERGRID sesuai role dan operational scope yang dimiliki."
                  : "Akses pengguna dibatasi berdasarkan status akun saat ini."}
              </p>
            </div>
          </div>

          <div className="og-account-status-mutation">
            <div className="og-account-status-mutation-heading">
              <strong>
                Change Account Status
              </strong>

              <span>
                {canChangeStatus
                  ? "Perubahan status tidak menghapus role assignment pengguna."
                  : "Account Status bersifat read-only. Perubahan memerlukan ADMIN atau SUPER_ADMIN."}
              </span>
            </div>

            <div className="og-account-status-inline-form">
              <div className="og-account-status-field">
                <FormField label="New Status">
                  <select
                    name="status_code"
                    disabled={!canChangeStatus}
                    value={
                      selectedStatus
                    }
                    onChange={(
                      event,
                    ) =>
                      setSelectedStatus(
                        event.target.value,
                      )
                    }
                    className="og-ui-select og-premium-form-control"
                  >
                    <option value="ACTIVE">
                      Active
                    </option>

                    <option value="INACTIVE">
                      Inactive
                    </option>

                    <option value="SUSPENDED">
                      Suspended
                    </option>

                    <option value="PENDING">
                      Pending
                    </option>
                  </select>
                </FormField>
              </div>

              <ConfirmedServerAction
                action={
                  setUserStatusAction
                }
                fields={{
                  user_id:
                    userId,

                  status_code:
                    selectedStatus,
                }}
                triggerLabel="Update Status"
                confirmTitle="Confirm Account Status Change"
                confirmDescription={
                  <>
                    Status akun akan diubah dari{" "}
                    <strong>
                      {statusLabel(
                        currentStatus,
                      )}
                    </strong>{" "}
                    menjadi{" "}
                    <strong>
                      {statusLabel(
                        selectedStatus,
                      )}
                    </strong>
                    .
                  </>
                }
                confirmLabel="Confirm Update"
                triggerVariant={
                  selectedStatus ===
                    "SUSPENDED" ||
                  selectedStatus ===
                    "INACTIVE"
                    ? "danger"
                    : "secondary"
                }
                triggerIcon={
                  <ShieldAlert
                    size={14}
                    strokeWidth={1.9}
                  />
                }
                disabled={
                  !canChangeStatus ||
                  !statusChanged
                }
                className="og-account-status-update-button"
              >
                <div className="og-sensitive-action-summary">
                  <span>
                    Current
                    <strong>
                      {statusLabel(
                        currentStatus,
                      )}
                    </strong>
                  </span>

                  <span>
                    New Status
                    <strong>
                      {statusLabel(
                        selectedStatus,
                      )}
                    </strong>
                  </span>
                </div>

                <p className="og-sensitive-action-note">
                  Role dan operational scope tetap tersimpan.
                  Namun akses user dapat langsung berubah setelah
                  status akun diperbarui.
                </p>
              </ConfirmedServerAction>
            </div>
          </div>
        </section>

        <aside className="og-account-security-panel">
          <header className="og-account-security-header">
            <div className="og-account-security-heading-icon">
              <KeyRound
                size={17}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <span className="og-account-control-eyebrow">
                Security
              </span>

              <h3>
                Password Recovery
              </h3>

              <p>
                {canPasswordRecovery
                  ? "Kirim secure recovery link agar pengguna dapat membuat password baru."
                  : "Password Recovery user lain bersifat read-only untuk viewer ini."}
              </p>
            </div>
          </header>

          <div className="og-account-security-email">
            <div className="og-account-security-email-icon">
              <MailCheck
                size={17}
                strokeWidth={1.9}
              />
            </div>

            <div>
              <span>
                Authentication Email
              </span>

              <strong>
                {email ??
                  "Email tidak tersedia"}
              </strong>
            </div>
          </div>

          <div className="og-account-security-note">
            <ShieldCheck
              size={14}
              strokeWidth={1.8}
            />

            <p>
              OPERGRID tidak menampilkan atau
              mengubah password user secara langsung.
            </p>
          </div>

          {email && canPasswordRecovery ? (
            <div className="og-account-security-action">
              <ConfirmedServerAction
                action={
                  sendPasswordResetAction
                }
                fields={{
                  user_id:
                    userId,

                  email,
                }}
                triggerLabel="Send Reset Password Link"
                confirmTitle="Send Password Reset Link?"
                confirmDescription={
                  <>
                    Secure password reset link akan dikirim ke{" "}
                    <strong>
                      {email}
                    </strong>
                    .
                  </>
                }
                confirmLabel="Send Reset Link"
                triggerVariant="secondary"
                triggerIcon={
                  <MailCheck
                    size={14}
                    strokeWidth={1.9}
                  />
                }
                className="og-account-security-button"
              >
                <p className="og-sensitive-action-note">
                  Pengguna akan menerima email untuk membuat
                  password baru. Password lama tidak ditampilkan
                  atau dikirim oleh OPERGRID.
                </p>
              </ConfirmedServerAction>
            </div>
          ) : !email ? (
            <Badge variant="warning">
              Email unavailable
            </Badge>
          ) : (
            <div className="og-account-security-action">
              <Badge variant="neutral">
                Read only
              </Badge>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}