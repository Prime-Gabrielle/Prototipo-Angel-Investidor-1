import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomBar from "./MobileBottomBar";
import FloatingWidgets from "../floating/FloatingWidgets";
import "./layout.css";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Header onMenu={() => setSidebarOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
        <Footer />
      </div>

      <MobileBottomBar />
      <FloatingWidgets />
    </div>
  );
}
