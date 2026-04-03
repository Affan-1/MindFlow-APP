import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`
        fixed left-0 top-0 h-full z-40 transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>
      <div className={`
        flex-1 flex flex-col transition-all duration-300 w-full min-w-0
        md:${collapsed ? "ml-[72px]" : "ml-[240px]"}
      `}>
        <TopNavbar
          collapsed={collapsed}
          onMobileMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 mt-16 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}