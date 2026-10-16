"use client";

import { useRef } from "react";
import { motionQueries, useScrollScene } from "@/lib/gsap";

type ScopeRevealProps = {
  children: React.ReactNode;
};

/**
 * Signature transition: a gold "scope" dot opens into a circle that reveals
 * the panel inside. Pinned on large screens; scroll-linked everywhere else.
 */
export function ScopeReveal({ children }: ScopeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, ({ gsap }, root) => {
    const mm = gsap.matchMedia();
    mm.add({ motionOk: motionQueries.motionOk, desktop: "(min-width: 1024px)" }, (context) => {
      const { motionOk, desktop } = context.conditions ?? {};
      if (!motionOk) return;
      const panel = root.querySelector("[data-scope-panel]");
      const dot = root.querySelector("[data-scope-dot]");
      const content = root.querySelector("[data-scope-content]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: desktop ? "top top" : "top 85%",
          end: desktop ? "+=110%" : "top 5%",
          scrub: true,
          pin: Boolean(desktop),
        },
      });
      tl.fromTo(
        panel,
        { clipPath: "circle(1% at 50% 50%)" },
        { clipPath: "circle(72% at 50% 50%)", ease: "power2.in", duration: 1 },
      )
        .fromTo(dot, { scale: 1, opacity: 1 }, { scale: 4, opacity: 0, ease: "power1.in", duration: 0.4 }, 0)
        .fromTo(content, { y: 80, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.45 }, 0.6);
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <span
        data-scope-dot
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal opacity-0"
      />
      {children}
    </div>
  );
}
