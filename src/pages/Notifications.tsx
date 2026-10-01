import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCheck,
  Wallet,
  Store,
  UserCheck,
  TrendingUp,
  Bell,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import { useApp } from "../context/AppContext";
import { timeAgo } from "../lib/format";
import type { Notification } from "../lib/types";

const kindMap: Record<Notification["kind"], { icon: LucideIcon; tint: string; label: string }> = {
  investimento: { icon: Wallet, tint: "#f99c00", label: "Investimento" },
  oferta: { icon: Store, tint: "#296e8f", label: "Oferta" },
  cadastro: { icon: UserCheck, tint: "#168a55", label: "Cadastro" },
  rendimento: { icon: TrendingUp, tint: "#42b6ba", label: "Rendimento" },
};

type Filter = "todas" | "nao_lidas" | Notification["kind"];

export default function Notifications() {
  const { notifications, unreadCount, markAllRead, markRead } = useApp();
  const [filter, setFilter] = useState<Filter>("todas");

  const filtered = notifications.filter((n) => {
    if (filter === "todas") return true;
    if (filter === "nao_lidas") return !n.read;
    return n.kind === filter;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: "todas", label: "Todas" },
    { key: "nao_lidas", label: `Não lidas${unreadCount ? ` (${unreadCount})` : ""}` },
    { key: "investimento", label: "Investimentos" },
    { key: "oferta", label: "Ofertas" },
    { key: "rendimento", label: "Rendimentos" },
    { key: "cadastro", label: "Cadastro" },
  ];

  return (
    <div className="stack gap-24">
      <PageHeader
        eyebrow="Central de Notificações"
        title="Notificações"
        subtitle="Acompanhe alertas sobre seus investimentos, novas ofertas e status cadastral."
        actions={
          unreadCount > 0 ? (
            <button className="btn btn-ghost" onClick={markAllRead}>
              <CheckCheck size={18} /> Marcar todas como lidas
            </button>
          ) : undefined
        }
      />

      <div className="tabs fade-up" style={{ width: "fit-content", maxWidth: "100%" }}>
        {filters.map((f) => (
          <button key={f.key} className={`tab ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="card card-pad fade-up">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Bell size={40} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
            <h3>Tudo em dia!</h3>
            <p>Você não tem notificações {filter === "nao_lidas" ? "não lidas" : "nesta categoria"}.</p>
          </div>
        ) : (
          <div className="stack">
            {filtered.map((n) => {
              const meta = kindMap[n.kind];
              return (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="list-row"
                  style={{ textAlign: "left", background: n.read ? "transparent" : "#42b6ba0a", borderRadius: "var(--radius-md)", padding: "16px 12px", width: "100%" }}
                >
                  <span className="avatar-sq" style={{ background: `${meta.tint}1f`, color: meta.tint }}>
                    <meta.icon size={20} />
                  </span>
                  <div className="grow">
                    <div className="row gap-8">
                      <strong style={{ fontSize: "0.92rem" }}>{n.title}</strong>
                      {!n.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent)" }} />}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.84rem", marginTop: 2 }}>{n.message}</div>
                    <div className="row gap-8" style={{ marginTop: 6 }}>
                      <span className="badge badge-muted" style={{ fontSize: "0.64rem" }}>{meta.label}</span>
                      <span className="text-muted" style={{ fontSize: "0.74rem" }}>{timeAgo(n.date)}</span>
                    </div>
                  </div>
                  {n.kind === "investimento" && (
                    <Link to="/pagamento" className="btn btn-accent btn-sm" onClick={(e) => e.stopPropagation()}>Pagar</Link>
                  )}
                  {n.kind === "oferta" && (
                    <Link to="/ofertas" className="btn btn-ghost btn-sm" onClick={(e) => e.stopPropagation()}>Ver</Link>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
