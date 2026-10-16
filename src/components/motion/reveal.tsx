"use client";

import { motion, type Variants } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Record<"up" | "fade" | "mask", Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  // Wipes the content in from the bottom edge.
  mask: {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", y: 16 },
    show: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
  },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
};

/** Reveals content once as it scrolls into view. */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 0.8,
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type RevealListProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "ul" | "ol" | "div";
};

/** Staggers the entrance of its `RevealItem` children. */
export function RevealList({ children, className, stagger = 0.08, as = "div" }: RevealListProps) {
  const reduceMotion = usePrefersReducedMotion();
  const Tag = motion[as];
  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: "li" | "div";
  variant?: keyof typeof variants;
};

export function RevealItem({ children, className, as = "div", variant = "up" }: RevealItemProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={variants[variant]} transition={{ duration: 0.7, ease }}>
      {children}
    </Tag>
  );
}
