import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { notifications as seedNotifications } from "../lib/mock";
import type { Notification } from "../lib/types";

interface PendingInvestment {
  offerId: string;
  company: string;
  amount: number;
}

interface AppCtx {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  pending: PendingInvestment | null;
  setPending: (p: PendingInvestment | null) => void;
}

const Ctx = createContext<AppCtx | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);
  const [pending, setPending] = useState<PendingInvestment | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <Ctx.Provider
      value={{ notifications, unreadCount, markAllRead, markRead, pending, setPending }}
    >
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}
