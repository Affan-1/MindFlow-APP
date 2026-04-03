import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MODES = [
  { label: "Focus", duration: 25 * 60, icon: Brain, color: "primary" },
  { label: "Short Break", duration: 5 * 60, icon: Coffee, color: "emerald-500" },
  { label: "Long Break", duration: 15 * 60, icon: Coffee, color: "blue-500" },
];

export default function FocusTimer() {
  const [modeIndex, setModeIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const mode = MODES[modeIndex];
  const progress = 1 - timeLeft / mode.duration;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setRunning(false);
      if (modeIndex === 0) setSessions((s) => s + 1);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft, modeIndex]);

  const switchMode = useCallback((idx) => {
    setModeIndex(idx);
    setTimeLeft(MODES[idx].duration);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(mode.duration);
    setRunning(false);
  }, [mode.duration]);

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Focus Timer</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">Stay productive with Pomodoro sessions</p>
      </div>

      {/* Mode Tabs — scrollable on very small screens */}
      <div className="flex gap-2 justify-center flex-wrap">
        {MODES.map((m, i) => (
          <button
            key={m.label}
            onClick={() => switchMode(i)}
            className={cn(
              "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all",
              modeIndex === i
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer Circle — scales fluidly */}
      <div className="flex flex-col items-center">
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
            <circle
              cx="150" cy="150" r="140"
              fill="none"
              stroke="hsl(220 16% 14%)"
              strokeWidth="6"
            />
            <circle
              cx="150" cy="150" r="140"
              fill="none"
              stroke="hsl(263 70% 58%)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground tabular-nums">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground mt-2">{mode.label}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-border"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          onClick={() => setRunning(!running)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30"
        >
          {running ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
        </Button>
        <div className="w-11 h-11 sm:w-12 sm:h-12" />
      </div>

      {/* Session count */}
      <div className="text-center pb-2">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Sessions completed today:{" "}
          <span className="text-primary font-semibold">{sessions}</span>
        </p>
      </div>
    </motion.div>
  );
}
