import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
  User,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

function Checkout({ onBack }) {
  const {
    cartItems,
    subtotal,
    clearCart,
  } = useCart();

  const {
    user,
    token,
    isAuthenticated,
  } = useAuth();

  const [orderType, setOrderType] =
    useState("delivery");

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [orderNumber, setOrderNumber] =
    useState("");

  const [confirmedTotal, setConfirmedTotal] =
    useState(0);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const submitLock = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  // =========================
  // Prefill Logged-In User
  // =========================

  useEffect(() => {
    if (!user) return;

    setFormData((current) => ({
      ...current,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    }));
  }, [user]);

  // =========================
  // Delivery Fee
  // =========================

  const deliveryFee =
    orderType === "delivery" &&
    cartItems.length > 0
      ? 150
      : 0;

  const total = subtotal + deliveryFee;

  // =========================
  // Handle Input
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =========================
  // Payment Mapping
  // =========================

  const getBackendPaymentMethod = () => {
    if (paymentMethod === "cash") {
      return "Cash on Delivery";
    }

    if (paymentMethod === "card") {
      return "Card";
    }

    return "Cash on Delivery";
  };

  // =========================
  // Place Order
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitLock.current) {
      return;
    }

    // =========================
    // Authentication Check
    // =========================

    if (!isAuthenticated || !token) {
      setError(
        "Please login before placing your order."
      );

      return;
    }

    // =========================
    // Cart Check
    // =========================

    if (!cartItems.length) {
      setError(
        "Your cart is empty. Please add items before checkout."
      );

      return;
    }

    // =========================
    // Customer Validation
    // =========================

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (
      orderType === "delivery" &&
      !formData.address.trim()
    ) {
      setError(
        "Please enter your delivery address."
      );

      return;
    }

    if (
      orderType === "delivery" &&
      !formData.city.trim()
    ) {
      setError("Please enter your city.");
      return;
    }

    submitLock.current = true;

    setIsSubmitting(true);
    setError("");

    try {
      // =========================
      // Prepare Backend Items
      // =========================

      const orderItems = cartItems.map((item) => ({
        menuItem: item.id,
        quantity: item.quantity,
      }));

      // =========================
      // Prepare Backend Payload
      // =========================

      const orderData = {
        items: orderItems,

        customerPhone:
          formData.phone.trim(),

        orderType,

        deliveryAddress:
          orderType === "delivery"
            ? formData.address.trim()
            : "",

        deliveryCity:
          orderType === "delivery"
            ? formData.city.trim()
            : "",

        deliveryNotes:
          formData.notes.trim(),

        paymentMethod:
          getBackendPaymentMethod(),
      };

      // =========================
      // API Request
      // =========================

      const response = await fetch(
        `${API_BASE_URL}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      // =========================
      // Handle API Error
      // =========================

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to place your order."
        );
      }

      // =========================
      // Successful Order
      // =========================

      const createdOrder = data.order;

      setOrderNumber(
        createdOrder?._id ||
          "Order confirmed"
      );

      setConfirmedTotal(
        createdOrder?.totalAmount ||
          total
      );

      clearCart();

      setOrderPlaced(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while placing your order."
      );

      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (!cartItems.length && !orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:h-20 sm:w-20">
            <ShoppingBag
              size={29}
              className="text-slate-600 sm:h-8 sm:w-8"
            />
          </div>

          <h1 className="mt-5 text-2xl font-black sm:mt-6 sm:text-3xl">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Add some delicious dishes before continuing
            to checkout.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 sm:mt-7 sm:px-6"
          >
            <ArrowLeft size={17} />
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // ORDER CONFIRMATION
  // =========================

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-start justify-center bg-slate-950 px-4 py-12 sm:items-center sm:px-6 sm:py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center shadow-2xl shadow-black/30 sm:rounded-3xl sm:p-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 220,
              damping: 15,
            }}
            className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/30 sm:h-20 sm:w-20"
          >
            <Check
              size={32}
              strokeWidth={3}
              className="text-white sm:h-9 sm:w-9"
            />
          </motion.div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400 sm:mt-7 sm:text-sm sm:tracking-[0.2em]">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-slate-400 sm:mt-4 sm:text-sm sm:leading-7">
            Your order has been received successfully.
            Our kitchen will start preparing your meal
            shortly.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left sm:mt-7 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="shrink-0 text-xs text-slate-500 sm:text-sm">
                Order ID
              </span>

              <span className="min-w-0 max-w-[65%] truncate text-right text-xs font-bold text-orange-400 sm:text-sm">
                {orderNumber}
              </span>
            </div>

            <div className="my-3 h-px bg-white/10 sm:my-4" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 sm:text-sm">
                Order Status
              </span>

              <span className="shrink-0 rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold text-orange-400 sm:text-xs">
                Pending
              </span>
            </div>

            <div className="my-3 h-px bg-white/10 sm:my-4" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 sm:text-sm">
                Order Type
              </span>

              <span className="text-xs font-semibold capitalize text-white sm:text-sm">
                {orderType}
              </span>
            </div>

            <div className="my-3 h-px bg-white/10 sm:my-4" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 sm:text-sm">
                Estimated Time
              </span>

              <span className="text-xs font-semibold text-white sm:text-sm">
                25–40 min
              </span>
            </div>

            <div className="my-3 h-px bg-white/10 sm:my-4" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500 sm:text-sm">
                Total
              </span>

              <span className="text-base font-black text-orange-400 sm:text-lg">
                Rs. {confirmedTotal.toFixed(0)}
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3 sm:mt-4">
            <p className="text-[10px] leading-5 text-slate-400 sm:text-xs">
              Your order has been saved successfully.
              You can view its live status from Order
              History.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 active:scale-[0.98] sm:mt-7"
          >
            <ArrowLeft size={17} />
            Back to Restaurant
          </button>
        </motion.div>
      </div>
    );
  }

  // =========================
  // CHECKOUT
  // =========================

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8 sm:mb-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </button>

          <div className="mt-6 sm:mt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400 sm:text-xs sm:tracking-[0.2em]">
              Secure Checkout
            </p>

            <h1 className="mt-2 text-[2rem] font-black leading-tight tracking-tight sm:text-5xl">
              Complete your order
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
              Enter your details and choose how you'd like
              to receive your order.
            </p>
          </div>
        </div>

        {/* Authentication Warning */}

        {!isAuthenticated && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3.5 text-sm text-yellow-400 sm:mb-6 sm:px-4 sm:py-4">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="min-w-0">
              <p className="font-semibold">
                Login required
              </p>

              <p className="mt-1 text-[11px] leading-5 text-yellow-400/70 sm:text-xs">
                Please login before placing your order.
              </p>
            </div>
          </div>
        )}

        {/* API Error */}

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
              className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3.5 text-sm text-red-400 sm:mb-6 sm:py-4"
            >
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <div className="min-w-0">
                <p className="font-semibold">
                  Unable to place order
                </p>

                <p className="mt-1 break-words text-[11px] leading-5 text-red-400/70 sm:text-xs">
                  {error}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8"
        >
          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* CUSTOMER INFORMATION */}

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <User size={20} />
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-white">
                    Customer Information
                  </h2>

                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    Your contact details
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Full Name
                  </label>

                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Phone Number
                  </label>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    autoComplete="tel"
                    inputMode="tel"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Email Address
                  </label>

                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                  />
                </div>
              </div>
            </section>

            {/* ORDER TYPE */}

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Truck size={20} />
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-white">
                    Order Type
                  </h2>

                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    How would you like your order?
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setOrderType("delivery")
                  }
                  className={`min-h-[120px] rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${
                    orderType === "delivery"
                      ? "border-orange-400/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck
                      size={20}
                      className={
                        orderType === "delivery"
                          ? "text-orange-400"
                          : "text-slate-500"
                      }
                    />

                    {orderType === "delivery" && (
                      <Check
                        size={17}
                        className="text-orange-400"
                      />
                    )}
                  </div>

                  <p className="mt-4 text-sm font-bold text-white">
                    Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Delivered to your address
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOrderType("pickup")
                  }
                  className={`min-h-[120px] rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${
                    orderType === "pickup"
                      ? "border-orange-400/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ShoppingBag
                      size={20}
                      className={
                        orderType === "pickup"
                          ? "text-orange-400"
                          : "text-slate-500"
                      }
                    />

                    {orderType === "pickup" && (
                      <Check
                        size={17}
                        className="text-orange-400"
                      />
                    )}
                  </div>

                  <p className="mt-4 text-sm font-bold text-white">
                    Pickup
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Pick up from restaurant
                  </p>
                </button>
              </div>
            </section>

            {/* DELIVERY ADDRESS */}

            {orderType === "delivery" && (
              <motion.section
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <MapPin size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-white">
                      Delivery Address
                    </h2>

                    <p className="text-[11px] text-slate-500 sm:text-xs">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Street Address
                    </label>

                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      autoComplete="street-address"
                      className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      City
                    </label>

                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Lahore"
                      autoComplete="address-level2"
                      className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Delivery Notes
                    </label>

                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {/* PAYMENT */}

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:rounded-3xl sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <CreditCard size={20} />
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-white">
                    Payment Method
                  </h2>

                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    Choose your preferred payment method
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 sm:mt-6">
                {/* CARD */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  className={`flex min-h-[70px] w-full items-center justify-between gap-3 rounded-2xl border p-4 transition focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${
                    paymentMethod === "card"
                      ? "border-orange-400/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <CreditCard
                      size={20}
                      className="shrink-0 text-orange-400"
                    />

                    <div className="min-w-0 text-left">
                      <p className="truncate text-sm font-bold text-white">
                        Credit / Debit Card
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                        Visa, Mastercard and more
                      </p>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <Check
                      size={18}
                      className="shrink-0 text-orange-400"
                    />
                  )}
                </button>

                {/* CASH */}

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("cash")
                  }
                  className={`flex min-h-[70px] w-full items-center justify-between gap-3 rounded-2xl border p-4 transition focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${
                    paymentMethod === "cash"
                      ? "border-orange-400/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange-400/50">
                      <div className="h-2 w-2 rounded-full bg-orange-400" />
                    </div>

                    <div className="min-w-0 text-left">
                      <p className="text-sm font-bold text-white">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>

                  {paymentMethod === "cash" && (
                    <Check
                      size={18}
                      className="shrink-0 text-orange-400"
                    />
                  )}
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:mt-5">
                  <p className="text-[11px] leading-5 text-slate-500 sm:text-xs">
                    This is a frontend payment interface.
                    Real payment processing can be connected
                    later using a secure payment provider.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* ORDER SUMMARY */}

          <aside className="h-fit min-w-0 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/10 sm:rounded-3xl sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-white">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {cartItems.length}{" "}
                    {cartItems.length === 1
                      ? "item"
                      : "items"}
                  </p>
                </div>

                <ShoppingBag
                  size={20}
                  className="shrink-0 text-orange-400"
                />
              </div>

              <div className="mt-5 space-y-4 sm:mt-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-w-0 gap-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Rs. {item.price.toFixed(0)} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs font-bold text-slate-300 sm:text-sm">
                      Rs.{" "}
                      {(
                        item.price * item.quantity
                      ).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-5 h-px bg-white/10 sm:my-6" />

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="shrink-0 text-slate-300">
                    Rs. {subtotal.toFixed(0)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="shrink-0 text-slate-300">
                    {deliveryFee === 0
                      ? "Free"
                      : `Rs. ${deliveryFee.toFixed(0)}`}
                  </span>
                </div>
              </div>

              <div className="my-4 h-px bg-white/10 sm:my-5" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-white">
                  Total
                </span>

                <span className="text-xl font-black text-orange-400 sm:text-2xl">
                  Rs. {total.toFixed(0)}
                </span>
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !isAuthenticated
                }
                className={`mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition sm:mt-6 sm:min-h-[52px] ${
                  isSubmitting ||
                  !isAuthenticated
                    ? "cursor-not-allowed bg-orange-500/50"
                    : "bg-orange-500 hover:bg-orange-400 active:scale-[0.98]"
                }`}
              >
                <Check size={18} />

                {isSubmitting
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <p className="mt-3 text-center text-[10px] leading-5 text-slate-600 sm:mt-4 sm:text-[11px]">
                By placing your order, you agree to our
                terms and restaurant policies.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

export default Checkout;