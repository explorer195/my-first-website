"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Search } from "lucide-react";
import { aiPlatforms } from "@/content/search-stack";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";

const ease = [0.16, 1, 0.3, 1] as const;

const states = [
  { label: "Search results", query: "best crm for growing sales teams" },
  { label: "Featured answer", query: "how long does a website migration take" },
  { label: "Generated answer", query: "compare project tools for agencies" },
  { label: "AI platforms", query: "yourbrand.com, visibility check" },
] as const;

/** A neutral grey bar standing in for text, so the mock never shows fake copy. */
function Bar({ width, strong = false }: { width: string; strong?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("block h-2", strong ? "bg-foreground/25" : "bg-foreground/10")}
      style={{ width }}
    />
  );
}

function YourBrand({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-xs text-highlight", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-signal" />
      yourbrand.com
    </span>
  );
}

const competitors = ["competitor-one.com", "marketplace.com", "review-site.com"];

function ResultsState({ playing }: { playing: boolean }) {
  // Your brand starts in fourth place and climbs to the top.
  const [climbed, setClimbed] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setClimbed(true), 500);
    return () => {
      clearTimeout(id);
      setClimbed(false);
    };
  }, [playing]);

  const rows = climbed ? ["you", ...competitors] : [...competitors, "you"];
  return (
    <ol className="flex flex-col gap-2">
      {rows.map((row, index) => (
        <motion.li
          key={row}
          layout
          transition={{ duration: 0.9, ease }}
          className={cn(
            "flex gap-4 border px-4 py-4",
            row === "you" ? "border-highlight/40 bg-background" : "border-transparent",
          )}
        >
          <span className={cn(type.label, "w-6 pt-0.5 text-muted")}>0{index + 1}</span>
          <span className="flex flex-1 flex-col gap-2">
            {row === "you" ? (
              <YourBrand />
            ) : (
              <span className="font-mono text-xs text-muted">{row}</span>
            )}
            <Bar width={row === "you" ? "78%" : "64%"} strong />
            <Bar width="88%" />
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

function AnswerState() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border border-highlight/40 bg-background p-4 md:p-6">
        <p className={cn(type.label, "text-muted")}>Featured answer</p>
        <div className="mt-4 flex flex-col gap-2">
          <Bar width="94%" strong />
          <Bar width="88%" strong />
          <Bar width="61%" strong />
        </div>
        <YourBrand className="mt-4" />
      </div>
      <div>
        <p className={cn(type.label, "text-muted")}>People also ask</p>
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {["72%", "58%", "66%"].map((width) => (
            <li key={width} className="flex items-center justify-between gap-4 py-4">
              <Bar width={width} />
              <span aria-hidden className="text-muted">+</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GeneratedState() {
  const cite = (n: number, you = false) => (
    <span
      className={cn(
        "mx-1 inline-flex size-6 shrink-0 items-center justify-center border align-middle font-mono text-xs",
        you ? "border-signal text-accent" : "border-border text-muted",
      )}
    >
      {n}
    </span>
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 md:p-6">
        <p className={cn(type.label, "text-muted")}>AI-generated answer</p>
        <div className="mt-4 flex flex-col gap-2">
          <span className="flex items-center gap-1">
            <Bar width="62%" strong />
            {cite(1, true)}
          </span>
          <Bar width="90%" strong />
          <span className="flex items-center gap-1">
            <Bar width="48%" strong />
            {cite(2)}
          </span>
          <span className="flex items-center gap-1">
            <Bar width="70%" strong />
            {cite(3, true)}
          </span>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <p className={cn(type.label, "text-muted")}>Sources</p>
        <ul className="mt-2 flex flex-col gap-2 text-sm">
          <li className="flex items-center justify-between gap-4 border border-signal/50 bg-background px-4 py-2">
            <YourBrand />
            <span className={cn(type.label, "text-accent")}>Cited</span>
          </li>
          <li className="flex items-center justify-between gap-4 px-4 py-2">
            <span className="font-mono text-xs text-muted">industry-journal.com</span>
          </li>
          <li className="flex items-center justify-between gap-4 border border-signal/50 bg-background px-4 py-2">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-highlight">
              <span aria-hidden className="size-1.5 rounded-full bg-signal" />
              yourbrand.com/guide
            </span>
            <span className={cn(type.label, "text-accent")}>Cited</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

const platformStatus = ["Cited", "Mentioned", "Cited", "Recommended", "Mentioned", "Cited"];
const platformReach = ["86%", "72%", "64%", "58%", "48%", "54%"];

function PlatformsState() {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {aiPlatforms.map((platform, index) => (
        <li key={platform} className="grid grid-cols-12 items-center gap-4 py-4">
          <span className="col-span-5 text-sm font-medium">{platform}</span>
          <span className="col-span-4 block h-1 bg-foreground/10">
            <motion.span
              className="block h-full origin-left bg-highlight"
              style={{ width: platformReach[index] }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.15 + index * 0.08, ease }}
            />
          </span>
          <span className={cn(type.label, "col-span-3 text-right text-muted")}>
            {platformStatus[index]}
          </span>
        </li>
      ))}
    </ul>
  );
}

type SearchVisualProps = {
  state: number;
  /** Plays the ranking animation (used when the panel is on screen). */
  playing?: boolean;
  className?: string;
};

/**
 * Illustrative interface that morphs between search results, a featured
 * answer, a generated answer with citations and AI platform visibility.
 */
export function SearchVisual({ state, playing = true, className }: SearchVisualProps) {
  const reduceMotion = usePrefersReducedMotion();
  const current = states[state];

  return (
    <figure
      className={cn("flex flex-col border border-border bg-surface", className)}
      aria-label={`Illustration: ${current.label.toLowerCase()}`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-4 md:px-6">
        <span className={cn(type.label, "text-muted")}>{current.label}</span>
        <span className={cn(type.label, "text-muted")}>Illustrative</span>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex h-12 items-center gap-4 border border-border bg-background px-4">
          <Search aria-hidden className="size-4 shrink-0 text-muted" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.query}
              className="truncate text-sm"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              {current.query}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="relative mt-6 min-h-96">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              {state === 0 && <ResultsState playing={playing} />}
              {state === 1 && <AnswerState />}
              {state === 2 && <GeneratedState />}
              {state === 3 && <PlatformsState />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </figure>
  );
}
