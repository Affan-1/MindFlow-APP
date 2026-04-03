import { Brain } from "lucide-react";

export default function MindFlowLogo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
        <Brain className="w-5 h-5 text-white" />
        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-foreground leading-none">
            Mind<span className="text-primary">Flow</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
            Wellness AI
          </span>
        </div>
      )}
    </div>
  );
}