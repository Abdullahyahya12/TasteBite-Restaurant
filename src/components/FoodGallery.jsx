import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const galleryItems = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burgers",
    rating: 4.9,
    image: "/images/burger-classic.jpg",
  },
  {
    id: 2,
    name: "Italian Margherita",
    category: "Pizza",
    rating: 4.8,
    image: "/images/pizza-margherita.jpg",
  },
  {
    id: 3,
    name: "Creamy Chicken Pasta",
    category: "Pasta",
    rating: 4.9,
    image: "/images/pasta-chicken.jpg",
  },
  {
    id: 4,
    name: "Herb Grilled Chicken",
    category: "Chicken",
    rating: 4.9,
    image: "/images/chicken-herb.jpg",
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    rating: 4.9,
    image: "/images/lava-cake.jpg",
  },
  {
    id: 6,
    name: "Loaded French Fries",
    category: "Appetizers",
    rating: 4.7,
    image: "/images/fries.jpg",
  },
  {
    id: 7,
    name: "Classic Milkshake",
    category: "Drinks",
    rating: 4.8,
    image: "/images/milkshake.jpg",
  },
  {
    id: 8,
    name: "Fresh Orange Juice",
    category: "Drinks",
    rating: 4.8,
    image: "/images/orange-juice.jpg",
  },
];

function FoodGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);

    return () => clearInterval(interval);
  }, []);

  const visibleItems = [
    galleryItems[currentIndex],
    galleryItems[(currentIndex + 1) % galleryItems.length],
    galleryItems[(currentIndex + 2) % galleryItems.length],
  ];

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-slate-950 px-6 py-24 lg:px-8"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-md"
          >
            Food Gallery
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl"
          >
            A taste for
            <span className="text-orange-400">
              {" "}every moment.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg"
          >
            Explore our signature dishes, freshly prepared with
            premium ingredients and served with passion.
          </motion.p>
        </div>

        {/* Slider Controls */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous food"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500 hover:text-white"
          >
            <ChevronLeft
              size={21}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </button>

          <div className="flex h-12 items-center rounded-full border border-white/10 bg-white/5 px-5 backdrop-blur-md">
            <span className="text-sm font-medium text-slate-400">
              <span className="text-white">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(galleryItems.length).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next food"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500 hover:text-white"
          >
            <ChevronRight
              size={21}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Gallery Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visibleItems.map((item, index) => (
            <motion.article
              key={`${item.id}-${currentIndex}-${index}`}
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/20"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 bg-orange-500/0 transition duration-500 group-hover:bg-orange-500/5" />

                {/* Top Badges */}
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Star
                      size={13}
                      className="fill-orange-400 text-orange-400"
                    />
                    {item.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-300">
                    Chef's Selection
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-px w-10 bg-orange-400 transition-all duration-500 group-hover:w-16" />

                    <span className="text-xs text-slate-300">
                      Freshly prepared
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Indicators */}
        <div className="mt-9 flex justify-center gap-2">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to gallery item ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-orange-500"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoodGallery;