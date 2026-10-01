import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, TrendingUp, Clock, Play, Images, Star } from "lucide-react";
import type { Offer } from "../../lib/types";
import { brl, compactBrl, percent, initials } from "../../lib/format";
import "./offer.css";

const statusMap: Record<Offer["status"], { label: string; cls: string }> = {
  aberta: { label: "Aberta", cls: "badge-success" },
  encerrando: { label: "Encerrando", cls: "badge-accent" },
  captada: { label: "Captada", cls: "badge-muted" },
  em_breve: { label: "Em breve", cls: "badge-primary" },
};

export default function OfferCard({ offer }: { offer: Offer }) {
  const [fav, setFav] = useState(false);
  const pct = Math.min(100, Math.round((offer.raisedAmount / offer.targetAmount) * 100));
  const status = statusMap[offer.status];
  const photo = offer.media?.find((m) => m.type === "image");
  const hasVideo = offer.media?.some((m) => m.type === "video");

  return (
    <article className="card card-strong card-hover offer-card fade-up">
      <div
        className="offer-cover"
        style={
          photo
            ? { backgroundImage: `url(${photo.url})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: offer.cover }
        }
      >
        {photo && (
          <span style={{ position: "absolute", inset: 0, background: offer.cover, opacity: 0.5, mixBlendMode: "multiply" }} />
        )}
        <button
          className={`offer-fav ${fav ? "active" : ""}`}
          onClick={() => setFav((f) => !f)}
          aria-label="Favoritar"
        >
          <Heart size={16} fill={fav ? "#f99c00" : "none"} />
        </button>
        <div className="offer-logo" style={{ position: "relative", zIndex: 1 }}>{initials(offer.company)}</div>
        <div className="row between" style={{ position: "relative", zIndex: 1 }}>
          <span className="badge" style={{ background: "#ffffff26", color: "#fff", backdropFilter: "blur(6px)" }}>
            {offer.category}
          </span>
          {offer.media?.length > 0 && (
            <span className="badge" style={{ background: "#071423b3", color: "#fff" }}>
              {hasVideo ? <Play size={12} fill="#fff" /> : <Images size={12} />} {offer.media.length}
            </span>
          )}
        </div>
      </div>

      <div className="offer-body">
        <div className="row between gap-8">
          <span className={`badge ${status.cls}`}>{status.label}</span>
          <span className="badge badge-muted">Risco {offer.risk}</span>
        </div>

        <div>
          <div className="row between gap-8">
            <h3 className="offer-title">{offer.company}</h3>
            {offer.rating && (
              <span className="row gap-4" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#b06f00" }}>
                <Star size={13} fill="#f99c00" color="#f99c00" /> {offer.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="offer-tagline">{offer.tagline}</p>
        </div>

        <div>
          <div className="offer-progress-row">
            <span className="text-muted">{pct}% captado</span>
            <span style={{ fontWeight: 700 }}>{compactBrl(offer.raisedAmount)}</span>
          </div>
          <div className="progress">
            <span style={{ width: `${pct}%` }} />
          </div>
          <div className="row between" style={{ marginTop: 8, fontSize: "0.76rem", color: "var(--color-muted)" }}>
            <span className="row gap-4"><Users size={13} /> {offer.investors} investidores</span>
            <span className="row gap-4"><Clock size={13} /> {offer.termMonths} meses</span>
          </div>
        </div>

        <div className="offer-meta">
          <div>
            <div className="k">Rentabilidade est.</div>
            <div className="v text-success row gap-4"><TrendingUp size={15} /> {percent(offer.expectedReturn)}</div>
          </div>
          <div>
            <div className="k">Ticket mínimo</div>
            <div className="v">{brl(offer.minTicket, { maximumFractionDigits: 0 })}</div>
          </div>
        </div>

        <div className="offer-footer">
          <Link to={`/ofertas/${offer.slug}`} className="btn btn-ghost btn-sm grow">
            Ver detalhes
          </Link>
          <Link
            to={`/ofertas/${offer.slug}`}
            className={`btn btn-sm grow ${offer.status === "captada" ? "btn-outline" : "btn-primary"}`}
            style={offer.status === "captada" ? { pointerEvents: "none", opacity: 0.6 } : undefined}
          >
            {offer.status === "em_breve" ? "Tenho interesse" : offer.status === "captada" ? "Encerrada" : "Investir"}
          </Link>
        </div>
      </div>
    </article>
  );
}
