import type {
  ReactNode,
} from "react";

import clsx from "clsx";


type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};


export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <section
      className={clsx(
        "grid gap-5 border-b py-6 last:border-b-0",
        "lg:grid-cols-[230px_minmax(0,1fr)]",
        className
      )}
      style={{
        borderColor:
          "var(--og-border-soft)",
      }}
    >
      <div>
        <h3 className="og-text text-[12px] font-semibold">
          {title}
        </h3>

        {description && (
          <p className="og-muted mt-1 max-w-[210px] text-[9px] leading-4">
            {description}
          </p>
        )}
      </div>

      <div className="min-w-0">
        {children}
      </div>
    </section>
  );
}