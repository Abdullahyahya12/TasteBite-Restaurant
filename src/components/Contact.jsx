
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#090b0f] px-6 py-28 text-white lg:px-8 lg:py-40"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[15%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.035] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[10%] right-[-180px] h-[550px] w-[550px] rounded-full bg-orange-400/[0.025] blur-[160px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />

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
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.06] px-4 py-2 backdrop-blur-md">
            <Sparkles size={13} className="text-orange-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-300">
              Reservations & Contact
            </span>
          </div>

          <h2 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
            Let&apos;s make
            <span className="block text-orange-400">
              something memorable.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
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
          className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
        >
          {contactMethods.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className="group relative bg-[#0d1015] p-7 transition-all duration-500 hover:bg-[#11151c] sm:p-8"
              >
                <span className="absolute right-7 top-7 text-[10px] font-bold tracking-[0.2em] text-slate-800">
                  0{index + 1}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/10 bg-orange-500/[0.07] text-orange-400 transition-all duration-500 group-hover:border-orange-400/30 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={19} />
                </div>

                <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">
                  {item.label}
                </p>

                <p className="mt-2 break-words text-base font-bold text-slate-200">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  {item.detail}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition-colors group-hover:text-orange-400">
                  Connect

                  <ArrowUpRight
                    size={13}
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
        <div className="mt-8 grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          {/* =======================================================
              LOCATION
          ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            id="location"
            className="relative min-h-[650px] overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#0d1015]"
          >
            {/* Map Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:58px_58px]" />

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
            <div className="absolute left-1/2 top-[55%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[100px]" />

            {/* Location Marker */}
            <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-7 rounded-full border border-orange-400/20"
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
                className="absolute -inset-12 rounded-full border border-orange-400/20"
              />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#090b0f] bg-orange-500 text-white shadow-2xl shadow-orange-500/30">
                <MapPin size={25} />
              </div>
            </div>

            {/* Location Heading */}
            <div className="absolute left-7 right-7 top-7 flex items-start justify-between gap-5 sm:left-9 sm:right-9 sm:top-9">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-orange-400">
                  Our Location
                </p>

                <h3 className="mt-3 max-w-sm text-2xl font-bold leading-tight text-white sm:text-3xl">
                  In the heart of
                  <span className="text-orange-400">
                    {" "}
                    Chunian.
                  </span>
                </h3>
              </div>

              <div className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 backdrop-blur-md sm:flex">
                <span className="h-2 w-2 rounded-full bg-orange-400 shadow-lg shadow-orange-400/60" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Open Today
                </span>
              </div>
            </div>

            {/* Map Labels */}
            <div className="absolute left-[12%] top-[30%] text-[8px] font-bold uppercase tracking-[0.2em] text-slate-700">
              Changa Manga Road
            </div>

            <div className="absolute right-[12%] top-[67%] rotate-[-12deg] text-[8px] font-bold uppercase tracking-[0.2em] text-slate-700">
              Chunian
            </div>

            <div className="absolute bottom-[25%] left-[22%] rotate-[15deg] text-[8px] font-bold uppercase tracking-[0.2em] text-slate-700">
              Main Road
            </div>

            {/* Address Card */}
            <div className="absolute bottom-7 left-7 right-7 sm:bottom-9 sm:left-9 sm:right-9">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#090b0f]/85 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={15}
                        className="text-orange-400"
                      />

                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-300">
                        TasteBite Restaurant
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                      Main Changa Manga Road, Chunian, Pakistan
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Easy access · Indoor dining · Family friendly
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Main+Changa+Manga+Road+Chunian+Pakistan"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-orange-400"
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
          <div className="space-y-8">
            {/* =====================================================
                CONTACT FORM
            ====================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-[2.5rem] border border-white/[0.08] bg-[#0d1015] p-7 sm:p-9"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/[0.08] text-orange-400">
                    <MessageCircle size={19} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    Start a conversation.
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                    Questions, celebrations, private dining or
                    something else? Send us a message.
                  </p>
                </div>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800 sm:block">
                  01 / Contact
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 rounded-2xl border border-orange-400/15 bg-orange-500/[0.05] p-8 text-center"
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
                  className="mt-8 space-y-5"
                >
                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
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
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
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
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                      />
                    </div>
                  </div>

                  {/* Phone + Reason */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                      >
                        Phone
                      </label>

                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 322 1060997"
                        className="w-full rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                      >
                        Reason
                      </label>

                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#0d1015] px-4 py-3.5 text-sm text-slate-300 outline-none transition focus:border-orange-400/30"
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
                      className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
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
                      className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-orange-400/30 focus:bg-white/[0.025]"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-xl shadow-orange-500/10 transition-all duration-300 hover:bg-orange-400 hover:shadow-orange-500/20"
                  >
                    Send Message

                    <Send
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
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
              className="rounded-[2.5rem] border border-white/[0.08] bg-[#0d1015] p-7 sm:p-9"
            >
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/[0.08] text-orange-400">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Opening Hours
                    </h3>

                    <p className="mt-1 text-xs text-slate-700">
                      Plan your visit
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-orange-400/10 bg-orange-500/[0.05] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />

                  <span className="text-[9px] font-bold uppercase tracking-wider text-orange-300">
                    Open Today
                  </span>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between gap-5 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-xs font-medium text-slate-500">
                      {item.day}
                    </span>

                    <span className="whitespace-nowrap text-xs font-bold text-slate-200">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                <CalendarDays
                  size={15}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <p className="text-[10px] leading-5 text-slate-600">
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
          className="mt-10 overflow-hidden rounded-[2rem] border border-orange-400/10 bg-orange-500/[0.035]"
        >
          <div className="flex flex-col gap-7 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-orange-400">
                Stay Connected
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white">
                Follow the TasteBite experience.
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Discover new dishes, special evenings and
                behind-the-scenes moments.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 text-xs font-semibold text-slate-300 transition hover:border-orange-400/20 hover:bg-orange-500 hover:text-white"
              >
                <span className="text-base font-bold leading-none">
                  ◎
                </span>

                Instagram
              </a>

              {/* Call */}
              <a
                href="tel:+923221060997"
                className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 text-xs font-bold text-white transition hover:bg-orange-400"
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
          className="mt-24 text-center"
        >
          <div className="mx-auto flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-orange-400/30" />

            <Sparkles size={14} className="text-orange-400" />

            <div className="h-px w-12 bg-orange-400/30" />
          </div>

          <p className="mt-6 text-xl font-semibold text-slate-400 sm:text-2xl">
            Good food. Good people. Good memories.
          </p>

          <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.35em] text-slate-800">
            The TasteBite Experience
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
