"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { serviceCount, type Division } from "@/content/divisions";
import { practiceById, practices, type PracticeId } from "@/content/practices";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import { type } from "@/lib/typography";
import { useMediaQuery } from "@/lib/use-media-query";

const ease = [0.16, 1, 0.3, 1] as const;

type Filter = "all" | PracticeId;

function enquiryLink(division: Division) {
  const subject = `Enquiry: ${division.letter}, ${division.name}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

function ServiceList({ division, limit }: { division: Division; limit: number }) {
  const all = division.groups.flatMap((g) => g.items);
  const shown = all.slice(0, limit);
  return (
    <>
      <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {shown.map((item) => (
          <li key={item} className="border-b border-border py-2 text-sm">
            {item}
          </li>
        ))}
      </ul>
      {all.length > shown.length && (
        <p className={cn(type.small, "mt-4")}>and {all.length - shown.length} more services</p>
      )}
    </>
  );
}

function Preview({ division }: { division: Division }) {
  const practice = practiceById[division.practice];
  return (
    <div id="division-preview" aria-live="polite" className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={division.letter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
            <span className="block overflow-hidden">
              <motion.span
                className="block font-display text-mega leading-none font-extrabold text-highlight font-stretch-expanded"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease }}
              >
                {division.letter}
              </motion.span>
            </span>
            <span className={cn(type.label, "pb-2 text-right text-muted")}>
              {practice.number} · {practice.name}
            </span>
          </div>
          <h3 className={cn(type.subheading, "mt-6")}>{division.name}</h3>
          {division.fullName && <p className={cn(type.small, "mt-1")}>{division.fullName}</p>}
          <p className={cn(type.body, "mt-4 text-muted")}>{division.summary}</p>
          <p className={cn(type.label, "mt-8 text-muted")}>{serviceCount(division)} services</p>
          <div className="mt-2">
            <ServiceList division={division} limit={10} />
          </div>
          <ArrowLink href={enquiryLink(division)} className="mt-6">
            Discuss {division.name}
          </ArrowLink>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function DivisionIndex({ divisions }: { divisions: Division[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState("A");
  const [expanded, setExpanded] = useState<string | null>(null);
  const compact = useMediaQuery("(max-width: 1023px)");

  // Links such as #division-m (from the practice panels) open that division.
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#division-([a-z])$/);
      if (!match) return;
      const letter = match[1].toUpperCase();
      setFilter("all");
      setActive(letter);
      setExpanded(letter);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const visible = filter === "all" ? divisions : divisions.filter((d) => d.practice === filter);
  const activeDivision = divisions.find((d) => d.letter === active) ?? divisions[0];

  const filters: Array<{ id: Filter; label: string; count: number }> = [
    { id: "all", label: "All", count: divisions.length },
    ...practices.map((p) => ({
      id: p.id,
      label: p.name,
      count: divisions.filter((d) => d.practice === p.id).length,
    })),
  ];

  function choose(id: Filter) {
    setFilter(id);
    const first = id === "all" ? divisions[0] : divisions.find((d) => d.practice === id);
    if (first) setActive(first.letter);
    setExpanded(null);
  }

  return (
    <div className="mt-12 md:mt-16">
      <div
        role="group"
        aria-label="Filter divisions by practice"
        className="-mx-4 flex gap-6 overflow-x-auto border-b border-border px-4 md:mx-0 md:gap-8 md:px-0"
      >
        {filters.map((f) => {
          const selected = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              onClick={() => choose(f.id)}
              className={cn(
                "relative flex h-12 shrink-0 items-center gap-2 text-sm whitespace-nowrap transition-colors duration-300",
                selected ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {f.label}
              <span className="font-mono text-xs text-muted">{f.count}</span>
              {selected && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-signal"
                  transition={{ duration: 0.5, ease }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-4 gap-x-6 md:mt-12 md:grid-cols-8 lg:grid-cols-12">
        <ul className="col-span-4 md:col-span-8 lg:col-span-7 lg:columns-2 lg:gap-x-8">
          {visible.map((division) => {
            const isActive = !compact && active === division.letter;
            const isOpen = compact && expanded === division.letter;
            const detailsId = `division-${division.letter.toLowerCase()}-details`;
            return (
              <li
                key={division.letter}
                id={`division-${division.letter.toLowerCase()}`}
                className="scroll-mt-24 break-inside-avoid border-b border-border"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActive(division.letter);
                    if (compact) setExpanded(isOpen ? null : division.letter);
                  }}
                  // Pointer movement (not mouseenter), so rows sliding under a
                  // resting cursor during scrolling don't change the preview.
                  onPointerMove={(event) => {
                    if (!compact && event.pointerType === "mouse") setActive(division.letter);
                  }}
                  onFocus={() => !compact && setActive(division.letter)}
                  aria-expanded={compact ? isOpen : undefined}
                  aria-controls={compact ? detailsId : "division-preview"}
                  className="group flex min-h-16 w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className={cn(
                      "w-8 shrink-0 font-mono text-sm transition-colors duration-300",
                      isActive || isOpen ? "text-highlight" : "text-muted group-hover:text-highlight",
                    )}
                  >
                    {division.letter}
                  </span>
                  <span className="flex-1 text-lg leading-snug font-medium md:text-xl lg:text-lg">
                    {division.name}
                  </span>
                  <span className={cn(type.label, "hidden text-muted md:inline lg:hidden")}>
                    {practiceById[division.practice].name}
                  </span>
                  {compact ? (
                    <Plus
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0 text-muted transition-transform duration-500 ease-out-expo",
                        isOpen && "rotate-45",
                      )}
                    />
                  ) : (
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0 transition-all duration-500 ease-out-expo",
                        isActive
                          ? "translate-x-0 text-highlight opacity-100"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={detailsId}
                      role="region"
                      aria-label={division.name}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-12">
                        <p className={cn(type.body, "text-muted")}>{division.summary}</p>
                        <div className="mt-4">
                          <ServiceList division={division} limit={8} />
                        </div>
                        <ArrowLink href={enquiryLink(division)} className="mt-4">
                          Discuss {division.name}
                        </ArrowLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-32">
            <Preview division={activeDivision} />
          </div>
        </div>
      </div>
    </div>
  );
}
