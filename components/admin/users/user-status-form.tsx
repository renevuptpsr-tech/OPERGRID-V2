import {
  CircleCheck,
  CirclePause,
  MailCheck,
  ShieldAlert,
} from "lucide-react";

import {
  Badge,
  FormField,
  Panel,
  SubmitButton,
} from "@/components/ui";

import {
  setUserStatusAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";

import {
  sendPasswordResetAction,
} from "@/app/(platform)/admin/users/[user_id]/security-actions";


type UserStatusFormProps = {
  userId: string;

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
};


export function UserStatusForm({
  userId,
  statusCode,
  email,
  message,
  messageStatus,
}: UserStatusFormProps) {
  const active =
    statusCode ===
    "ACTIVE";


  return (
    <div className="space-y-7">

      {message && (
        <Panel
          variant="soft"
          padding="md"
          className={
            messageStatus ===
            "success"
              ? "border-[var(--og-success)]"
              : "border-[var(--og-danger)]"
          }
        >
          <div className="flex items-start gap-3">

            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
              style={{
                color:
                  messageStatus ===
                  "success"
                    ? "var(--og-success)"
                    : "var(--og-danger)",

                background:
                  messageStatus ===
                  "success"
                    ? "var(--og-success-soft)"
                    : "var(--og-danger-soft)",
              }}
            >
              <MailCheck
                size={15}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <div className="og-text text-[10px] font-semibold">
                {messageStatus ===
                "success"
                  ? "Success"
                  : "Action Failed"}
              </div>

              <div className="og-muted mt-0.5 text-[9px]">
                {message}
              </div>
            </div>

          </div>
        </Panel>
      )}


      {/* ===================================================
          ACCOUNT STATUS
         =================================================== */}

      <section>

        <div className="mb-4">
          <h3 className="og-text text-[13px] font-semibold">
            Account Status
          </h3>

          <p className="og-muted mt-1 text-[9px] leading-4">
            Status akun menentukan apakah pengguna dapat mengakses OPERGRID.
          </p>
        </div>


        <div
          className="rounded-[14px] border p-5"
          style={{
            background:
              active
                ? "var(--og-success-soft)"
                : "var(--og-surface-soft)",

            borderColor:
              active
                ? "color-mix(in srgb, var(--og-success) 24%, transparent)"
                : "var(--og-border-soft)",
          }}
        >

          <div className="flex items-start gap-3">

            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
              style={{
                color:
                  active
                    ? "var(--og-success)"
                    : "var(--og-warning)",

                background:
                  active
                    ? "var(--og-success-soft)"
                    : "var(--og-warning-soft)",
              }}
            >
              {active ? (
                <CircleCheck
                  size={18}
                  strokeWidth={1.8}
                />
              ) : (
                <CirclePause
                  size={18}
                  strokeWidth={1.8}
                />
              )}
            </div>


            <div>

              <div className="flex flex-wrap items-center gap-2">

                <span className="og-text text-[11px] font-semibold">
                  Current Status
                </span>

                <Badge
                  variant={
                    active
                      ? "success"
                      : "warning"
                  }
                  dot
                >
                  {statusCode ??
                    "UNKNOWN"}
                </Badge>

              </div>


              <p className="og-muted mt-1.5 text-[9px] leading-4">
                {active
                  ? "User dapat mengakses OPERGRID sesuai role dan operational scope yang dimiliki."
                  : "Akses pengguna dibatasi berdasarkan status akun saat ini."}
              </p>

            </div>

          </div>

        </div>


        <form
          action={
            setUserStatusAction
          }
          className="mt-4 max-w-[500px] space-y-4"
        >

          <input
            type="hidden"
            name="user_id"
            value={
              userId
            }
          />


          <FormField
            label="Change Account Status"
            helper="Perubahan status tidak menghapus role assignment user."
          >
            <select
              name="status_code"
              defaultValue={
                statusCode ??
                "ACTIVE"
              }
              className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
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


          <SubmitButton
            variant="secondary"
            pendingText="Updating..."
            leftIcon={
              <ShieldAlert
                size={14}
                strokeWidth={1.8}
              />
            }
          >
            Update Account Status
          </SubmitButton>

        </form>

      </section>


      <div
        className="h-px"
        style={{
          background:
            "var(--og-border-soft)",
        }}
      />


      {/* ===================================================
          PASSWORD RECOVERY
         =================================================== */}

      <section>

        <div className="mb-4">
          <h3 className="og-text text-[13px] font-semibold">
            Password Recovery
          </h3>

          <p className="og-muted mt-1 max-w-[650px] text-[9px] leading-4">
            OPERGRID tidak menampilkan atau mengubah password pengguna secara langsung. Kirim secure reset link agar pengguna membuat password baru melalui email.
          </p>
        </div>


        <Panel
          variant="soft"
          padding="lg"
          className="max-w-[720px]"
        >

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
              style={{
                color:
                  "var(--og-cyan-strong)",

                background:
                  "var(--og-cyan-soft)",
              }}
            >
              <MailCheck
                size={17}
                strokeWidth={1.8}
              />
            </div>


            <div className="min-w-0 flex-1">

              <div className="og-muted text-[8px] font-semibold uppercase tracking-[0.10em]">
                Authentication Email
              </div>

              <div className="og-text mt-1 truncate text-[11px] font-medium">
                {email ??
                  "Email tidak tersedia"}
              </div>

            </div>


            {email ? (
              <form
                action={
                  sendPasswordResetAction
                }
              >

                <input
                  type="hidden"
                  name="user_id"
                  value={
                    userId
                  }
                />

                <input
                  type="hidden"
                  name="email"
                  value={
                    email
                  }
                />


                <SubmitButton
                  variant="secondary"
                  pendingText="Sending..."
                  leftIcon={
                    <MailCheck
                      size={14}
                      strokeWidth={1.8}
                    />
                  }
                >
                  Send Reset Password Link
                </SubmitButton>

              </form>
            ) : (
              <Badge
                variant="warning"
              >
                Email unavailable
              </Badge>
            )}

          </div>

        </Panel>

      </section>

    </div>
  );
}