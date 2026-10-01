import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  Check,
  FileText,
  Building2,
  Target,
  CalendarDays,
  Info,
  Heart,
  Share2,
  Star,
  MessageSquareText,
  Images,
} from "lucide-react";
import { offers } from "../lib/mock";
import { brl, compactBrl, percent, initials, dateBR } from "../lib/format";
import { useApp } from "../context/AppContext";
import MediaGallery from "../components/ui/MediaGallery";
import StarRating from "../components/ui/StarRating";
import OfferCard from "../components/ui/OfferCard";

const quickAmounts = [1000, 5000, 10000, 25000];
type ContentTab = "sobre" | "detalhes" | "avaliacoes";

export default function OfferDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setPending } = useApp();
  const offer = offers.find((o) => o.slug === slug);
  const [amount, setAmount] = useState(offer?.minTicket ?? 1000);
  const [fav, setFav] = useState(false);
  const [tab, setTab] = useState<ContentTab>("sobre");

  if (!offer) {
    return (
      <div className="card card-pad empty-state">
        <h3>Oferta não encontrada</h3>
        <Link to="/ofertas" className="btn btn-primary" style={{ marginTop: 16 }}>Voltar à vitrine</Link>
      </div>
    );
  }

  const pct = Math.min(100, Math.round((offer.raisedAmount / offer.targetAmount) * 100));
  const closed = offer.status === "captada";
  const estReturn = amount * (offer.expectedReturn / 100);
  const reviews = offer.reviews ?? [];
  const related = offers.filter((o) => o.id !== offer.id && o.status !== "captada").slice(0, 3);

  const invest = () => {
    setPending({ offerId: offer.id, company: offer.company, amount });
    navigate("/pagamento");
  };

  return (
    <div className="stack gap-24">
      {/* Breadcrumb */}
      <div className="row between wrap gap-12 fade-up">
        <Link to="/ofertas" className="row gap-8 text-muted" style={{ fontWeight: 600, fontSize: "0.88rem" }}>
          <ArrowLeft size={18} /> Voltar para a vitrine
        </Link>
        <div className="row gap-8 text-muted" style={{ fontSize: "0.82rem" }}>
          <Link to="/ofertas" className="text-muted">Ofertas</Link>
          <span>/</span>
          <span>{offer.category}</span>
          <span>/</span>
          <strong style={{ color: "var(--color-foreground)" }}>{offer.company}</strong>
        </div>
      </div>

      {/* Bloco principal e-commerce: galeria + compra */}
      <div className="grid-2">
        <div className="stack gap-24">
          {/* Cabeçalho do produto */}
          <div className="card card-strong card-pad fade-up">
            <div className="row between wrap gap-12" style={{ marginBottom: 14 }}>
              <div className="row gap-16">
                <span className="offer-logo" style={{ width: 56, height: 56, fontSize: "1.3rem", background: offer.cover }}>
                  {initials(offer.company)}
                </span>
                <div>
                  <div className="row gap-8 wrap">
                    <span className="badge badge-primary">{offer.category}</span>
                    <span className="badge badge-muted">{offer.sector}</span>
                  </div>
                  <h1 style={{ fontSize: "1.6rem", marginTop: 6 }}>{offer.company}</h1>
                </div>
              </div>
              <div className="row gap-8">
                <button className="icon-btn" onClick={() => setFav((f) => !f)} aria-label="Favoritar">
                  <Heart size={18} fill={fav ? "#f99c00" : "none"} color={fav ? "#f99c00" : "currentColor"} />
                </button>
                <button className="icon-btn" aria-label="Compartilhar"><Share2 size={18} /></button>
              </div>
            </div>

            {offer.rating && (
              <div className="row gap-8" style={{ marginBottom: 14 }}>
                <StarRating value={offer.rating} />
                <strong style={{ fontSize: "0.9rem" }}>{offer.rating.toFixed(1)}</strong>
                <span className="text-muted" style={{ fontSize: "0.82rem" }}>
                  ({reviews.length} avaliações · {offer.investors} investidores)
                </span>
              </div>
            )}

            <MediaGallery media={offer.media} />
          </div>

          {/* Abas de conteúdo */}
          <div className="card card-pad fade-up">
            <div className="tabs" style={{ width: "fit-content", maxWidth: "100%", marginBottom: 18 }}>
              <button className={`tab ${tab === "sobre" ? "active" : ""}`} onClick={() => setTab("sobre")}>
                <span className="row gap-8"><Building2 size={15} /> Sobre</span>
              </button>
              <button className={`tab ${tab === "detalhes" ? "active" : ""}`} onClick={() => setTab("detalhes")}>
                <span className="row gap-8"><FileText size={15} /> Detalhes</span>
              </button>
              <button className={`tab ${tab === "avaliacoes" ? "active" : ""}`} onClick={() => setTab("avaliacoes")}>
                <span className="row gap-8"><Star size={15} /> Avaliações</span>
              </button>
            </div>

            {tab === "sobre" && (
              <div className="fade-up">
                <p style={{ fontSize: "1.02rem", color: "var(--color-secondary)", fontWeight: 500, marginBottom: 14 }}>
                  {offer.tagline}
                </p>
                <p style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>{offer.description}</p>

                <h4 style={{ fontSize: "0.95rem", margin: "22px 0 12px" }}>Destaques</h4>
                <div className="stack gap-12">
                  {offer.highlights.map((h) => (
                    <div key={h} className="row gap-12">
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--color-success-soft)", color: "var(--color-success)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <Check size={14} />
                      </span>
                      <span style={{ fontSize: "0.92rem" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "detalhes" && (
              <div className="fade-up">
                <div className="grid-2-even" style={{ gap: 14 }}>
                  <InfoRow icon={<Target size={16} />} label="Meta de captação" value={brl(offer.targetAmount)} />
                  <InfoRow icon={<TrendingUp size={16} />} label="Rentabilidade estimada" value={percent(offer.expectedReturn)} success />
                  <InfoRow icon={<Clock size={16} />} label="Prazo" value={`${offer.termMonths} meses`} />
                  <InfoRow icon={<Users size={16} />} label="Investidores" value={String(offer.investors)} />
                  <InfoRow icon={<CalendarDays size={16} />} label="Encerramento" value={dateBR(offer.deadline)} />
                  <InfoRow icon={<FileText size={16} />} label="Ticket mínimo" value={brl(offer.minTicket)} />
                  <InfoRow icon={<ShieldCheck size={16} />} label="Nível de risco" value={offer.risk} />
                  <InfoRow icon={<Building2 size={16} />} label="Modalidade" value={offer.modality} />
                </div>
                <div className="row gap-8" style={{ marginTop: 20, padding: 14, background: "#42b6ba12", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--color-secondary)" }}>
                  <Info size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                  Investimentos envolvem riscos. Rentabilidade passada não garante resultados futuros. Leia o material da oferta antes de investir.
                </div>
              </div>
            )}

            {tab === "avaliacoes" && (
              <div className="fade-up">
                <div className="row gap-24 wrap" style={{ padding: 18, background: "var(--color-input)", borderRadius: "var(--radius-md)", marginBottom: 18 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.4rem", fontWeight: 900, lineHeight: 1 }}>{(offer.rating ?? 0).toFixed(1)}</div>
                    <StarRating value={offer.rating ?? 0} />
                    <div className="text-muted" style={{ fontSize: "0.78rem", marginTop: 4 }}>{reviews.length} avaliações</div>
                  </div>
                  <div className="grow stack gap-4" style={{ minWidth: 180 }}>
                    {[5, 4, 3, 2, 1].map((s) => {
                      const count = reviews.filter((r) => r.rating === s).length;
                      const p = reviews.length ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={s} className="row gap-8" style={{ fontSize: "0.78rem" }}>
                          <span className="row gap-4" style={{ width: 34 }}>{s} <Star size={11} fill="#f99c00" color="#f99c00" /></span>
                          <div className="progress grow" style={{ height: 7 }}><span style={{ width: `${p}%`, background: "#f99c00" }} /></div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="stack">
                  {reviews.map((r) => (
                    <div key={r.id} className="list-row" style={{ alignItems: "flex-start" }}>
                      <span className="avatar-sq" style={{ background: "var(--gradient-brand)" }}>{initials(r.author)}</span>
                      <div className="grow">
                        <div className="row between wrap gap-8">
                          <strong style={{ fontSize: "0.9rem" }}>{r.author}</strong>
                          <span className="text-muted" style={{ fontSize: "0.74rem" }}>{dateBR(r.date)}</span>
                        </div>
                        <StarRating value={r.rating} size={13} />
                        <p style={{ fontSize: "0.86rem", color: "var(--color-muted)", marginTop: 6, lineHeight: 1.5 }}>{r.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-ghost btn-block" style={{ marginTop: 16 }}>
                  <MessageSquareText size={16} /> Escrever avaliação
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar sticky de investimento */}
        <div>
          <div className="card card-strong card-pad fade-up" style={{ position: "sticky", top: 88 }}>
            <div className="row between" style={{ marginBottom: 6 }}>
              <span className="text-muted" style={{ fontSize: "0.82rem" }}>{pct}% captado</span>
              <strong style={{ fontSize: "0.9rem" }}>{compactBrl(offer.raisedAmount)} / {compactBrl(offer.targetAmount)}</strong>
            </div>
            <div className="progress"><span style={{ width: `${pct}%` }} /></div>
            <div className="row between" style={{ marginTop: 10, fontSize: "0.78rem", color: "var(--color-muted)" }}>
              <span className="row gap-4"><Users size={14} /> {offer.investors} investidores</span>
              <span className="row gap-4"><Clock size={14} /> Encerra {dateBR(offer.deadline)}</span>
            </div>

            <hr className="divider" />

            {closed ? (
              <div className="empty-state" style={{ padding: "24px 0" }}>
                <ShieldCheck size={34} style={{ margin: "0 auto 10px", color: "var(--color-success)" }} />
                <strong>Rodada 100% captada</strong>
                <p style={{ fontSize: "0.84rem" }}>Esta oferta foi encerrada com sucesso.</p>
              </div>
            ) : (
              <>
                <div className="field">
                  <label>Quanto deseja investir?</label>
                  <div className="input row" style={{ padding: "4px 14px", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "var(--color-muted)" }}>R$</span>
                    <input
                      type="number"
                      min={offer.minTicket}
                      step={100}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      style={{ border: "none", background: "none", outline: "none", fontSize: "1.1rem", fontWeight: 700, width: "100%", padding: "8px 4px" }}
                    />
                  </div>
                  <span className="field-hint">Mínimo {brl(offer.minTicket)}</span>
                </div>

                <div className="row gap-8 wrap" style={{ margin: "12px 0" }}>
                  {quickAmounts.map((q) => (
                    <button key={q} className="chip-filter" onClick={() => setAmount(q)} style={{ fontSize: "0.78rem", padding: "6px 12px" }}>
                      {compactBrl(q)}
                    </button>
                  ))}
                </div>

                <div className="stack gap-8" style={{ padding: 14, background: "var(--color-input)", borderRadius: "var(--radius-md)", margin: "8px 0 16px" }}>
                  <div className="row between" style={{ fontSize: "0.85rem" }}>
                    <span className="text-muted">Retorno estimado ({offer.termMonths}m)</span>
                    <strong className="text-success">+{brl(estReturn)}</strong>
                  </div>
                  <div className="row between" style={{ fontSize: "0.85rem" }}>
                    <span className="text-muted">Total projetado</span>
                    <strong>{brl(amount + estReturn)}</strong>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-block btn-lg"
                  onClick={invest}
                  disabled={amount < offer.minTicket}
                >
                  {offer.status === "em_breve" ? "Reservar interesse" : "Investir agora"}
                </button>
                <p className="text-muted row gap-4" style={{ justifyContent: "center", marginTop: 12, fontSize: "0.76rem" }}>
                  <ShieldCheck size={14} color="var(--color-success)" /> Pagamento seguro via Pix
                </p>
              </>
            )}

            <hr className="divider" />
            <div className="row gap-8 text-muted" style={{ fontSize: "0.78rem", justifyContent: "center" }}>
              <Images size={14} /> {offer.media.length} mídias · Fotos e vídeo
            </div>
          </div>
        </div>
      </div>

      {!closed && (
        <div className="mobile-invest-bar">
          <div>
            <span>Investir em {offer.company}</span>
            <strong>{brl(amount)}</strong>
          </div>
          <button className="btn btn-primary" onClick={invest} disabled={amount < offer.minTicket}>
            Investir
          </button>
        </div>
      )}

      {/* Ofertas relacionadas (e-commerce) */}
      {related.length > 0 && (
        <section className="stack gap-16">
          <div className="row between wrap gap-12">
            <div>
              <div className="eyebrow">Você também pode gostar</div>
              <h2 className="section-title">Ofertas relacionadas</h2>
            </div>
            <Link to="/ofertas" className="btn btn-outline">Ver todas</Link>
          </div>
          <div className="offers-grid">
            {related.map((o) => (
              <OfferCard key={o.id} offer={o} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value, success }: { icon: React.ReactNode; label: string; value: string; success?: boolean }) {
  return (
    <div className="row gap-12" style={{ padding: "10px 0", borderBottom: "1px solid var(--color-border)" }}>
      <span style={{ color: "var(--color-secondary)" }}>{icon}</span>
      <span className="grow text-muted" style={{ fontSize: "0.84rem" }}>{label}</span>
      <strong style={{ fontSize: "0.9rem", color: success ? "var(--color-success)" : "inherit" }}>{value}</strong>
    </div>
  );
}
