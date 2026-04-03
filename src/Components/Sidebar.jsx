import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  SmilePlus,
  MessageCircle,
  Timer,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import MindFlowLogo from "./MindFlowLogo";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Mood Tracker", icon: SmilePlus, path: "/mood-tracker" },
  { label: "AI Chat", icon: MessageCircle, path: "/ai-chat" },
  { label: "Focus Timer", icon: Timer, path: "/focus-timer" },
  { label: "Insights", icon: BarChart3, path: "/insights" },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const NavContent = ({ isMobile = false }) => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border flex-shrink-0">
        <MindFlowLogo collapsed={!isMobile && collapsed} />
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
              )}
              <item.icon
                className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")}
              />
              {/* On desktop respect collapsed; on mobile always show label */}
              {(isMobile || !collapsed) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border flex-shrink-0">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {(isMobile || !collapsed) && <span>Settings</span>}
        </Link>

        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 w-full mt-1"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 flex-shrink-0" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* ── MOBILE HAMBURGER BUTTON ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar border border-border text-sidebar-foreground shadow-md"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full z-50 flex flex-col border-r border-border bg-sidebar w-[240px] transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent isMobile={true} />
      </aside>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 h-full z-40 flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-[240px]"
        )}
      >
        <NavContent isMobile={false} />
      </aside>
    </>
  );
}
