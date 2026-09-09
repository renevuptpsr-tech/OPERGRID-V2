import type { ReactNode } from "react";
import clsx from "clsx";

export type FormSectionProps = { title: string; description?: ReactNode; icon?: ReactNode; actions?: ReactNode;
  columns?: 1 | 2; children: ReactNode; className?: string; id?: string };
export function FormSection({ title, description, icon, actions, columns = 1, children, className, id }: FormSectionProps) {
  return <fieldset id={id} className={clsx("og-ds-form-section", className)}>
    <legend className="og-ds-type-section-title">{icon && <span aria-hidden="true" className="og-ds-icon">{icon}</span>} {title}</legend>
    {(description || actions) && <div className="og-ds-section-heading">
      {description && <p className="og-ds-field-help">{description}</p>}{actions}
    </div>}
    <div className="og-ds-form-grid" data-columns={columns}>{children}</div>
  </fieldset>;
}
