
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

import { useCart } from "../context/CartContext";

const ORDER_HISTORY_KEY = "restaurant-order-history";

function Checkout({ onBack }) {
  const {
    cartItems,
    subtotal,
    clearCart,
  } = useCart();

  const [orderType, setOrderType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronous protection against double submission
  const submitLock = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const deliveryFee =
    orderType === "delivery" && cartItems.length > 0
      ? 2.99
      : 0;

  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const generateOrderNumber = () => {
    const randomPart = Math.floor(
      100000 + Math.random() * 900000
    );

    return `ORD-${randomPart}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // IMPORTANT:
    // This runs synchronously and prevents a second
    // submit before React updates the state.
    if (submitLock.current) {
      return;
    }

    if (!cartItems.length) {
      return;
    }

    submitLock.current = true;
    setIsSubmitting(true);

    const newOrderNumber = generateOrderNumber();

    const newOrder = {
      id:
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,

      orderNumber: newOrderNumber,

      createdAt: new Date().toISOString(),

      status: "Confirmed",

      estimatedTime: "25–40 min",

      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,

        address:
          orderType === "delivery"
            ? formData.address
            : "",

        city:
          orderType === "delivery"
            ? formData.city
            : "",

        notes: formData.notes,
      },

      orderType,

      paymentMethod,

      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),

      subtotal,

      deliveryFee,

      total,
    };

    try {
      const savedOrders = localStorage.getItem(
        ORDER_HISTORY_KEY
      );

      let existingOrders = [];

      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);

          if (Array.isArray(parsedOrders)) {
            existingOrders = parsedOrders;
          }
        } catch (error) {
          console.error(
            "Invalid order history:",
            error
          );
        }
      }

      const updatedOrders = [
        newOrder,
        ...existingOrders,
      ];

      localStorage.setItem(
        ORDER_HISTORY_KEY,
        JSON.stringify(updatedOrders)
      );

      // Save order number for confirmation screen
      setOrderNumber(newOrderNumber);

      // Clear cart AFTER order is successfully saved
      clearCart();

      // Show confirmation
      setOrderPlaced(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Failed to save order:",
        error
      );

      // Allow user to try again only if saving failed
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  /*
   * EMPTY CART
   */
  if (!cartItems.length && !orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <ShoppingBag
              size={32}
              className="text-slate-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Your cart is empty
          </h1>

          <p className="mt-3 text-slate-400">
            Add some delicious dishes before continuing
            to checkout.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400"
          >
            <ArrowLeft size={17} />
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  /*
   * ORDER CONFIRMATION
   */
  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20">
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
          className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/30 sm:p-10"
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
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/30"
          >
            <Check
              size={36}
              strokeWidth={3}
              className="text-white"
            />
          </motion.div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
            Your order has been received successfully.
            Our kitchen will start preparing your meal
            shortly.
          </p>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Order Number
              </span>

              <span className="text-sm font-bold text-orange-400">
                {orderNumber}
              </span>
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Order Status
              </span>

              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                Confirmed
              </span>
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Estimated Time
              </span>

              <span className="text-sm font-semibold text-white">
                25–40 min
              </span>
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Total
              </span>

              <span className="text-lg font-black text-orange-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-orange-500/10 bg-orange-500/5 px-4 py-3">
            <p className="text-xs leading-5 text-slate-400">
              Your order has also been saved to your
              order history.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 active:scale-[0.98]"
          >
            <ArrowLeft size={17} />
            Back to Restaurant
          </button>
        </motion.div>
      </div>
    );
  }

  /*
   * CHECKOUT
   */
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-orange-400"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </button>

          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Secure Checkout
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Complete your order
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Enter your details and choose how you'd like
              to receive your order.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-6">
            {/* CUSTOMER INFORMATION */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    Customer Information
                  </h2>

                  <p className="text-xs text-slate-500">
                    Your contact details
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
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
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
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
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                  />
                </div>
              </div>
            </section>

            {/* ORDER TYPE */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Truck size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    Order Type
                  </h2>

                  <p className="text-xs text-slate-500">
                    How would you like your order?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setOrderType("delivery")
                  }
                  className={`rounded-2xl border p-4 text-left transition ${
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

                  <p className="mt-1 text-xs text-slate-500">
                    Delivered to your address
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`rounded-2xl border p-4 text-left transition ${
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

                  <p className="mt-1 text-xs text-slate-500">
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
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-white">
                      Delivery Address
                    </h2>

                    <p className="text-xs text-slate-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
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
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
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
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-400/50 focus:bg-white/[0.06]"
                    />
                  </div>
                </div>
              </motion.section>
            )}

            {/* PAYMENT */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    Payment Method
                  </h2>

                  <p className="text-xs text-slate-500">
                    Choose your preferred payment method
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 transition ${
                    paymentMethod === "card"
                      ? "border-orange-400/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard
                      size={20}
                      className="text-orange-400"
                    />

                    <div className="text-left">
                      <p className="text-sm font-bold text-white">
                        Credit / Debit Card
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Visa, Mastercard and more
                      </p>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <Check
                      size={18}
                      className="text-orange-400"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("cash")
                  }
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 transition ${
                    paymentMethod === "cash"
                      ? "border-orange-400/50 bg-orange-500/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-orange-400/50">
                      <div className="h-2 w-2 rounded-full bg-orange-400" />
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-bold text-white">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>

                  {paymentMethod === "cash" && (
                    <Check
                      size={18}
                      className="text-orange-400"
                    />
                  )}
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs leading-5 text-slate-500">
                    This is a frontend payment interface.
                    Real payment processing can be connected
                    later using a secure payment provider.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/10 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
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
                  className="text-orange-400"
                />
              </div>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
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
                        ${item.price.toFixed(2)} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-slate-300">
                      $
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="text-slate-300">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="text-slate-300">
                    {deliveryFee === 0
                      ? "Free"
                      : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="my-5 h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-white">
                  Total
                </span>

                <span className="text-2xl font-black text-orange-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition ${
                  isSubmitting
                    ? "cursor-not-allowed bg-orange-500/50"
                    : "bg-orange-500 hover:bg-orange-400 active:scale-[0.98]"
                }`}
              >
                <Check size={18} />

                {isSubmitting
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-slate-600">
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

