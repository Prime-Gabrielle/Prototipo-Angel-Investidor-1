import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function PageHeader({ eyebrow, title, subtitle, actions }: Props) {
  return (
    <div className="row between wrap gap-16 fade-up" style={{ marginBottom: 24 }}>
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
        <h1 className="section-title">{title}</h1>
        {subtitle && (
          <p className="text-muted" style={{ marginTop: 6, maxWidth: 620 }}>{subtitle}</p>
        )}
      </div>
      {actions && <div className="row gap-12 wrap">{actions}</div>}
    </div>
  );
}
