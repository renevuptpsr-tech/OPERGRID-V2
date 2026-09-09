import { redirect } from "next/navigation";
import {
  Activity,
  Database,
  Gauge,
  Network,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { LoginForm } from "@/features/auth/login-form";
import { createClient } from "@/lib/supabase/server";

const modules = [
  "Dashboard",
  "Logsheet",
  "Shift",
  "Mutasi Jurnal",
  "Manuver",
  "Gangguan 20 kV",
  "Thermovisi",
];

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.08),transparent_32%)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.35) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-cyan-300/10 px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              <Zap size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-[0.18em]">
                OPERGRID
              </h1>

              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                Integrated Operational Grid Platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-lg border border-cyan-300/15 bg-slate-950/50 px-4 py-2 text-xs text-slate-400 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            SYSTEM ONLINE
          </div>
        </header>

        <div className="grid flex-1 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="relative hidden min-h-[720px] overflow-hidden border-r border-cyan-300/10 p-10 lg:block xl:p-14">
            <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                  <Network size={16} />
                  Grid Operations Intelligence
                </div>

                <h2 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight xl:text-6xl">
                  Integrated
                  <span className="block bg-gradient-to-r from-cyan-200 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                    Operational Grid
                  </span>
                  Platform
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
                  Satu platform untuk pencatatan, monitoring,
                  koordinasi, analisis, dan evaluasi kegiatan
                  operasional sistem tenaga.
                </p>
              </div>

              <div className="relative mx-auto flex h-[320px] w-full max-w-3xl items-center justify-center">
                <div className="absolute h-56 w-56 rounded-full border border-cyan-300/20 shadow-[0_0_60px_rgba(34,211,238,0.08)]" />

                <div className="absolute h-40 w-40 rounded-full border border-cyan-300/20" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                  <Zap size={38} />
                </div>

                <div className="absolute left-[10%] top-[42%] flex items-center gap-2">
                  <span className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-300/40" />
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>

                <div className="absolute right-[10%] top-[42%] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <span className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-300/40" />
                </div>

                <div className="absolute bottom-[12%] grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <Database
                      size={18}
                      className="mx-auto mb-2 text-cyan-300"
                    />
                    <div className="text-xs font-semibold text-slate-300">
                      DATABASE
                    </div>
                  </div>

                  <div className="text-center">
                    <ShieldCheck
                      size={18}
                      className="mx-auto mb-2 text-cyan-300"
                    />
                    <div className="text-xs font-semibold text-slate-300">
                      AUTH
                    </div>
                  </div>

                  <div className="text-center">
                    <Activity
                      size={18}
                      className="mx-auto mb-2 text-cyan-300"
                    />
                    <div className="text-xs font-semibold text-slate-300">
                      SYSTEM
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  <Gauge size={14} />
                  Operational Modules
                </div>

                <div className="flex flex-wrap gap-2">
                  {modules.map((module) => (
                    <span
                      key={module}
                      className="rounded-md border border-cyan-300/15 bg-cyan-300/[0.03] px-3 py-2 text-xs text-slate-400"
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Grid Operations Intelligence
                </div>

                <h2 className="text-3xl font-bold leading-tight">
                  Integrated Operational Grid Platform
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Platform operasional sistem tenaga terintegrasi.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

                <div className="mb-7">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    <ShieldCheck size={16} />
                    Secure Access
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight">
                    Masuk ke OPERGRID
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Gunakan akun yang telah terdaftar dan memiliki
                    hak akses OPERGRID.
                  </p>
                </div>

                <LoginForm />
              </div>

              <p className="mt-6 text-center text-[11px] uppercase tracking-[0.16em] text-slate-600">
                Authorized operational access only
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}