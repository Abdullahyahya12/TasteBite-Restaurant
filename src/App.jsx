import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import FoodGallery from "./components/FoodGallery";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import CartProvider from "./context/CartContext";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleOpenCheckout = () => {
    setShowOrderHistory(false);
    setShowCheckout(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleOpenOrderHistory = () => {
    setShowCheckout(false);
    setShowOrderHistory(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBackToRestaurant = () => {
    setShowCheckout(false);
    setShowOrderHistory(false);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <CartProvider>
      {!showCheckout && !showOrderHistory ? (
        <>
          <Navbar
            onCheckout={handleOpenCheckout}
            onOrderHistory={handleOpenOrderHistory}
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
        </>
      ) : showOrderHistory ? (
        <OrderHistory onBack={handleBackToRestaurant} />
      ) : (
        <Checkout onBack={handleBackToRestaurant} />
      )}
    </CartProvider>
  );
}

export default App;