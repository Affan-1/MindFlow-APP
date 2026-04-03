import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      // Replace this block with your Base44 SDK login call, e.g.:
      // await base44.auth.login({ email: form.email, password: form.password });
      await new Promise((r) => setTimeout(r, 1200)); // simulate API
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-bg" />
      <div className="auth-card">
        {/* Logo / Brand */}
        <div className="auth-brand">
          <div className="auth-logo">
            <img src="https://base44.com/logo_v2.svg" alt="Logo" />
          </div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">
              Password
              <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
            </label>
            <div className="auth-input-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <><Loader2 size={16} className="spin" /> Signing in…</>
            ) : (
              <><LogIn size={16} /> Sign In</>
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </div>

      <style>{authStyles}</style>
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
    letter-spacing: 0.01em;
  }

  .auth-forgot {
    color: #818cf8;
    text-decoration: none;
    font-size: 0.78rem;
    transition: color 0.2s;
  }
  .auth-forgot:hover { color: #a5b4fc; }

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
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #4b5563;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
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
    letter-spacing: 0.01em;
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
