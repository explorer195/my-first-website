"use client";

import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers resize the viewport when the address bar hides; ignoring
// that avoids jumpy scroll-linked animations.
ScrollTrigger.config({ ignoreMobileResize: true });

export type ScrollLibrary = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
};

const library: ScrollLibrary = { gsap, ScrollTrigger };

/** Media query helpers shared by scroll animations. */
export const motionQueries = {
  /** Full scroll storytelling: large screens without reduced motion. */
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  /** Any screen without reduced motion. */
  motionOk: "(prefers-reduced-motion: no-preference)",
} as const;

/** Re-measures scroll animations after a layout change. */
export function refreshScrollScenes() {
  ScrollTrigger.refresh();
}

/**
 * Sets up GSAP scroll animations for a component, scoped to `scope`.
 * Everything created in `setup` is reverted when the component unmounts.
 *
 * Measured option: creating scenes during hydration, before the page's load
 * event, scored better in Lighthouse than deferring GSAP until after load
 * (one page measurement instead of a second burst of work).
 */
export function useScrollScene(
  scope: RefObject<HTMLElement | null>,
  setup: (library: ScrollLibrary, root: HTMLElement) => void | (() => void),
  dependencies: DependencyList = [],
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    let cleanup: void | (() => void);
    const context = gsap.context(() => {
      cleanup = setup(library, root);
    }, root);
    return () => {
      cleanup?.();
      context.revert();
    };
    // `setup` is intentionally excluded: callers list what it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
