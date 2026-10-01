import {
  useEffect,
  useState,
} from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import FoodGallery from "./components/FoodGallery";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import AdminOrders from "./components/AdminOrders";
import AuthModal from "./components/AuthModal";
import ChatBot from "./components/ChatBot";
import ResetPassword from "./components/ResetPassword";

import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

import CartProvider from "./context/CartContext";
import AuthProvider, {
  useAuth,
} from "./context/AuthContext";

function AppContent() {
  const [showCheckout, setShowCheckout] =
    useState(false);

  const [showOrderHistory, setShowOrderHistory] =
    useState(false);

  const [showAdminOrders, setShowAdminOrders] =
    useState(false);

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const isAdmin =
    isAuthenticated &&
    user?.role === "admin";

  // =========================
  // Open Checkout
  // =========================

  const handleOpenCheckout = () => {
    setShowCheckout(true);
    setShowOrderHistory(false);
    setShowAdminOrders(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // Open Order History
  // =========================

  const handleOpenOrderHistory = () => {
    setShowCheckout(false);
    setShowOrderHistory(true);
    setShowAdminOrders(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // Open Admin Orders
  // =========================

  const handleOpenAdminOrders = () => {
    if (!isAdmin) {
      window.dispatchEvent(
        new CustomEvent("tastebite:open-auth", {
          detail: {
            mode: "login",
          },
        })
      );

      return;
    }

    setShowCheckout(false);
    setShowOrderHistory(false);
    setShowAdminOrders(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // Back To Restaurant
  // =========================

  const handleBackToRestaurant = () => {
    setShowCheckout(false);
    setShowOrderHistory(false);
    setShowAdminOrders(false);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // =========================
  // Admin Orders
  // =========================

  if (showAdminOrders) {
    if (!isAdmin) {
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
              onClick={handleBackToRestaurant}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
            >
              Back to Restaurant
            </button>
          </div>
        </div>
      );
    }

    return (
      <AdminOrders
        onBack={handleBackToRestaurant}
      />
    );
  }

  // =========================
  // Order History
  // =========================

  if (showOrderHistory) {
    return (
      <OrderHistory
        onBack={handleBackToRestaurant}
      />
    );
  }

  // =========================
  // Checkout
  // =========================

  if (showCheckout) {
    return (
      <Checkout
        onBack={handleBackToRestaurant}
      />
    );
  }

  // =========================
  // Main Restaurant
  // =========================

  return (
    <>
      <Navbar
        onCheckout={handleOpenCheckout}
        onOrderHistory={handleOpenOrderHistory}
        onAdminOrders={handleOpenAdminOrders}
      />

      <main>
        <Hero />

        <Menu />

        <FoodGallery />

        <About />

        <Testimonials />

        <Contact />
      </main>

      <Footer />

      {/* =========================
          Back To Top
      ========================== */}

      <BackToTop />

      {/* =========================
          TasteBite Chatbot
      ========================== */}

      <ChatBot />
    </>
  );
}

// =========================
// App
// =========================

function App() {
  const [currentPath, setCurrentPath] =
    useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  // =========================
  // Reset Password Page
  // =========================

  const isResetPasswordPage =
    currentPath.startsWith(
      "/reset-password/"
    );

  if (isResetPasswordPage) {
    return <ResetPassword />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />

        <AuthModal />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;