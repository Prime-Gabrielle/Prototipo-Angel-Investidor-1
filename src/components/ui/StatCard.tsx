import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  tint?: string;
  hint?: string;
}

export default function StatCard({ label, value, icon: Icon, trend, tint = "#296e8f", hint }: Props) {
  return (
    <div className="card card-pad card-hover stat-card fade-up">
      <div className="row between" style={{ marginBottom: 14 }}>
        <span
          className="stat-icon"
          style={{ background: `${tint}1f`, color: tint }}
        >
          <Icon size={22} />
        </span>
        {trend !== undefined && (
          <span className={`badge ${trend >= 0 ? "badge-success" : "badge-danger"}`}>
            {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {Math.abs(trend).toFixed(1).replace(".", ",")}%
          </span>
        )}
      </div>
      <div style={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{value}</div>
      <div className="text-muted" style={{ fontSize: "0.85rem", marginTop: 2 }}>{label}</div>
      {hint && <div style={{ fontSize: "0.76rem", color: "var(--color-muted)", marginTop: 8 }}>{hint}</div>}
    </div>
  );
}
