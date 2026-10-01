import { useState } from "react";
import {
  Download,
  FileBarChart,
  TrendingUp,
  Receipt,
  PiggyBank,
  Info,
  FileText,
} from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import { earningsReports, user } from "../lib/mock";
import { brl } from "../lib/format";

export default function Earnings() {
  const years = earningsReports.map((r) => r.year);
  const [year, setYear] = useState(years[0]);
  const report = earningsReports.find((r) => r.year === year)!;

  return (
    <div className="stack gap-24">
      <PageHeader
        eyebrow="Perfil & Conta"
        title="Informe de Rendimentos"
        subtitle="Consulte e baixe o informe consolidado dos rendimentos dos seus investimentos para a declaração de imposto de renda."
        actions={
          <div className="row gap-12">
            <select className="select" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ minWidth: 140 }}>
              {years.map((y) => (
                <option key={y} value={y}>Ano-base {y}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={() => window.print()}>
              <Download size={18} /> Baixar PDF
            </button>
          </div>
        }
      />

      <div className="card card-pad fade-up row gap-12" style={{ background: "#42b6ba12", border: "1px solid #42b6ba33" }}>
        <Info size={20} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: "0.86rem", color: "var(--color-secondary)" }}>
          Este informe reúne os rendimentos e o imposto retido no ano-base <strong>{year}</strong>. Utilize-o na ficha
          "Rendimentos Sujeitos à Tributação Exclusiva" da sua declaração.
        </div>
      </div>

      <section className="grid-stats">
        <StatCard label="Total investido" value={brl(report.totalInvested)} icon={PiggyBank} tint="#296e8f" />
        <StatCard label="Rendimentos brutos" value={brl(report.totalEarnings)} icon={TrendingUp} tint="#168a55" />
        <StatCard label="IR retido na fonte" value={brl(report.irWithheld)} icon={Receipt} tint="#dc2626" />
        <StatCard label="Rendimento líquido" value={brl(report.totalEarnings - report.irWithheld)} icon={FileBarChart} tint="#f99c00" />
      </section>

      <div className="card card-pad fade-up">
        <div className="row between wrap gap-12" style={{ marginBottom: 8 }}>
          <div>
            <h3 style={{ fontSize: "1.15rem" }}>Detalhamento por empresa</h3>
            <span className="text-muted" style={{ fontSize: "0.84rem" }}>Ano-base {year} · Titular: {user.name}</span>
          </div>
          <span className="badge badge-primary"><FileText size={13} /> {report.positions.length} fontes pagadoras</span>
        </div>

        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Empresa / CNPJ</th>
                <th>Valor investido</th>
                <th>Rendimento bruto</th>
                <th>IR retido</th>
                <th>Rendimento líquido</th>
              </tr>
            </thead>
            <tbody>
              {report.positions.map((p) => (
                <tr key={p.cnpj}>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{p.company}</div>
                    <div className="text-muted" style={{ fontSize: "0.74rem" }}>{p.cnpj}</div>
                  </td>
                  <td>{brl(p.invested)}</td>
                  <td className="text-success" style={{ fontWeight: 600 }}>{brl(p.earnings)}</td>
                  <td className="text-danger">{brl(p.ir)}</td>
                  <td style={{ fontWeight: 700 }}>{brl(p.earnings - p.ir)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 800, background: "#42b6ba0a" }}>
                <td>Total</td>
                <td>{brl(report.totalInvested)}</td>
                <td className="text-success">{brl(report.totalEarnings)}</td>
                <td className="text-danger">{brl(report.irWithheld)}</td>
                <td>{brl(report.totalEarnings - report.irWithheld)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="card card-pad fade-up row between wrap gap-16">
        <div className="row gap-12">
          <span style={{ width: 48, height: 48, borderRadius: 12, background: "#296e8f14", color: "var(--color-secondary)", display: "grid", placeItems: "center" }}>
            <FileBarChart size={22} />
          </span>
          <div>
            <strong>Documento oficial</strong>
            <div className="text-muted" style={{ fontSize: "0.84rem" }}>Informe de Rendimentos Financeiros {year} · Angel Invest S.A.</div>
          </div>
        </div>
        <div className="row gap-12">
          <button className="btn btn-ghost" onClick={() => window.print()}><FileText size={16} /> Visualizar</button>
          <button className="btn btn-primary" onClick={() => window.print()}><Download size={16} /> Baixar</button>
        </div>
      </div>
    </div>
  );
}
