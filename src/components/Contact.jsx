import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { API_BASE_URL } from "../config/api";

const contactMethods = [
  {
    icon: Phone,
    label: "Contact",
    value: "+92 322 1060997",
    detail: "Available for reservations & inquiries",
    href: "tel:+923221060997",
  },
  {
    icon: Mail,
    label: "Email",
    value: "mabdullah332w@gmail.com",
    detail: "We reply as soon as possible",
    href: "mailto:mabdullah332w@gmail.com",
  },
  {
    icon: MapPin,
    label: "Find Us",
    value: "Main Changa Manga Road",
    detail: "Chunian, Pakistan",
    href: "#location",
  },
];

const openingHours = [
  {
    day: "Monday — Thursday",
    time: "11:00 AM — 10:30 PM",
  },
  {
    day: "Friday — Saturday",
    time: "11:00 AM — 11:30 PM",
  },
  {
    day: "Sunday",
    time: "12:00 PM — 10:00 PM",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send your message."
        );
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Contact form submission error:", err);

      setError(
        err.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#090b0f] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-32 xl:py-40"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[15%] h-[380px] w-[380px] rounded-full bg-orange-500/[0.035] blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[10%] right-[-180px] h-[400px] w-[400px] rounded-full bg-orange-400/[0.025] blur-[130px] sm:h-[550px] sm:w-[550px] sm:blur-[160px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent sm:w-[70%]" />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.06] px-3.5 py-2 backdrop-blur-md sm:px-4">
            <Sparkles
              size={13}
              className="shrink-0 text-orange-400"
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-300 sm:text-[10px] sm:tracking-[0.25em]">
              Reservations & Contact
            </span>
          </div>

          <h2 className="mt-5 text-[2.45rem] font-black leading-[0.98] tracking-[-0.045em] text-white sm:mt-7 sm:text-6xl lg:text-8xl">
            Let&apos;s make
            <span className="block text-orange-400">
              something memorable.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-7 sm:text-base sm:leading-7">
            Planning a dinner, celebrating something special, or
            simply craving your next favorite meal? We would love
            to hear from you.
          </p>
        </motion.div>

        {/* =========================================================
            CONTACT METHODS
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.08] sm:mt-14 sm:rounded-[2rem] md:grid-cols-3"
        >
          {contactMethods.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className="group relative min-w-0 bg-[#0d1015] p-5 transition-all duration-500 hover:bg-[#11151c] sm:p-8"
              >
                <span className="absolute right-5 top-5 text-[9px] font-bold tracking-[0.2em] text-slate-800 sm:right-7 sm:top-7 sm:text-[10px]">
                  0{index + 1}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-500/[0.07] text-orange-400 transition-all duration-500 group-hover:border-orange-400/30 group-hover:bg-orange-500 group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Icon size={18} className="sm:h-[19px] sm:w-[19px]" />
                </div>

                <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-600 sm:mt-7 sm:text-[9px] sm:tracking-[0.25em]">
                  {item.label}
                </p>

                <p className="mt-2 break-words pr-8 text-sm font-bold leading-5 text-slate-200 sm:text-base">
                  {item.value}
                </p>

                <p className="mt-1 max-w-xs text-[11px] leading-5 text-slate-600 sm:text-xs">
                  {item.detail}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-700 transition-colors group-hover:text-orange-400 sm:mt-6 sm:text-[10px]">
                  Connect

                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </a>
            );
          })}
        </motion.div>

        {/* =========================================================
            MAIN CONTACT AREA
        ========================================================== */}
        <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          {/* =======================================================
              LOCATION
          ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            id="location"
            className="relative min-h-[600px] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0d1015] sm:min-h-[650px] sm:rounded-[2.5rem]"
          >
            {/* Map Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:45px_45px] sm:[background-size:58px_58px]" />

              <div className="absolute left-[8%] top-[-10%] h-[130%] w-[2px] rotate-[24deg] bg-white/[0.035]" />

              <div className="absolute left-[30%] top-[-10%] h-[130%] w-[3px] rotate-[24deg] bg-white/[0.025]" />

              <div className="absolute right-[25%] top-[-10%] h-[130%] w-[2px] -rotate-[27deg] bg-white/[0.035]" />

              <div className="absolute right-[8%] top-[-10%] h-[130%] w-[1px] -rotate-[27deg] bg-white/[0.025]" />

              <div className="absolute left-[-10%] top-[32%] h-[2px] w-[120%] rotate-[8deg] bg-white/[0.035]" />

              <div className="absolute left-[-10%] top-[67%] h-[2px] w-[120%] -rotate-[7deg] bg-white/[0.035]" />
            </div>

            {/* Road Lines */}
            <div className="absolute left-[12%] top-[42%] h-[2px] w-[78%] rotate-[18deg] bg-orange-400/[0.12]" />

            <div className="absolute left-[20%] top-[63%] h-[2px] w-[72%] -rotate-[13deg] bg-orange-400/[0.08]" />

            {/* Map Glow */}
            <div className="absolute left-1/2 top-[55%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[80px] sm:h-72 sm:w-72 sm:blur-[100px]" />

            {/* Location Marker */}
            <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 rounded-full border border-orange-400/20 sm:-inset-7"
              />

              <motion.div
                animate={{
                  scale: [1, 1.18, 1],
                  opacity: [0.25, 0, 0.25],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute -inset-10 rounded-full border border-orange-400/20 sm:-inset-12"
              />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#090b0f] bg-orange-500 text-white shadow-2xl shadow-orange-500/30 sm:h-16 sm:w-16">
                <MapPin size={23} className="sm:h-[25px] sm:w-[25px]" />
              </div>
            </div>

            {/* Location Heading */}
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4 sm:left-9 sm:right-9 sm:top-9 sm:gap-5">
              <div className="min-w-0">
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-[9px] sm:tracking-[0.3em]">
                  Our Location
                </p>

                <h3 className="mt-2 max-w-sm text-xl font-bold leading-tight text-white sm:mt-3 sm:text-3xl">
                  In the heart of
                  <span className="text-orange-400">
                    {" "}
                    Chunian.
                  </span>
                </h3>
              </div>

              <div className="hidden h-10 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 backdrop-blur-md sm:flex">
                <span className="h-2 w-2 rounded-full bg-orange-400 shadow-lg shadow-orange-400/60" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Open Today
                </span>
              </div>
            </div>

            {/* Map Labels */}
            <div className="absolute left-[12%] top-[30%] max-w-[110px] text-[7px] font-bold uppercase tracking-[0.15em] text-slate-700 sm:max-w-none sm:text-[8px] sm:tracking-[0.2em]">
              Changa Manga Road
            </div>

            <div className="absolute right-[10%] top-[67%] rotate-[-12deg] text-[7px] font-bold uppercase tracking-[0.15em] text-slate-700 sm:right-[12%] sm:text-[8px] sm:tracking-[0.2em]">
              Chunian
            </div>

            <div className="absolute bottom-[25%] left-[22%] rotate-[15deg] text-[7px] font-bold uppercase tracking-[0.15em] text-slate-700 sm:text-[8px] sm:tracking-[0.2em]">
              Main Road
            </div>

            {/* Address Card */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-9 sm:left-9 sm:right-9">
              <div className="rounded-[1.25rem] border border-white/10 bg-[#090b0f]/90 p-4 shadow-2xl backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={14}
                        className="shrink-0 text-orange-400"
                      />

                      <span className="truncate text-[8px] font-bold uppercase tracking-[0.16em] text-orange-300 sm:text-[9px] sm:tracking-[0.2em]">
                        TasteBite Restaurant
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-200 sm:text-sm sm:leading-6">
                      Main Changa Manga Road, Chunian, Pakistan
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-slate-600 sm:text-xs">
                      Easy access · Indoor dining · Family friendly
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Main+Changa+Manga+Road+Chunian+Pakistan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-orange-400 sm:w-auto"
                  >
                    Directions
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =======================================================
              RIGHT SIDE
          ======================================================== */}
          <div className="min-w-0 space-y-6 sm:space-y-8">
            {/* =====================================================
                CONTACT FORM
            ====================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-[1.5rem] border border-white/[0.08] bg-[#0d1015] p-5 sm:rounded-[2.5rem] sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/[0.08] text-orange-400 sm:h-11 sm:w-11">
                    <MessageCircle size={18} className="sm:h-[19px] sm:w-[19px]" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white sm:mt-6 sm:text-2xl">
                    Start a conversation.
                  </h3>

                  <p className="mt-2 max-w-md text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                    Questions, celebrations, private dining or
                    something else? Send us a message.
                  </p>
                </div>

                <span className="hidden shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800 sm:block">
                  01 / Contact
                </span>
              </div>

              {/* Backend Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 sm:mt-6"
                >
                  <p className="text-xs leading-5 text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}

              {submitted ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="mt-7 rounded-2xl border border-orange-400/15 bg-orange-500/[0.05] p-6 text-center sm:mt-8 sm:p-8"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <CheckCircle2 size={23} />
                  </div>

                  <h4 className="mt-5 text-xl font-bold text-white">
                    Thank you.
                  </h4>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Your message has been received. Our team will
                    get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-4 sm:mt-8 sm:space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="min-w-0">
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]"
                      >
                        Full Name
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        className="min-h-12 w-full rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                      />
                    </div>

                    <div className="min-w-0">
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]"
                      >
                        Email Address
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="your@email.com"
                        className="min-h-12 w-full rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                      />
                    </div>
                  </div>

                  {/* Phone + Reason */}
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="min-w-0">
                      <label
                        htmlFor="contact-phone"
                        className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]"
                      >
                        Phone
                      </label>

                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        placeholder="+92 322 1060997"
                        className="min-h-12 w-full rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                      />
                    </div>

                    <div className="min-w-0">
                      <label
                        htmlFor="contact-subject"
                        className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]"
                      >
                        Reason
                      </label>

                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="min-h-12 w-full appearance-none rounded-xl border border-white/[0.08] bg-[#0d1015] px-4 py-3.5 text-sm text-slate-300 outline-none transition focus:border-orange-400/30"
                      >
                        <option>General Inquiry</option>
                        <option>Table Reservation</option>
                        <option>Private Dining</option>
                        <option>Event & Celebration</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us how we can help..."
                      className="min-h-[140px] w-full resize-none rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-xl shadow-orange-500/10 transition-all duration-300 sm:text-[11px] ${
                      loading
                        ? "cursor-not-allowed opacity-60"
                        : "hover:bg-orange-400 hover:shadow-orange-500/20"
                    }`}
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message

                        <Send
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* =====================================================
                OPENING HOURS
            ====================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-[1.5rem] border border-white/[0.08] bg-[#0d1015] p-5 sm:rounded-[2.5rem] sm:p-9"
            >
              <div className="flex items-center justify-between gap-3 sm:gap-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/[0.08] text-orange-400 sm:h-11 sm:w-11">
                    <Clock3 size={18} className="sm:h-[19px] sm:w-[19px]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      Opening Hours
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-700 sm:text-xs">
                      Plan your visit
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 items-center gap-2 rounded-full border border-orange-400/10 bg-orange-500/[0.05] px-3 py-2 min-[380px]:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />

                  <span className="text-[8px] font-bold uppercase tracking-wider text-orange-300 sm:text-[9px]">
                    Open Today
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-4 sm:mt-7">
                {openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-start justify-between gap-4 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="min-w-0 text-[11px] font-medium leading-5 text-slate-500 sm:text-xs">
                      {item.day}
                    </span>

                    <span className="shrink-0 whitespace-nowrap text-[10px] font-bold leading-5 text-slate-200 sm:text-xs">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5 sm:mt-6 sm:p-4">
                <CalendarDays
                  size={15}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <p className="text-[9px] leading-5 text-slate-600 sm:text-[10px]">
                  For large parties and private dining, we
                  recommend contacting us at least 24 hours in
                  advance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            SOCIAL / CTA
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-8 overflow-hidden rounded-[1.5rem] border border-orange-400/10 bg-orange-500/[0.035] sm:mt-10 sm:rounded-[2rem]"
        >
          <div className="flex flex-col gap-6 p-5 sm:gap-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-[9px] sm:tracking-[0.3em]">
                Stay Connected
              </p>

              <h3 className="mt-2 text-xl font-bold text-white sm:mt-3 sm:text-2xl">
                Follow the TasteBite experience.
              </h3>

              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
                Discover new dishes, special evenings and
                behind-the-scenes moments.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 min-[380px]:flex-row min-[380px]:flex-wrap sm:gap-3 lg:w-auto">
              {/* Instagram */}
              <a
                href="#"
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 text-xs font-semibold text-slate-300 transition hover:border-orange-400/20 hover:bg-orange-500 hover:text-white"
              >
                <span className="text-base font-bold leading-none">
                  ◎
                </span>

                Instagram
              </a>

              {/* Call */}
              <a
                href="tel:+923221060997"
                className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-xs font-bold text-white transition hover:bg-orange-400"
              >
                <Phone size={15} />

                Call Restaurant
              </a>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            FINAL BRAND STATEMENT
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-16 text-center sm:mt-24"
        >
          <div className="mx-auto flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px w-8 bg-orange-400/30 sm:w-12" />

            <Sparkles
              size={13}
              className="text-orange-400 sm:h-[14px] sm:w-[14px]"
            />

            <div className="h-px w-8 bg-orange-400/30 sm:w-12" />
          </div>

          <p className="mt-5 text-lg font-semibold text-slate-400 sm:mt-6 sm:text-2xl">
            Good food. Good people. Good memories.
          </p>

          <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.25em] text-slate-800 sm:text-[9px] sm:tracking-[0.35em]">
            The TasteBite Experience
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;