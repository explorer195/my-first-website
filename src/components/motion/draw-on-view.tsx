"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/cn";

type DrawOnViewProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Line art that draws itself in once visible. Shapes inside use the `draw`
 * utility (pure CSS), so dozens of strokes cost almost nothing at runtime.
 */
export function DrawOnView({ children, className }: DrawOnViewProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px -5% 0px -5%" });
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      data-drawn={inView}
      className={cn("text-muted", className)}
    >
      {children}
    </svg>
  );
}
