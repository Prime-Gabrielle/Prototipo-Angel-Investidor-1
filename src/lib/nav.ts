import {
  LayoutDashboard,
  Store,
  Wallet,
  Bell,
  UserRound,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Visão Geral", icon: LayoutDashboard, end: true },
  { to: "/ofertas", label: "Mercado de Ofertas", icon: Store },
  { to: "/carteira", label: "Carteira", icon: Wallet },
  { to: "/rendimentos", label: "Informe de Rendimentos", icon: FileBarChart },
  { to: "/notificacoes", label: "Notificações", icon: Bell },
  { to: "/perfil", label: "Perfil & Conta", icon: UserRound },
];
