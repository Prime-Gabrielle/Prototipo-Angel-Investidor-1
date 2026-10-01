import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  UserRound,
  KeyRound,
  Wallet,
  LogOut,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useApp } from "../../context/AppContext";
import { user } from "../../lib/mock";
import { initials } from "../../lib/format";

interface Props {
  onMenu: () => void;
}

export default function Header({ onMenu }: Props) {
  const { theme, toggle } = useTheme();
  const { unreadCount } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="header">
      <button className="icon-btn mobile-toggle" onClick={onMenu} aria-label="Abrir menu">
        <Menu size={20} />
      </button>

      <form
        className="header-search"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/ofertas");
        }}
      >
        <Search size={18} />
        <input placeholder="Buscar ofertas, setores, empresas..." aria-label="Buscar" />
      </form>

      <div className="grow" />

      <button className="icon-btn" onClick={toggle} aria-label="Alternar tema">
        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      </button>

      <button
        className="icon-btn"
        onClick={() => navigate("/notificacoes")}
        aria-label="Notificações"
      >
        <Bell size={19} />
        {unreadCount > 0 && <span className="icon-dot" />}
      </button>

      <div style={{ position: "relative" }} ref={ref}>
        <button className="user-menu" onClick={() => setMenuOpen((o) => !o)}>
          <span className="avatar" style={{ background: `linear-gradient(135deg, ${user.avatarColor}, #42b6ba)` }}>
            {initials(user.name)}
          </span>
          <span className="user-menu-info stack">
            <span className="user-menu-name">{user.name.split(" ")[0]}</span>
            <span className="user-menu-role">{user.type}</span>
          </span>
          <ChevronDown size={16} className="user-menu-info" color="var(--color-muted)" />
        </button>

        {menuOpen && (
          <div className="dropdown">
            <div style={{ padding: "10px 12px 6px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>{user.name}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>{user.email}</div>
            </div>
            <hr className="divider" style={{ margin: "6px 0" }} />
            <button className="dropdown-item" onClick={() => go("/perfil")}>
              <UserRound size={18} /> Meu perfil
            </button>
            <button className="dropdown-item" onClick={() => go("/carteira")}>
              <Wallet size={18} /> Minha carteira
            </button>
            <button className="dropdown-item" onClick={() => go("/perfil?tab=seguranca")}>
              <KeyRound size={18} /> Trocar senha
            </button>
            <hr className="divider" style={{ margin: "6px 0" }} />
            <button className="dropdown-item danger" onClick={() => go("/")}>
              <LogOut size={18} /> Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
