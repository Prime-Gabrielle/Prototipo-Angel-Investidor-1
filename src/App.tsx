import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import OfferDetail from "./pages/OfferDetail";
import Payment from "./pages/Payment";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Earnings from "./pages/Earnings";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="ofertas" element={<Marketplace />} />
        <Route path="ofertas/:slug" element={<OfferDetail />} />
        <Route path="pagamento" element={<Payment />} />
        <Route path="carteira" element={<Wallet />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="rendimentos" element={<Earnings />} />
        <Route path="notificacoes" element={<Notifications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
