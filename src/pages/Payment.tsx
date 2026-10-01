import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  QrCode,
  CreditCard,
  Landmark,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { brl } from "../lib/format";

type Method = "pix" | "cartao" | "ted";
type Step = "method" | "confirm" | "done";

const pixCode =
  "00020126580014BR.GOV.BCB.PIX0136angel-invest-pix-2f3a5d8b7c9e5204000053039865802BR5920ANGEL INVEST S.A.6009SAO PAULO62070503***6304A1B2";

export default function Payment() {
  const { pending, setPending } = useApp();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("pix");
  const [step, setStep] = useState<Step>("method");
  const [copied, setCopied] = useState(false);
  const [protocol] = useState(() => `#ANG-${Date.now().toString().slice(-8)}`);

  if (!pending) {
    return (
      <div className="card card-pad empty-state">
        <Clock size={40} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
        <h3>Nenhum investimento em andamento</h3>
        <p>Escolha uma oferta para iniciar um aporte.</p>
        <Link to="/ofertas" className="btn btn-primary" style={{ marginTop: 16 }}>Ver ofertas</Link>
      </div>
    );
  }

  const fee = 0;
  const total = pending.amount + fee;

  const copy = () => {
    navigator.clipboard?.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirm = () => {
    setStep("done");
    setTimeout(() => setPending(null), 60000);
  };

  if (step === "done") {
    return (
      <div className="stack gap-24" style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="card card-strong card-pad fade-up" style={{ textAlign: "center", paddingTop: 40, paddingBottom: 40 }}>
          <span style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--color-success-soft)", color: "var(--color-success)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
            <CheckCircle2 size={44} />
          </span>
          <h1 style={{ fontSize: "1.6rem" }}>Investimento confirmado!</h1>
          <p className="text-muted" style={{ marginTop: 8 }}>
            Seu aporte de <strong>{brl(total)}</strong> em <strong>{pending.company}</strong> foi registrado.
            Você receberá a confirmação por e-mail e na Central de Notificações.
          </p>
          <div className="stack gap-8" style={{ marginTop: 24, padding: 18, background: "var(--color-input)", borderRadius: "var(--radius-md)", textAlign: "left" }}>
            <Row k="Protocolo" v={protocol} />
            <Row k="Método" v={method === "pix" ? "Pix" : method === "cartao" ? "Cartão de crédito" : "TED"} />
            <Row k="Valor" v={brl(total)} />
            <Row k="Status" v="Processando" badge />
          </div>
          <div className="row gap-12" style={{ marginTop: 24, justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={() => navigate("/carteira")}>Ver na carteira</button>
            <button className="btn btn-primary" onClick={() => navigate("/ofertas")}>Investir mais</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stack gap-24">
      <button onClick={() => navigate(-1)} className="row gap-8 text-muted" style={{ fontWeight: 600, fontSize: "0.88rem" }}>
        <ArrowLeft size={18} /> Voltar
      </button>

      {/* Stepper */}
      <div className="row gap-8 fade-up" style={{ maxWidth: 420 }}>
        <StepDot n={1} active label="Método" done={step !== "method"} />
        <span className="grow" style={{ height: 2, background: "var(--color-border)" }} />
        <StepDot n={2} active={step === "confirm"} label="Confirmação" done={false} />
      </div>

      <div className="grid-2">
        <div className="stack gap-24">
          {step === "method" && (
            <div className="card card-pad fade-up">
              <h2 style={{ fontSize: "1.2rem", marginBottom: 4 }}>Forma de pagamento</h2>
              <p className="text-muted" style={{ fontSize: "0.86rem", marginBottom: 18 }}>Escolha como deseja pagar seu investimento.</p>

              <div className="stack gap-12">
                <MethodOption icon={<QrCode size={22} />} title="Pix" desc="Aprovação imediata · Recomendado" tag="Instantâneo" active={method === "pix"} onClick={() => setMethod("pix")} />
                <MethodOption icon={<CreditCard size={22} />} title="Cartão de crédito" desc="Em até 12x com juros" active={method === "cartao"} onClick={() => setMethod("cartao")} />
                <MethodOption icon={<Landmark size={22} />} title="TED / Transferência" desc="Compensação em até 1 dia útil" active={method === "ted"} onClick={() => setMethod("ted")} />
              </div>

              <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 24 }} onClick={() => setStep("confirm")}>
                Continuar
              </button>
            </div>
          )}

          {step === "confirm" && method === "pix" && (
            <div className="card card-pad fade-up">
              <h2 style={{ fontSize: "1.2rem", marginBottom: 4 }}>Pague com Pix</h2>
              <p className="text-muted" style={{ fontSize: "0.86rem", marginBottom: 18 }}>Escaneie o QR Code ou copie o código abaixo.</p>

              <div style={{ display: "grid", placeItems: "center", padding: 20, background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", margin: "0 auto 18px", width: 200 }}>
                <QrPlaceholder />
              </div>

              <div className="row gap-8" style={{ padding: 12, background: "var(--color-input)", borderRadius: "var(--radius-md)" }}>
                <code style={{ fontSize: "0.72rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{pixCode}</code>
                <button className="btn btn-ghost btn-sm" onClick={copy}>
                  {copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar</>}
                </button>
              </div>

              <div className="row gap-8" style={{ marginTop: 16, fontSize: "0.82rem", color: "var(--color-muted)" }}>
                <Clock size={15} /> O código expira em 24 horas.
              </div>

              <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} onClick={confirm}>
                Já paguei, confirmar
              </button>
            </div>
          )}

          {step === "confirm" && method === "cartao" && (
            <div className="card card-pad fade-up">
              <h2 style={{ fontSize: "1.2rem", marginBottom: 18 }}>Dados do cartão</h2>
              <div className="stack gap-16">
                <div className="field">
                  <label>Número do cartão</label>
                  <input className="input" placeholder="0000 0000 0000 0000" inputMode="numeric" />
                </div>
                <div className="field">
                  <label>Nome impresso no cartão</label>
                  <input className="input" placeholder="Como está no cartão" />
                </div>
                <div className="grid-2-even">
                  <div className="field"><label>Validade</label><input className="input" placeholder="MM/AA" /></div>
                  <div className="field"><label>CVV</label><input className="input" placeholder="123" inputMode="numeric" /></div>
                </div>
                <div className="field">
                  <label>Parcelas</label>
                  <select className="select">
                    <option>1x de {brl(total)} sem juros</option>
                    <option>6x de {brl(total / 6)}</option>
                    <option>12x de {brl(total / 12)}</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} onClick={confirm}>
                <Lock size={16} /> Pagar {brl(total)}
              </button>
            </div>
          )}

          {step === "confirm" && method === "ted" && (
            <div className="card card-pad fade-up">
              <h2 style={{ fontSize: "1.2rem", marginBottom: 18 }}>Dados para transferência</h2>
              <div className="stack gap-8" style={{ padding: 18, background: "var(--color-input)", borderRadius: "var(--radius-md)" }}>
                <Row k="Banco" v="341 · Itaú Unibanco" />
                <Row k="Agência" v="0001" />
                <Row k="Conta" v="12345-6" />
                <Row k="CNPJ" v="12.345.678/0001-90" />
                <Row k="Favorecido" v="Angel Invest S.A." />
              </div>
              <div className="row gap-8" style={{ marginTop: 16, fontSize: "0.82rem", color: "var(--color-muted)" }}>
                <Clock size={15} /> A compensação pode levar até 1 dia útil.
              </div>
              <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} onClick={confirm}>
                Já transferi, confirmar
              </button>
            </div>
          )}
        </div>

        {/* Resumo */}
        <div>
          <div className="card card-strong card-pad fade-up" style={{ position: "sticky", top: 88 }}>
            <h3 style={{ fontSize: "1.05rem", marginBottom: 16 }}>Resumo do investimento</h3>
            <div className="row gap-12" style={{ paddingBottom: 16, borderBottom: "1px solid var(--color-border)" }}>
              <span className="avatar-sq" style={{ background: "var(--gradient-brand)" }}>{pending.company.slice(0, 2).toUpperCase()}</span>
              <div>
                <div style={{ fontWeight: 700 }}>{pending.company}</div>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>Aporte único</div>
              </div>
            </div>
            <div className="stack gap-12" style={{ padding: "16px 0" }}>
              <Row k="Valor do aporte" v={brl(pending.amount)} />
              <Row k="Taxa da plataforma" v={fee === 0 ? "Grátis" : brl(fee)} />
            </div>
            <div className="row between" style={{ padding: "16px 0", borderTop: "1px solid var(--color-border)" }}>
              <strong>Total</strong>
              <strong style={{ fontSize: "1.3rem", color: "var(--color-secondary)" }}>{brl(total)}</strong>
            </div>
            <div className="row gap-8" style={{ marginTop: 8, padding: 12, background: "var(--color-success-soft)", borderRadius: "var(--radius-md)", fontSize: "0.8rem", color: "var(--color-success)" }}>
              <ShieldCheck size={16} /> Ambiente criptografado e protegido.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, badge }: { k: string; v: string; badge?: boolean }) {
  return (
    <div className="row between" style={{ fontSize: "0.88rem" }}>
      <span className="text-muted">{k}</span>
      {badge ? <span className="badge badge-accent">{v}</span> : <strong>{v}</strong>}
    </div>
  );
}

function MethodOption({ icon, title, desc, tag, active, onClick }: { icon: React.ReactNode; title: string; desc: string; tag?: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="row gap-16"
      style={{
        padding: 16, borderRadius: "var(--radius-md)", textAlign: "left",
        border: `1.5px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
        background: active ? "#42b6ba12" : "var(--color-input)", transition: "all 0.18s",
      }}
    >
      <span style={{ width: 46, height: 46, borderRadius: 12, background: active ? "var(--gradient-brand)" : "#296e8f14", color: active ? "#fff" : "var(--color-secondary)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        {icon}
      </span>
      <div className="grow">
        <div className="row gap-8">
          <strong>{title}</strong>
          {tag && <span className="badge badge-success" style={{ fontSize: "0.64rem" }}>{tag}</span>}
        </div>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>{desc}</div>
      </div>
      <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`, display: "grid", placeItems: "center" }}>
        {active && <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--color-primary)" }} />}
      </span>
    </button>
  );
}

function StepDot({ n, active, label, done }: { n: number; active: boolean; label: string; done: boolean }) {
  return (
    <div className="row gap-8">
      <span style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "0.82rem", background: done || active ? "var(--gradient-brand)" : "var(--color-input)", color: done || active ? "#fff" : "var(--color-muted)", border: "1px solid var(--color-border)" }}>
        {done ? <Check size={15} /> : n}
      </span>
      <span style={{ fontSize: "0.84rem", fontWeight: 600, color: active ? "var(--color-foreground)" : "var(--color-muted)" }}>{label}</span>
    </div>
  );
}

function QrPlaceholder() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" aria-label="QR Code Pix">
      <rect width="160" height="160" fill="#fff" />
      {Array.from({ length: 16 }).map((_, r) =>
        Array.from({ length: 16 }).map((_, c) => {
          const on = (r * 7 + c * 13 + r * c) % 3 === 0;
          return on ? <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" fill="#0e2838" /> : null;
        })
      )}
      <rect x="0" y="0" width="40" height="40" fill="#fff" stroke="#0e2838" strokeWidth="8" />
      <rect x="120" y="0" width="40" height="40" fill="#fff" stroke="#0e2838" strokeWidth="8" />
      <rect x="0" y="120" width="40" height="40" fill="#fff" stroke="#0e2838" strokeWidth="8" />
    </svg>
  );
}
