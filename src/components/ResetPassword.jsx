import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { API_BASE_URL } from "../config/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET RESET TOKEN FROM URL
  // =====================================================

  const pathParts =
    window.location.pathname.split("/");

  const token =
    pathParts[pathParts.length - 1];

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token || token === "reset-password") {
      setError(
        "Invalid or missing password reset link."
      );
      return;
    }

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset password."
        );
      }

      setSuccess(
        data.message ||
          "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // GO TO LOGIN
  // =====================================================

  const goToLogin = () => {
    window.history.pushState(
      {},
      "",
      "/"
    );

    window.dispatchEvent(
      new PopStateEvent("popstate")
    );

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(
          "tastebite:open-auth",
          {
            detail: {
              mode: "login",
            },
          }
        )
      );
    }, 100);
  };

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const inputClass =
    "w-full min-h-12 rounded-xl border border-white/[0.09] bg-white/[0.035] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/[0.14] focus:border-orange-400/50 focus:bg-orange-500/[0.035] focus:ring-4 focus:ring-orange-500/[0.07] disabled:cursor-not-allowed disabled:opacity-50";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full overflow-hidden rounded-[1.75rem] border border-white/[0.10] bg-slate-950/95 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          {/* TOP ACCENT */}

          <div className="h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

          {/* HEADER */}

          <div className="px-5 pb-5 pt-7 sm:px-8 sm:pb-6 sm:pt-8">
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/20 to-orange-500/[0.04] text-orange-400 shadow-lg shadow-orange-500/[0.08]">
                <KeyRound size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400">
                  TasteBite
                </p>

                <h1 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
                  Reset Password
                </h1>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Create a new secure password for your
                  account.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="px-5 pb-7 sm:px-8 sm:pb-8"
          >
            <div className="space-y-4">

              {/* NEW PASSWORD */}

              <div>
                <label
                  htmlFor="reset-password"
                  className="mb-2 block text-xs font-bold text-slate-300 sm:text-sm"
                >
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="reset-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    disabled={submitting || Boolean(success)}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    disabled={submitting || Boolean(success)}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/[0.06] hover:text-slate-300 disabled:opacity-40"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div>
                <label
                  htmlFor="reset-confirm-password"
                  className="mb-2 block text-xs font-bold text-slate-300 sm:text-sm"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="reset-confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(
                        event.target.value
                      );
                      setError("");
                    }}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    disabled={submitting || Boolean(success)}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    disabled={submitting || Boolean(success)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/[0.06] hover:text-slate-300 disabled:opacity-40"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* PASSWORD INFO */}

            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-600 sm:text-xs">
              <ShieldCheck
                size={13}
                className="shrink-0"
              />

              <span>
                Password must contain at least 6
                characters.
              </span>
            </div>

            {/* ERROR */}

            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-4"
              >
                <div className="flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.07] px-3.5 py-3">
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <p className="text-xs leading-5 text-red-300 sm:text-sm">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}

            {/* SUCCESS */}

            {success && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-4"
              >
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.07] px-3.5 py-3">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <p className="text-xs leading-5 text-emerald-300 sm:text-sm">
                    {success}
                  </p>
                </div>
              </motion.div>
            )}

            {/* SUBMIT */}

            {!success && (
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={
                  !submitting
                    ? { y: -2 }
                    : {}
                }
                whileTap={
                  !submitting
                    ? { scale: 0.985 }
                    : {}
                }
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/15 transition-all duration-300 hover:from-orange-400 hover:to-orange-300 hover:shadow-orange-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Resetting password...
                  </>
                ) : (
                  <>
                    <KeyRound size={18} />

                    Reset Password
                  </>
                )}
              </motion.button>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="button"
              onClick={goToLogin}
              disabled={submitting}
              className="mt-5 flex w-full items-center justify-center gap-1.5 text-xs font-bold text-orange-400 transition hover:text-orange-300 disabled:opacity-50 sm:text-sm"
            >
              <ArrowLeft size={15} />

              Back to Login
            </button>
          </form>

          {/* BOTTOM ACCENT */}

          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

export default ResetPassword;