"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type CountUpProps = {
  to: number;
  className?: string;
};

/** Counts up to a number the first time it scrolls into view. */
export function CountUp({ to, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  // The final number is in the HTML, so it is correct without JavaScript.
  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
