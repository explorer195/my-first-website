"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { SearchLayer } from "@/content/search-stack";
import { cn } from "@/lib/cn";
import { refreshScrollScenes, useScrollScene } from "@/lib/gsap";
import { type } from "@/lib/typography";
import { useMediaQuery } from "@/lib/use-media-query";
import { SearchVisual } from "./search-visual";

/** On small screens each step carries its own copy of the visual. */
function InlineVisual({ state }: { state: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  return (
    <div ref={ref} className="mt-8 md:col-span-4 md:mt-0">
      <SearchVisual state={state} playing={inView} />
    </div>
  );
}

/**
 * Desktop: the four disciplines scroll past while one pinned interface
 * changes to match the step in the middle of the screen.
 */
export function SearchStackScroller({ layers }: { layers: SearchLayer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Render only the visuals this screen size shows (one pinned copy on
  // desktop, one per step below it). Prerendered as desktop.
  const isDesktop = useMediaQuery("(min-width: 1024px)", true);

  // The layout height changes when switching visuals; re-measure triggers.
  useEffect(() => {
    refreshScrollScenes();
  }, [isDesktop]);

  useScrollScene(root, ({ gsap, ScrollTrigger }, rootEl) => {
    gsap.utils.toArray<HTMLElement>("[data-step]", rootEl).forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) setActive(index);
        },
      });
    });
    gsap.fromTo(
      rootEl.querySelector("[data-progress]"),
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootEl.querySelector("[data-steps]"),
          start: "top 55%",
          end: "bottom 55%",
          scrub: true,
        },
      },
    );
  });

  return (
    <div
      ref={root}
      className="mt-16 grid grid-cols-4 gap-x-6 md:mt-24 md:grid-cols-8 lg:mt-16 lg:grid-cols-12"
    >
      <ol data-steps className="relative col-span-4 md:col-span-8 lg:col-span-5">
        <span aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-px bg-border lg:block">
          <span data-progress className="block h-full w-px origin-top bg-signal" />
        </span>
        {layers.map((layer, index) => {
          const isActive = active === index;
          return (
            <li
              key={layer.id}
              data-step
              className="relative border-t border-border py-12 first:border-t-0 first:pt-0 md:grid md:grid-cols-8 md:gap-x-6 lg:flex lg:min-h-[72svh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0 lg:pl-12"
            >
              <div className="md:col-span-4">
                <p className={cn(type.label, "flex items-center gap-4 text-muted")}>
                  <span
                    aria-hidden
                    className={cn(
                      "size-2 rounded-full transition-colors duration-500",
                      isActive ? "bg-signal" : "bg-foreground/20",
                    )}
                  />
                  <span>
                    {layer.letter} <span className="text-foreground">{layer.acronym}</span>
                  </span>
                  <span className="hidden lg:inline">{layer.name}</span>
                </p>
                <h3
                  className={cn(
                    type.heading,
                    "mt-4 transition-colors duration-500 lg:mt-6",
                    !isActive && "lg:text-muted",
                  )}
                >
                  {layer.title}
                </h3>
                <p className={cn(type.body, "mt-4 max-w-md text-muted md:text-lg")}>{layer.body}</p>
              </div>
              {!isDesktop && <InlineVisual state={index} />}
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
        <div className="sticky top-24 flex min-h-[calc(100svh-6rem)] items-center xl:top-0 xl:min-h-svh">
          {isDesktop && <SearchVisual state={active} className="w-full" />}
        </div>
      </div>
    </div>
  );
}
