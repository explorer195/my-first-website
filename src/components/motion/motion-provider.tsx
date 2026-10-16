"use client";

import { MotionConfig } from "motion/react";

/** Turns off movement-based Motion animations for people who prefer reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
