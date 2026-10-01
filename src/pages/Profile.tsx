import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  UserRound,
  Building2,
  KeyRound,
  ShieldCheck,
  Check,
  Camera,
  FileBarChart,
  BadgeCheck,
  Eye,
  EyeOff,
  Smartphone,
} from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import MediaUploader from "../components/ui/MediaUploader";
import { user } from "../lib/mock";
import { initials, dateBR } from "../lib/format";

type Tab = "investidor" | "emissor" | "seguranca";

const tabs: { key: Tab; label: string; icon: typeof UserRound }[] = [
  { key: "investidor", label: "Investidor", icon: UserRound },
  { key: "emissor", label: "Emissor (PJ)", icon: Building2 },
  { key: "seguranca", label: "Segurança", icon: KeyRound },
];

export default function Profile() {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("tab") as Tab) || "investidor";
  const [tab, setTab] = useState<Tab>(["investidor", "emissor", "seguranca"].includes(initial) ? initial : "investidor");

  const change = (t: Tab) => {
    setTab(t);
    setParams({ tab: t });
  };

  return (
    <div className="stack gap-24">
      <PageHeader eyebrow="Perfil & Conta" title="Meu Perfil" subtitle="Gerencie seus dados cadastrais, perfil de emissor e a segurança da sua conta." />

      {/* Cartão de perfil */}
      <div className="card card-strong card-pad fade-up row between wrap gap-16">
        <div className="row gap-16">
          <div style={{ position: "relative" }}>
            <span className="avatar" style={{ width: 76, height: 76, fontSize: "1.5rem", background: `linear-gradient(135deg, ${user.avatarColor}, #42b6ba)` }}>
              {initials(user.name)}
            </span>
            <button className="icon-btn" style={{ position: "absolute", bottom: -4, right: -4, width: 32, height: 32 }} aria-label="Trocar foto">
              <Camera size={15} />
            </button>
          </div>
          <div>
            <div className="row gap-8">
              <h2 style={{ fontSize: "1.3rem" }}>{user.name}</h2>
              <span className="badge badge-success"><BadgeCheck size={13} /> Verificado</span>
            </div>
            <div className="text-muted" style={{ fontSize: "0.88rem" }}>{user.email}</div>
            <div className="row gap-8 wrap" style={{ marginTop: 8 }}>
              <span className="badge badge-primary">{user.type}</span>
              <span className="badge badge-muted">Membro desde {dateBR(user.memberSince)}</span>
            </div>
          </div>
        </div>
        <Link to="/rendimentos" className="btn btn-outline">
          <FileBarChart size={18} /> Informe de rendimentos
        </Link>
      </div>

      {/* Tabs */}
      <div className="tabs fade-up" style={{ width: "fit-content", maxWidth: "100%" }}>
        {tabs.map((t) => (
          <button key={t.key} className={`tab ${tab === t.key ? "active" : ""}`} onClick={() => change(t.key)}>
            <span className="row gap-8"><t.icon size={15} /> {t.label}</span>
          </button>
        ))}
      </div>

      {tab === "investidor" && <InvestorForm />}
      {tab === "emissor" && <IssuerForm />}
      {tab === "seguranca" && <SecurityForm />}
    </div>
  );
}

function SavedToast({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="badge badge-success" style={{ padding: "8px 14px" }}>
      <Check size={14} /> Alterações salvas com sucesso
    </div>
  );
}

function InvestorForm() {
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="card card-pad fade-up stack gap-24"
      onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
    >
      <FormSection title="Dados pessoais" desc="Informações do investidor pessoa física.">
        <div className="grid-2-even">
          <Field label="Nome completo" defaultValue="Marina Alves" />
          <Field label="CPF" defaultValue="123.456.789-00" />
          <Field label="Data de nascimento" type="date" defaultValue="1990-05-14" />
          <Field label="Telefone" defaultValue="(11) 98888-7777" />
          <Field label="E-mail" type="email" defaultValue="marina.alves@email.com" />
          <Field label="Profissão" defaultValue="Engenheira de software" />
        </div>
      </FormSection>

      <hr className="divider" />

      <FormSection title="Endereço" desc="Endereço residencial para correspondência.">
        <div className="grid-2-even">
          <Field label="CEP" defaultValue="01310-100" />
          <Field label="Logradouro" defaultValue="Av. Paulista, 1000" />
          <Field label="Bairro" defaultValue="Bela Vista" />
          <Field label="Cidade" defaultValue="São Paulo" />
          <Field label="Estado" defaultValue="SP" />
          <Field label="Complemento" defaultValue="Apto 52" />
        </div>
      </FormSection>

      <hr className="divider" />

      <FormSection title="Perfil de investidor" desc="Declarações exigidas pela regulação.">
        <div className="grid-2-even">
          <SelectField label="Perfil de risco" options={["Conservador", "Moderado", "Arrojado"]} defaultValue="Moderado" />
          <SelectField label="Renda mensal" options={["Até R$ 5 mil", "R$ 5 mil a R$ 20 mil", "Acima de R$ 20 mil"]} defaultValue="R$ 5 mil a R$ 20 mil" />
        </div>
        <label className="row gap-12" style={{ marginTop: 8, fontSize: "0.86rem", cursor: "pointer" }}>
          <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: "var(--color-primary)" }} />
          Declaro que li e concordo com os termos de risco de investimento (CVM 88).
        </label>
      </FormSection>

      <div className="row gap-12 between wrap">
        <SavedToast show={saved} />
        <button type="submit" className="btn btn-primary" style={{ marginLeft: "auto" }}>Salvar alterações</button>
      </div>
    </form>
  );
}

function IssuerForm() {
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState(false);
  const [mediaCount, setMediaCount] = useState(0);

  if (!active) {
    return (
      <div className="card card-pad fade-up empty-state">
        <span style={{ width: 68, height: 68, borderRadius: "50%", background: "#42b6ba1f", color: "var(--color-primary-strong)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
          <Building2 size={32} />
        </span>
        <h3 style={{ fontSize: "1.2rem" }}>Torne-se um Emissor</h3>
        <p style={{ maxWidth: 460, margin: "8px auto 0" }}>
          Cadastre sua empresa (pessoa jurídica) para captar recursos na nossa vitrine e acessar milhares de investidores qualificados.
        </p>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setActive(true)}>
          Iniciar cadastro de emissor
        </button>
      </div>
    );
  }

  return (
    <form
      className="card card-pad fade-up stack gap-24"
      onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
    >
      <FormSection title="Dados da empresa" desc="Informações cadastrais da pessoa jurídica.">
        <div className="grid-2-even">
          <Field label="Razão social" placeholder="Nome empresarial" />
          <Field label="Nome fantasia" placeholder="Como a empresa é conhecida" />
          <Field label="CNPJ" placeholder="00.000.000/0001-00" />
          <Field label="Inscrição estadual" placeholder="Opcional" />
          <SelectField label="Setor de atuação" options={["Tecnologia", "Saúde", "Energia", "Logística", "Alimentos", "Outro"]} />
          <SelectField label="Faturamento anual" options={["Até R$ 500 mil", "R$ 500 mil a R$ 5 mi", "Acima de R$ 5 mi"]} />
        </div>
      </FormSection>

      <hr className="divider" />

      <FormSection title="Representante legal" desc="Responsável pela empresa na plataforma.">
        <div className="grid-2-even">
          <Field label="Nome do representante" placeholder="Nome completo" />
          <Field label="CPF do representante" placeholder="000.000.000-00" />
          <Field label="Cargo" placeholder="Ex: CEO, Sócio-diretor" />
          <Field label="E-mail corporativo" type="email" placeholder="contato@empresa.com" />
        </div>
      </FormSection>

      <hr className="divider" />

      <FormSection title="Sobre o negócio" desc="Ajude os investidores a conhecerem sua empresa.">
        <div className="field">
          <label>Descrição da empresa</label>
          <textarea className="textarea" placeholder="Conte sobre o produto, tração e diferenciais..." />
        </div>
      </FormSection>

      <hr className="divider" />

      <FormSection title="Fotos e vídeos da empresa" desc="Adicione imagens do produto, equipe e instalações e um vídeo de apresentação. Essas mídias aparecem na vitrine da sua oferta.">
        <MediaUploader onChange={(items) => setMediaCount(items.length)} />
        {mediaCount > 0 && (
          <div className="badge badge-success" style={{ marginTop: 12 }}>
            <Check size={13} /> {mediaCount} mídia(s) pronta(s) para publicação
          </div>
        )}
      </FormSection>

      <div className="row gap-12 between wrap">
        <SavedToast show={saved} />
        <button type="submit" className="btn btn-primary" style={{ marginLeft: "auto" }}>Enviar para análise</button>
      </div>
    </form>
  );
}

function SecurityForm() {
  const [saved, setSaved] = useState(false);
  const [show, setShow] = useState(false);
  const [twoFa, setTwoFa] = useState(true);

  return (
    <div className="stack gap-24">
      <form
        className="card card-pad fade-up stack gap-16"
        style={{ maxWidth: 520 }}
        onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
      >
        <div className="row gap-12">
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "#42b6ba1f", color: "var(--color-primary-strong)", display: "grid", placeItems: "center" }}>
            <KeyRound size={20} />
          </span>
          <div>
            <h3 style={{ fontSize: "1.1rem" }}>Trocar senha</h3>
            <span className="text-muted" style={{ fontSize: "0.84rem" }}>Use uma senha forte e única.</span>
          </div>
        </div>

        <div className="field">
          <label>Senha atual</label>
          <div className="input row" style={{ padding: "0 14px" }}>
            <input type={show ? "text" : "password"} placeholder="••••••••" style={{ border: "none", background: "none", outline: "none", flex: 1, padding: "12px 0" }} />
            <button type="button" onClick={() => setShow((s) => !s)} style={{ color: "var(--color-muted)" }}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
        </div>
        <Field label="Nova senha" type="password" placeholder="Mínimo 8 caracteres" />
        <Field label="Confirmar nova senha" type="password" placeholder="Repita a nova senha" />

        <div className="row gap-8" style={{ padding: 12, background: "var(--color-input)", borderRadius: "var(--radius-md)", fontSize: "0.8rem", color: "var(--color-muted)" }}>
          <ShieldCheck size={16} color="var(--color-success)" /> Sua senha é criptografada e nunca compartilhada.
        </div>

        <div className="row gap-12 between wrap">
          <SavedToast show={saved} />
          <button type="submit" className="btn btn-primary" style={{ marginLeft: "auto" }}>Atualizar senha</button>
        </div>
      </form>

      <div className="card card-pad fade-up row between wrap gap-16" style={{ maxWidth: 520 }}>
        <div className="row gap-12">
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "#f99c001f", color: "#b06f00", display: "grid", placeItems: "center" }}>
            <Smartphone size={20} />
          </span>
          <div>
            <strong>Autenticação em dois fatores</strong>
            <div className="text-muted" style={{ fontSize: "0.82rem" }}>Camada extra de proteção via app.</div>
          </div>
        </div>
        <button
          onClick={() => setTwoFa((t) => !t)}
          style={{ width: 52, height: 30, borderRadius: 999, background: twoFa ? "var(--color-success)" : "var(--color-border)", position: "relative", transition: "background 0.2s" }}
          aria-label="Alternar 2FA"
        >
          <span style={{ position: "absolute", top: 3, left: twoFa ? 25 : 3, width: 24, height: 24, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "var(--shadow-sm)" }} />
        </button>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function FormSection({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: "1.05rem" }}>{title}</h3>
      <p className="text-muted" style={{ fontSize: "0.84rem", marginBottom: 16 }}>{desc}</p>
      {children}
    </div>
  );
}

function Field({ label, type = "text", defaultValue, placeholder }: { label: string; type?: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className="input" type={type} defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  );
}

function SelectField({ label, options, defaultValue }: { label: string; options: string[]; defaultValue?: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select className="select" defaultValue={defaultValue}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
