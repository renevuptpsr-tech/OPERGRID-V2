import {
  LockKeyhole,
  ShieldCheck,
  Zap,
} from "lucide-react";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  PasswordRecoveryForm,
} from "@/components/auth/password-recovery-form";


type PageProps = {
  searchParams:
    Promise<{
      status?: string;
      message?: string;
    }>;
};


export default async function UpdatePasswordPage({
  searchParams,
}: PageProps) {
  const query =
    await searchParams;


  const supabase =
    await createClient();


  const {
    data,
  } =
    await supabase.auth
      .getUser();


  /*
   * Recovery callback must establish a valid session.
   */
  if (!data.user) {
    const params =
      new URLSearchParams({
        error:
          "Link reset password tidak valid atau sudah kedaluwarsa.",
      });

    redirect(
      `/login?${params.toString()}`
    );
  }


  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{
        background:
          "var(--og-canvas)",
      }}
    >

      <div className="w-full max-w-[430px]">

        {/* BRAND */}

        <div className="mb-6 flex justify-center">

          <div className="flex items-center gap-3">

            <div
              className="flex h-10 w-10 items-center justify-center rounded-[12px]"
              style={{
                color:
                  "var(--og-cyan)",

                background:
                  "var(--og-sidebar)",

                border:
                  "1px solid rgba(32,183,216,0.15)",
              }}
            >
              <Zap
                size={18}
                strokeWidth={2}
              />
            </div>


            <div>

              <div className="og-text text-[13px] font-semibold tracking-[0.18em]">
                OPERGRID
              </div>

              <div className="og-muted mt-0.5 text-[8px] uppercase tracking-[0.14em]">
                Operational Platform
              </div>

            </div>

          </div>

        </div>


        {/* CARD */}

        <div
          className="rounded-[18px] border p-6"
          style={{
            color:
              "var(--og-text)",

            background:
              "var(--og-surface-raised)",

            borderColor:
              "var(--og-border)",

            boxShadow:
              "var(--og-shadow-popover)",
          }}
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-[12px]"
            style={{
              color:
                "var(--og-cyan-strong)",

              background:
                "var(--og-cyan-soft)",
            }}
          >
            <LockKeyhole
              size={19}
              strokeWidth={1.8}
            />
          </div>


          <h1 className="og-text mt-5 text-[20px] font-semibold tracking-[-0.025em]">
            Set New Password
          </h1>

          <p className="og-muted mt-1.5 text-[9px] leading-4">
            Buat password baru untuk akun OPERGRID Anda.
          </p>


          <div
            className="my-5 h-px"
            style={{
              background:
                "var(--og-border-soft)",
            }}
          />


          <PasswordRecoveryForm
            message={
              query.message ??
              null
            }
            messageStatus={
              query.status ??
              null
            }
          />


          <div
            className="mt-6 flex items-start gap-2 rounded-[11px] p-3"
            style={{
              background:
                "var(--og-surface-soft)",
            }}
          >

            <ShieldCheck
              size={14}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0"
              style={{
                color:
                  "var(--og-success)",
              }}
            />

            <p className="og-muted text-[8px] leading-4">
              Password diproses langsung oleh authentication service dan tidak disimpan di profile OPERGRID.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}