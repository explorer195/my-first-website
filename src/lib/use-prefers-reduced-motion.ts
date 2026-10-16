"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * True when the visitor asks for reduced motion. Unlike Motion's hook it
 * returns false during prerendering and hydration, so server and browser
 * markup always match; components then re-render with the real preference.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
