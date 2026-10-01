import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  ShoppingBag,
  Truck,
  Utensils,
  X,
  XCircle,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { useEffect, useState } from "react";

import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

function OrderHistory({ onBack }) {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelModal, setCancelModal] = useState(null);

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    if (!token) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/orders/my-orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to fetch your orders."
        );
      }

      setOrders(
        Array.isArray(data.orders)
          ? data.orders
          : []
      );
    } catch (err) {
      console.error(
        "Order history error:",
        err
      );

      setError(
        err.message ||
          "Unable to load your order history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // =====================================================
  // GO BACK
  // =====================================================

  const handleGoBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  // =====================================================
  // CANCEL ORDER
  // =====================================================

  const handleCancelOrder = async (orderId) => {
    if (!token || !orderId) {
      return;
    }

    try {
      setCancellingId(orderId);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to cancel the order."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus:
                  data.order?.orderStatus ||
                  "Cancelled",
                paymentStatus:
                  data.order?.paymentStatus ||
                  order.paymentStatus,
              }
            : order
        )
      );

      setCancelModal(null);
    } catch (err) {
      console.error(
        "Cancel order error:",
        err
      );

      setError(
        err.message ||
          "Unable to cancel the order."
      );
    } finally {
      setCancellingId(null);
    }
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const canCancelOrder = (orderStatus) => {
    return (
      orderStatus === "Pending" ||
      orderStatus === "Confirmed"
    );
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Delivered":
        return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";

      case "Confirmed":
        return "border-blue-400/20 bg-blue-500/10 text-blue-300";

      case "Preparing":
        return "border-amber-400/20 bg-amber-500/10 text-amber-300";

      case "Out for Delivery":
        return "border-purple-400/20 bg-purple-500/10 text-purple-300";

      case "Cancelled":
        return "border-red-400/20 bg-red-500/10 text-red-300";

      default:
        return "border-orange-400/20 bg-orange-500/10 text-orange-300";
    }
  };

  const getPaymentClasses = (status) => {
    switch (status) {
      case "Paid":
        return "text-emerald-400";

      case "Refunded":
        return "text-purple-400";

      default:
        return "text-amber-400";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-PK",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  const formatPrice = (amount) => {
    return `Rs. ${Number(
      amount || 0
    ).toLocaleString()}`;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center py-24 sm:py-28">
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10"
            >
              <RefreshCw
                size={24}
                className="text-orange-400"
              />
            </motion.div>

            <p className="mt-5 text-sm font-semibold text-slate-300">
              Loading your orders...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="min-h-screen overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">

        {/* BACK BUTTON */}

        <motion.button
          type="button"
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          whileHover={{
            x: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleGoBack}
          className="mb-7 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-slate-300 transition-all duration-300 hover:border-orange-400/30 hover:bg-orange-500/10 hover:text-orange-400 sm:mb-8"
        >
          <ArrowLeft size={17} />
          Back
        </motion.button>

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10">
              <ShoppingBag
                size={20}
                className="text-orange-400"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-xs">
                TasteBite
              </p>

              <h1 className="mt-0.5 text-2xl font-black tracking-tight sm:text-4xl">
                Order History
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:leading-7">
            View your previous orders, track their
            current status, and cancel eligible
            orders.
          </p>
        </motion.div>

        {/* ERROR */}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mt-7 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 sm:mt-8"
            >
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-red-300">
                  Something went wrong
                </p>

                <p className="mt-1 break-words text-xs leading-5 text-red-300/70 sm:text-sm">
                  {error}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EMPTY */}

        {!error && orders.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] px-5 py-16 text-center backdrop-blur-xl sm:mt-10 sm:px-6 sm:py-20"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10">
              <Package
                size={28}
                className="text-orange-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              You haven't placed any orders yet.
              Your orders will appear here after
              checkout.
            </p>
          </motion.div>
        )}

        {/* ORDERS */}

        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
          <AnimatePresence>
            {orders.map((order, index) => {
              const canCancel =
                canCancelOrder(
                  order.orderStatus
                );

              const isCancelling =
                cancellingId === order._id;

              return (
                <motion.article
                  key={order._id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/10 backdrop-blur-xl sm:rounded-3xl"
                >
                  {/* ORDER TOP */}

                  <div className="border-b border-white/[0.07] p-4 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                          <span className="text-sm font-bold text-white">
                            Order #
                            {String(
                              order._id
                            ).slice(-8)}
                          </span>

                          <span
                            className={`inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:text-xs ${getStatusClasses(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus ===
                            "Delivered" ? (
                              <CheckCircle2
                                size={13}
                              />
                            ) : order.orderStatus ===
                              "Cancelled" ? (
                              <XCircle
                                size={13}
                              />
                            ) : (
                              <Clock3
                                size={13}
                              />
                            )}

                            {order.orderStatus}
                          </span>
                        </div>

                        <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
                          {formatDate(
                            order.createdAt
                          )}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-6">
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-500 sm:text-xs">
                            Total
                          </p>

                          <p className="mt-1 truncate text-base font-black text-orange-400 sm:text-lg">
                            {formatPrice(
                              order.totalAmount
                            )}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-500 sm:text-xs">
                            Payment
                          </p>

                          <p
                            className={`mt-1 truncate text-xs font-bold sm:text-sm ${getPaymentClasses(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ORDER CONTENT */}

                  <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_280px]">

                    {/* ITEMS */}

                    <div className="min-w-0">
                      <div className="mb-4 flex items-center gap-2">
                        <Package
                          size={17}
                          className="text-orange-400"
                        />

                        <h3 className="text-sm font-bold text-white">
                          Ordered Items
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {order.items?.map(
                          (item, itemIndex) => (
                            <div
                              key={
                                item._id ||
                                itemIndex
                              }
                              className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-black/10 p-3 sm:gap-4"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                {item.image ? (
                                  <img
                                    src={
                                      item.image
                                    }
                                    alt={
                                      item.name
                                    }
                                    loading="lazy"
                                    className="h-12 w-12 shrink-0 rounded-xl object-cover sm:h-14 sm:w-14"
                                  />
                                ) : (
                                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 sm:h-14 sm:w-14">
                                    <Utensils
                                      size={20}
                                      className="text-orange-400"
                                    />
                                  </div>
                                )}

                                <div className="min-w-0">
                                  <p className="truncate text-xs font-bold text-white sm:text-sm">
                                    {item.name}
                                  </p>

                                  <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                                    {item.quantity} ×{" "}
                                    {formatPrice(
                                      item.price
                                    )}
                                  </p>
                                </div>
                              </div>

                              <p className="shrink-0 text-xs font-bold text-slate-200 sm:text-sm">
                                {formatPrice(
                                  Number(
                                    item.price ||
                                      0
                                  ) *
                                    Number(
                                      item.quantity ||
                                        0
                                    )
                                )}
                              </p>
                            </div>
                          )
                        )}
                      </div>

                      {/* PRICE SUMMARY */}

                      <div className="mt-5 space-y-2 rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                          <span className="text-slate-500">
                            Subtotal
                          </span>

                          <span className="text-right text-slate-300">
                            {formatPrice(
                              order.subtotal
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                          <span className="text-slate-500">
                            Delivery Fee
                          </span>

                          <span className="text-right text-slate-300">
                            {formatPrice(
                              order.deliveryFee
                            )}
                          </span>
                        </div>

                        <div className="my-2 border-t border-white/[0.06]" />

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-bold text-white">
                            Total
                          </span>

                          <span className="text-sm font-black text-orange-400 sm:text-base">
                            {formatPrice(
                              order.totalAmount
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ORDER DETAILS */}

                    <div className="min-w-0">
                      <div className="mb-4 flex items-center gap-2">
                        <Truck
                          size={17}
                          className="text-orange-400"
                        />

                        <h3 className="text-sm font-bold text-white">
                          Order Details
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                          <p className="text-xs text-slate-500">
                            Order Type
                          </p>

                          <p className="mt-1 text-sm font-bold capitalize text-slate-200">
                            {order.orderType}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                          <p className="text-xs text-slate-500">
                            Payment Method
                          </p>

                          <p className="mt-1 break-words text-sm font-bold text-slate-200">
                            {order.paymentMethod}
                          </p>
                        </div>

                        {order.customerPhone && (
                          <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                            <div className="flex items-center gap-2">
                              <Phone
                                size={14}
                                className="text-orange-400"
                              />

                              <p className="text-xs text-slate-500">
                                Phone
                              </p>
                            </div>

                            <p className="mt-1 break-all text-sm font-bold text-slate-200">
                              {
                                order.customerPhone
                              }
                            </p>
                          </div>
                        )}

                        {order.orderType ===
                          "delivery" &&
                          order.deliveryAddress && (
                            <div className="rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                              <div className="flex items-center gap-2">
                                <MapPin
                                  size={14}
                                  className="text-orange-400"
                                />

                                <p className="text-xs text-slate-500">
                                  Delivery Address
                                </p>
                              </div>

                              <p className="mt-1 break-words text-sm leading-6 text-slate-300">
                                {
                                  order.deliveryAddress
                                }
                              </p>

                              {order.deliveryCity && (
                                <p className="mt-1 text-xs text-slate-500">
                                  {
                                    order.deliveryCity
                                  }
                                </p>
                              )}
                            </div>
                          )}
                      </div>

                      {/* CANCEL BUTTON */}

                      {canCancel && (
                        <motion.button
                          type="button"
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          disabled={
                            isCancelling
                          }
                          onClick={() =>
                            setCancelModal(
                              order
                            )
                          }
                          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle
                            size={17}
                          />

                          {isCancelling
                            ? "Cancelling..."
                            : "Cancel Order"}
                        </motion.button>
                      )}

                      {!canCancel &&
                        order.orderStatus !==
                          "Cancelled" &&
                        order.orderStatus !==
                          "Delivered" && (
                          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                            This order can no longer
                            be cancelled because
                            preparation has started.
                          </p>
                        )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* =====================================================
          CANCEL CONFIRMATION MODAL
      ===================================================== */}

      <AnimatePresence>
        {cancelModal && (
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
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 py-6 backdrop-blur-md sm:py-8"
            onClick={() =>
              !cancellingId &&
              setCancelModal(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="my-auto w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/40 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
                  <XCircle
                    size={24}
                    className="text-red-400"
                  />
                </div>

                <button
                  type="button"
                  disabled={Boolean(
                    cancellingId
                  )}
                  onClick={() =>
                    setCancelModal(null)
                  }
                  aria-label="Close cancellation dialog"
                  className="flex h-10 w-10 items-center justify-center rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              <h2 className="mt-5 text-xl font-black text-white">
                Cancel this order?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Are you sure you want to cancel
                this order? This action cannot be
                undone.
              </p>

              {cancelModal.paymentStatus ===
                "Paid" && (
                <div className="mt-4 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
                  <p className="text-xs leading-5 text-purple-300">
                    This order has already been paid.
                    The payment status will be
                    changed to{" "}
                    <strong>Refunded</strong>.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={Boolean(
                    cancellingId
                  )}
                  onClick={() =>
                    setCancelModal(null)
                  }
                  className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  Keep Order
                </button>

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={Boolean(
                    cancellingId
                  )}
                  onClick={() =>
                    handleCancelOrder(
                      cancelModal._id
                    )
                  }
                  className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cancellingId
                    ? "Cancelling..."
                    : "Yes, Cancel"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default OrderHistory;