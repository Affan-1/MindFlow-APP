import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, change, changeType = "positive" }) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {change && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                changeType === "positive"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {change}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}