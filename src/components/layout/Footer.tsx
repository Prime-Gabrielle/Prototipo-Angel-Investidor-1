import { Link } from "react-router-dom";
import { Globe, Share2, Rss, ShieldCheck } from "lucide-react";
import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <Logo size={34} />
          <p style={{ marginTop: 14, fontSize: "0.86rem", color: "var(--color-muted)", maxWidth: 300 }}>
            A vitrine de oportunidades para investir em empresas de alto potencial.
            Diversifique com transparência e acompanhamento completo.
          </p>
          <div className="row gap-8" style={{ marginTop: 16 }}>
            <a className="icon-btn" href="#" aria-label="Site"><Globe size={18} /></a>
            <a className="icon-btn" href="#" aria-label="Redes sociais"><Share2 size={18} /></a>
            <a className="icon-btn" href="#" aria-label="Blog"><Rss size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Investir</h5>
          <Link to="/ofertas">Mercado de ofertas</Link>
          <Link to="/carteira">Minha carteira</Link>
          <Link to="/rendimentos">Informe de rendimentos</Link>
          <a href="#">Como funciona</a>
        </div>

        <div className="footer-col">
          <h5>Empresa</h5>
          <a href="#">Sobre a Angel</a>
          <Link to="/perfil?tab=emissor">Seja um emissor</Link>
          <a href="#">Blog & conteúdos</a>
          <a href="#">Central de ajuda</a>
        </div>

        <div className="footer-col">
          <h5>Legal</h5>
          <a href="#">Termos de uso</a>
          <a href="#">Política de privacidade</a>
          <a href="#">Instrução CVM 88</a>
          <a href="#">Riscos do investimento</a>
        </div>
      </div>

      <div className="footer-bottom row between wrap gap-12">
        <span>© {new Date().getFullYear()} Angel Invest. Todos os direitos reservados.</span>
        <span className="row gap-8">
          <ShieldCheck size={16} color="var(--color-success)" />
          Plataforma autorizada · Ambiente 100% seguro
        </span>
      </div>
    </footer>
  );
}
