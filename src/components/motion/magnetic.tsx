"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";

type MagneticProps = {
  children: React.ReactNode;
  /** How far the element follows the pointer (0–1). */
  strength?: number;
  className?: string;
};

/** Gently pulls its child toward the pointer on mouse and trackpad devices. */
export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.6 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
