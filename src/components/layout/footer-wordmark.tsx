"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Container } from "@/components/ui/container";

const ease = [0.16, 1, 0.3, 1] as const;
const digital = "Digital".split("");
const scope = ["S", "c", "o", "p", "e"];

/** Full-width wordmark whose letters rise into place as the footer appears. */
export function FooterWordmark() {
  const reduceMotion = usePrefersReducedMotion();

  const letter = (char: string, index: number, highlight = false) => {
    const isOrb = char === "o" && highlight;
    return (
      <span key={`${char}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
          className={highlight ? "inline-block text-highlight" : "inline-block"}
          variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
          transition={{ duration: 1, ease, delay: index * 0.04 }}
        >
          {isOrb ? <span className="scope-o" /> : char}
        </motion.span>
      </span>
    );
  };

  return (
    <Container className="mt-16 md:mt-24">
      <motion.p
        className="font-display text-wordmark leading-none font-extrabold whitespace-nowrap font-stretch-expanded select-none"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        <span className="sr-only">DigitalScope</span>
        <span aria-hidden>
          {digital.map((char, i) => letter(char, i))}
          {scope.map((char, i) => letter(char, digital.length + i, true))}
        </span>
      </motion.p>
    </Container>
  );
}
