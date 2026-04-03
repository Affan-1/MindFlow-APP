import { useState } from "react";
import Sidebar from "./Sidebar"; 

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

  
      <main
        className={`
          pt-16 px-4
          lg:pt-0 lg:px-6
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:ml-[72px]" : "lg:ml-[240px]"}
        `}
      >
        {children}
      </main>
    </div>
  );
}