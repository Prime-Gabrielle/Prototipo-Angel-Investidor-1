import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  TrendingUp,
  Wallet as WalletIcon,
  PiggyBank,
  ArrowDownToLine,
  ArrowUpRight,
  Plus,
  CreditCard,
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, Cell } from "recharts";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import { user, walletPositions, transactions, allocationData } from "../lib/mock";
import { brl, percent, initials, dateBR } from "../lib/format";

const statusLabel: Record<string, { label: string; cls: string }> = {
  ativo: { label: "Ativo", cls: "badge-success" },
  liquidado: { label: "Liquidado", cls: "badge-muted" },
  aguardando_pagamento: { label: "Aguardando pagamento", cls: "badge-accent" },
};

type Tab = "posicoes" | "extrato";

export default function Wallet() {
  const [hidden, setHidden] = useState(false);
  const [tab, setTab] = useState<Tab>("posicoes");

  const mask = (v: string) => (hidden ? "R$ ••••••" : v);
  const totalReturn = ((user.currentValue - user.invested) / user.invested) * 100;
  const pending = walletPositions.find((p) => p.status === "aguardando_pagamento");

  return (
    <div className="stack gap-24">
      <PageHeader
        eyebrow="Carteira de Investimentos"
        title="Minha Carteira"
        subtitle="Acompanhe seus aportes, rendimentos e o histórico completo das suas participações."
        actions={
          <Link to="/ofertas" className="btn btn-primary">
            <Plus size={18} /> Investir
          </Link>
        }
      />

      {/* Cartão saldo estilo banco */}
      <section className="card card-strong fade-up" style={{ overflow: "hidden" }}>
        <div className="hero" style={{ borderRadius: 0, padding: "clamp(24px, 4vw, 34px)" }}>
          <div className="hero-inner">
            <div className="row between wrap gap-16">
              <div>
                <div className="row gap-12">
                  <span style={{ fontSize: "0.86rem", opacity: 0.85 }}>Patrimônio total investido</span>
                  <button onClick={() => setHidden((h) => !h)} aria-label="Ocultar valores" style={{ color: "#fff", opacity: 0.85 }}>
                    {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)", fontWeight: 900, marginTop: 4 }}>
                  {mask(brl(user.currentValue))}
                </div>
                <div className="row gap-8" style={{ marginTop: 6 }}>
                  <span className="badge" style={{ background: "#4ade8033", color: "#4ade80" }}>
                    <TrendingUp size={13} /> {percent(totalReturn)}
                  </span>
                  <span style={{ opacity: 0.85, fontSize: "0.84rem" }}>
                    {mask(`+${brl(user.currentValue - user.invested)}`)} em rendimentos
                  </span>
                </div>
              </div>

              <div className="row gap-12 wrap">
                <ActionBtn icon={<Plus size={20} />} label="Investir" to="/ofertas" />
                <ActionBtn icon={<ArrowDownToLine size={20} />} label="Resgatar" />
                <ActionBtn icon={<CreditCard size={20} />} label="Depositar" />
              </div>
            </div>

            <div className="row gap-24 wrap" style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #ffffff2e" }}>
              <Mini label="Saldo disponível" value={mask(brl(user.balance))} />
              <Mini label="Total aportado" value={mask(brl(user.invested))} />
              <Mini label="Investimentos" value={String(walletPositions.length)} />
            </div>
          </div>
        </div>
      </section>

      {pending && (
        <div className="card card-pad fade-up row between wrap gap-16" style={{ borderLeft: "4px solid var(--color-accent)" }}>
          <div className="row gap-12">
            <span className="avatar-sq" style={{ background: "var(--color-accent)" }}>!</span>
            <div>
              <strong>Pagamento pendente</strong>
              <div className="text-muted" style={{ fontSize: "0.84rem" }}>
                Seu aporte em {pending.company} ({brl(pending.invested)}) aguarda pagamento.
              </div>
            </div>
          </div>
          <Link to="/pagamento" className="btn btn-accent btn-sm">Pagar agora</Link>
        </div>
      )}

      <section className="grid-stats">
        <StatCard label="Total investido" value={mask(brl(user.invested))} icon={PiggyBank} tint="#296e8f" />
        <StatCard label="Valor atual" value={mask(brl(user.currentValue))} icon={WalletIcon} trend={totalReturn} tint="#42b6ba" />
        <StatCard label="Rendimento" value={mask(brl(user.currentValue - user.invested))} icon={TrendingUp} tint="#168a55" />
        <StatCard label="Rentab. média" value={percent(totalReturn)} icon={ArrowUpRight} tint="#f99c00" />
      </section>

      <section className="grid-2">
        <div className="card card-pad fade-up">
          <div className="tabs" style={{ width: "fit-content", marginBottom: 18 }}>
            <button className={`tab ${tab === "posicoes" ? "active" : ""}`} onClick={() => setTab("posicoes")}>Posições</button>
            <button className={`tab ${tab === "extrato" ? "active" : ""}`} onClick={() => setTab("extrato")}>Extrato</button>
          </div>

          {tab === "posicoes" ? (
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Investido</th>
                    <th>Atual</th>
                    <th>Rentab.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {walletPositions.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="row gap-12">
                          <span className="avatar-sq" style={{ background: p.logoColor, width: 36, height: 36, fontSize: "0.76rem" }}>{initials(p.company)}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.86rem" }}>{p.company}</div>
                            <div className="text-muted" style={{ fontSize: "0.74rem" }}>{p.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>{mask(brl(p.invested))}</td>
                      <td style={{ fontWeight: 700 }}>{mask(brl(p.currentValue))}</td>
                      <td className={p.returnPct >= 0 ? "text-success" : "text-danger"} style={{ fontWeight: 700 }}>{percent(p.returnPct)}</td>
                      <td><span className={`badge ${statusLabel[p.status].cls}`}>{statusLabel[p.status].label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              {transactions.map((t) => (
                <div key={t.id} className="list-row">
                  <span className="avatar-sq" style={{ background: t.type === "rendimento" || t.type === "resgate" ? "#168a55" : t.type === "taxa" ? "#4a7288" : "#f99c00", fontSize: "0.72rem" }}>
                    {t.type === "rendimento" ? "R$" : t.type === "resgate" ? "↑" : t.type === "taxa" ? "%" : "↓"}
                  </span>
                  <div className="grow">
                    <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{t.company}</div>
                    <div className="text-muted" style={{ fontSize: "0.76rem", textTransform: "capitalize" }}>
                      {t.type}{t.method ? ` · ${t.method}` : ""} · {dateBR(t.date)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: t.type === "rendimento" || t.type === "resgate" ? "var(--color-success)" : "var(--color-foreground)" }}>
                      {t.type === "rendimento" || t.type === "resgate" ? "+" : "-"}{mask(brl(t.amount))}
                    </div>
                    <span className={`badge ${t.status === "concluido" ? "badge-success" : t.status === "pendente" ? "badge-accent" : "badge-muted"}`} style={{ fontSize: "0.64rem" }}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card card-pad fade-up">
          <h3 style={{ fontSize: "1.05rem", marginBottom: 14 }}>Rendimento por posição</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={walletPositions.filter((p) => p.status !== "aguardando_pagamento").map((p) => ({ name: p.company.split(" ")[0], value: p.currentValue - p.invested, color: p.logoColor }))}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [brl(Number(v)), "Rendimento"]} cursor={{ fill: "#42b6ba12" }} contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card-strong)" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {walletPositions.filter((p) => p.status !== "aguardando_pagamento").map((p) => (
                  <Cell key={p.id} fill={p.logoColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <hr className="divider" />
          <h4 style={{ fontSize: "0.92rem", marginBottom: 12 }}>Diversificação</h4>
          <div className="stack gap-10">
            {allocationData.map((a) => {
              const total = allocationData.reduce((s, x) => s + x.value, 0);
              const p = Math.round((a.value / total) * 100);
              return (
                <div key={a.name}>
                  <div className="row between" style={{ fontSize: "0.8rem", marginBottom: 4 }}>
                    <span>{a.name}</span>
                    <strong>{p}%</strong>
                  </div>
                  <div className="progress" style={{ height: 7 }}>
                    <span style={{ width: `${p}%`, background: a.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionBtn({ icon, label, to }: { icon: React.ReactNode; label: string; to?: string }) {
  const content = (
    <span className="stack" style={{ alignItems: "center", gap: 6 }}>
      <span style={{ width: 52, height: 52, borderRadius: 16, background: "#ffffff1f", border: "1px solid #ffffff33", display: "grid", placeItems: "center", color: "#fff", transition: "background 0.18s" }}>{icon}</span>
      <span style={{ fontSize: "0.76rem", color: "#fff", fontWeight: 600 }}>{label}</span>
    </span>
  );
  return to ? <Link to={to}>{content}</Link> : <button>{content}</button>;
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.78rem", color: "#ffffffcc" }}>{label}</div>
      <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", marginTop: 2 }}>{value}</div>
    </div>
  );
}
