"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[28rem] max-w-3xl rounded-full bg-accent/20 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28 lg:pb-28 lg:pt-36"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
        >
          <Sparkles className="size-3.5 text-accent" aria-hidden />
          Built with Next.js &amp; Tailwind CSS
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Build something{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            amazing
          </span>{" "}
          on the web
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-base text-muted text-pretty sm:text-lg"
        >
          A fast, modern and fully responsive starting point for your next
          idea. Clean design, smooth animations, and ready to deploy.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="#features"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
          >
            Explore features
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-surface"
          >
            Learn more
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
