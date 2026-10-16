"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { motionQueries, useScrollScene } from "@/lib/gsap";

type ClipRevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Section transition: the content enters as an inset panel and widens to
 * full bleed as it scrolls into place.
 */
export function ClipReveal({ children, className }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, ({ gsap }, root) => {
    const mm = gsap.matchMedia();
    mm.add({ motionOk: motionQueries.motionOk, desktop: "(min-width: 1024px)" }, (context) => {
      const { motionOk, desktop } = context.conditions ?? {};
      if (!motionOk) return;
      const inset = desktop ? "0% 4% 0% 4%" : "0% 3% 0% 3%";
      gsap.fromTo(
        root,
        { clipPath: `inset(${inset})` },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "top 20%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}
