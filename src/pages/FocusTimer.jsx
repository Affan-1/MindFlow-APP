import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/*
  FIX: Removed `Button` import from "@/Components/ui/button" which can crash
  the page if shadcn is not properly configured. Replaced with plain <button>
  elements styled with Tailwind — identical visually, zero dependencies.
*/

const MODES = [
  { label: "Focus", duration: 25 * 60, icon: Brain },
  { label: "Short Break", duration: 5 * 60, icon: Coffee },
  { label: "Long Break", duration: 15 * 60, icon: Coffee },
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
    clearInterval(intervalRef.current);
    setModeIndex(idx);
    setTimeLeft(MODES[idx].duration);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
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
      className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Focus Timer</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Stay productive with Pomodoro sessions
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 justify-center flex-wrap">
        {MODES.map((m, i) => (
          <button
            key={m.label}
            onClick={() => switchMode(i)}
            className={cn(
              "px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all",
              modeIndex === i
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="flex flex-col items-center">
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
            {/* Track */}
            <circle
              cx="150" cy="150" r="140"
              fill="none"
              stroke="hsl(220 16% 14%)"
              strokeWidth="8"
            />
            {/* Progress */}
            <circle
              cx="150" cy="150" r="140"
              fill="none"
              stroke="hsl(263 70% 58%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground tabular-nums">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
              {mode.label}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {/* Reset */}
        <button
          onClick={reset}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border bg-card hover:bg-secondary text-foreground flex items-center justify-center transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => setRunning((r) => !r)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/30 transition-all active:scale-95"
          aria-label={running ? "Pause" : "Start"}
        >
          {running ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
          )}
        </button>

        {/* Spacer to keep play button centred */}
        <div className="w-11 h-11 sm:w-12 sm:h-12" />
      </div>

      {/* Session count */}
      <div className="text-center pb-2">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Sessions completed today:{" "}
          <span className="text-primary font-semibold">{sessions}</span>
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Completed", value: sessions, color: "text-primary" },
          { label: "Focus Time", value: `${sessions * 25}m`, color: "text-emerald-400" },
          { label: "Breaks", value: sessions, color: "text-amber-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-3 sm:p-4 text-center"
          >
            <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
