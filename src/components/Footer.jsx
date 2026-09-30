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
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-xl shadow-lg shadow-orange-500/20">
                🍽️
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Taste<span className="text-orange-400">Bite</span>
                </h2>

                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                  Restaurant
                </p>
              </div>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              A modern dining experience built around bold flavors,
              premium ingredients, and food made with genuine care.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">
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

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-orange-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Our Menu
            </h3>

            <ul className="mt-6 space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-orange-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Visit Us
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <p className="text-sm leading-6 text-slate-400">
                  Main Changa Manga Road,
                  <br />
                  Chunian, Pakistan
                </p>
              </div>

              <a
                href="tel:+923221060997"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-orange-400"
              >
                <Phone size={18} className="text-orange-400" />
                +92 322 1060997
              </a>

              <a
                href="mailto:mabdullah332w@gmail.com"
                className="flex items-start gap-3 text-sm text-slate-400 transition-colors hover:text-orange-400"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <span className="break-all">
                  mabdullah332w@gmail.com
                </span>
              </a>

              {/* Opening Hours */}
              <div className="flex gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <div className="text-sm leading-6 text-slate-400">
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

        {/* CTA */}
        <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-white/[0.03] to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Ready for something delicious?
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              Your table is waiting.
            </h3>
          </div>

          <a
            href="#menu"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
          >
            Explore Menu
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            © {currentYear} TasteBite Restaurant. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-slate-500">
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
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-slate-400 transition hover:border-orange-500/30 hover:text-orange-400"
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