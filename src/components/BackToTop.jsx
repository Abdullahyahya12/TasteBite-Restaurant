import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 15,
          }}
          transition={{
            duration: 0.2,
          }}
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="fixed bottom-5 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-orange-400/20 bg-slate-900/90 text-orange-400 shadow-xl shadow-black/30 backdrop-blur-md transition-colors duration-200 hover:border-orange-400/40 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 sm:bottom-6 sm:left-6 sm:h-12 sm:w-12"
        >
          <ArrowUp
            size={18}
            strokeWidth={2.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;