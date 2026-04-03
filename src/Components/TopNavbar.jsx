import { Menu } from "lucide-react";
import MindFlowLogo from "./MindFlowLogo";

export default function TopNavbar({ collapsed, onMobileMenuClick }) {
  return (
    <header className="fixed top-0 right-0 left-0 h-16 z-20 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 gap-3 md:left-auto">
      <button
        onClick={onMobileMenuClick}
        className="md:hidden p-2 rounded-lg hover:bg-secondary"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="md:hidden">
        <MindFlowLogo collapsed={false} />
      </div>
      <div className="flex-1" />
    </header>
  );
}