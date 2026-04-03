import { Toaster } from "@/Components/ui/toaster";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/MoodTracker";
import AIChat from "./pages/AIChat";
import FocusTimer from "./pages/FocusTimer";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

/*
  FIXES:
  1. Removed AuthProvider / useAuth — these were blocking ALL rendering when
     the auth backend (base44) is not configured, resulting in a permanent
     blank screen. Remove this comment and re-add auth once your backend is ready.
  2. Removed QueryClientProvider / queryClientInstance — same issue.
  3. Removed UserNotRegisteredError guard — same issue.
  4. Routes now render directly without any auth gate.
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/focus-timer" element={<FocusTimer />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
                Page not found
              </div>
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
