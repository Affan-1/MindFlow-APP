import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleInput = (index, value) => {
    // Allow paste of full code
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
      const newCode = [...code];
      digits.forEach((d, i) => { if (index + i < CODE_LENGTH) newCode[index + i] = d; });
      setCode(newCode);
      const nextFocus = Math.min(index + digits.length, CODE_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < CODE_LENGTH) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      // Replace with your Base44 SDK verification call, e.g.:
      // await base44.auth.verifyEmail({ email, code: fullCode });
      await new Promise((r) => setTimeout(r, 1200)); // simulate API

      // Simulate wrong code for demo (remove in production)
      if (fullCode === "000000") throw new Error("Invalid verification code.");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err?.message || "Verification failed. Check your code and try again.");
      setCode(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resending) return;
    setResending(true);
    try {
      // Replace with your Base44 SDK resend call, e.g.:
      // await base44.auth.resendVerification({ email });
      await new Promise((r) => setTimeout(r, 800)); // simulate
      setResendTimer(RESEND_COOLDOWN);
      setError("");
      setCode(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // Auto-submit when all digits filled
  useEffect(() => {
    if (code.every(Boolean) && code.join("").length === CODE_LENGTH && !loading) {
      handleVerify();
    }
  }, [code]);

  if (success) {
    return (
      <div className="auth-root">
        <div className="auth-bg" />
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="verify-success-icon">✓</div>
          <h2 className="auth-title" style={{ marginBottom: "0.5rem" }}>Email Verified!</h2>
          <p className="auth-subtitle">Your account is confirmed. Redirecting to login…</p>
          <div className="verify-progress" />
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="auth-root">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-brand">
          <div className="verify-shield">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h1 className="auth-title">Verify your email</h1>
          <p className="auth-subtitle">
            {email
              ? <>We sent a 6-digit code to <strong style={{ color: "#e5e7eb" }}>{email}</strong></>
              : "Enter the 6-digit code from your email"
            }
          </p>
        </div>

        <form onSubmit={handleVerify} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          {/* OTP inputs */}
          <div className="otp-row">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                className={`otp-input ${digit ? "otp-filled" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onFocus={(e) => e.target.select()}
                disabled={loading}
                autoFocus={i === 0}
              />
            ))}
          </div>

          <button type="submit" className="auth-btn" disabled={loading || code.join("").length < CODE_LENGTH}>
            {loading ? (
              <><Loader2 size={16} className="spin" /> Verifying…</>
            ) : (
              <><ShieldCheck size={16} /> Verify Email</>
            )}
          </button>
        </form>

        {/* Resend */}
        <div className="resend-row">
          <span>Didn't receive the code?</span>
          <button
            className="resend-btn"
            onClick={handleResend}
            disabled={resendTimer > 0 || resending}
          >
            {resending ? (
              <><Loader2 size={12} className="spin" /> Sending…</>
            ) : resendTimer > 0 ? (
              <>Resend in {resendTimer}s</>
            ) : (
              <><RefreshCw size={12} /> Resend code</>
            )}
          </button>
        </div>

        <p className="auth-switch" style={{ marginTop: "0.75rem" }}>
          Wrong email? <Link to="/signup">Start over</Link>
        </p>
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
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

  .verify-shield {
    width: 60px; height: 60px;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #818cf8;
    margin: 0 auto 1.25rem;
  }

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
    line-height: 1.6;
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

  /* OTP */
  .otp-row {
    display: flex;
    gap: 0.55rem;
    justify-content: center;
    margin: 0.5rem 0;
  }

  .otp-input {
    width: 48px;
    height: 56px;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    font-family: 'Sora', monospace;
    color: #f1f1f5;
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    outline: none;
    caret-color: #818cf8;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
  }
  .otp-input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
    background: rgba(99,102,241,0.05);
  }
  .otp-input.otp-filled {
    border-color: rgba(99,102,241,0.4);
    background: rgba(99,102,241,0.07);
  }
  .otp-input:disabled { opacity: 0.5; }

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
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(99,102,241,0.3);
  }
  .auth-btn:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(99,102,241,0.4);
  }
  .auth-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Resend */
  .resend-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.25rem;
    font-size: 0.82rem;
    color: #4b5563;
  }

  .resend-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: none;
    border: none;
    color: #818cf8;
    font-family: 'Sora', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }
  .resend-btn:disabled { color: #374151; cursor: not-allowed; }
  .resend-btn:not(:disabled):hover { color: #a5b4fc; }

  /* Success state */
  .verify-success-icon {
    width: 72px; height: 72px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4ade80;
    font-size: 2rem;
    font-weight: 700;
    margin: 0 auto 1.25rem;
    animation: pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both;
  }
  @keyframes pop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .verify-progress {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    margin-top: 1.5rem;
    overflow: hidden;
  }
  .verify-progress::after {
    content: '';
    display: block;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 4px;
    animation: fillBar 2.5s ease forwards;
  }
  @keyframes fillBar { to { width: 100%; } }

  .auth-switch {
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
