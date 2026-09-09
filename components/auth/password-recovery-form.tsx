"use client";

import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Button,
  FormField,
} from "@/components/ui";

import {
  updateRecoveredPasswordAction,
} from "@/app/auth/update-password/actions";


type PasswordRecoveryFormProps = {
  message:
    | string
    | null;

  messageStatus:
    | string
    | null;
};


function strengthScore(
  password: string
) {
  let score = 0;

  if (
    password.length >= 8
  ) {
    score += 1;
  }

  if (
    /[A-Z]/.test(
      password
    )
  ) {
    score += 1;
  }

  if (
    /[0-9]/.test(
      password
    )
  ) {
    score += 1;
  }

  if (
    /[^A-Za-z0-9]/.test(
      password
    )
  ) {
    score += 1;
  }

  return score;
}


function strengthLabel(
  score: number
) {
  if (
    score <= 1
  ) {
    return "Weak";
  }

  if (
    score === 2
  ) {
    return "Fair";
  }

  if (
    score === 3
  ) {
    return "Good";
  }

  return "Strong";
}


export function PasswordRecoveryForm({
  message,
  messageStatus,
}: PasswordRecoveryFormProps) {
  const [
    password,
    setPassword,
  ] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);


  const score =
    useMemo(
      () =>
        strengthScore(
          password
        ),
      [
        password,
      ]
    );


  const matches =
    confirmPassword.length >
      0 &&
    password ===
      confirmPassword;


  return (
    <div className="space-y-5">

      {message && (
        <div
          className="rounded-[12px] border p-3.5"
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

            borderColor:
              messageStatus ===
              "success"
                ? "color-mix(in srgb, var(--og-success) 25%, transparent)"
                : "color-mix(in srgb, var(--og-danger) 25%, transparent)",
          }}
        >
          <div className="text-[10px] font-medium">
            {message}
          </div>
        </div>
      )}


      <form
        action={
          updateRecoveredPasswordAction
        }
        className="space-y-4"
      >

        <FormField
          label="New Password"
          required
          helper="Minimal 8 karakter. Kombinasikan huruf besar, angka, dan simbol."
        >

          <div className="relative">

            <LockKeyhole
              size={15}
              strokeWidth={1.7}
              className="og-muted absolute left-3 top-1/2 -translate-y-1/2"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              value={
                password
              }
              onChange={(
                event
              ) =>
                setPassword(
                  event
                    .target
                    .value
                )
              }
              minLength={8}
              required
              autoComplete="new-password"
              className="og-ui-input h-11 w-full rounded-[10px] pl-9 pr-11 text-[11px] outline-none"
            />


            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (value) =>
                    !value
                )
              }
              className="og-muted absolute right-3 top-1/2 -translate-y-1/2 hover:text-[var(--og-text)]"
              aria-label={
                showPassword
                  ? "Sembunyikan password"
                  : "Tampilkan password"
              }
            >
              {showPassword ? (
                <EyeOff
                  size={15}
                />
              ) : (
                <Eye
                  size={15}
                />
              )}
            </button>

          </div>

        </FormField>


        {password && (
          <div>

            <div className="flex gap-1.5">

              {[
                1,
                2,
                3,
                4,
              ].map(
                (level) => (
                  <div
                    key={
                      level
                    }
                    className="h-1 flex-1 rounded-full"
                    style={{
                      background:
                        score >=
                        level
                          ? score >=
                            3
                            ? "var(--og-success)"
                            : "var(--og-warning)"
                          : "var(--og-border)",
                    }}
                  />
                )
              )}

            </div>


            <div className="og-muted mt-1.5 text-[8px]">
              Password strength:{" "}
              <span className="font-semibold">
                {strengthLabel(
                  score
                )}
              </span>
            </div>

          </div>
        )}


        <FormField
          label="Confirm New Password"
          required
        >

          <div className="relative">

            <KeyRound
              size={15}
              strokeWidth={1.7}
              className="og-muted absolute left-3 top-1/2 -translate-y-1/2"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="confirm_password"
              value={
                confirmPassword
              }
              onChange={(
                event
              ) =>
                setConfirmPassword(
                  event
                    .target
                    .value
                )
              }
              minLength={8}
              required
              autoComplete="new-password"
              className="og-ui-input h-11 w-full rounded-[10px] pl-9 pr-10 text-[11px] outline-none"
            />


            {matches && (
              <Check
                size={15}
                strokeWidth={2}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{
                  color:
                    "var(--og-success)",
                }}
              />
            )}

          </div>

        </FormField>


        <div
          className="rounded-[11px] p-3"
          style={{
            background:
              "var(--og-surface-soft)",
          }}
        >
          <div className="og-secondary text-[8px] leading-4">

            Password sebaiknya:

            <div className="mt-1 grid gap-1 sm:grid-cols-2">

              <span>
                • minimal 8 karakter
              </span>

              <span>
                • memiliki huruf besar
              </span>

              <span>
                • memiliki angka
              </span>

              <span>
                • memiliki simbol
              </span>

            </div>

          </div>
        </div>


        <Button
          type="submit"
          size="lg"
          disabled={
            password.length <
              8 ||
            password !==
              confirmPassword
          }
          leftIcon={
            <LockKeyhole
              size={15}
              strokeWidth={1.8}
            />
          }
          className="w-full"
        >
          Update Password
        </Button>

      </form>

    </div>
  );
}