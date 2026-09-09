import * as React from "react";

import { cn } from "@/lib/utils/cn";

export type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className,
  type,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}