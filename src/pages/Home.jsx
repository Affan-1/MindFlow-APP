import { Link } from "react-router-dom";
import { Brain, Sparkles, Timer, SmilePlus, BarChart3, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    icon: SmilePlus,
    title: "Mood Tracking",
    description: "Log and visualize your emotional patterns over time",
    path: "/mood-tracker",
    gradient: "from-violet-500/20 to-purple-600/20",
  },
  {
    icon: MessageCircle,
    title: "AI Therapy Chat",
    description: "Talk with an empathetic AI companion anytime",
    path: "/ai-chat",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Timer,
    title: "Focus Timer",
    description: "Boost productivity with Pomodoro-style sessions",
    path: "/focus-timer",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: BarChart3,
    title: "Wellness Insights",
    description: "AI-powered analytics on your mental health trends",
    path: "/insights",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 lg:py-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          AI-Powered Wellness
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Your Mind,{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Reimagined
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          MindFlow combines AI therapy, mood tracking, focus tools, and deep insights
          to help you achieve peak mental wellness and productivity.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/25">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/ai-chat">
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-semibold px-6">
              Try AI Chat
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={item}>
            <Link to={feature.path}>
              <div className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}