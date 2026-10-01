import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    name: "Classic Burger",
    subtitle: "Handcrafted perfection",
    description:
      "Juicy grilled beef, melted cheese, fresh vegetables and our signature sauce, served in a perfectly toasted bun.",
    price: "$12.99",
    rating: "4.9",
    image: "/images/burger-classic.jpg",
    category: "Signature Burger",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    subtitle: "Fresh from the oven",
    description:
      "A timeless Italian classic made with fresh mozzarella, tomato, basil and our house-made pizza sauce.",
    price: "$14.99",
    rating: "4.8",
    image: "/images/pizza-margherita.jpg",
    category: "Wood-Fired Pizza",
  },
  {
    id: 3,
    name: "Creamy Chicken Pasta",
    subtitle: "Rich. Creamy. Irresistible.",
    description:
      "Tender grilled chicken tossed with silky cream sauce, herbs and perfectly cooked pasta.",
    price: "$15.99",
    rating: "4.9",
    image: "/images/pasta-chicken.jpg",
    category: "Chef's Special",
  },
  {
    id: 4,
    name: "Grilled Chicken",
    subtitle: "Flame-grilled goodness",
    description:
      "Tender marinated chicken grilled to perfection with aromatic herbs and our signature seasoning.",
    price: "$16.99",
    rating: "4.9",
    image: "/images/chicken-grilled.jpg",
    category: "Grilled Special",
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = slides[activeSlide];

  // =====================================================
  // AUTO SLIDE
  // =====================================================

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // =====================================================
  // SLIDE CONTROLS
  // =====================================================

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToNext = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  const goToPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =================================================
          BACKGROUND SLIDES
      ================================================= */}

      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
          }}
          transition={{
            opacity: {
              duration: 0.8,
              ease: "easeInOut",
            },
            scale: {
              duration: 6,
              ease: "easeOut",
            },
          }}
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.name}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* =================================================
          CINEMATIC OVERLAYS
      ================================================= */}

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

      {/* Mobile readability overlay */}

      <div className="absolute inset-0 bg-black/20 sm:bg-transparent" />

      {/* Orange ambient glow */}

      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[140px]"
      />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pb-28 pt-28 sm:px-6 sm:pb-32 sm:pt-32 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -25,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-3xl"
            >
              {/* Eyebrow */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                }}
                className="mb-5 flex items-center gap-2.5 sm:mb-6 sm:gap-3"
              >
                <span className="h-px w-7 bg-orange-400 sm:w-10" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
                  {currentSlide.category}
                </span>
              </motion.div>

              {/* Heading */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                }}
                className="max-w-3xl break-words text-[2.8rem] font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl sm:tracking-tight md:text-7xl lg:text-8xl"
              >
                {currentSlide.name}
              </motion.h1>

              {/* Subtitle */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                }}
                className="mt-4 max-w-xl text-lg font-medium leading-snug text-orange-300 sm:mt-5 sm:text-2xl"
              >
                {currentSlide.subtitle}
              </motion.p>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                }}
                className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7"
              >
                {currentSlide.description}
              </motion.p>

              {/* Rating + Price */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                }}
                className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:mt-7 sm:gap-5"
              >
                {/* Rating */}

                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        fill="currentColor"
                        className="text-orange-400 sm:h-[15px] sm:w-[15px]"
                      />
                    ))}
                  </div>

                  <span className="text-sm font-semibold text-white">
                    {currentSlide.rating}
                  </span>

                  <span className="hidden text-sm text-slate-400 sm:inline">
                    Guest rating
                  </span>
                </div>

                <span className="hidden h-5 w-px bg-white/20 sm:block" />

                {/* Price */}

                <div className="text-xl font-bold text-white sm:text-2xl">
                  {currentSlide.price}
                </div>
              </motion.div>

              {/* CTA */}

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
                  delay: 0.6,
                  duration: 0.6,
                }}
                className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center sm:mt-9 sm:gap-4"
              >
                {/* Menu Button */}

                <motion.a
                  href="#menu"
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400 hover:shadow-orange-500/30 min-[420px]:w-auto sm:px-7"
                >
                  Explore Menu

                  <motion.span
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.a>

                {/* Story Button */}

                <motion.a
                  href="#about"
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 min-[420px]:w-auto sm:px-7"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Play
                      size={12}
                      fill="currentColor"
                    />
                  </span>

                  Our Story
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* =================================================
              RIGHT FEATURE CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.55,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden justify-end lg:flex"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: -10,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative w-full max-w-sm"
              >
                {/* Glow */}

                <div className="absolute -inset-5 rounded-[2rem] bg-orange-500/10 blur-3xl" />

                {/* Card */}

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <img
                      src={currentSlide.image}
                      alt=""
                      className="aspect-[4/5] w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                    {/* Card content */}

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300 sm:text-xs sm:tracking-[0.25em]">
                        Today's highlight
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                        {currentSlide.name}
                      </h2>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-lg font-bold text-white">
                          {currentSlide.price}
                        </span>

                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                          <Star
                            size={12}
                            fill="currentColor"
                            className="text-orange-400"
                          />

                          {currentSlide.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* =================================================
          SLIDE CONTROLS
      ================================================= */}

      <div className="absolute bottom-5 left-0 right-0 z-20 sm:bottom-7 lg:bottom-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* Slide counter */}

          <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-300 sm:gap-3">
            <span className="text-sm font-bold text-white">
              {String(activeSlide + 1).padStart(2, "0")}
            </span>

            <span className="h-px w-5 bg-white/30 sm:w-8" />

            <span>
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Dots */}

          <div className="flex min-w-0 items-center justify-center gap-1 sm:gap-2">
            {slides.map((slide, index) => {
              const isActive = index === activeSlide;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="group flex h-7 w-7 items-center justify-center sm:h-6 sm:w-auto"
                >
                  <motion.span
                    animate={{
                      width: isActive ? 28 : 7,
                      opacity: isActive ? 1 : 0.45,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="block h-1.5 rounded-full bg-white group-hover:opacity-100 sm:h-1"
                  />
                </button>
              );
            })}
          </div>

          {/* Arrows */}

          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              type="button"
              onClick={goToPrevious}
              whileHover={{
                scale: 1.08,
                x: -2,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <motion.button
              type="button"
              onClick={goToNext}
              whileHover={{
                scale: 1.08,
                x: 2,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <motion.a
        href="#menu"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.6,
        }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-400 lg:flex"
      >
        <span>Scroll to explore</span>

        <motion.span
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-8 w-px bg-gradient-to-b from-orange-400 to-transparent"
        />
      </motion.a>
    </section>
  );
}

export default Hero;