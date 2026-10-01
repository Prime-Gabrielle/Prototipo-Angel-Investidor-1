import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, TrendingUp, Flame, ShieldCheck } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import OfferCard from "../components/ui/OfferCard";
import Newsletter from "../components/Newsletter";
import { offers } from "../lib/mock";
import { compactBrl } from "../lib/format";

const categories = ["Todas", "AgTech", "HealthTech", "CleanTech", "LogTech", "FoodTech", "MobilityTech"];
const sortOptions = [
  { key: "populares", label: "Mais populares" },
  { key: "rentabilidade", label: "Maior rentabilidade" },
  { key: "prazo", label: "Menor prazo" },
  { key: "ticket", label: "Menor ticket" },
];

export default function Marketplace() {
  const [cat, setCat] = useState("Todas");
  const [sort, setSort] = useState("populares");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = offers.filter((o) => {
      const matchCat = cat === "Todas" || o.category === cat;
      const matchQuery =
        !query ||
        o.company.toLowerCase().includes(query.toLowerCase()) ||
        o.tagline.toLowerCase().includes(query.toLowerCase()) ||
        o.sector.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rentabilidade") return b.expectedReturn - a.expectedReturn;
      if (sort === "prazo") return a.termMonths - b.termMonths;
      if (sort === "ticket") return a.minTicket - b.minTicket;
      return b.investors - a.investors;
    });
    return list;
  }, [cat, sort, query]);

  const totalRaised = offers.reduce((s, o) => s + o.raisedAmount, 0);
  const totalInvestors = offers.reduce((s, o) => s + o.investors, 0);

  return (
    <div className="stack gap-24">
      <PageHeader
        eyebrow="Mercado & Vitrine"
        title="Vitrine de Ofertas"
        subtitle="Explore empresas selecionadas e invista a partir de R$ 500. Diversifique seu portfólio com oportunidades de alto potencial."
      />

      {/* Banner de destaque */}
      <section className="hero fade-up" style={{ padding: "clamp(20px, 3vw, 30px)" }}>
        <div className="hero-inner row between wrap gap-24">
          <div className="row gap-24 wrap">
            <Stat icon={<Flame size={20} />} label="Ofertas ativas" value={String(offers.filter((o) => o.status !== "captada").length)} />
            <Stat icon={<TrendingUp size={20} />} label="Total captado" value={compactBrl(totalRaised)} />
            <Stat icon={<ShieldCheck size={20} />} label="Investidores" value={totalInvestors.toLocaleString("pt-BR")} />
          </div>
          <span className="badge" style={{ background: "#4ade8033", color: "#4ade80", padding: "8px 14px" }}>
            <ShieldCheck size={15} /> Ofertas reguladas · CVM 88
          </span>
        </div>
      </section>

      {/* Barra de filtros */}
      <div className="card card-pad fade-up stack gap-16">
        <div className="row between wrap gap-16">
          <div className="header-search" style={{ maxWidth: 420, flex: 1, minWidth: 220 }}>
            <Search size={18} color="var(--color-muted)" />
            <input placeholder="Buscar empresa ou setor..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="field" style={{ minWidth: 200 }}>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar">
              {sortOptions.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row gap-12 between wrap">
          <div className="filter-scroll">
            {categories.map((c) => (
              <button key={c} className={`chip-filter ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <span className="text-muted row gap-8" style={{ fontSize: "0.84rem" }}>
            <SlidersHorizontal size={15} /> {filtered.length} oferta(s)
          </span>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="offers-grid">
          {filtered.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      ) : (
        <div className="card card-pad empty-state">
          <Search size={40} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
          <h3>Nenhuma oferta encontrada</h3>
          <p>Tente ajustar os filtros ou buscar por outro termo.</p>
        </div>
      )}

      <Newsletter />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="row gap-12">
      <span style={{ width: 44, height: 44, borderRadius: 12, background: "#ffffff1f", display: "grid", placeItems: "center", color: "#fff" }}>
        {icon}
      </span>
      <div>
        <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>{value}</div>
        <div style={{ fontSize: "0.78rem", color: "#ffffffcc" }}>{label}</div>
      </div>
    </div>
  );
}
