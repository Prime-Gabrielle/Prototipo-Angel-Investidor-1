import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="news-band">
      <div className="news-inner">
        <span className="badge" style={{ background: "#ffffff1f", color: "#fff" }}>
          <Mail size={14} /> Newsletter Angel
        </span>
        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", marginTop: 14, maxWidth: 560 }}>
          Receba as melhores oportunidades antes de todo mundo
        </h2>
        <p style={{ opacity: 0.85, marginTop: 8, maxWidth: 520 }}>
          Novas ofertas, análises de mercado e conteúdos exclusivos direto no seu e-mail. Sem spam.
        </p>

        {done ? (
          <div className="row gap-8" style={{ marginTop: 20, fontWeight: 600 }}>
            <span
              style={{
                width: 34, height: 34, borderRadius: "50%", background: "var(--color-success)",
                display: "grid", placeItems: "center",
              }}
            >
              <Check size={18} />
            </span>
            Inscrição confirmada! Fique de olho no seu e-mail.
          </div>
        ) : (
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Seu e-mail"
            />
            <button className="btn btn-accent" type="submit">
              Quero receber
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
