import Logo from "../components/brand/Logo";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, GraduationCap } from "lucide-react";
import { notifySuccess, notifyError } from "../utils/toast";
import { useAuth } from "../context/AuthContext";
import AuthHero from "../components/auth/AuthHero";
import AuthInput from "../components/ui/AuthInput";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      notifySuccess(`Welcome back, ${user.name.split(" ")[0]}`);
      navigate(`/${user.role}`);
    } catch (err) {
      notifyError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page flex min-h-screen bg-surface">
      <AuthHero />

      {/* Form panel */}
      <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden px-4 py-5 sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-navy-500/[0.10] blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-amber-500/[0.10] blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile-only logo (hero is hidden below lg) */}
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <Logo size={64} className="mb-3" />
            <h1 className="font-display text-lg font-bold text-navy-900">Mayfield Global School</h1>
            <p className="mt-1 text-sm text-navy-500">Patna · Sign in to your school portal</p>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-[0_20px_50px_-15px_rgba(16,30,49,0.12)] transition-shadow duration-300 hover:shadow-[0_25px_60px_-15px_rgba(30,58,95,0.16)] sm:p-8">
            <h2 className="font-display text-2xl font-bold text-navy-900">Welcome back</h2>
            <p className="mt-1.5 text-sm text-navy-500">Sign in to continue to your school portal.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
              <AuthInput
                id="email"
                label="Email address"
                type="email"
                icon={Mail}
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <AuthInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                rightAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-navy-400 transition-colors hover:text-school-red"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-navy-200 text-navy-700 accent-navy-700"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold text-school-blue-dark transition-colors hover:text-school-red">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-navy-900 py-3.5 text-sm font-semibold text-white shadow-md shadow-navy-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg hover:shadow-navy-900/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-navy-100" />
              <span className="text-xs text-navy-300">or</span>
              <span className="h-px flex-1 bg-navy-100" />
            </div>

            <p className="text-center text-sm text-navy-500">
              New student?{" "}
              <Link to="/signup" className="font-semibold text-school-blue-dark transition-colors hover:text-school-red">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
