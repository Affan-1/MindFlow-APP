import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const moods = [
  { emoji: "😢", label: "Awful", value: 1 },
  { emoji: "😔", label: "Bad", value: 3 },
  { emoji: "😐", label: "Okay", value: 5 },
  { emoji: "🙂", label: "Good", value: 7 },
  { emoji: "😄", label: "Great", value: 9 },
  { emoji: "🤩", label: "Amazing", value: 10 },
];

export default function MoodTracker() {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mindflow_moods");
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  const handleLog = () => {
    if (!selected) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selected.value,
      emoji: selected.emoji,
      label: selected.label,
      note: note,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("mindflow_moods", JSON.stringify(updated));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSelected(null);
    setNote("");
  };

  const deleteEntry = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("mindflow_moods", JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto px-4 py-6 space-y-5 sm:space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Mood Tracker</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          {format(new Date(), "EEEE, MMMM d")} — How are you feeling?
        </p>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium"
          >
            ✅ Mood logged successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood Selector */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-4 sm:mb-5">
          Select your mood
        </h3>

        {/* 3 cols on all screens, comfortable touch targets */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelected(mood)}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-200 ${
                selected?.value === mood.value
                  ? "border-primary bg-primary/10 scale-105 shadow-lg shadow-primary/10"
                  : "border-border hover:border-primary/30 hover:bg-secondary"
              }`}
            >
              <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight text-center">
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 sm:mt-5 space-y-3">
                <textarea
                  placeholder="Add a note about how you're feeling... (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="w-full bg-secondary border border-border rounded-xl px-3 sm:px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary"
                />
                <button
                  onClick={handleLog}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 sm:py-2.5 rounded-xl transition-all shadow-lg shadow-primary/25 text-sm"
                >
                  Log Mood {selected.emoji}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent Entries */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-4">
          Recent Entries ({entries.length})
        </h3>

        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
            No mood entries yet. Log your first mood above! 😊
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
              >
                <div className="text-xl sm:text-2xl mt-0.5 flex-shrink-0">{entry.emoji}</div>
                <div className="flex-1 min-w-0">
                  {/* Stack date and label on mobile */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      {format(new Date(entry.date), "MMM d, yyyy - h:mm a")}
                    </span>
                    <span className="text-xs text-primary font-medium mt-0.5 sm:mt-0">
                      {entry.label} ({entry.mood}/10)
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 break-words">
                      {entry.note}
                    </p>
                  )}
                </div>
                {/* Always visible delete on mobile (no hover on touch) */}
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-muted-foreground hover:text-red-400 text-xs transition-all px-2 py-1 rounded opacity-60 sm:opacity-0 sm:group-hover:opacity-100 flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
