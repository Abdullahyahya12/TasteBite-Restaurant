import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useCart } from "../context/CartContext";

function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  // Delivery fee in PKR
  const deliveryFee =
    cartItems.length > 0 ? 150 : 0;

  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    onClose();

    if (typeof onCheckout === "function") {
      onCheckout();
    }
  };

  const cartItemCount = cartItems.reduce(
    (totalCount, item) =>
      totalCount + item.quantity,
    0
  );

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
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
          />

          {/* =====================================================
              DRAWER
          ====================================================== */}

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-md flex-col border-l border-white/[0.1] bg-slate-950 shadow-2xl shadow-black/50"
          >
            {/* =================================================
                HEADER
            ================================================== */}

            <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-6 sm:py-5">
              {/* Top glow */}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

              <div className="flex min-w-0 items-center gap-3">
                {/* Cart Icon */}

                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: -5,
                  }}
                  className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-500/10 text-orange-400"
                >
                  <ShoppingBag size={19} />

                  {cartItemCount > 0 && (
                    <motion.span
                      key={cartItemCount}
                      initial={{
                        scale: 0.5,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white shadow-lg shadow-orange-500/30"
                    >
                      {cartItemCount > 99
                        ? "99+"
                        : cartItemCount}
                    </motion.span>
                  )}
                </motion.div>

                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold text-white sm:text-lg">
                    Your Cart
                  </h2>

                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    {cartItems.length === 0
                      ? "Your cart is empty"
                      : `${cartItemCount} ${
                          cartItemCount === 1
                            ? "item"
                            : "items"
                        }`}
                  </p>
                </div>
              </div>

              {/* Close */}

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  scale: 1.08,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                aria-label="Close cart"
                className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40"
              >
                <X size={19} />
              </motion.button>
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================== */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              {cartItems.length === 0 ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-2 text-center">
                  <motion.div
                    animate={{
                      y: [0, -7, 0],
                      rotate: [0, -2, 2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                  >
                    <ShoppingBag
                      size={32}
                      className="text-slate-600"
                    />
                  </motion.div>

                  <h3 className="mt-6 text-lg font-bold text-white sm:text-xl">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 max-w-xs text-xs leading-6 text-slate-500 sm:text-sm">
                    Looks like you haven't added
                    anything to your cart yet.
                  </p>

                  <motion.button
                    type="button"
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={onClose}
                    className="mt-6 min-h-11 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
                  >
                    Explore Menu
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Cart Items */}

                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 30,
                        scale: 0.95,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-orange-400/20 hover:bg-white/[0.04] sm:p-3.5"
                    >
                      <div className="flex min-w-0 gap-3 sm:gap-4">
                        {/* Image */}

                        <motion.div
                          whileHover={{
                            scale: 1.04,
                          }}
                          className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </motion.div>

                        {/* Details */}

                        <div className="min-w-0 flex-1">
                          <div className="flex min-w-0 items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-orange-400 sm:text-[10px]">
                                {item.category}
                              </p>

                              <h3 className="mt-1 truncate text-xs font-bold text-white sm:text-sm">
                                {item.name}
                              </h3>
                            </div>

                            {/* Remove */}

                            <motion.button
                              type="button"
                              whileHover={{
                                scale: 1.1,
                              }}
                              whileTap={{
                                scale: 0.9,
                              }}
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              aria-label={`Remove ${item.name}`}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30"
                            >
                              <Trash2 size={15} />
                            </motion.button>
                          </div>

                          {/* Quantity */}

                          <div className="mt-2.5 flex items-center justify-between gap-2 sm:mt-3">
                            <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-white/10 bg-black/20">
                              {/* Minus */}

                              <motion.button
                                type="button"
                                whileHover={{
                                  backgroundColor:
                                    "rgba(255,255,255,0.06)",
                                }}
                                whileTap={{
                                  scale: 0.85,
                                }}
                                onClick={() =>
                                  decreaseQuantity(item.id)
                                }
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-9 w-9 items-center justify-center text-slate-400 transition focus:outline-none focus:ring-1 focus:ring-orange-400/40"
                              >
                                <Minus size={13} />
                              </motion.button>

                              {/* Quantity */}

                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={item.quantity}
                                  initial={{
                                    opacity: 0,
                                    y: -5,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    y: 5,
                                  }}
                                  className="w-7 text-center text-xs font-bold text-white"
                                >
                                  {item.quantity}
                                </motion.span>
                              </AnimatePresence>

                              {/* Plus */}

                              <motion.button
                                type="button"
                                whileHover={{
                                  backgroundColor:
                                    "rgba(249,115,22,0.12)",
                                }}
                                whileTap={{
                                  scale: 0.85,
                                }}
                                onClick={() =>
                                  increaseQuantity(item.id)
                                }
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-9 w-9 items-center justify-center text-slate-400 transition hover:text-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/40"
                              >
                                <Plus size={13} />
                              </motion.button>
                            </div>

                            {/* Item Total */}

                            <motion.p
                              key={`${item.id}-${item.quantity}`}
                              initial={{
                                opacity: 0,
                                scale: 0.9,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              className="min-w-0 truncate text-xs font-bold text-orange-400 sm:text-sm"
                            >
                              Rs.{" "}
                              {(
                                item.price *
                                item.quantity
                              ).toFixed(0)}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart */}

                  <div className="flex justify-end pt-1 sm:pt-2">
                    <motion.button
                      type="button"
                      whileHover={{
                        x: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={clearCart}
                      className="flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-slate-500 transition hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30"
                    >
                      <Trash2 size={13} />
                      Clear cart
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                FOOTER
            ================================================== */}

            {cartItems.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="shrink-0 border-t border-white/[0.08] bg-slate-950/95 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-6 sm:py-5"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  {/* Subtotal */}

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <motion.span
                      key={subtotal}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      className="font-medium text-slate-300"
                    >
                      Rs. {subtotal.toFixed(0)}
                    </motion.span>
                  </div>

                  {/* Delivery */}

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Delivery
                    </span>

                    <span className="font-medium text-slate-300">
                      Rs. {deliveryFee.toFixed(0)}
                    </span>
                  </div>

                  <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Total */}

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-bold text-white">
                      Total
                    </span>

                    <motion.span
                      key={total}
                      initial={{
                        opacity: 0,
                        scale: 0.85,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      className="text-lg font-black text-orange-400 sm:text-xl"
                    >
                      Rs. {total.toFixed(0)}
                    </motion.span>
                  </div>
                </div>

                {/* Checkout */}

                <motion.button
                  type="button"
                  onClick={handleCheckout}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="relative mt-4 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 sm:mt-5"
                >
                  {/* Button shine */}

                  <motion.span
                    initial={{
                      x: "-120%",
                    }}
                    animate={{
                      x: "120%",
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-white/10"
                  />

                  <span className="relative z-10">
                    Proceed to Checkout
                  </span>

                  <ArrowLeft
                    size={17}
                    className="relative z-10 rotate-180"
                  />
                </motion.button>

                <p className="mt-2.5 text-center text-[10px] leading-4 text-slate-600 sm:mt-3 sm:text-[11px]">
                  Secure checkout • Freshly prepared
                </p>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;