import {
  ArrowRight,
  Award,
  ChefHat,
  Clock3,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

function About() {
  const highlights = [
    {
      icon: ChefHat,
      title: "Chef Crafted",
      text: "Thoughtfully prepared recipes with refined flavors.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      text: "Fresh ingredients selected for every dish.",
    },
    {
      icon: Heart,
      title: "Made With Care",
      text: "Every plate is prepared with passion and attention.",
    },
  ];

  const stats = [
    {
      value: "12+",
      label: "Years of Experience",
    },
    {
      value: "50K+",
      label: "Happy Guests",
    },
    {
      value: "35+",
      label: "Signature Dishes",
    },
    {
      value: "4.9",
      label: "Guest Rating",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32 xl:py-36"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[350px] w-[350px] rounded-full bg-orange-500/[0.04] blur-[120px] sm:h-[450px] sm:w-[450px] sm:blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ================= TOP HEADING ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-300 backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <Sparkles size={13} className="shrink-0 sm:h-[14px] sm:w-[14px]" />
            The TasteBite Story
          </div>

          <h2 className="mt-5 text-[2.35rem] font-black leading-[1.05] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            Crafted with passion.
            <span className="block text-orange-400">
              Served with purpose.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7">
            We believe dining should be more than just a meal.
            It should be an experience built around exceptional
            food, warm hospitality, and moments worth remembering.
          </p>
        </motion.div>

        {/* ================= STORY ================= */}

        <div className="mt-16 grid items-center gap-16 sm:mt-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-24">
          {/* IMAGE COMPOSITION */}

          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-[calc(100%-1rem)] max-w-xl sm:w-[calc(100%-2rem)]"
          >
            {/* Decorative Frame */}

            <div className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] border border-orange-400/10 sm:-left-5 sm:-top-5 sm:rounded-[2.5rem]" />

            {/* Main Image */}

            <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-1.5 shadow-2xl shadow-black/40 sm:rounded-[2.5rem] sm:p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] sm:rounded-[2rem]">
                <img
                  src="/images/chef-story.webp"
                  alt="TasteBite signature dining"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-1000 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Image Caption */}

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex items-end justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-orange-300 sm:text-[10px] sm:tracking-[0.22em]">
                        Since 2014
                      </p>

                      <p className="mt-1.5 text-lg font-bold leading-tight text-white sm:mt-2 sm:text-xl">
                        A tradition of great taste.
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-orange-300 backdrop-blur-md sm:h-11 sm:w-11">
                      <ChefHat size={18} className="sm:h-[19px] sm:w-[19px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Experience Card */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
              className="absolute -bottom-7 right-0 z-20 rounded-2xl border border-white/10 bg-slate-900/95 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:-bottom-8 sm:-right-8 sm:p-5"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20 sm:h-11 sm:w-11">
                  <Clock3 size={18} className="sm:h-5 sm:w-5" />
                </div>

                <div>
                  <p className="text-xl font-black text-white sm:text-2xl">
                    12+
                  </p>

                  <p className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:text-[10px] sm:tracking-wider">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Small Floating Accent */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 top-10 z-20 hidden h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-400 backdrop-blur-xl sm:-right-4 sm:top-14 sm:flex sm:h-14 sm:w-14"
            >
              <Sparkles size={18} className="sm:h-5 sm:w-5" />
            </motion.div>
          </motion.div>

          {/* STORY CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400 sm:text-xs sm:tracking-[0.25em]">
              Our Philosophy
            </p>

            <h3 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white sm:mt-4 sm:text-4xl">
              Great food begins with
              <span className="text-orange-400">
                {" "}great ingredients.
              </span>
            </h3>

            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-400 sm:mt-7 sm:space-y-5 sm:text-base">
              <p>
                TasteBite started with a simple idea: create food
                that people genuinely look forward to. Today, that
                idea continues to guide every recipe that leaves
                our kitchen.
              </p>

              <p>
                From carefully selected ingredients to the final
                presentation, we focus on the details that turn an
                ordinary meal into a memorable dining experience.
              </p>
            </div>

            {/* Highlight Cards */}

            <div className="mt-8 space-y-3 sm:mt-9">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3.5 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.05] sm:gap-4 sm:p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition duration-300 group-hover:bg-orange-500 group-hover:text-white sm:h-11 sm:w-11">
                      <Icon size={18} className="sm:h-[19px] sm:w-[19px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                        {item.text}
                      </p>
                    </div>

                    <ArrowRight
                      size={16}
                      className="ml-auto shrink-0 text-slate-700 transition duration-300 group-hover:translate-x-1 group-hover:text-orange-400 sm:h-[17px] sm:w-[17px]"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}

            <a
              href="#menu"
              className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400 hover:shadow-orange-500/30 sm:mt-9 sm:w-auto"
            >
              Discover Our Menu

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* ================= STATS ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/20 sm:mt-28 sm:rounded-[2rem]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`relative p-5 text-center sm:p-9 ${
                  index < 2
                    ? "border-b border-white/10 lg:border-b-0"
                    : ""
                } ${
                  index % 2 === 0
                    ? "border-r border-white/10"
                    : ""
                } ${
                  index === 1
                    ? "lg:border-r"
                    : ""
                } ${
                  index === 3
                    ? "border-r-0"
                    : ""
                }`}
              >
                <p className="text-2xl font-black tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mx-auto mt-2 max-w-[130px] text-[9px] font-semibold uppercase leading-4 tracking-[0.12em] text-slate-500 sm:max-w-none sm:text-xs sm:tracking-[0.16em]">
                  {stat.label}
                </p>

                {/* Accent */}

                <div className="mx-auto mt-4 h-px w-7 bg-orange-400/50 sm:mt-5 sm:w-8" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= QUOTE ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-20 max-w-3xl text-center sm:mt-24"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-400 sm:h-12 sm:w-12">
            <Users size={19} className="sm:h-5 sm:w-5" />
          </div>

          <blockquote className="mt-5 text-xl font-semibold leading-relaxed tracking-tight text-slate-200 sm:mt-6 sm:text-3xl">
            “Good food brings people together.
            Great food gives them something to remember.”
          </blockquote>

          <div className="mt-5 flex items-center justify-center gap-2.5 sm:gap-3">
            <div className="h-px w-6 bg-orange-400/50 sm:w-8" />

            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600 sm:text-[10px] sm:tracking-[0.25em]">
              The TasteBite Philosophy
            </p>

            <div className="h-px w-6 bg-orange-400/50 sm:w-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;