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
      className="relative overflow-hidden bg-slate-950 px-6 py-28 lg:px-8 lg:py-36"
    >
      {/* Background Effects */}

      <div className="pointer-events-none absolute left-[-180px] top-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-0 right-[-160px] h-[450px] w-[450px] rounded-full bg-orange-500/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* ================= TOP HEADING ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md">
            <Sparkles size={14} />
            The TasteBite Story
          </div>

          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Crafted with passion.
            <span className="block text-orange-400">
              Served with purpose.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            We believe dining should be more than just a meal.
            It should be an experience built around exceptional
            food, warm hospitality, and moments worth remembering.
          </p>
        </motion.div>

        {/* ================= STORY ================= */}

        <div className="mt-20 grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">

          {/* IMAGE COMPOSITION */}

          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Decorative Frame */}

            <div className="absolute -left-5 -top-5 h-full w-full rounded-[2.5rem] border border-orange-400/10" />

            {/* Main Image */}

            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <img
                  src="/images/chef-story.jpg"
                  alt="TasteBite signature dining"
                  className="h-full w-full object-cover transition duration-1000 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Image Caption */}

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300">
                        Since 2014
                      </p>

                      <p className="mt-2 text-xl font-bold text-white">
                        A tradition of great taste.
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-orange-300 backdrop-blur-md">
                      <ChefHat size={19} />
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
              className="absolute -bottom-8 -right-2 z-20 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:-right-8 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="text-2xl font-black text-white">
                    12+
                  </p>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
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
              className="absolute -right-4 top-14 z-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-400 backdrop-blur-xl sm:flex"
            >
              <Sparkles size={20} />
            </motion.div>
          </motion.div>

          {/* STORY CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              Our Philosophy
            </p>

            <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
              Great food begins with
              <span className="text-orange-400">
                {" "}great ingredients.
              </span>
            </h3>

            <div className="mt-7 space-y-5 text-sm leading-7 text-slate-400 sm:text-base">
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

            <div className="mt-9 space-y-3">
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
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-300 hover:border-orange-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.text}
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className="ml-auto shrink-0 text-slate-700 transition duration-300 group-hover:translate-x-1 group-hover:text-orange-400"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}

            <a
              href="#menu"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400 hover:shadow-orange-500/30"
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
          className="mt-28 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`relative p-7 text-center sm:p-9 ${
                  index < 2
                    ? "border-b border-white/10 lg:border-b-0"
                    : ""
                } ${
                  index % 2 === 0
                    ? "border-r border-white/10 lg:border-r"
                    : "lg:border-r"
                } ${
                  index === 3
                    ? "border-r-0"
                    : ""
                }`}
              >
                <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
                  {stat.label}
                </p>

                {/* Accent */}

                <div className="mx-auto mt-5 h-px w-8 bg-orange-400/50" />
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
          className="mx-auto mt-24 max-w-3xl text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 text-orange-400">
            <Users size={20} />
          </div>

          <blockquote className="mt-6 text-2xl font-semibold leading-relaxed tracking-tight text-slate-200 sm:text-3xl">
            “Good food brings people together.
            Great food gives them something to remember.”
          </blockquote>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-orange-400/50" />

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
              The TasteBite Philosophy
            </p>

            <div className="h-px w-8 bg-orange-400/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;