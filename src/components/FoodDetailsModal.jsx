import {
  Minus,
  Plus,
  Star,
  X,
  ShoppingBag,
  Sparkles,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";

function FoodDetailsModal({ item, isOpen, onClose }) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setIsAdding(false);
    }
  }, [isOpen, item]);

  /* ================= QUANTITY ================= */

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  /* ================= ADD TO CART ================= */

  const handleAddToCart = () => {
    if (!item || isAdding) return;

    setIsAdding(true);

    for (let i = 0; i < quantity; i += 1) {
      addToCart(item);
    }

    setTimeout(() => {
      onClose();
    }, 500);
  };

  /* ================= ESCAPE KEY ================= */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!item) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* =====================================================
              BACKDROP
          ====================================================== */}

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
            transition={{
              duration: 0.3,
            }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-xl"
          />

          {/* Ambient Modal Glow */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 0.7,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-[81] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]"
          />

          {/* =====================================================
              MODAL WRAPPER
          ====================================================== */}

          <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto overscroll-contain px-3 py-3 sm:items-center sm:px-6 sm:py-8">
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative my-0 w-full max-w-5xl overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-slate-950 shadow-2xl shadow-black/60 sm:my-auto sm:rounded-[1.75rem]"
              onClick={(event) => event.stopPropagation()}
            >
              {/* =================================================
                  TOP BORDER GLOW
              ================================================== */}

              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

              {/* =================================================
                  CLOSE BUTTON
              ================================================== */}

              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close food details"
                whileHover={{
                  scale: 1.08,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/50 text-slate-300 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-orange-400/30 hover:bg-orange-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 sm:right-5 sm:top-5"
              >
                <X size={19} />
              </motion.button>

              <div className="grid md:grid-cols-2">
                {/* =================================================
                    IMAGE SECTION
                ================================================== */}

                <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] md:min-h-[620px]">
                  {/* Image */}

                  <motion.img
                    src={item.image}
                    alt={item.name}
                    initial={{
                      scale: 1.08,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Slow image movement */}

                  <motion.div
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.06] via-transparent to-black/20"
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                  {/* Side gradient */}

                  <div className="absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-slate-950/30 to-transparent md:block" />

                  {/* =================================================
                      POPULAR BADGE
                  ================================================== */}

                  {item.popular && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -15,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.25,
                        duration: 0.45,
                      }}
                      className="absolute left-4 top-4 sm:left-5 sm:top-5"
                    >
                      <div className="flex items-center gap-1.5 rounded-full border border-orange-300/20 bg-orange-500/90 px-3 py-2 text-[10px] font-bold text-white shadow-xl shadow-orange-900/30 backdrop-blur-md sm:gap-2 sm:px-3.5 sm:text-xs">
                        <motion.span
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          <Sparkles size={12} />
                        </motion.span>

                        Popular Choice
                      </div>
                    </motion.div>
                  )}

                  {/* =================================================
                      IMAGE BOTTOM INFO
                  ================================================== */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3,
                      duration: 0.5,
                    }}
                    className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5"
                  >
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      {/* Category */}

                      <motion.span
                        whileHover={{
                          scale: 1.04,
                        }}
                        className="min-w-0 max-w-[65%] truncate rounded-full border border-white/10 bg-black/45 px-3 py-2 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md sm:px-3.5 sm:text-xs"
                      >
                        {item.category}
                      </motion.span>

                      {/* Rating */}

                      <motion.span
                        whileHover={{
                          scale: 1.05,
                        }}
                        className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-2 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md sm:px-3.5 sm:text-xs"
                      >
                        <Star
                          size={12}
                          className="fill-orange-400 text-orange-400 sm:h-[13px] sm:w-[13px]"
                        />

                        {item.rating}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>

                {/* =================================================
                    DETAILS SECTION
                ================================================== */}

                <div className="flex min-w-0 flex-col p-5 sm:p-8 md:p-10">
                  <div className="flex-1">
                    {/* Category */}

                    <motion.p
                      initial={{
                        opacity: 0,
                        x: 15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.15,
                      }}
                      className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-[10px] sm:tracking-[0.22em]"
                    >
                      {item.category}
                    </motion.p>

                    {/* Title */}

                    <motion.h2
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.2,
                        duration: 0.5,
                      }}
                      className="mt-2 pr-8 text-2xl font-black leading-tight tracking-tight text-white sm:mt-3 sm:text-4xl"
                    >
                      {item.name}
                    </motion.h2>

                    {/* =================================================
                        RATING
                    ================================================== */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.28,
                      }}
                      className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3"
                    >
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.span
                            key={star}
                            initial={{
                              opacity: 0,
                              scale: 0.5,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              delay: 0.3 + star * 0.05,
                              type: "spring",
                              stiffness: 300,
                            }}
                          >
                            <Star
                              size={14}
                              className={
                                star <= Math.round(item.rating)
                                  ? "fill-orange-400 text-orange-400 sm:h-4 sm:w-4"
                                  : "text-slate-700 sm:h-4 sm:w-4"
                              }
                            />
                          </motion.span>
                        ))}
                      </div>

                      <span className="text-xs text-slate-400 sm:text-sm">
                        {item.rating} rating
                      </span>
                    </motion.div>

                    {/* Divider */}

                    <motion.div
                      initial={{
                        scaleX: 0,
                        opacity: 0,
                      }}
                      animate={{
                        scaleX: 1,
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.35,
                        duration: 0.5,
                      }}
                      className="my-5 h-px origin-left bg-gradient-to-r from-orange-400/20 via-white/10 to-transparent sm:my-7"
                    />

                    {/* Description */}

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.38,
                      }}
                      className="text-xs leading-6 text-slate-400 sm:text-base sm:leading-7"
                    >
                      {item.description}
                    </motion.p>

                    {/* =================================================
                        FEATURE CARDS
                    ================================================== */}

                    <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3">
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.44,
                        }}
                        whileHover={{
                          y: -3,
                        }}
                        className="group min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-orange-400/20 hover:bg-orange-500/[0.04] sm:p-4"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                            <Check
                              size={14}
                              className="text-orange-400"
                            />
                          </div>

                          <p className="truncate text-[10px] text-slate-500 sm:text-xs">
                            Quality
                          </p>
                        </div>

                        <p className="mt-2 truncate text-xs font-semibold text-white sm:text-sm">
                          Premium
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.49,
                        }}
                        whileHover={{
                          y: -3,
                        }}
                        className="group min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-orange-400/20 hover:bg-orange-500/[0.04] sm:p-4"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                            <Check
                              size={14}
                              className="text-orange-400"
                            />
                          </div>

                          <p className="truncate text-[10px] text-slate-500 sm:text-xs">
                            Preparation
                          </p>
                        </div>

                        <p className="mt-2 truncate text-xs font-semibold text-white sm:text-sm">
                          Freshly Made
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM PURCHASE AREA
                  ================================================== */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.45,
                    }}
                    className="mt-6 border-t border-white/[0.08] pt-5 sm:mt-8 sm:pt-6"
                  >
                    {/* Price + Quantity */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      {/* Price */}

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[11px]">
                          Price
                        </p>

                        <motion.p
                          key={item.price}
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="mt-1 text-2xl font-black text-orange-400 sm:text-3xl"
                        >
                          ${item.price.toFixed(2)}
                        </motion.p>
                      </div>

                      {/* Quantity */}

                      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.03]">
                        <motion.button
                          type="button"
                          whileHover={{
                            backgroundColor:
                              "rgba(255,255,255,0.07)",
                            color: "#ffffff",
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          onClick={decreaseQuantity}
                          className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-400/40"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </motion.button>

                        <AnimatePresence mode="wait">
                          <motion.span
                            key={quantity}
                            initial={{
                              opacity: 0,
                              y: -8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: 8,
                            }}
                            transition={{
                              duration: 0.15,
                            }}
                            className="w-9 text-center text-sm font-bold text-white"
                          >
                            {quantity}
                          </motion.span>
                        </AnimatePresence>

                        <motion.button
                          type="button"
                          whileHover={{
                            backgroundColor:
                              "rgba(249,115,22,0.12)",
                            color: "#fb923c",
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          onClick={increaseQuantity}
                          className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-400/40"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Total */}

                    <motion.div
                      layout
                      className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-orange-400/10 bg-orange-500/[0.04] px-4 py-3 sm:mt-4"
                    >
                      <span className="text-xs font-medium text-slate-500">
                        Total
                      </span>

                      <motion.span
                        key={`${item.id}-${quantity}`}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="text-sm font-bold text-orange-300"
                      >
                        ${(item.price * quantity).toFixed(2)}
                      </motion.span>
                    </motion.div>

                    {/* Add To Cart */}

                    <motion.button
                      type="button"
                      disabled={isAdding}
                      onClick={handleAddToCart}
                      whileHover={
                        !isAdding
                          ? {
                              scale: 1.02,
                              y: -2,
                            }
                          : {}
                      }
                      whileTap={
                        !isAdding
                          ? {
                              scale: 0.97,
                            }
                          : {}
                      }
                      className={`relative mt-3 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 sm:mt-4 sm:min-h-[52px] ${
                        isAdding
                          ? "bg-emerald-500 shadow-emerald-500/20"
                          : "bg-orange-500 shadow-orange-500/20 hover:bg-orange-400 hover:shadow-orange-500/30"
                      }`}
                    >
                      {/* Button shine */}

                      {!isAdding && (
                        <motion.span
                          initial={{
                            x: "-120%",
                          }}
                          animate={{
                            x: "120%",
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                          className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-white/10"
                        />
                      )}

                      <AnimatePresence mode="wait">
                        {isAdding ? (
                          <motion.span
                            key="added"
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                            }}
                            className="relative z-10 flex items-center gap-2"
                          >
                            <Check size={18} />
                            Added to Cart
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            className="relative z-10 flex items-center gap-2"
                          >
                            <ShoppingBag size={18} />
                            Add {quantity} to Cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FoodDetailsModal;