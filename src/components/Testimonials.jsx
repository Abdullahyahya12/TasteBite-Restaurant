import {
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sophia Williams",
    role: "Regular Guest",
    avatar: "/images/customer-1.webp",
    rating: 5,
    text:
      "Everything about TasteBite feels thoughtfully designed. The food was exceptional, the presentation was beautiful, and the atmosphere made the entire evening feel special.",
    order: "Signature Burger & Lava Cake",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Food Enthusiast",
    avatar: "/images/customer-2.webp",
    rating: 5,
    text:
      "One of those restaurants where the quality genuinely stands out. The flavors were balanced, the ingredients tasted fresh, and the service was incredibly welcoming.",
    order: "Margherita Pizza & Pasta",
  },
  {
    id: 3,
    name: "Olivia Carter",
    role: "Verified Guest",
    avatar: "/images/customer-3.webp",
    rating: 5,
    text:
      "The attention to detail is impressive. From the first bite to the final dessert, everything felt premium without losing that warm and comfortable restaurant atmosphere.",
    order: "Grilled Chicken & Cheesecake",
  },
  {
    id: 4,
    name: "Daniel Miller",
    role: "Regular Guest",
    avatar: "/images/customer-4.webp",
    rating: 5,
    text:
      "Absolutely loved the experience. The food arrived beautifully presented, portions were generous, and every dish had its own character. I will definitely be coming back.",
    order: "BBQ Chicken Pizza & Wings",
  },
];

function RatingStars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <Star
          key={index}
          size={15}
          className="fill-orange-400 text-orange-400"
        />
      ))}
    </div>
  );
}

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((index) =>
      index === testimonials.length - 1 ? 0 : index + 1
    );
  };

  const previousTestimonial = () => {
    setCurrentIndex((index) =>
      index === 0 ? testimonials.length - 1 : index - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((index) =>
        index === testimonials.length - 1 ? 0 : index + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32 xl:py-36"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-1/2 top-16 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-orange-500/[0.055] blur-[120px] sm:top-20 sm:h-[500px] sm:w-[500px] sm:blur-[160px]" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[320px] w-[320px] rounded-full bg-orange-500/[0.035] blur-[120px] sm:h-[420px] sm:w-[420px] sm:blur-[140px]" />

      <div className="pointer-events-none absolute -right-32 top-1/2 h-[320px] w-[320px] rounded-full bg-white/[0.015] blur-[100px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.07] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-300 backdrop-blur-md sm:px-4 sm:text-[11px] sm:tracking-[0.2em]">
            <Sparkles size={13} className="shrink-0 sm:h-[14px] sm:w-[14px]" />
            Guest Experiences
          </span>

          <h2 className="mt-5 text-[2.35rem] font-black leading-[1.05] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            Stories from the
            <span className="block text-orange-400">
              table.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7">
            Great food creates memorable moments. Discover what
            our guests experienced at TasteBite.
          </p>
        </motion.div>

        {/* Trust Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-2.5 sm:mt-12 sm:gap-3"
        >
          {/* Rating */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2.5 backdrop-blur-md sm:gap-3 sm:px-5 sm:py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
              <Star
                size={14}
                className="fill-orange-400 text-orange-400 sm:h-[15px] sm:w-[15px]"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-white sm:text-sm">
                4.9 / 5
              </p>

              <p className="text-[8px] uppercase tracking-[0.08em] text-slate-600 sm:text-[9px] sm:tracking-wider">
                Average Rating
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2.5 backdrop-blur-md sm:gap-3 sm:px-5 sm:py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
              <BadgeCheck
                size={14}
                className="text-orange-400 sm:h-[15px] sm:w-[15px]"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-white sm:text-sm">
                10K+
              </p>

              <p className="text-[8px] uppercase tracking-[0.08em] text-slate-600 sm:text-[9px] sm:tracking-wider">
                Verified Reviews
              </p>
            </div>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2.5 backdrop-blur-md sm:gap-3 sm:px-5 sm:py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
              <Users
                size={14}
                className="text-orange-400 sm:h-[15px] sm:w-[15px]"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-white sm:text-sm">
                50K+
              </p>

              <p className="text-[8px] uppercase tracking-[0.08em] text-slate-600 sm:text-[9px] sm:tracking-wider">
                Happy Guests
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Testimonial */}
        <div className="mx-auto mt-12 max-w-6xl sm:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/30 sm:rounded-[2rem]"
            >
              {/* Decorative Quote */}
              <div className="pointer-events-none absolute -right-3 -top-7 select-none font-serif text-[120px] leading-none text-orange-500/[0.035] sm:-right-5 sm:-top-12 sm:text-[240px]">
                “
              </div>

              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                {/* Customer Profile */}
                <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-orange-500/[0.08] via-transparent to-transparent p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
                  <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 -rotate-90 lg:block">
                    <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-700">
                      TasteBite Guest
                    </span>
                  </div>

                  <div className="flex h-full flex-col items-center justify-center text-center">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="absolute -inset-2.5 rounded-full border border-orange-400/20 sm:-inset-3" />

                      <div className="absolute -inset-6 rounded-full border border-white/[0.05] sm:-inset-7" />

                      <div className="absolute -inset-9 rounded-full border border-white/[0.025] sm:-inset-11" />

                      <img
                        src={current.avatar}
                        alt={current.name}
                        loading="lazy"
                        decoding="async"
                        className="relative h-24 w-24 rounded-full border-4 border-slate-900 object-cover shadow-2xl sm:h-32 sm:w-32"
                      />

                      {/* Verified Badge */}
                      <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-900 bg-orange-500 text-white shadow-lg sm:h-9 sm:w-9">
                        <BadgeCheck size={14} className="sm:h-4 sm:w-4" />
                      </div>
                    </div>

                    {/* Customer Name */}
                    <h3 className="mt-7 text-lg font-bold text-white sm:mt-8 sm:text-xl">
                      {current.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {current.role}
                    </p>

                    {/* Rating */}
                    <div className="mt-4 sm:mt-5">
                      <RatingStars rating={current.rating} />
                    </div>

                    {/* Favorite Order */}
                    <div className="mt-5 w-full max-w-xs rounded-2xl border border-white/10 bg-black/10 p-3.5 sm:mt-6 sm:p-4">
                      <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-600 sm:text-[9px] sm:tracking-[0.18em]">
                        Favorite Order
                      </p>

                      <p className="mt-2 text-xs font-semibold leading-5 text-slate-300 sm:text-sm">
                        {current.order}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review */}
                <div className="relative flex min-h-[420px] flex-col justify-center p-6 sm:min-h-[430px] sm:p-10 lg:p-16">
                  {/* Top */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 sm:h-11 sm:w-11">
                      <Quote size={19} className="sm:h-[21px] sm:w-[21px]" />
                    </div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-700 sm:text-[10px] sm:tracking-[0.2em]">
                      0{currentIndex + 1} / 0{testimonials.length}
                    </p>
                  </div>

                  {/* Review Text */}
                  <blockquote className="mt-7 text-xl font-semibold leading-[1.4] tracking-tight text-slate-100 sm:mt-8 sm:text-3xl lg:text-[2.65rem] lg:leading-[1.35]">
                    “{current.text}”
                  </blockquote>

                  {/* Verification */}
                  <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/[0.07] px-3.5 py-2 sm:px-4">
                      <BadgeCheck
                        size={13}
                        className="text-orange-400 sm:h-[14px] sm:w-[14px]"
                      />

                      <span className="text-[9px] font-bold uppercase tracking-wider text-orange-300 sm:text-[10px]">
                        Verified Guest
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-600 sm:text-xs">
                      Shared after dining
                    </span>
                  </div>

                  {/* Navigation */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 sm:mt-10 sm:pt-6">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={previousTestimonial}
                        aria-label="Previous testimonial"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-orange-400/30 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40"
                      >
                        <ChevronLeft size={19} />
                      </button>

                      <button
                        type="button"
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-orange-400/30 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400/40"
                      >
                        <ChevronRight size={19} />
                      </button>
                    </div>

                    {/* Slider Dots */}
                    <div className="flex items-center gap-1.5">
                      {testimonials.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCurrentIndex(index)}
                          aria-label={`Show testimonial ${index + 1}`}
                          aria-current={
                            currentIndex === index ? "true" : undefined
                          }
                          className={`flex min-h-6 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${
                            currentIndex === index ? "w-8" : "w-5"
                          }`}
                        >
                          <span
                            className={`block h-1.5 rounded-full transition-all duration-300 ${
                              currentIndex === index
                                ? "w-8 bg-orange-500"
                                : "w-1.5 bg-white/20 hover:bg-white/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Other Testimonials */}
        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {testimonials
            .filter((_, index) => index !== currentIndex)
            .slice(0, 3)
            .map((item) => {
              const originalIndex = testimonials.findIndex(
                (testimonial) => testimonial.id === item.id
              );

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(originalIndex)}
                  whileHover={{ y: -4 }}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5 text-left transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.04] sm:gap-4 sm:p-4"
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 shrink-0 rounded-full border border-white/10 object-cover sm:h-12 sm:w-12"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-bold text-white sm:text-sm">
                        {item.name}
                      </p>

                      <ArrowUpRight
                        size={14}
                        className="shrink-0 text-slate-700 transition group-hover:text-orange-400 sm:h-[15px] sm:w-[15px]"
                      />
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <RatingStars rating={item.rating} />

                      <span className="text-[9px] text-slate-600 sm:text-[10px]">
                        5.0
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-16 max-w-2xl text-center sm:mt-20"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-400 sm:h-11 sm:w-11">
            <Sparkles size={17} className="sm:h-[18px] sm:w-[18px]" />
          </div>

          <p className="mt-5 text-lg font-semibold leading-7 text-slate-300 sm:text-2xl sm:leading-8">
            Every visit should leave you with
            something worth remembering.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="h-px w-6 bg-orange-400/40 sm:w-8" />

            <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-700 sm:text-[9px] sm:tracking-[0.3em]">
              The TasteBite Experience
            </span>

            <div className="h-px w-6 bg-orange-400/40 sm:w-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;