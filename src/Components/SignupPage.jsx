import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Loader2, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.name.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      // Replace with your Base44 SDK signup call, e.g.:
      // await base44.auth.register({ name: form.name, email: form.email, password: form.password });
      // The SDK / backend should automatically send a verification email.
      await new Promise((r) => setTimeout(r, 1400)); // simulate API
      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-root">
        <div className="auth-bg" />
        <div className="auth-card success-card">
          <div className="success-icon">
            <CheckCircle2 size={40} strokeWidth={1.5} />
          </div>
          <h2 className="auth-title">Check your inbox!</h2>
          <p className="success-msg">
            We've sent a confirmation email to <strong>{form.email}</strong>.
            <br /><br />
            Click the link in that email to verify your account, then sign in.
          </p>
          <button
            className="auth-btn"
            style={{ marginTop: "1.5rem" }}
            onClick={() => navigate("/verify-email", { state: { email: form.email } })}
          >
            Enter Verification Code
          </button>
          <p className="auth-switch" style={{ marginTop: "1rem" }}>
            Already verified? <Link to="/login">Sign in</Link>
          </p>
        </div>
        <style>{authStyles}</style>
      </div>
    );
  }

  return (
    <div className="auth-root">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">
            <img src="https://base44.com/logo_v2.svg" alt="Logo" />
          </div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us — it only takes a minute</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name" name="name" type="text"
              placeholder="Jane Doe"
              value={form.name} onChange={handleChange} disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange} disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="auth-input-wrap">
              <input
                id="password" name="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password} onChange={handleChange} disabled={loading}
              />
              <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.password && <PasswordStrength password={form.password} />}
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm" name="confirm" type="password"
              placeholder="Re-enter password"
              value={form.confirm} onChange={handleChange} disabled={loading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <><Loader2 size={16} className="spin" /> Creating account…</>
            ) : (
              <><UserPlus size={16} /> Create Account</>
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
      <style>{authStyles}</style>
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ chars", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Symbol", pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div style={{ marginTop: "0.4rem" }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "0.35rem" }}>
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1, height: "3px", borderRadius: "4px",
              background: i < score ? colors[score - 1] : "rgba(255,255,255,0.07)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {checks.map((c) => (
          <span
            key={c.label}
            style={{
              fontSize: "0.7rem",
              color: c.pass ? "#4ade80" : "#374151",
              transition: "color 0.3s",
            }}
          >
            {c.pass ? "✓" : "·"} {c.label}
          </span>
        ))}
      </div>
      {score > 0 && (
        <span style={{ fontSize: "0.73rem", color: colors[score - 1], fontWeight: 600 }}>
          {labels[score - 1]}
        </span>
      )}
    </div>
  );
}

const authStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    font-family: 'Sora', sans-serif;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .auth-bg {
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99,102,241,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 110%, rgba(168,85,247,0.15) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .auth-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background: rgba(18,18,28,0.85);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1);
    animation: fadeUp 0.4s ease both;
  }

  .success-card { text-align: center; }

  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px; height: 72px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 50%;
    color: #4ade80;
    margin: 0 auto 1.25rem;
    animation: pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both;
  }

  @keyframes pop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .success-msg {
    color: #6b7280;
    font-size: 0.88rem;
    line-height: 1.7;
    margin: 0;
  }
  .success-msg strong { color: #e5e7eb; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-brand { text-align: center; margin-bottom: 2rem; }

  .auth-logo {
    width: 52px; height: 52px;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
    padding: 8px;
  }
  .auth-logo img { width: 100%; height: 100%; object-fit: contain; }

  .auth-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: #f1f1f5;
    letter-spacing: -0.02em;
    margin: 0 0 0.35rem;
  }

  .auth-subtitle {
    font-size: 0.88rem;
    color: #6b7280;
    margin: 0;
  }

  .auth-form { display: flex; flex-direction: column; gap: 1.1rem; }

  .auth-error {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    color: #f87171;
    font-size: 0.82rem;
    padding: 0.65rem 0.9rem;
    border-radius: 10px;
    animation: shake 0.3s ease;
  }
  @keyframes shake {
    0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)}
  }

  .auth-field { display: flex; flex-direction: column; gap: 0.45rem; }

  .auth-field label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    font-weight: 500;
    color: #9ca3af;
  }

  .auth-field input,
  .auth-input-wrap input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.7rem 0.9rem;
    color: #f1f1f5;
    font-size: 0.88rem;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .auth-field input::placeholder,
  .auth-input-wrap input::placeholder { color: #374151; }
  .auth-field input:focus,
  .auth-input-wrap input:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  .auth-input-wrap { position: relative; }
  .auth-input-wrap input { padding-right: 2.8rem; }
  .auth-eye {
    position: absolute;
    right: 0.75rem; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    color: #4b5563; cursor: pointer; padding: 0;
    display: flex; align-items: center;
    transition: color 0.2s;
  }
  .auth-eye:hover { color: #9ca3af; }

  .auth-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.78rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 0.4rem;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(99,102,241,0.3);
  }
  .auth-btn:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(99,102,241,0.4);
  }
  .auth-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .auth-switch {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.83rem;
    color: #4b5563;
  }
  .auth-switch a {
    color: #818cf8;
    text-decoration: none;
    font-weight: 500;
  }
  .auth-switch a:hover { color: #a5b4fc; text-decoration: underline; }
`;
