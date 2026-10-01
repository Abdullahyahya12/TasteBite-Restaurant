import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Loader2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const {
    login,
    register,
    isAuthenticated,
  } = useAuth();

  // =====================================================
  // OPEN AUTH MODAL
  // =====================================================

  useEffect(() => {
    const handleOpenAuth = (event) => {
      const requestedMode =
        event.detail?.mode === "register"
          ? "register"
          : "login";

      setMode(requestedMode);
      setIsOpen(true);
      setError("");
      setSuccess("");
      setShowPassword(false);
    };

    window.addEventListener(
      "tastebite:open-auth",
      handleOpenAuth
    );

    return () => {
      window.removeEventListener(
        "tastebite:open-auth",
        handleOpenAuth
      );
    };
  }, []);

  // =====================================================
  // CLOSE AFTER LOGIN
  // =====================================================

  useEffect(() => {
    if (isAuthenticated) {
      setIsOpen(false);
    }
  }, [isAuthenticated]);

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (submitting) return;

    setIsOpen(false);
    setError("");
    setSuccess("");
    setShowPassword(false);
  };

  // =====================================================
  // SWITCH MODE
  // =====================================================

  const switchMode = (newMode) => {
    if (submitting) return;

    setMode(newMode);
    setError("");
    setSuccess("");
    setShowPassword(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  // =====================================================
  // FORM INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      return "Please enter your email.";
    }

    if (!email.includes("@")) {
      return "Please enter a valid email address.";
    }

    if (mode === "forgot") {
      return "";
    }

    if (mode === "register") {
      const name = formData.name.trim();

      if (!name) {
        return "Please enter your name.";
      }

      if (name.length < 2) {
        return "Name must be at least 2 characters.";
      }

      if (password.length < 6) {
        return "Password must be at least 6 characters.";
      }

      return "";
    }

    if (!password) {
      return "Please enter your password.";
    }

    return "";
  };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const handleForgotPassword = async () => {
    const email = formData.email.trim();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to process password reset request."
        );
      }

      setSuccess(
        data.message ||
          "If an account exists with this email, a password reset link has been sent."
      );

      setFormData((current) => ({
        ...current,
        password: "",
      }));
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
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (mode === "forgot") {
      await handleForgotPassword();
      return;
    }

    setSubmitting(true);

    try {
      if (mode === "login") {
        await login({
          email: formData.email.trim(),
          password: formData.password,
        });

        setSuccess(
          "Login successful!"
        );
      } else {
        await register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
        });

        setSuccess(
          "Account created successfully!"
        );
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
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
  // ESC KEY
  // =====================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, submitting]);

  // =====================================================
  // INPUT COMPONENT
  // =====================================================

  const inputClass =
    "w-full min-h-12 rounded-xl border border-white/[0.09] bg-white/[0.035] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/[0.14] focus:border-orange-400/50 focus:bg-orange-500/[0.035] focus:ring-4 focus:ring-orange-500/[0.07] disabled:cursor-not-allowed disabled:opacity-50";

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgot = mode === "forgot";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-3 py-5 backdrop-blur-xl sm:px-5 sm:py-8"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          {/* BACKGROUND GLOW */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.06] blur-[100px]" />

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
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative my-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/[0.10] bg-slate-950/95 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          >
            {/* TOP ACCENT */}

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={closeModal}
              disabled={submitting}
              aria-label="Close authentication modal"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-500 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:right-5 sm:top-5"
            >
              <X size={19} />
            </button>

            {/* HEADER */}

            <div className="px-5 pb-5 pt-7 sm:px-8 sm:pb-6 sm:pt-8">
              <div className="flex items-start gap-3.5 pr-10">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/20 to-orange-500/[0.04] text-orange-400 shadow-lg shadow-orange-500/[0.08]"
                >
                  {isLogin && (
                    <LogIn size={22} />
                  )}

                  {isRegister && (
                    <UserPlus size={22} />
                  )}

                  {isForgot && (
                    <KeyRound size={22} />
                  )}

                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-slate-950 bg-orange-400">
                    <Sparkles
                      size={9}
                      className="text-slate-950"
                    />
                  </span>
                </motion.div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400">
                    TasteBite
                  </p>

                  <h2 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
                    {isLogin &&
                      "Welcome Back"}

                    {isRegister &&
                      "Create Your Account"}

                    {isForgot &&
                      "Forgot Password?"}
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    {isLogin &&
                      "Sign in to continue your TasteBite experience."}

                    {isRegister &&
                      "Join TasteBite and discover your next favorite meal."}

                    {isForgot &&
                      "Enter your email and we'll send you a secure reset link."}
                  </p>
                </div>
              </div>

              {/* MODE TABS */}

              {!isForgot && (
                <div className="relative mt-6 grid grid-cols-2 rounded-xl border border-white/[0.08] bg-black/20 p-1">
                  <motion.div
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/15 ${
                      isLogin
                        ? "left-1"
                        : "left-[calc(50%+1px)]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      switchMode("login")
                    }
                    disabled={submitting}
                    className={`relative z-10 min-h-10 rounded-lg px-3 py-2 text-xs font-bold transition-colors sm:text-sm ${
                      isLogin
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-200"
                    }`}
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      switchMode("register")
                    }
                    disabled={submitting}
                    className={`relative z-10 min-h-10 rounded-lg px-3 py-2 text-xs font-bold transition-colors sm:text-sm ${
                      isRegister
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-200"
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="px-5 pb-6 sm:px-8 sm:pb-8"
            >
              <div className="space-y-4">

                {/* NAME */}

                {isRegister && (
                  <div>
                    <label
                      htmlFor="auth-name"
                      className="mb-2 block text-xs font-bold text-slate-300 sm:text-sm"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        id="auth-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        disabled={submitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="auth-email"
                    className="mb-2 block text-xs font-bold text-slate-300 sm:text-sm"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      id="auth-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={submitting}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* PHONE */}

                {isRegister && (
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="auth-phone"
                        className="text-xs font-bold text-slate-300 sm:text-sm"
                      >
                        Phone Number
                      </label>

                      <span className="text-[10px] font-medium text-slate-600">
                        Optional
                      </span>
                    </div>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        id="auth-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={submitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                )}

                {/* PASSWORD */}

                {!isForgot && (
                  <div>
                    <label
                      htmlFor="auth-password"
                      className="mb-2 block text-xs font-bold text-slate-300 sm:text-sm"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        id="auth-password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete={
                          isLogin
                            ? "current-password"
                            : "new-password"
                        }
                        disabled={submitting}
                        className={`${inputClass} pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current
                          )
                        }
                        disabled={submitting}
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

                    {isRegister && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-600 sm:text-xs">
                        <ShieldCheck
                          size={13}
                          className="shrink-0 text-slate-600"
                        />

                        <span>
                          Use at least 6 characters for
                          your password.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* FORGOT PASSWORD LINK */}

              {isLogin && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      switchMode("forgot")
                    }
                    disabled={submitting}
                    className="text-xs font-semibold text-orange-400 transition hover:text-orange-300 disabled:opacity-50 sm:text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* ERROR */}

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    className="mt-4 overflow-hidden"
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
              </AnimatePresence>

              {/* SUCCESS */}

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    className="mt-4 overflow-hidden"
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
              </AnimatePresence>

              {/* SUBMIT */}

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={
                  !submitting
                    ? {
                        y: -2,
                      }
                    : {}
                }
                whileTap={
                  !submitting
                    ? {
                        scale: 0.985,
                      }
                    : {}
                }
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/15 transition-all duration-300 hover:from-orange-400 hover:to-orange-300 hover:shadow-orange-500/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-orange-500/15"
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    {isLogin &&
                      "Signing you in..."}

                    {isRegister &&
                      "Creating your account..."}

                    {isForgot &&
                      "Sending reset link..."}
                  </>
                ) : (
                  <>
                    {isLogin && (
                      <LogIn size={18} />
                    )}

                    {isRegister && (
                      <UserPlus size={18} />
                    )}

                    {isForgot && (
                      <KeyRound size={18} />
                    )}

                    {isLogin &&
                      "Sign In"}

                    {isRegister &&
                      "Create Account"}

                    {isForgot &&
                      "Send Reset Link"}
                  </>
                )}
              </motion.button>

              {/* TRUST MESSAGE */}

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-600 sm:text-xs">
                <ShieldCheck
                  size={13}
                  className="text-slate-600"
                />

                <span>
                  Your account information is securely
                  protected.
                </span>
              </div>

              {/* BACK / SWITCH */}

              <div className="mt-5 text-center">
                {isForgot ? (
                  <button
                    type="button"
                    onClick={() =>
                      switchMode("login")
                    }
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 transition hover:text-orange-300 disabled:opacity-50 sm:text-sm"
                  >
                    <ArrowLeft size={15} />
                    Back to Login
                  </button>
                ) : (
                  <p className="text-xs text-slate-600 sm:text-sm">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        switchMode(
                          isLogin
                            ? "register"
                            : "login"
                        )
                      }
                      disabled={submitting}
                      className="font-bold text-orange-400 transition hover:text-orange-300 disabled:opacity-50"
                    >
                      {isLogin
                        ? "Create one"
                        : "Login"}
                    </button>
                  </p>
                )}
              </div>
            </form>

            {/* BOTTOM ACCENT */}

            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;