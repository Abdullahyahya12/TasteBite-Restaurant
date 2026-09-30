
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
            className="pointer-events-none fixed left-1/2 top-1/2 z-[81] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[130px]"
          />

          {/* =====================================================
              MODAL WRAPPER
          ====================================================== */}

          <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto px-3 py-4 sm:px-6 sm:py-8">

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
              className="relative my-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-slate-950 shadow-2xl shadow-black/60"
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
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/45 text-slate-300 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-orange-400/30 hover:bg-orange-500/20 hover:text-white sm:right-5 sm:top-5"
              >
                <X size={19} />
              </motion.button>

              <div className="grid md:grid-cols-2">

                {/* =================================================
                    IMAGE SECTION
                ================================================== */}

                <div className="relative min-h-[330px] overflow-hidden md:min-h-[620px]">

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
                      className="absolute left-5 top-5"
                    >
                      <div className="flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/90 px-3.5 py-2 text-xs font-bold text-white shadow-xl shadow-orange-900/30 backdrop-blur-md">
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
                          <Sparkles size={13} />
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
                    className="absolute bottom-5 left-5 right-5"
                  >
                    <div className="flex items-center justify-between gap-3">

                      {/* Category */}

                      <motion.span
                        whileHover={{
                          scale: 1.04,
                        }}
                        className="rounded-full border border-white/10 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
                      >
                        {item.category}
                      </motion.span>

                      {/* Rating */}

                      <motion.span
                        whileHover={{
                          scale: 1.05,
                        }}
                        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
                      >
                        <Star
                          size={13}
                          className="fill-orange-400 text-orange-400"
                        />

                        {item.rating}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>

                {/* =================================================
                    DETAILS SECTION
                ================================================== */}

                <div className="flex flex-col p-6 sm:p-8 md:p-10">

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
                      className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400"
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
                      className="mt-3 pr-8 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl"
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
                      className="mt-5 flex flex-wrap items-center gap-3"
                    >
                      <div className="flex items-center gap-1">

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
                              size={16}
                              className={
                                star <= Math.round(item.rating)
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-slate-700"
                              }
                            />
                          </motion.span>
                        ))}

                      </div>

                      <span className="text-sm text-slate-400">
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
                      className="my-7 h-px origin-left bg-gradient-to-r from-orange-400/20 via-white/10 to-transparent"
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
                      className="text-sm leading-7 text-slate-400 sm:text-base"
                    >
                      {item.description}
                    </motion.p>

                    {/* =================================================
                        FEATURE CARDS
                    ================================================== */}

                    <div className="mt-7 grid grid-cols-2 gap-3">

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
                        className="group rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-orange-400/20 hover:bg-orange-500/[0.04]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10">
                            <Check
                              size={14}
                              className="text-orange-400"
                            />
                          </div>

                          <p className="text-xs text-slate-500">
                            Quality
                          </p>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-white">
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
                        className="group rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-orange-400/20 hover:bg-orange-500/[0.04]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10">
                            <Check
                              size={14}
                              className="text-orange-400"
                            />
                          </div>

                          <p className="text-xs text-slate-500">
                            Preparation
                          </p>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-white">
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
                    className="mt-8 border-t border-white/[0.08] pt-6"
                  >

                    {/* Price + Quantity */}

                    <div className="flex items-end justify-between gap-4">

                      {/* Price */}

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
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
                          className="mt-1 text-3xl font-black text-orange-400"
                        >
                          ${item.price.toFixed(2)}
                        </motion.p>
                      </div>

                      {/* Quantity */}

                      <div className="flex items-center overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.03]">

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
                          className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors"
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
                          className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Total */}

                    <motion.div
                      layout
                      className="mt-4 flex items-center justify-between rounded-xl border border-orange-400/10 bg-orange-500/[0.04] px-4 py-3"
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
                      className={`relative mt-4 flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 ${
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

