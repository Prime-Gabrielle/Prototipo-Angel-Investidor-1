import { NavLink } from "react-router-dom";
import { LayoutDashboard, Store, Wallet, Bell, UserRound } from "lucide-react";
import { useApp } from "../../context/AppContext";

const items = [
  { to: "/", label: "Início", icon: LayoutDashboard, end: true },
  { to: "/ofertas", label: "Ofertas", icon: Store },
  { to: "/carteira", label: "Carteira", icon: Wallet },
  { to: "/notificacoes", label: "Alertas", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: UserRound },
];

export default function MobileBottomBar() {
  const { unreadCount } = useApp();
  return (
    <nav className="mobile-bottombar">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} end={it.end} className={({ isActive }) => (isActive ? "active" : "")}>
          <div style={{ position: "relative" }}>
            <it.icon size={21} />
            {it.to === "/notificacoes" && unreadCount > 0 && (
              <span
                style={{
                  position: "absolute", top: -4, right: -6, width: 8, height: 8,
                  borderRadius: "50%", background: "var(--color-accent)",
                }}
              />
            )}
          </div>
          {it.label}
        </NavLink>
      ))}
    </nav>
  );
}
