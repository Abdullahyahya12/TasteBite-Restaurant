import {
  Menu,
  ShoppingBag,
  Search,
  Sun,
  Moon,
  X,
  History,
  User,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartDrawer from "./CartDrawer";

function Navbar({
  onCheckout,
  onOrderHistory,
  onAdminOrders,
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

  const [authMenuOpen, setAuthMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  const { totalItems } = useCart();

  const {
    user,
    isAuthenticated,
    logout,
    loading: authLoading,
  } = useAuth();

  const isAdmin =
    isAuthenticated &&
    user?.role === "admin";

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
  // BODY SCROLL
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
    setSearchOpen(false);
    setAuthMenuOpen(false);
  };

  // =====================================================
  // CART
  // =====================================================

  const openCart = () => {
    setCartOpen(true);
    setMobileMenu(false);
    setAuthMenuOpen(false);
    setSearchOpen(false);
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
    setAuthMenuOpen(false);

    if (
      typeof onOrderHistory === "function"
    ) {
      onOrderHistory();
    }
  };

  // =====================================================
  // ADMIN DASHBOARD
  // =====================================================

  const handleAdminOrders = () => {
    setCartOpen(false);
    setMobileMenu(false);
    setSearchOpen(false);
    setAuthMenuOpen(false);

    if (
      typeof onAdminOrders === "function"
    ) {
      onAdminOrders();
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    setSearchOpen((current) => !current);
    setAuthMenuOpen(false);
  };

  // =====================================================
  // AUTH
  // =====================================================

  const openAuth = (mode) => {
    setAuthMenuOpen(false);
    setMobileMenu(false);

    window.dispatchEvent(
      new CustomEvent("tastebite:open-auth", {
        detail: {
          mode,
        },
      })
    );
  };

  const handleLogout = () => {
    logout();
    setAuthMenuOpen(false);
    setMobileMenu(false);
  };

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
            MAIN NAVBAR
        ================================================= */}

        <nav className="mx-auto grid min-h-[76px] w-full max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8 xl:px-10">

          {/* =================================================
              LEFT — LOGO
          ================================================= */}

          <div className="flex min-w-0 items-center justify-start">
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
                className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-orange-500 text-xl shadow-lg shadow-orange-500/25 sm:h-11 sm:w-11"
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
                />
              </motion.div>

              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Taste
                  <span className="text-orange-400">
                    Bite
                  </span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.28em] text-slate-400 transition-colors group-hover:text-slate-300">
                  Restaurant
                </p>
              </div>
            </motion.a>
          </div>

          {/* =================================================
              CENTER — NAVIGATION
          ================================================= */}

          <div className="hidden min-w-0 items-center justify-center lg:flex">
            <div className="flex items-center gap-5 xl:gap-7 2xl:gap-8">
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
                        }}
                      />

                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-orange-400/60 transition-all duration-300 group-hover:w-full" />
                    </motion.a>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT — DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden shrink-0 items-center justify-end gap-2.5 lg:flex xl:gap-3">

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
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-orange-400"
              aria-label="Search"
              title="Search"
            >
              <Search size={19} />
            </motion.button>

            {/* History */}

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
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-orange-400/20 hover:bg-orange-500/10 hover:text-orange-400"
              title="Order History"
            >
              <History size={18} />

              <span className="hidden xl:inline">
                History
              </span>
            </motion.button>

            {/* Divider */}

            <div className="mx-1.5 h-7 w-px bg-white/10" />

            {/* AUTH */}

            {!authLoading &&
              (isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    type="button"
                    onClick={() =>
                      setAuthMenuOpen(
                        (current) =>
                          !current
                      )
                    }
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-orange-400/20 hover:bg-orange-500/10 hover:text-orange-400"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                      <User size={16} />
                    </div>

                    <span className="hidden max-w-[90px] truncate xl:block">
                      {user?.name ||
                        "Account"}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {authMenuOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                        }}
                        className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-2xl"
                      >
                        <div className="border-b border-white/10 px-3 py-3">
                          <p className="text-sm font-semibold text-white">
                            {user?.name ||
                              "User"}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {user?.email ||
                              ""}
                          </p>

                          {isAdmin && (
                            <span className="mt-2 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                              Administrator
                            </span>
                          )}
                        </div>

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={
                              handleAdminOrders
                            }
                            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-orange-400 transition hover:bg-orange-500/10"
                          >
                            <LayoutDashboard
                              size={17}
                            />

                            <div>
                              <p className="font-semibold">
                                Admin Dashboard
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-600">
                                Manage restaurant orders
                              </p>
                            </div>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={
                            handleOrderHistory
                          }
                          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                          <History
                            size={17}
                          />

                          Order History
                        </button>

                        <button
                          type="button"
                          onClick={
                            handleLogout
                          }
                          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <LogOut
                            size={17}
                          />

                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <motion.button
                    type="button"
                    onClick={() =>
                      openAuth("login")
                    }
                    whileHover={{
                      scale: 1.03,
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-orange-400/20 hover:bg-orange-500/10 hover:text-orange-400"
                  >
                    <LogIn size={17} />

                    <span className="hidden xl:inline">
                      Login
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() =>
                      openAuth(
                        "register"
                      )
                    }
                    whileHover={{
                      scale: 1.04,
                      y: -1,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="flex h-10 items-center gap-2 rounded-xl bg-orange-500 px-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400"
                  >
                    <UserPlus size={17} />

                    <span className="hidden xl:inline">
                      Register
                    </span>
                  </motion.button>
                </div>
              ))}

            {/* Divider */}

            <div className="mx-1.5 h-7 w-px bg-white/10" />

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
              className="theme-toggle flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition-all duration-300 hover:bg-white/10"
              aria-label="Toggle theme"
              title={
                darkMode
                  ? "Light mode"
                  : "Dark mode"
              }
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
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400"
              aria-label="Open shopping cart"
            >
              <ShoppingBag size={19} />

              {totalItems > 0 && (
                <motion.span
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-slate-900"
                >
                  {totalItems > 99
                    ? "99+"
                    : totalItems}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* =================================================
              TABLET ACTIONS
          ================================================= */}

          <div className="ml-auto hidden items-center gap-2 md:flex lg:hidden">

            <motion.button
              type="button"
              onClick={handleOrderHistory}
              whileTap={{
                scale: 0.9,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-orange-400"
              title="Order History"
            >
              <History size={20} />
            </motion.button>

            {!authLoading &&
              (isAuthenticated ? (
                <>
                  {isAdmin && (
                    <motion.button
                      type="button"
                      onClick={
                        handleAdminOrders
                      }
                      whileTap={{
                        scale: 0.9,
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition hover:bg-orange-500/20"
                      title="Admin Dashboard"
                    >
                      <LayoutDashboard
                        size={20}
                      />
                    </motion.button>
                  )}

                  <motion.button
                    type="button"
                    onClick={handleLogout}
                    whileTap={{
                      scale: 0.9,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-red-500/10 hover:text-red-400"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  type="button"
                  onClick={() =>
                    openAuth("login")
                  }
                  whileTap={{
                    scale: 0.9,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-orange-400"
                  title="Login"
                >
                  <User size={20} />
                </motion.button>
              ))}

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{
                scale: 0.9,
              }}
              className="theme-toggle flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10"
              title="Toggle theme"
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

            <motion.button
              type="button"
              onClick={openCart}
              whileTap={{
                scale: 0.9,
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white"
              title="Cart"
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

          <div className="ml-auto flex items-center gap-1.5 md:hidden">

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{
                scale: 0.9,
              }}
              className="theme-toggle flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10"
              title="Toggle theme"
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

            <motion.button
              type="button"
              onClick={openCart}
              whileTap={{
                scale: 0.9,
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10"
              title="Cart"
            >
              <ShoppingBag size={20} />

              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {totalItems > 99
                    ? "99+"
                    : totalItems}
                </span>
              )}
            </motion.button>

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
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 hover:bg-white/10"
              title="Menu"
            >
              {mobileMenu ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
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
              className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl"
            >
              <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
                <div className="relative min-w-0 flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search our menu..."
                    autoFocus
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
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
              className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl md:hidden"
            >
              <div className="mx-auto flex w-full max-w-xl flex-col gap-1.5 px-4 py-5 sm:px-6">

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
                        whileHover={{
                          x: 4,
                        }}
                        className={`rounded-xl px-4 py-3.5 text-sm font-medium ${
                          isActive
                            ? "bg-orange-500/10 text-orange-400"
                            : "text-slate-200 hover:bg-white/5 hover:text-orange-400"
                        }`}
                      >
                        {link.label}
                      </motion.a>
                    );
                  }
                )}

                {/* ORDER HISTORY */}

                <button
                  type="button"
                  onClick={
                    handleOrderHistory
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-orange-400"
                >
                  <History size={18} />

                  Order History
                </button>

                {!authLoading &&
                  (isAuthenticated ? (
                    <>
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={
                            handleAdminOrders
                          }
                          className="flex items-center gap-3 rounded-xl border border-orange-500/10 bg-orange-500/5 px-4 py-3.5 text-left text-sm font-semibold text-orange-400 hover:bg-orange-500/10"
                        >
                          <LayoutDashboard
                            size={18}
                          />

                          <div>
                            <p>
                              Admin Dashboard
                            </p>

                            <p className="mt-0.5 text-[10px] font-normal text-slate-600">
                              Manage restaurant orders
                            </p>
                          </div>
                        </button>
                      )}

                      {/* USER INFO */}

                      <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
                            <User
                              size={18}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">
                              {user?.name ||
                                "User"}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {user?.email ||
                                ""}
                            </p>

                            {isAdmin && (
                              <span className="mt-1 inline-block text-[9px] font-bold uppercase tracking-wider text-orange-400">
                                Administrator
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={
                          handleLogout
                        }
                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut
                          size={18}
                        />

                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* LOGIN */}

                      <button
                        type="button"
                        onClick={() =>
                          openAuth(
                            "login"
                          )
                        }
                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-orange-400"
                      >
                        <LogIn size={18} />

                        Login
                      </button>

                      {/* REGISTER */}

                      <button
                        type="button"
                        onClick={() =>
                          openAuth(
                            "register"
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white hover:bg-orange-400"
                      >
                        <UserPlus
                          size={18}
                        />

                        Create Account
                      </button>
                    </>
                  ))}

                {/* CART */}

                <button
                  type="button"
                  onClick={openCart}
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white"
                >
                  <ShoppingBag size={18} />

                  View Cart

                  {totalItems > 0 && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
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