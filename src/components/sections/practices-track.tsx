"use client";

import { useRef } from "react";
import { motionQueries, useScrollScene } from "@/lib/gsap";

/**
 * Desktop: pins the section and turns vertical scrolling into a horizontal
 * journey through the practice panels. Smaller screens and reduced motion
 * get a normal vertical layout.
 */
export function PracticesTrack({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useScrollScene(root, ({ gsap }, rootEl) => {
    const mm = gsap.matchMedia();
    mm.add(motionQueries.desktop, () => {
      const track = rootEl.querySelector<HTMLElement>("[data-track]");
      const bar = rootEl.querySelector<HTMLElement>("[data-track-progress]");
      if (!track) return;

      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootEl,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar) gsap.set(bar, { scaleX: self.progress });
          },
        },
      });

      // Oversized numbers drift against the scroll for depth.
      gsap.utils.toArray<HTMLElement>("[data-drift]", rootEl).forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 30 },
          {
            xPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // Keyboard users: bring a focused link's panel into view.
      const onFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        const st = tween.scrollTrigger;
        if (!st || !track.contains(target)) return;
        const panel = target.closest<HTMLElement>("[data-panel]");
        if (!panel) return;
        rootEl.scrollTo({ left: 0 });
        const ratio = Math.min(1, panel.offsetLeft / Math.max(1, distance()));
        window.scrollTo({ top: st.start + ratio * (st.end - st.start), behavior: "auto" });
      };
      track.addEventListener("focusin", onFocus);
      return () => track.removeEventListener("focusin", onFocus);
    });
    return () => mm.revert();
  });

  return (
    <div ref={root} className="relative h-scroll:h-svh h-scroll:overflow-hidden">
      {children}
      <div aria-hidden className="absolute inset-x-12 bottom-8 hidden h-px bg-border h-scroll:block">
        <div data-track-progress className="h-full origin-left scale-x-0 bg-signal" />
      </div>
    </div>
  );
}
