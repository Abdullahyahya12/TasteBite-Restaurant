import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import FoodGallery from "./components/FoodGallery";
import AuthModal from "./components/AuthModal";

import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

import CartProvider from "./context/CartContext";
import AuthProvider, {
  useAuth,
} from "./context/AuthContext";

/*
 * Lazy-loaded pages/components
 *
 * These components are not needed on the initial
 * Home page load, so they are loaded only when required.
 */
const Checkout = lazy(
  () => import("./components/Checkout")
);

const OrderHistory = lazy(
  () => import("./components/OrderHistory")
);

const AdminOrders = lazy(
  () => import("./components/AdminOrders")
);

const ChatBot = lazy(
  () => import("./components/ChatBot")
);

const ResetPassword = lazy(
  () => import("./components/ResetPassword")
);

function navigateTo(path) {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, "", path);

  window.dispatchEvent(
    new PopStateEvent("popstate")
  );
}

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-orange-500" />

        <p className="text-sm font-medium text-slate-400">
          Loading...
        </p>
      </div>
    </div>
  );
}

function AppContent({
  currentPath,
}) {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  const isAdmin =
    isAuthenticated &&
    user?.role === "admin";

  const isCheckoutPage =
    currentPath === "/checkout";

  const isOrderHistoryPage =
    currentPath === "/orders";

  const isAdminOrdersPage =
    currentPath === "/admin/orders";

  const handleOpenCheckout = () => {
    navigateTo("/checkout");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenOrderHistory = () => {
    navigateTo("/orders");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

    navigateTo("/admin/orders");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBackToRestaurant = () => {
    navigateTo("/");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  /*
   * Checkout
   */
  if (isCheckoutPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Checkout
          onBack={handleBackToRestaurant}
        />
      </Suspense>
    );
  }

  /*
   * Order History
   */
  if (isOrderHistoryPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <OrderHistory
          onBack={handleBackToRestaurant}
        />
      </Suspense>
    );
  }

  /*
   * Admin Orders
   */
  if (isAdminOrdersPage) {
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
      <Suspense fallback={<PageLoader />}>
        <AdminOrders
          onBack={handleBackToRestaurant}
        />
      </Suspense>
    );
  }

  /*
   * Unknown route
   * Send the user back to Home.
   */
  if (currentPath !== "/") {
    navigateTo("/");

    return null;
  }

  /*
   * Main Restaurant
   */
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
      <BackToTop />

      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </>
  );
}

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

  /*
   * Reset Password Route
   *
   * Example:
   * /reset-password/abc123
   */
  const isResetPasswordPage =
    currentPath.startsWith(
      "/reset-password/"
    );

  if (isResetPasswordPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ResetPassword />
      </Suspense>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <AppContent
          currentPath={currentPath}
        />

        <AuthModal />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;