import {
  Menu,
  ShoppingBag,
  Search,
  Sun,
  Moon,
  X,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

function Navbar({
  onCheckout,
  onOrderHistory,
}) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme =
      localStorage.getItem("restaurant-theme");

    return savedTheme
      ? savedTheme === "dark"
      : true;
  });

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [cartOpen, setCartOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  const { totalItems } = useCart();

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Menu", id: "menu" },
    { label: "Gallery", id: "gallery" },
    { label: "About", id: "about" },
    {
      label: "Testimonials",
      id: "testimonials",
    },
    { label: "Contact", id: "contact" },
  ];

  // =====================================================
  // THEME
  // =====================================================

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem(
      "restaurant-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // =====================================================
  // SCROLL
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 35);

      const scrollPosition =
        currentScroll + 180;

      let currentSection = "home";

      navLinks.forEach((link) => {
        const section =
          document.getElementById(link.id);

        if (
          section &&
          section.offsetTop <= scrollPosition
        ) {
          currentSection = link.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // =====================================================
  // BODY SCROLL LOCK
  // =====================================================

  useEffect(() => {
    document.body.style.overflow =
      mobileMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenu(false);
  };

  // =====================================================
  // CART
  // =====================================================

  const openCart = () => {
    setCartOpen(true);
    setMobileMenu(false);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setMobileMenu(false);

    if (typeof onCheckout === "function") {
      onCheckout();
    }
  };

  // =====================================================
  // ORDER HISTORY
  // =====================================================

  const handleOrderHistory = () => {
    setCartOpen(false);
    setMobileMenu(false);
    setSearchOpen(false);

    if (
      typeof onOrderHistory === "function"
    ) {
      onOrderHistory();
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    setSearchOpen((current) => !current);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <motion.header
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`theme-navbar fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-slate-950/90 shadow-2xl shadow-black/20 backdrop-blur-2xl"
            : "border-b border-white/10 bg-slate-950/30 backdrop-blur-xl"
        }`}
      >
        {/* =================================================
            NAV CONTAINER
        ================================================= */}

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">

          {/* =================================================
              LOGO
          ================================================= */}

          <motion.a
            href="#"
            onClick={() =>
              handleNavClick("home")
            }
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group flex shrink-0 items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: -7,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 16,
              }}
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-orange-500 text-xl shadow-lg shadow-orange-500/25"
            >
              <span className="relative z-10">
                🍽️
              </span>

              <motion.span
                className="absolute inset-0 rounded-xl bg-white"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                whileHover={{
                  opacity: 0.12,
                  scale: 1,
                }}
                transition={{
                  duration: 0.25,
                }}
              />
            </motion.div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-white">
                Taste
                <span className="text-orange-400">
                  Bite
                </span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.28em] text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                Restaurant
              </p>
            </div>
          </motion.a>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map(
              (link, index) => {
                const isActive =
                  activeSection === link.id;

                return (
                  <motion.a
                    key={link.id}
                    href={
                      link.id === "home"
                        ? "#"
                        : `#${link.id}`
                    }
                    onClick={() =>
                      handleNavClick(
                        link.id
                      )
                    }
                    initial={{
                      opacity: 0,
                      y: -12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.12 +
                        index * 0.06,
                      duration: 0.45,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className={`group relative whitespace-nowrap py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-orange-400"
                        : "text-slate-200 hover:text-orange-400"
                    }`}
                  >
                    {link.label}

                    {/* Active line */}

                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 rounded-full bg-orange-400"
                      initial={false}
                      animate={{
                        width: isActive
                          ? "100%"
                          : "0%",
                        opacity:
                          isActive
                            ? 1
                            : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    />

                    {/* Hover line */}

                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-orange-400/60 transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                );
              }
            )}
          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden items-center gap-2 md:flex">

            {/* Search */}

            <motion.button
              type="button"
              onClick={handleSearch}
              whileHover={{
                scale: 1.05,
                y: -1,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="rounded-xl p-2.5 text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-orange-400"
              aria-label="Search"
              title="Search"
            >
              <Search size={19} />
            </motion.button>

            {/* Order History */}

            <motion.button
              type="button"
              onClick={handleOrderHistory}
              whileHover={{
                scale: 1.03,
                y: -1,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-orange-400/20 hover:bg-orange-500/10 hover:text-orange-400"
              aria-label="Order History"
              title="Order History"
            >
              <History size={18} />

              <span>
                History
              </span>
            </motion.button>

            {/* Theme */}

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{
                scale: 1.08,
                rotate: 4,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="theme-toggle rounded-xl p-2.5 text-slate-200 transition-all duration-300 hover:bg-white/10"
              aria-label={
                darkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                darkMode
                  ? "Light mode"
                  : "Dark mode"
              }
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.span
                  key={
                    darkMode
                      ? "sun"
                      : "moon"
                  }
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.5,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="flex"
                >
                  {darkMode ? (
                    <Sun
                      size={19}
                      className="text-orange-400"
                    />
                  ) : (
                    <Moon
                      size={19}
                      className="text-slate-700"
                    />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Cart */}

            <motion.button
              type="button"
              onClick={openCart}
              whileHover={{
                scale: 1.06,
                y: -1,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className="relative rounded-xl bg-orange-500 p-2.5 text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400 hover:shadow-orange-500/30"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={19} />

              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-slate-900 shadow-md"
                  >
                    {totalItems > 99
                      ? "99+"
                      : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* =================================================
              TABLET ACTIONS
          ================================================= */}

          <div className="hidden items-center gap-2 md:flex lg:hidden">

            {/* Order History */}

            <motion.button
              type="button"
              onClick={handleOrderHistory}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="rounded-xl p-2.5 text-slate-200 transition hover:bg-white/10 hover:text-orange-400"
              aria-label="Order History"
              title="Order History"
            >
              <History size={20} />
            </motion.button>

            {/* Theme */}

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{
                scale: 0.9,
              }}
              className="theme-toggle rounded-xl p-2.5 text-slate-200 hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun
                  size={20}
                  className="text-orange-400"
                />
              ) : (
                <Moon
                  size={20}
                  className="text-slate-700"
                />
              )}
            </motion.button>

            {/* Cart */}

            <motion.button
              type="button"
              onClick={openCart}
              whileTap={{
                scale: 0.9,
              }}
              className="relative rounded-xl bg-orange-500 p-2.5 text-white"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-slate-900">
                  {totalItems > 99
                    ? "99+"
                    : totalItems}
                </span>
              )}
            </motion.button>
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================= */}

          <div className="flex items-center gap-1.5 md:hidden">

            {/* Mobile Theme */}

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="theme-toggle rounded-xl p-2.5 text-slate-200 transition-all duration-300 hover:bg-white/10"
              aria-label="Toggle theme"
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.span
                  key={
                    darkMode
                      ? "mobile-sun"
                      : "mobile-moon"
                  }
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.5,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex"
                >
                  {darkMode ? (
                    <Sun
                      size={20}
                      className="text-orange-400"
                    />
                  ) : (
                    <Moon
                      size={20}
                      className="text-slate-700"
                    />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Cart */}

            <motion.button
              type="button"
              onClick={openCart}
              whileTap={{
                scale: 0.9,
              }}
              className="relative rounded-xl p-2.5 text-slate-200 transition-all duration-300 hover:bg-white/10"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={20} />

              {totalItems > 0 && (
                <motion.span
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white"
                >
                  {totalItems > 99
                    ? "99+"
                    : totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu */}

            <motion.button
              type="button"
              onClick={() =>
                setMobileMenu(
                  (current) =>
                    !current
                )
              }
              whileTap={{
                scale: 0.9,
              }}
              className="rounded-xl p-2.5 text-slate-200 transition-all duration-300 hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.span
                  key={
                    mobileMenu
                      ? "close"
                      : "menu"
                  }
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex"
                >
                  {mobileMenu ? (
                    <X size={22} />
                  ) : (
                    <Menu size={22} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* ===================================================
            SEARCH PANEL
        =================================================== */}

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl"
            >
              <div className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-4">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search our menu..."
                    autoFocus
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="rounded-xl p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close search"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================
            MOBILE MENU
        =================================================== */}

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl md:hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.055,
                    },
                  },
                }}
                className="flex flex-col gap-1 px-5 py-5"
              >
                {navLinks.map(
                  (link) => {
                    const isActive =
                      activeSection ===
                      link.id;

                    return (
                      <motion.a
                        key={link.id}
                        href={
                          link.id ===
                          "home"
                            ? "#"
                            : `#${link.id}`
                        }
                        onClick={() =>
                          handleNavClick(
                            link.id
                          )
                        }
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -20,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                          },
                        }}
                        whileHover={{
                          x: 4,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        className={`relative overflow-hidden rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-orange-500/10 text-orange-400"
                            : "text-slate-200 hover:bg-white/5 hover:text-orange-400"
                        }`}
                      >
                        <span className="relative z-10">
                          {link.label}
                        </span>

                        {isActive && (
                          <motion.span
                            layoutId="mobile-active"
                            className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-orange-400"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.a>
                    );
                  }
                )}

                {/* =================================================
                    MOBILE ORDER HISTORY
                ================================================= */}

                <motion.button
                  type="button"
                  onClick={
                    handleOrderHistory
                  }
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -20,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                    },
                  }}
                  whileHover={{
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-white/5 hover:text-orange-400"
                >
                  <History size={18} />

                  <span>
                    Order History
                  </span>
                </motion.button>

                {/* Mobile Quick Action */}

                <motion.button
                  type="button"
                  onClick={openCart}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
                >
                  <ShoppingBag
                    size={18}
                  />

                  View Cart

                  {totalItems > 0 && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      {totalItems}
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() =>
          setCartOpen(false)
        }
        onCheckout={handleCheckout}
      />
    </>
  );
}

export default Navbar;