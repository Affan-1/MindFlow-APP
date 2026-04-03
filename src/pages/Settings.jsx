import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, LogOut } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Switch } from "@/Components/ui/switch";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    moodReminders: true,
    focusAlerts: false,
    weeklyReport: true,
  });

  const handleSave = () => {
    toast.success("Settings saved!");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-2xl mx-auto px-4 py-6 space-y-5 sm:space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Manage your account and preferences
        </p>
      </motion.div>

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
            <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
            <Input
              defaultValue={user?.full_name || ""}
              className="bg-secondary border-none text-sm h-10 sm:h-9"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <Input
              value={user?.email || ""}
              disabled
              className="bg-secondary border-none text-sm opacity-60 h-10 sm:h-9"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 mt-2 h-10 sm:h-9 text-sm"
        >
          Save Changes
        </Button>
      </motion.div>

      {/* Notifications */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-1"
      >
        <div className="flex items-center gap-3 mb-3">
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
            className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-4"
          >
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</p>
            </div>
            {/* Switch has a good tap target; keep it flex-shrink-0 */}
            <div className="flex-shrink-0">
              <Switch
                checked={notifications[key]}
                onCheckedChange={(val) =>
                  setNotifications((n) => ({ ...n, [key]: val }))
                }
              />
            </div>
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
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {user?.role || "user"}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => base44.auth.logout()}
          className="border-destructive/30 text-destructive hover:bg-destructive/10 w-full h-10 sm:h-9 text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </motion.div>

      {/* Safe area spacer for mobile bottom nav */}
      <div className="h-4 sm:h-0" />
    </motion.div>
  );
}
