import {
  ArrowUp,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const menuLinks = [
    { label: "Burgers", href: "#menu" },
    { label: "Pizza", href: "#menu" },
    { label: "Pasta", href: "#menu" },
    { label: "Chicken", href: "#menu" },
    { label: "Desserts", href: "#menu" },
    { label: "Drinks", href: "#menu" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-300">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl sm:h-72 sm:w-72" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-16 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* =======================================================
              BRAND
          ======================================================== */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg shadow-lg shadow-orange-500/20 sm:h-11 sm:w-11 sm:text-xl">
                🍽️
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                  Taste<span className="text-orange-400">Bite</span>
                </h2>

                <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500 sm:text-[10px] sm:tracking-[0.25em]">
                  Restaurant
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-md text-xs leading-6 text-slate-400 sm:mt-6 sm:text-sm sm:leading-7">
              A modern dining experience built around bold flavors,
              premium ingredients, and food made with genuine care.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-2.5 sm:mt-7 sm:gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-slate-300 transition duration-200 hover:border-orange-500/30 hover:bg-orange-500 hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-slate-300 transition duration-200 hover:border-orange-500/30 hover:bg-orange-500 hover:text-white"
              >
                f
              </a>

              <a
                href="mailto:mabdullah332w@gmail.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:border-orange-500/30 hover:bg-orange-500 hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* =======================================================
              EXPLORE
          ======================================================== */}
          <div className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 sm:mt-6">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-400 transition-colors duration-200 hover:text-orange-400 sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =======================================================
              MENU
          ======================================================== */}
          <div className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
              Our Menu
            </h3>

            <ul className="mt-5 space-y-3 sm:mt-6">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-400 transition-colors duration-200 hover:text-orange-400 sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =======================================================
              CONTACT
          ======================================================== */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
              Visit Us
            </h3>

            <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <p className="text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                  Main Changa Manga Road,
                  <br />
                  Chunian, Pakistan
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+923221060997"
                className="flex items-center gap-3 text-xs text-slate-400 transition-colors hover:text-orange-400 sm:text-sm"
              >
                <Phone
                  size={18}
                  className="shrink-0 text-orange-400"
                />

                <span>+92 322 1060997</span>
              </a>

              {/* Email */}
              <a
                href="mailto:mabdullah332w@gmail.com"
                className="flex min-w-0 items-start gap-3 text-xs text-slate-400 transition-colors hover:text-orange-400 sm:text-sm"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <span className="min-w-0 break-all">
                  mabdullah332w@gmail.com
                </span>
              </a>

              {/* Opening Hours */}
              <div className="flex gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <div className="text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                  <p>Mon – Thu</p>

                  <p className="text-slate-300">
                    11:00 AM – 10:30 PM
                  </p>

                  <p className="mt-2">Fri – Sat</p>

                  <p className="text-slate-300">
                    11:00 AM – 11:30 PM
                  </p>

                  <p className="mt-2">Sunday</p>

                  <p className="text-slate-300">
                    12:00 PM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            CTA
        ========================================================== */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-white/[0.03] to-transparent p-5 sm:mt-14 sm:gap-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-400 sm:text-xs sm:tracking-[0.2em]">
              Ready for something delicious?
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
              Your table is waiting.
            </h3>
          </div>

          <a
            href="#menu"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-400 sm:w-fit"
          >
            Explore Menu
          </a>
        </div>

        {/* =========================================================
            BOTTOM
        ========================================================== */}
        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-10 sm:gap-4 sm:pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] leading-5 text-slate-500 sm:text-xs">
            © {currentYear} TasteBite Restaurant. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 sm:gap-5 sm:text-xs">
            <a
              href="#"
              className="transition hover:text-slate-300"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-slate-300"
            >
              Terms
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-slate-400 transition hover:border-orange-500/30 hover:text-orange-400"
            >
              <ArrowUp size={14} />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;