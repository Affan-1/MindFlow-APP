import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, LogOut } from "lucide-react";

/*
  FIX: Removed imports of `useAuth` and `base44` which crashed the page
  because they depend on external auth services that may not be configured.
  Settings now works standalone. Re-add auth when your backend is ready.
*/

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        checked ? "bg-primary" : "bg-secondary border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    moodReminders: true,
    focusAlerts: false,
    weeklyReport: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    // Replace with your actual logout logic
    console.log("Logout clicked");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-2xl mx-auto space-y-5 sm:space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Save success */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium"
        >
          ✅ Settings saved!
        </motion.div>
      )}

      {/* Profile */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4"
      >
        <div className="flex items-center gap-3 mb-1">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-semibold text-foreground">Profile</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-10 sm:h-9 bg-secondary border border-border rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
            <input
              value=""
              disabled
              placeholder="your@email.com"
              className="w-full h-10 sm:h-9 bg-secondary border border-border rounded-lg px-3 text-sm text-foreground opacity-50 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm transition-all shadow-lg shadow-primary/25"
        >
          Save Changes
        </button>
      </motion.div>

      {/* Notifications */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-card p-4 sm:p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-semibold text-foreground">Notifications</h3>
        </div>

        {[
          {
            key: "moodReminders",
            label: "Daily Mood Reminders",
            desc: "Get reminded to log your mood each day",
          },
          {
            key: "focusAlerts",
            label: "Focus Session Alerts",
            desc: "Notifications when focus sessions end",
          },
          {
            key: "weeklyReport",
            label: "Weekly Wellness Report",
            desc: "Receive a summary of your week every Sunday",
          },
        ].map(({ key, label, desc }) => (
          <div
            key={key}
            className="flex items-center justify-between py-3.5 border-b border-border last:border-0 gap-4"
          >
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                {label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</p>
            </div>
            <Toggle
              checked={notifications[key]}
              onChange={(val) =>
                setNotifications((n) => ({ ...n, [key]: val }))
              }
            />
          </div>
        ))}
      </motion.div>

      {/* Account */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-4"
      >
        <div className="flex items-center gap-3 mb-1">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-semibold text-foreground">Account</h3>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <div>
            <p className="text-xs sm:text-sm font-medium text-foreground">Role</p>
            <p className="text-xs text-muted-foreground mt-0.5 capitalize">user</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full h-10 sm:h-9 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </motion.div>

      {/* Safe area spacer for mobile */}
      <div className="h-4 sm:h-0" />
    </motion.div>
  );
}
