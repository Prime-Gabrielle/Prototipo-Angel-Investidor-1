import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  Layers,
  ArrowRight,
  Sparkles,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatCard from "../components/ui/StatCard";
import OfferCard from "../components/ui/OfferCard";
import Newsletter from "../components/Newsletter";
import {
  user,
  offers,
  walletPositions,
  portfolioHistory,
  allocationData,
  transactions,
} from "../lib/mock";
import { brl, compactBrl, percent, initials, dateBR } from "../lib/format";

export default function Dashboard() {
  const totalReturn = ((user.currentValue - user.invested) / user.invested) * 100;
  const active = walletPositions.filter((p) => p.status === "ativo");
  const featured = offers.filter((o) => o.status === "aberta" || o.status === "encerrando").slice(0, 3);

  return (
    <div className="stack gap-24">
      {/* Hero */}
      <section className="hero fade-up">
        <div className="hero-inner row between wrap gap-24">
          <div style={{ maxWidth: 520 }}>
            <span className="badge" style={{ background: "#ffffff1f", color: "#fff" }}>
              <Sparkles size={14} /> Olá, {user.name.split(" ")[0]}
            </span>
            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.3rem)", marginTop: 14 }}>
              Seu patrimônio está rendendo <span style={{ color: "#4ade80" }}>{percent(totalReturn)}</span>
            </h1>
            <p style={{ opacity: 0.86, marginTop: 8 }}>
              Você tem {active.length} investimentos ativos. Continue diversificando com novas
              oportunidades selecionadas para o seu perfil.
            </p>
            <div className="row gap-12 wrap" style={{ marginTop: 20 }}>
              <Link to="/ofertas" className="btn btn-accent">
                <Plus size={18} /> Novo investimento
              </Link>
              <Link to="/carteira" className="btn btn-ghost" style={{ background: "#ffffff1f", color: "#fff", border: "1px solid #ffffff33" }}>
                Ver carteira <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div
            className="card card-strong card-pad"
            style={{ minWidth: 240, background: "#ffffff1a", border: "1px solid #ffffff33", color: "#fff" }}
          >
            <span style={{ fontSize: "0.82rem", opacity: 0.8 }}>Saldo disponível</span>
            <div style={{ fontSize: "1.9rem", fontWeight: 900, margin: "4px 0 16px" }}>
              {brl(user.balance)}
            </div>
            <div className="row between" style={{ fontSize: "0.84rem", paddingTop: 12, borderTop: "1px solid #ffffff2e" }}>
              <span style={{ opacity: 0.8 }}>Patrimônio total</span>
              <strong>{brl(user.currentValue)}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid-stats">
        <StatCard label="Total investido" value={brl(user.invested)} icon={PiggyBank} tint="#296e8f" hint="Em 4 empresas" />
        <StatCard label="Valor atual" value={brl(user.currentValue)} icon={Wallet} trend={totalReturn} tint="#42b6ba" />
        <StatCard label="Rendimento acumulado" value={brl(user.currentValue - user.invested)} icon={TrendingUp} tint="#168a55" hint="Desde o início" />
        <StatCard label="Investimentos ativos" value={String(active.length)} icon={Layers} tint="#f99c00" hint="1 aguardando pagamento" />
      </section>

      {/* Gráficos */}
      <section className="grid-2">
        <div className="card card-pad fade-up">
          <div className="row between" style={{ marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.1rem" }}>Evolução do patrimônio</h3>
              <span className="text-muted" style={{ fontSize: "0.82rem" }}>Últimos 9 meses</span>
            </div>
            <span className="badge badge-success"><TrendingUp size={13} /> {percent(totalReturn)}</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={portfolioHistory} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#42b6ba" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#42b6ba" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => compactBrl(v)} />
              <Tooltip
                formatter={(v) => [brl(Number(v)), "Patrimônio"]}
                contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card-strong)" }}
              />
              <Area type="monotone" dataKey="value" stroke="#296e8f" strokeWidth={2.5} fill="url(#area)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad fade-up">
          <h3 style={{ fontSize: "1.1rem", marginBottom: 10 }}>Alocação por setor</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={allocationData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3}>
                {allocationData.map((e) => (
                  <Cell key={e.name} fill={e.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(v) => brl(Number(v))} contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-card-strong)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="stack gap-8" style={{ marginTop: 8 }}>
            {allocationData.map((a) => (
              <div key={a.name} className="row between" style={{ fontSize: "0.82rem" }}>
                <span className="row gap-8">
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: a.color }} />
                  {a.name}
                </span>
                <strong>{compactBrl(a.value)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atividade + posições */}
      <section className="grid-2">
        <div className="card card-pad fade-up">
          <div className="row between" style={{ marginBottom: 6 }}>
            <h3 style={{ fontSize: "1.1rem" }}>Meus investimentos</h3>
            <Link to="/carteira" className="text-primary row gap-4" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              Ver todos <ArrowRight size={15} />
            </Link>
          </div>
          {active.map((p) => (
            <div key={p.id} className="list-row">
              <span className="avatar-sq" style={{ background: p.logoColor }}>{initials(p.company)}</span>
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>{p.company}</div>
                <div className="text-muted" style={{ fontSize: "0.78rem" }}>{p.category} · {dateBR(p.date)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{brl(p.currentValue)}</div>
                <div className="text-success" style={{ fontSize: "0.8rem" }}>{percent(p.returnPct)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card card-pad fade-up">
          <h3 style={{ fontSize: "1.1rem", marginBottom: 6 }}>Atividade recente</h3>
          {transactions.slice(0, 5).map((t) => (
            <div key={t.id} className="list-row">
              <span
                className="avatar-sq"
                style={{ background: t.type === "rendimento" ? "#168a55" : t.type === "resgate" ? "#296e8f" : "#f99c00", fontSize: "0.72rem" }}
              >
                {t.type === "rendimento" ? "R$" : t.type === "resgate" ? "↑" : "↓"}
              </span>
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{t.company}</div>
                <div className="text-muted" style={{ fontSize: "0.76rem", textTransform: "capitalize" }}>{t.type} · {dateBR(t.date)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: t.type === "rendimento" || t.type === "resgate" ? "var(--color-success)" : "var(--color-foreground)" }}>
                  {t.type === "rendimento" || t.type === "resgate" ? "+" : "-"}{brl(t.amount)}
                </div>
                <span className={`badge ${t.status === "concluido" ? "badge-success" : t.status === "pendente" ? "badge-accent" : "badge-muted"}`} style={{ fontSize: "0.66rem" }}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ofertas em destaque */}
      <section className="stack gap-16">
        <div className="row between wrap gap-12">
          <div>
            <div className="eyebrow">Selecionadas para você</div>
            <h2 className="section-title">Oportunidades em destaque</h2>
          </div>
          <Link to="/ofertas" className="btn btn-outline">Ver todas as ofertas <ArrowRight size={16} /></Link>
        </div>
        <div className="offers-grid">
          {featured.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
