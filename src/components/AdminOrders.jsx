import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Clock3,
  CreditCard,
  DollarSign,
  Eye,
  Filter,
  Loader2,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  Trash2,
  Truck,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";

import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const PAYMENT_OPTIONS = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
];

const formatCurrency = (amount) => {
  return `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

    case "Out for Delivery":
      return "border-blue-500/20 bg-blue-500/10 text-blue-400";

    case "Preparing":
      return "border-orange-500/20 bg-orange-500/10 text-orange-400";

    case "Confirmed":
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-400";

    case "Cancelled":
      return "border-red-500/20 bg-red-500/10 text-red-400";

    default:
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }
};

const getPaymentClasses = (status) => {
  switch (status) {
    case "Paid":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

    case "Failed":
      return "border-red-500/20 bg-red-500/10 text-red-400";

    case "Refunded":
      return "border-purple-500/20 bg-purple-500/10 text-purple-400";

    default:
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }
};

function StatusIcon({ status }) {
  if (status === "Delivered") {
    return <Package size={15} />;
  }

  if (status === "Out for Delivery") {
    return <Truck size={15} />;
  }

  if (status === "Preparing") {
    return <Clock3 size={15} />;
  }

  if (status === "Cancelled") {
    return <X size={15} />;
  }

  return <Clock3 size={15} />;
}

function OrderCard({
  order,
  onStatusChange,
  onDelete,
  updatingId,
  deletingId,
}) {
  const [expanded, setExpanded] = useState(false);

  const isUpdating = updatingId === order._id;
  const isDeleting = deletingId === order._id;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-black/10"
    >
      <div className="p-5 sm:p-6">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_1.3fr_0.8fr_0.9fr_1fr_1.2fr_auto] xl:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <ShoppingBag size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-black text-white">
                  #{order._id.slice(-8).toUpperCase()}
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-600">
              Customer
            </p>

            <p className="truncate text-sm font-bold text-slate-200">
              {order.customerName}
            </p>

            <p className="mt-1 truncate text-xs text-slate-500">
              {order.customerEmail}
            </p>

            <p className="mt-1 text-xs text-slate-600">
              {order.customerPhone}
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-600">
              Type
            </p>

            <div className="flex items-center gap-2">
              {order.orderType === "delivery" ? (
                <Truck
                  size={15}
                  className="text-blue-400"
                />
              ) : (
                <ShoppingBag
                  size={15}
                  className="text-orange-400"
                />
              )}

              <span className="text-sm font-bold capitalize text-slate-300">
                {order.orderType}
              </span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-600">
              Total
            </p>

            <p className="text-sm font-black text-orange-400">
              {formatCurrency(order.totalAmount)}
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              {order.items?.length || 0} item(s)
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-600">
              Payment
            </p>

            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getPaymentClasses(
                order.paymentStatus
              )}`}
            >
              {order.paymentStatus}
            </span>

            <p className="mt-2 text-[10px] text-slate-600">
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-600">
              Status
            </p>

            <div className="relative">
              <select
                value={order.orderStatus}
                onChange={(event) =>
                  onStatusChange(
                    order._id,
                    event.target.value
                  )
                }
                disabled={isUpdating}
                className={`w-full appearance-none rounded-xl border px-3 py-2.5 pr-9 text-xs font-bold outline-none transition ${getStatusClasses(
                  order.orderStatus
                )} ${
                  isUpdating
                    ? "cursor-wait opacity-60"
                    : "cursor-pointer"
                }`}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="bg-slate-900 text-white"
                  >
                    {status}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              {isUpdating && (
                <Loader2
                  size={14}
                  className="absolute right-8 top-1/2 -translate-y-1/2 animate-spin text-orange-400"
                />
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setExpanded((current) => !current)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-slate-400 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
              title="View order details"
            >
              <Eye size={16} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(order._id)}
              disabled={isDeleting}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 transition hover:border-red-500/20 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              title="Delete order"
            >
              {isDeleting ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="border-t border-slate-800 bg-slate-950/30"
        >
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-3 text-sm font-black text-white">
                Ordered Items
              </h3>

              <div className="space-y-2">
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.menuItem}-${index}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-3"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-600">
                          <Package size={17} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-300">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {formatCurrency(item.price)} ×{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="text-xs font-black text-white">
                      {formatCurrency(
                        item.price * item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-black text-white">
                Order Information
              </h3>

              <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                <div className="flex items-start gap-3">
                  <User
                    size={15}
                    className="mt-0.5 text-slate-600"
                  />

                  <div>
                    <p className="text-[10px] text-slate-600">
                      Customer
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-300">
                      {order.customerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    size={15}
                    className="mt-0.5 text-slate-600"
                  />

                  <div>
                    <p className="text-[10px] text-slate-600">
                      Phone
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-300">
                      {order.customerPhone}
                    </p>
                  </div>
                </div>

                {order.orderType === "delivery" && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={15}
                      className="mt-0.5 text-slate-600"
                    />

                    <div>
                      <p className="text-[10px] text-slate-600">
                        Delivery Address
                      </p>

                      <p className="mt-1 text-xs font-bold leading-5 text-slate-300">
                        {order.deliveryAddress ||
                          "N/A"}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {order.deliveryCity ||
                          ""}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <CreditCard
                    size={15}
                    className="mt-0.5 text-slate-600"
                  />

                  <div>
                    <p className="text-[10px] text-slate-600">
                      Payment
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-300">
                      {order.paymentMethod}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {order.deliveryNotes && (
                  <div className="border-t border-slate-800 pt-3">
                    <p className="text-[10px] text-slate-600">
                      Notes
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {order.deliveryNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

function AdminOrders({ onBack }) {
  const { token, user, isAuthenticated } =
    useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [error, setError] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  const [updatingId, setUpdatingId] =
    useState(null);

  const [deletingId, setDeletingId] =
    useState(null);

  const fetchOrders = useCallback(
    async (isRefresh = false) => {
      if (!token) {
        setLoading(false);
        setError(
          "Authentication token is missing."
        );
        return;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          `${API_BASE_URL}/orders`,
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
              "Failed to fetch orders"
          );
        }

        setOrders(
          Array.isArray(data.orders)
            ? data.orders
            : []
        );
      } catch (err) {
        console.error(
          "Fetch admin orders error:",
          err
        );

        setError(
          err.message ||
            "Unable to load orders."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (
    orderId,
    orderStatus
  ) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: orderStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update order status"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? data.order
            : order
        )
      );
    } catch (err) {
      console.error(
        "Update order status error:",
        err
      );

      alert(
        err.message ||
          "Failed to update order status."
      );

      await fetchOrders(true);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(orderId);

      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete order"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) => order._id !== orderId
        )
      );
    } catch (err) {
      console.error(
        "Delete order error:",
        err
      );

      alert(
        err.message ||
          "Failed to delete order."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !search ||
        order._id
          .toLowerCase()
          .includes(search) ||
        order.customerName
          ?.toLowerCase()
          .includes(search) ||
        order.customerEmail
          ?.toLowerCase()
          .includes(search) ||
        order.customerPhone
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        order.orderStatus === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.paymentStatus === paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
    paymentFilter,
  ]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const pending = orders.filter(
      (order) =>
        order.orderStatus === "Pending"
    ).length;

    const preparing = orders.filter(
      (order) =>
        order.orderStatus === "Preparing"
    ).length;

    const delivered = orders.filter(
      (order) =>
        order.orderStatus === "Delivered"
    ).length;

    const revenue = orders.reduce(
      (total, order) => {
        if (
          order.paymentStatus === "Paid" ||
          order.orderStatus === "Delivered"
        ) {
          return (
            total +
            Number(order.totalAmount || 0)
          );
        }

        return total;
      },
      0
    );

    return {
      totalOrders,
      pending,
      preparing,
      delivered,
      revenue,
    };
  }, [orders]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPaymentFilter("All");
  };

  const hasFilters =
    searchTerm.trim() ||
    statusFilter !== "All" ||
    paymentFilter !== "All";

  if (
    !isAuthenticated ||
    user?.role !== "admin"
  ) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-32 text-white">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5">
            <span className="text-2xl">
              🔒
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Admin Access Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            You need an administrator account
            to access the orders dashboard.
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
          >
            <ArrowLeft size={16} />
            Back to Restaurant
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Restaurant
          </button>

          <button
            type="button"
            onClick={() =>
              fetchOrders(true)
            }
            disabled={refreshing}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh Orders"}
          </button>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange-400">
            Administration
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Orders Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Manage customer orders, payments
            and delivery status from one place.
          </p>
        </div>

        {!loading && !error && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Total Orders
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {stats.totalOrders}
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Pending
              </p>

              <p className="mt-2 text-3xl font-black text-yellow-400">
                {stats.pending}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Preparing
              </p>

              <p className="mt-2 text-3xl font-black text-orange-400">
                {stats.preparing}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Delivered
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-400">
                {stats.delivered}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                Revenue
              </p>

              <p className="mt-2 text-2xl font-black text-orange-400">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search order, customer, email or phone..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-orange-500/40"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 px-9 py-3 pr-8 text-xs font-bold text-slate-300 outline-none focus:border-orange-500/40 lg:w-52"
                >
                  <option value="All">
                    All Statuses
                  </option>

                  {STATUS_OPTIONS.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
                />
              </div>

              <div className="relative">
                <DollarSign
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <select
                  value={paymentFilter}
                  onChange={(event) =>
                    setPaymentFilter(
                      event.target.value
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950 px-9 py-3 pr-8 text-xs font-bold text-slate-300 outline-none focus:border-orange-500/40 lg:w-44"
                >
                  <option value="All">
                    All Payments
                  </option>

                  {PAYMENT_OPTIONS.map(
                    (payment) => (
                      <option
                        key={payment}
                        value={payment}
                      >
                        {payment}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
                />
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-3 text-xs font-bold text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex min-h-[350px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/50">
            <div className="text-center">
              <Loader2
                size={34}
                className="mx-auto animate-spin text-orange-400"
              />

              <p className="mt-4 text-sm font-bold text-slate-300">
                Loading orders...
              </p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <X size={25} />
            </div>

            <h2 className="mt-5 text-xl font-black text-white">
              Unable to Load Orders
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchOrders()
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                <ShoppingBag size={30} />
              </div>

              <h2 className="mt-5 text-2xl font-black text-white">
                No Orders Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                There are currently no customer
                orders in the database.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          orders.length > 0 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Showing{" "}
                  <span className="font-bold text-slate-400">
                    {filteredOrders.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-400">
                    {orders.length}
                  </span>{" "}
                  orders
                </p>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="rounded-3xl border border-slate-800 bg-slate-900/50 px-6 py-14 text-center">
                  <Search
                    size={28}
                    className="mx-auto text-slate-600"
                  />

                  <h2 className="mt-4 text-lg font-black text-white">
                    No Matching Orders
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Try changing your search or
                    filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-orange-400"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map(
                    (order) => (
                      <OrderCard
                        key={order._id}
                        order={order}
                        onStatusChange={
                          updateOrderStatus
                        }
                        onDelete={
                          deleteOrder
                        }
                        updatingId={
                          updatingId
                        }
                        deletingId={
                          deletingId
                        }
                      />
                    )
                  )}
                </div>
              )}
            </>
          )}
      </div>
    </section>
  );
}

export default AdminOrders;