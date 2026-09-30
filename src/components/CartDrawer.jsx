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

  const deliveryFee =
    cartItems.length > 0 ? 2.99 : 0;

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
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/[0.1] bg-slate-950 shadow-2xl shadow-black/50"
          >
            {/* =================================================
                HEADER
            ================================================== */}

            <div className="relative flex items-center justify-between border-b border-white/[0.08] px-5 py-5 sm:px-6">

              {/* Top glow */}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

              <div className="flex items-center gap-3">

                {/* Cart Icon */}

                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: -5,
                  }}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/10 bg-orange-500/10 text-orange-400"
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

                <div>
                  <h2 className="text-lg font-bold text-white">
                    Your Cart
                  </h2>

                  <p className="text-xs text-slate-500">
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </motion.button>
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================== */}

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">

              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">

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

                  <h3 className="mt-6 text-xl font-bold text-white">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
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
                    className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
                  >
                    Explore Menu
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">

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
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-orange-400/20 hover:bg-white/[0.04]"
                    >
                      <div className="flex gap-4">

                        {/* Image */}

                        <motion.div
                          whileHover={{
                            scale: 1.04,
                          }}
                          className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </motion.div>

                        {/* Details */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-400">
                                {item.category}
                              </p>

                              <h3 className="mt-1 truncate text-sm font-bold text-white">
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
                                removeFromCart(
                                  item.id
                                )
                              }
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2 size={15} />
                            </motion.button>
                          </div>

                          {/* Quantity */}

                          <div className="mt-3 flex items-center justify-between">

                            <div className="flex items-center overflow-hidden rounded-lg border border-white/10 bg-black/20">

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
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-slate-400 transition"
                              >
                                <Minus size={13} />
                              </motion.button>

                              {/* Quantity */}

                              <AnimatePresence
                                mode="wait"
                              >
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
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-slate-400 transition hover:text-orange-400"
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
                              className="text-sm font-bold text-orange-400"
                            >
                              $
                              {(
                                item.price *
                                item.quantity
                              ).toFixed(2)}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart */}

                  <div className="flex justify-end pt-2">
                    <motion.button
                      type="button"
                      whileHover={{
                        x: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={clearCart}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-red-400"
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
                className="border-t border-white/[0.08] bg-slate-950/95 px-5 py-5 backdrop-blur-xl sm:px-6"
              >
                <div className="space-y-3">

                  {/* Subtotal */}

                  <div className="flex items-center justify-between text-sm">
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
                      ${subtotal.toFixed(2)}
                    </motion.span>
                  </div>

                  {/* Delivery */}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Delivery
                    </span>

                    <span className="font-medium text-slate-300">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Total */}

                  <div className="flex items-center justify-between">
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
                      className="text-xl font-black text-orange-400"
                    >
                      ${total.toFixed(2)}
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
                  className="relative mt-5 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-500 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
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

                <p className="mt-3 text-center text-[11px] text-slate-600">
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