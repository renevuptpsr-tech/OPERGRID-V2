import type {
  ReactNode,
} from "react";


type FormFieldProps = {
  label: string;
  helper?: string;
  required?: boolean;
  children: ReactNode;
};


export function FormField({
  label,
  helper,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <label className="block">
      <div className="flex items-center gap-1">
        <span className="og-secondary text-[9px] font-medium">
          {label}
        </span>

        {required && (
          <span
            className="text-[10px]"
            style={{
              color:
                "var(--og-danger)",
            }}
          >
            *
          </span>
        )}
      </div>

      <div className="mt-1.5">
        {children}
      </div>

      {helper && (
        <p className="og-muted mt-1.5 text-[8px] leading-4">
          {helper}
        </p>
      )}
    </label>
  );
}