"use client";

import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import { useActionState, useState } from "react";

import { loginAction } from "@/features/auth/actions";

const initialState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80"
        >
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300/70"
          />

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="nama@perusahaan.com"
            className="h-12 w-full rounded-lg border border-cyan-400/20 bg-slate-950/60 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300/70"
          />

          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Masukkan password"
            className="h-12 w-full rounded-lg border border-cyan-400/20 bg-slate-950/60 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-200"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {state.message ? (
        <div className="rounded-lg border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-200">
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-cyan-200/50 bg-cyan-300 px-4 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.16)] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogIn
          size={18}
          className="transition-transform group-hover:translate-x-0.5"
        />

        {pending ? "Menghubungkan..." : "Masuk ke OPERGRID"}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] uppercase tracking-[0.15em] text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        Secure Authentication
      </div>
    </form>
  );
}