import { motion } from "framer-motion";
import { TrendingUp, Brain, Heart, Zap } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const moodTrend = [
  { date: "Mar 25", score: 6 },
  { date: "Mar 26", score: 7 },
  { date: "Mar 27", score: 5 },
  { date: "Mar 28", score: 8 },
  { date: "Mar 29", score: 7 },
  { date: "Mar 30", score: 9 },
  { date: "Mar 31", score: 8 },
  { date: "Apr 1",  score: 8 },
  { date: "Apr 2",  score: 7 },
];

const focusData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 4 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 4.5 },
  { day: "Sat", hours: 2 },
  { day: "Sun", hours: 1 },
];

const moodDistribution = [
  { name: "Great", value: 35, color: "hsl(263 70% 58%)" },
  { name: "Good",  value: 40, color: "hsl(270 60% 68%)" },
  { name: "Okay",  value: 15, color: "hsl(220 12% 55%)" },
  { name: "Bad",   value: 10, color: "hsl(0 72% 51%)" },
];

const tooltipStyle = {
  background: "hsl(220 18% 8%)",
  border: "1px solid hsl(220 16% 16%)",
  borderRadius: "8px",
  color: "hsl(220 20% 95%)",
  fontSize: 12,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const insights = [
  {
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    title: "Improving Trend",
    text: "Your mood has improved 18% over the past week. Keep it up!",
  },
  {
    icon: Brain,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Peak Focus",
    text: "You're most productive on Thursdays between 10am–12pm.",
  },
  {
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    title: "Self-care",
    text: "Days with meditation show 30% higher mood scores.",
  },
  {
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    title: "Energy Pattern",
    text: "Your energy peaks mid-week. Schedule tough tasks for Wed–Thu.",
  },
];

export default function Insights() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto space-y-5 sm:space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Insights</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          AI-powered analysis of your wellness data
        </p>
      </motion.div>

      {/* AI Insight Cards — 1 col on mobile, 2 on sm, 4 on lg */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {insights.map((ins) => (
          <div
            key={ins.title}
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg ${ins.bg} flex items-center justify-center mb-3`}>
              <ins.icon className={`w-4 h-4 ${ins.color}`} />
            </div>
            <h4 className="text-sm font-semibold text-foreground leading-tight">{ins.title}</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{ins.text}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Mood Trend */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-4">
            Mood Trend (Last 9 Days)
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={moodTrend}>
              <defs>
                <linearGradient id="moodGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsl(263 70% 58%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(263 70% 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(220 12% 55%)", fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis hide domain={[0, 10]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(263 70% 58%)"
                fill="url(#moodGrad2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Focus Hours */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-4">
            Focus Hours This Week
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={focusData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(220 12% 55%)", fontSize: 10 }}
              />
              <YAxis hide />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hours" fill="hsl(263 70% 58%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Mood Distribution */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-4">
          Mood Distribution
        </h3>

        {/* Stack on mobile, side-by-side on sm+ */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          {/* Pie */}
          <div className="w-full max-w-[180px] flex-shrink-0">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend — 2 col grid on mobile, flex wrap on sm */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-col sm:gap-3">
            {moodDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: entry.color }}
                />
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                  {entry.name}{" "}
                  <span className="text-foreground font-semibold">{entry.value}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Safe area spacer */}
      <div className="h-4 sm:h-0" />
    </motion.div>
  );
}
