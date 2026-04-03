import { SmilePlus, Timer, Brain, TrendingUp, Flame, Target } from "lucide-react";
import StatCard from "../Components/StateCard";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const weekData = [
  { day: "Mon", mood: 7, focus: 5 },
  { day: "Tue", mood: 6, focus: 7 },
  { day: "Wed", mood: 8, focus: 6 },
  { day: "Thu", mood: 7, focus: 8 },
  { day: "Fri", mood: 9, focus: 7 },
  { day: "Sat", mood: 8, focus: 4 },
  { day: "Sun", mood: 7, focus: 3 },
];

const quickActions = [
  { label: "Log Mood", icon: SmilePlus, path: "/mood-tracker", color: "text-violet-400" },
  { label: "Start Focus", icon: Timer, path: "/focus-timer", color: "text-emerald-400" },
  { label: "AI Chat", icon: Brain, path: "/ai-chat", color: "text-blue-400" },
  { label: "View Insights", icon: TrendingUp, path: "/insights", color: "text-amber-400" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Good afternoon 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your wellness overview for today</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={SmilePlus} label="Mood Score" value="8.2" change="+12%" changeType="positive" />
        <StatCard icon={Flame} label="Streak" value="7 days" change="+1" changeType="positive" />
        <StatCard icon={Timer} label="Focus Time" value="4.5h" change="+0.5h" changeType="positive" />
        <StatCard icon={Target} label="Goals Hit" value="3/5" change="60%" changeType="positive" />
      </motion.div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Overview</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(263 70% 58%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(263 70% 58%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160 60% 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160 60% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(220 12% 55%)", fontSize: 12 }} />
              <YAxis hide domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  background: "hsl(220 18% 8%)",
                  border: "1px solid hsl(220 16% 16%)",
                  borderRadius: "8px",
                  color: "hsl(220 20% 95%)",
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="mood" stroke="hsl(263 70% 58%)" fill="url(#moodGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="focus" stroke="hsl(160 60% 45%)" fill="url(#focusGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-1.5 rounded-full bg-primary" /> Mood
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-1.5 rounded-full bg-emerald-500" /> Focus
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <action.icon className={`w-4.5 h-4.5 ${action.color}`} />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}