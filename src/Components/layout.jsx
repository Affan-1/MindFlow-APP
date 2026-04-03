import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      {/*
        CRITICAL FIX: Use <Outlet /> not {children}.
        React Router nested routes render via Outlet when Layout is used as
        <Route element={<Layout />}>. Using children = blank screen always.
      */}
      <main
        className={`
          min-h-screen
          pt-16 px-4 pb-6
          lg:pt-8 lg:px-8 lg:pb-8
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
