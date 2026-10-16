"use client";

import { Fragment, useRef } from "react";
import { motionQueries, useScrollScene } from "@/lib/gsap";

type ScrubTextProps = {
  text: string;
  className?: string;
  /** Rendered after the last word, e.g. a ScopeDot. */
  after?: React.ReactNode;
};

/**
 * A statement whose words light up one by one as the reader scrolls
 * through it. Without motion it simply renders at full strength.
 */
export function ScrubText({ text, className, after }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useScrollScene(ref, ({ gsap }, root) => {
    const mm = gsap.matchMedia();
    mm.add(motionQueries.motionOk, () => {
      gsap.fromTo(
        root.querySelectorAll("[data-word]"),
        // Starts at 40% so unrevealed words still meet large-text contrast.
        { opacity: 0.4 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 82%", end: "bottom 52%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span data-word>
            {word}
            {index === words.length - 1 && after}
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}
