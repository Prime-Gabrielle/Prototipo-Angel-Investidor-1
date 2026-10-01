import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Logo from "../Logo";
import { navItems } from "../../lib/nav";
import { useApp } from "../../context/AppContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const { unreadCount } = useApp();

  return (
    <>
      <div className={`sidebar-backdrop ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <Logo size={38} />
        </div>

        <span className="nav-group-label">Menu</span>
        <nav className="stack gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
              {item.to === "/notificacoes" && unreadCount > 0 && (
                <span className="nav-badge">{unreadCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-cta">
          <div className="row gap-8" style={{ marginBottom: 8 }}>
            <Sparkles size={18} color="var(--color-accent)" />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", opacity: 0.85 }}>
              DESTAQUE
            </span>
          </div>
          <h4>Torne-se um Emissor</h4>
          <p>Capte recursos para sua empresa em uma vitrine com milhares de investidores.</p>
          <NavLink to="/perfil?tab=emissor" className="btn btn-accent btn-sm btn-block" onClick={onClose}>
            Quero captar
          </NavLink>
        </div>
      </aside>
    </>
  );
}
