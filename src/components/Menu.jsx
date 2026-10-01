import {
  Search,
  SlidersHorizontal,
  Star,
  Plus,
  ChevronDown,
  Utensils,
  X,
  Sparkles,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { categories } from "../data/menuData";
import { useCart } from "../context/CartContext";
import FoodDetailsModal from "./FoodDetailsModal";
import API_BASE_URL from "../config/api";

const API_URL = `${API_BASE_URL}/menu`;

function Menu() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortOption, setSortOption] =
    useState("default");

  const [showAll, setShowAll] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [menuItems, setMenuItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const { addToCart } = useCart();

  /* =====================================================
     FETCH MENU FROM BACKEND
  ====================================================== */

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch menu items"
        );
      }

      const data =
        await response.json();

      if (
        !data.success ||
        !Array.isArray(data.menuItems)
      ) {
        throw new Error(
          "Invalid menu response from server"
        );
      }

      const formattedItems =
        data.menuItems.map((item) => ({
          id: item._id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          rating: Number(
            item.rating || 0
          ),
          description:
            item.description,
          image: item.image,
          popular: Boolean(
            item.isFeatured
          ),
          isAvailable: Boolean(
            item.isAvailable
          ),
        }));

      setMenuItems(
        formattedItems
      );
    } catch (err) {
      console.error(
        "Menu fetch error:",
        err
      );

      setError(
        "Unable to load the menu. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  /* =====================================================
     FILTER + SORT
  ====================================================== */

  const filteredItems = useMemo(() => {
    let items =
      activeCategory === "All"
        ? [...menuItems]
        : menuItems.filter(
            (item) =>
              item.category ===
              activeCategory
          );

    const search =
      searchTerm
        .trim()
        .toLowerCase();

    if (search) {
      items = items.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(search) ||
          item.category
            .toLowerCase()
            .includes(search) ||
          item.description
            .toLowerCase()
            .includes(search)
      );
    }

    if (
      sortOption ===
      "price-low"
    ) {
      items.sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (
      sortOption ===
      "price-high"
    ) {
      items.sort(
        (a, b) =>
          b.price - a.price
      );
    }

    if (
      sortOption === "rating"
    ) {
      items.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return items;
  }, [
    menuItems,
    activeCategory,
    searchTerm,
    sortOption,
  ]);

  const visibleItems = showAll
    ? filteredItems
    : filteredItems.slice(0, 8);

  /* =====================================================
     HANDLERS
  ====================================================== */

  const handleCategoryChange =
    (category) => {
      setActiveCategory(category);
      setShowAll(false);
    };

  const handleSearchChange =
    (event) => {
      setSearchTerm(
        event.target.value
      );
      setShowAll(true);
    };

  const handleSortChange =
    (event) => {
      setSortOption(
        event.target.value
      );
      setShowAll(true);
    };

  const handleCardClick =
    (item) => {
      setSelectedItem(item);
    };

  const handleCloseModal =
    () => {
      setSelectedItem(null);
    };

  const clearSearch = () => {
    setSearchTerm("");
    setShowAll(false);
  };

  /* =====================================================
     ANIMATION VARIANTS
  ====================================================== */

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.96,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.55,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      },
    },

    exit: {
      opacity: 0,
      y: 20,
      scale: 0.94,

      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-orange-500/[0.07] blur-[110px] sm:h-[420px] sm:w-[420px] sm:blur-[140px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[35%] h-64 w-64 rounded-full bg-orange-600/[0.05] blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-amber-500/[0.04] blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]"
        animate={{
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.6,
            }}
            whileHover={{
              scale: 1.04,
            }}
            className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-orange-400/20 bg-orange-400/[0.08] px-3.5 py-2 shadow-lg shadow-orange-500/[0.03] backdrop-blur-md sm:gap-2 sm:px-4"
          >
            <motion.span
              animate={{
                rotate: [
                  0,
                  10,
                  -10,
                  0,
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Utensils
                size={14}
                className="text-orange-400 sm:h-[15px] sm:w-[15px]"
              />
            </motion.span>

            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-300 sm:text-xs sm:tracking-[0.18em]">
              Our Menu
            </span>

            <Sparkles
              size={12}
              className="text-orange-400/70 sm:h-[13px] sm:w-[13px]"
            />
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-5 text-3xl font-black tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl"
          >
            Something delicious

            <motion.span
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.22,
              }}
              className="block text-orange-400"
            >
              for everyone.
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.28,
            }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7"
          >
            From signature burgers to
            handcrafted pizzas and
            irresistible desserts,
            discover something
            you'll love.
          </motion.p>
        </div>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="mt-9 flex justify-center sm:mt-12"
        >
          <div className="flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1.5 shadow-2xl shadow-black/10 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 sm:p-2">
            {categories.map(
              (category) => {
                const isActive =
                  activeCategory ===
                  category;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        category
                      )
                    }
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    className="relative min-h-10 shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold sm:px-5 sm:text-sm"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeMenuCategory"
                        className="absolute inset-0 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {category}
                    </span>
                  </motion.button>
                );
              }
            )}
          </div>
        </motion.div>

        {/* =====================================================
            SEARCH + SORT
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
            delay: 0.32,
          }}
          className="mx-auto mt-6 flex max-w-5xl flex-col gap-3 sm:mt-8 sm:flex-row"
        >
          {/* Search */}

          <motion.div
            whileFocus={{
              scale: 1.01,
            }}
            className="group relative min-w-0 flex-1"
          >
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 group-focus-within:text-orange-400 group-focus-within:drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={
                handleSearchChange
              }
              placeholder="Search your favorite food..."
              className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] pl-11 pr-12 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-600 focus:border-orange-400/40 focus:bg-white/[0.055] focus:ring-4 focus:ring-orange-500/[0.06] sm:h-13"
            />

            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={
                    clearSearch
                  }
                  className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/10 hover:text-white sm:right-3"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sort */}

          <motion.div
            whileHover={{
              y: -1,
            }}
            className="group relative w-full sm:w-56 sm:shrink-0"
          >
            <SlidersHorizontal
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-orange-400"
            />

            <select
              value={sortOption}
              onChange={
                handleSortChange
              }
              className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-white/[0.08] bg-slate-900 pl-11 pr-11 text-sm font-medium text-slate-300 outline-none transition-all duration-300 focus:border-orange-400/40 focus:ring-4 focus:ring-orange-500/[0.06] sm:h-13"
            >
              <option value="default">
                Recommended
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </motion.div>
        </motion.div>

        {/* =====================================================
            LOADING STATE
        ====================================================== */}

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="mt-8 flex min-h-[360px] items-center justify-center sm:mt-10 sm:min-h-[420px]"
            >
              <div className="flex flex-col items-center px-4 text-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/[0.08] sm:h-16 sm:w-16"
                >
                  <LoaderCircle
                    size={26}
                    className="text-orange-400 sm:h-7 sm:w-7"
                  />
                </motion.div>

                <p className="mt-5 text-sm font-semibold text-slate-300">
                  Loading our delicious menu...
                </p>

                <p className="mt-1 text-center text-xs text-slate-500">
                  Connecting to TasteBite server
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            ERROR STATE
        ====================================================== */}

        <AnimatePresence>
          {!loading && error && (
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              className="mt-8 rounded-3xl border border-red-400/10 bg-red-500/[0.04] px-5 py-16 text-center backdrop-blur-xl sm:mt-10 sm:px-6 sm:py-20"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/10 bg-red-500/[0.08] sm:h-16 sm:w-16">
                <Utensils
                  size={23}
                  className="text-red-400 sm:h-[25px] sm:w-[25px]"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Menu unavailable
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                {error}
              </p>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={
                  fetchMenuItems
                }
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-orange-400/20 bg-orange-500/10 px-5 py-2.5 text-sm font-semibold text-orange-300 transition hover:bg-orange-500 hover:text-white"
              >
                <RefreshCw size={16} />
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            MENU RESULTS
        ====================================================== */}

        {!loading && !error && (
          <>
            {/* RESULT INFO */}

            <motion.div
              layout
              className="mt-8 flex min-h-6 flex-wrap items-center justify-between gap-2 sm:mt-10 sm:gap-4"
            >
              <motion.p
                key={
                  visibleItems.length
                }
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-xs text-slate-500 sm:text-sm"
              >
                Showing{" "}
                <span className="mx-1 font-bold text-slate-300 sm:mx-1.5">
                  {visibleItems.length}
                </span>

                {visibleItems.length ===
                1
                  ? "dish"
                  : "dishes"}
              </motion.p>

              <AnimatePresence mode="wait">
                {activeCategory !==
                  "All" && (
                  <motion.p
                    key={
                      activeCategory
                    }
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -15,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider text-orange-400 sm:text-xs"
                  >
                    {activeCategory}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* =================================================
                FOOD CARDS
            ================================================== */}

            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${activeCategory}-${searchTerm}-${sortOption}-${showAll}`}
                variants={
                  containerVariants
                }
                initial="hidden"
                animate="visible"
                className="mt-4 grid items-stretch gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
              >
                {visibleItems.map(
                  (item) => (
                    <motion.article
                      layout
                      key={item.id}
                      variants={
                        cardVariants
                      }
                      exit="exit"
                      whileHover={{
                        y: -8,
                        scale: 1.012,
                      }}
                      transition={{
                        layout: {
                          duration: 0.35,
                        },
                      }}
                      onClick={() =>
                        handleCardClick(
                          item
                        )
                      }
                      className="group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025] shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:border-orange-400/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-orange-500/[0.08] sm:rounded-[1.5rem]"
                    >
                      <div className="pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-orange-400/0 via-orange-400/0 to-orange-500/0 opacity-0 blur-sm transition-all duration-500 group-hover:from-orange-400/10 group-hover:via-transparent group-hover:to-orange-500/10 group-hover:opacity-100" />

                      {/* IMAGE */}

                      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-slate-900">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          whileHover={{
                            scale: 1.1,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          onError={(
                            event
                          ) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />

                        {/* Popular Badge */}

                        {item.popular && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            whileInView={{
                              opacity: 1,
                              scale: 1,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.4,
                            }}
                            whileHover={{
                              scale: 1.06,
                            }}
                            className="absolute left-3 top-3 sm:left-4 sm:top-4"
                          >
                            <span className="inline-flex items-center gap-1 rounded-full border border-orange-300/20 bg-orange-500/90 px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-white shadow-lg shadow-orange-900/20 backdrop-blur-md sm:gap-1.5 sm:px-3 sm:text-[10px] sm:tracking-[0.12em]">
                              <Sparkles
                                size={10}
                                className="sm:h-[11px] sm:w-[11px]"
                              />

                              Popular
                            </span>
                          </motion.div>
                        )}

                        {/* Rating */}

                        <motion.div
                          whileHover={{
                            scale: 1.06,
                          }}
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-lg backdrop-blur-md sm:bottom-4 sm:right-4 sm:px-3 sm:text-xs"
                        >
                          <motion.span
                            animate={{
                              scale: [
                                1,
                                1.15,
                                1,
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          >
                            <Star
                              size={12}
                              className="fill-orange-400 text-orange-400 sm:h-[13px] sm:w-[13px]"
                            />
                          </motion.span>

                          {item.rating.toFixed(
                            1
                          )}
                        </motion.div>
                      </div>

                      {/* CARD CONTENT */}

                      <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
                        <p className="truncate text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400 sm:text-[10px] sm:tracking-[0.2em]">
                          {item.category}
                        </p>

                        <div className="mt-2 flex min-h-[52px] items-start justify-between gap-2.5 sm:gap-3">
                          <h3 className="line-clamp-2 min-w-0 text-base font-bold leading-6 text-white transition-colors duration-300 group-hover:text-orange-50 sm:text-lg">
                            {item.name}
                          </h3>

                          <motion.span
                            whileHover={{
                              scale: 1.08,
                            }}
                            className="shrink-0 whitespace-nowrap text-base font-extrabold text-orange-400 sm:text-lg"
                          >
                            Rs.{" "}
                            {item.price.toFixed(
                              0
                            )}
                          </motion.span>
                        </div>

                        <p className="mt-3 min-h-[48px] line-clamp-2 text-xs leading-6 text-slate-400 sm:text-sm">
                          {item.description}
                        </p>

                        <motion.button
                          type="button"
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.96,
                          }}
                          onClick={(
                            event
                          ) => {
                            event.stopPropagation();

                            addToCart(
                              item
                            );
                          }}
                          className="mt-5 flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 text-sm font-bold text-white transition-all duration-300 hover:border-orange-400 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
                        >
                          <motion.span
                            whileHover={{
                              rotate: 90,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                          >
                            <Plus
                              size={17}
                            />
                          </motion.span>

                          <span>
                            Add to Cart
                          </span>
                        </motion.button>
                      </div>
                    </motion.article>
                  )
                )}
              </motion.div>
            </AnimatePresence>

            {/* =================================================
                EMPTY STATE
            ================================================== */}

            <AnimatePresence>
              {filteredItems.length ===
                0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.025] px-5 py-16 text-center backdrop-blur-xl sm:mt-8 sm:px-6 sm:py-20"
                >
                  <motion.div
                    animate={{
                      y: [
                        0,
                        -7,
                        0,
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/10 bg-orange-500/[0.08] sm:h-16 sm:w-16"
                  >
                    <Search
                      size={23}
                      className="text-orange-400 sm:h-[25px] sm:w-[25px]"
                    />
                  </motion.div>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    No dishes found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                    We couldn't find
                    anything matching
                    your search. Try
                    another dish,
                    category, or clear
                    the search.
                  </p>

                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={
                      clearSearch
                    }
                    className="mt-6 min-h-11 rounded-xl border border-orange-400/20 bg-orange-500/10 px-5 py-2.5 text-sm font-semibold text-orange-300 transition hover:bg-orange-500 hover:text-white"
                  >
                    Clear Search
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                VIEW FULL MENU
            ================================================== */}

            <AnimatePresence>
              {filteredItems.length >
                8 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="mt-9 flex justify-center sm:mt-12"
                >
                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={() =>
                      setShowAll(
                        !showAll
                      )
                    }
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-orange-400/25 bg-orange-500/[0.08] px-5 py-3 text-sm font-bold text-orange-300 transition-all duration-300 hover:border-orange-400 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 sm:px-6 sm:py-3.5"
                  >
                    {showAll
                      ? "Show Less"
                      : "View Full Menu"}

                    <motion.span
                      animate={{
                        rotate:
                          showAll
                            ? 180
                            : 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <ChevronDown
                        size={18}
                      />
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                FOOD DETAILS MODAL
            ================================================== */}

            <FoodDetailsModal
              item={selectedItem}
              isOpen={Boolean(
                selectedItem
              )}
              onClose={
                handleCloseModal
              }
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Menu;