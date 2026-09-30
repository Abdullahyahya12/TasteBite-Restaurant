import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  ChefHat,
  Trash2,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";

const statusSteps = [
  {
    key: "Pending",
    label: "Pending",
    icon: Clock3,
  },
  {
    key: "Preparing",
    label: "Preparing",
    icon: ChefHat,
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: PackageCheck,
  },
  {
    key: "Completed",
    label: "Completed",
    icon: CheckCircle2,
  },
];

const statusIndex = {
  Pending: 0,
  Preparing: 1,
  Delivered: 2,
  Completed: 3,
};

function OrderHistory({ onBack }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(
        "restaurant-order-history"
      );

      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((currentOrders) => {
      const updatedOrders = currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      );

      localStorage.setItem(
        "restaurant-order-history",
        JSON.stringify(updatedOrders)
      );

      return updatedOrders;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("restaurant-order-history");
    setOrders([]);
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "border-amber-400/20 bg-amber-400/10 text-amber-400";

      case "Preparing":
        return "border-blue-400/20 bg-blue-400/10 text-blue-400";

      case "Delivered":
        return "border-violet-400/20 bg-violet-400/10 text-violet-400";

      case "Completed":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";

      default:
        return "border-slate-400/20 bg-slate-400/10 text-slate-400";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-400"
            >
              <ArrowLeft size={17} />
              Back to Restaurant
            </button>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Your Orders
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Order History
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Track your orders and view their current status.
            </p>
          </div>

          {orders.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/15"
            >
              <Trash2 size={16} />
              Clear History
            </button>
          )}
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <ShoppingBag size={30} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-white">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Once you place an order, it will appear here with its
              current status and details.
            </p>

            <button
              type="button"
              onClick={onBack}
              className="mt-7 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="space-y-7">
            {orders.map((order) => {
              const currentStatus =
                order.status || "Pending";

              const currentStatusIndex =
                statusIndex[currentStatus] ?? 0;

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/10"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold text-white">
                          Order #{order.orderNumber}
                        </h2>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            currentStatus
                          )}`}
                        >
                          {currentStatus}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Total
                      </p>

                      <p className="mt-1 text-xl font-bold text-orange-400">
                        ${Number(order.total || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Status Progress */}
                  <div className="border-b border-white/10 px-5 py-7 sm:px-6">
                    <div className="grid grid-cols-4 gap-2">
                      {statusSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted =
                          index <= currentStatusIndex;
                        const isCurrent =
                          index === currentStatusIndex;

                        return (
                          <div
                            key={step.key}
                            className="relative text-center"
                          >
                            {index <
                              statusSteps.length - 1 && (
                              <div
                                className={`absolute left-1/2 top-5 hidden h-0.5 w-full sm:block ${
                                  index <
                                  currentStatusIndex
                                    ? "bg-orange-500"
                                    : "bg-white/10"
                                }`}
                              />
                            )}

                            <div
                              className={`relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border transition ${
                                isCompleted
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-white/10 bg-slate-900 text-slate-600"
                              } ${
                                isCurrent
                                  ? "ring-4 ring-orange-500/10"
                                  : ""
                              }`}
                            >
                              <Icon size={17} />
                            </div>

                            <p
                              className={`mt-3 text-[11px] font-semibold sm:text-xs ${
                                isCompleted
                                  ? "text-white"
                                  : "text-slate-600"
                              }`}
                            >
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid gap-5 border-b border-white/10 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Customer
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {order.customer?.name || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Phone
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {order.customer?.phone || "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Order Type
                      </p>
                      <p className="mt-1 text-sm font-medium capitalize text-slate-200">
                        {order.orderType || "—"}
                      </p>
                    </div>

                    {order.orderType === "delivery" && (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Delivery Address
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-200">
                          {order.customer?.address || "—"}
                          {order.customer?.city
                            ? `, ${order.customer.city}`
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  <div className="border-b border-white/10 p-5 sm:p-6">
                    <h3 className="text-sm font-semibold text-white">
                      Order Items
                    </h3>

                    <div className="mt-4 space-y-3">
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 p-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <ShoppingBag
                                    size={18}
                                    className="text-slate-600"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-white">
                                {item.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>

                          <p className="shrink-0 text-sm font-semibold text-slate-200">
                            $
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 0)
                            ).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Estimated Time
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-200">
                        {order.estimatedTime || "25–40 min"}
                      </p>
                    </div>

                    <div className="w-full max-w-sm space-y-2 text-sm lg:min-w-[280px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Subtotal</span>
                        <span>
                          ${Number(order.subtotal || 0).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate-400">
                        <span>Delivery Fee</span>
                        <span>
                          ${Number(order.deliveryFee || 0).toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-semibold text-white">
                        <span>Total</span>
                        <span className="text-orange-400">
                          ${Number(order.total || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Demo Status Controls */}
                  <div className="border-t border-white/10 bg-black/10 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                      Order Status Controls
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {statusSteps.map((step) => {
                        const isActive =
                          step.key === currentStatus;

                        const stepIsBefore =
                          statusIndex[step.key] <
                          currentStatusIndex;

                        return (
                          <button
                            key={step.key}
                            type="button"
                            disabled={
                              isActive || stepIsBefore
                            }
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                step.key
                              )
                            }
                            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                              isActive
                                ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                                : stepIsBefore
                                ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-700"
                                : "border-white/10 bg-white/5 text-slate-400 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
                            }`}
                          >
                            {step.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderHistory;