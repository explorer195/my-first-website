// The type scale for the whole site. Compose these presets instead of
// writing font sizes by hand, so every heading level stays consistent.
export const type = {
  /** Oversized hero statement (one per page). */
  hero: "font-display font-extrabold font-stretch-semi-expanded text-hero md:font-stretch-expanded",
  /** Oversized closing statement. */
  mega: "font-display font-extrabold font-stretch-expanded text-mega",
  /** Large section headings. */
  display:
    "font-display font-bold font-stretch-semi-expanded text-4xl leading-[1.02] tracking-tight text-balance md:text-5xl lg:text-6xl",
  /** Standard section headings. */
  heading:
    "font-display font-bold font-stretch-semi-expanded text-3xl leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl",
  /** Subheadings (h3). */
  subheading:
    "font-display font-semibold font-stretch-semi-expanded text-xl leading-snug tracking-tight md:text-2xl",
  /** Introductory paragraph under a heading. */
  lead: "text-lg leading-relaxed text-muted text-pretty md:text-xl",
  /** Running text. */
  body: "text-base leading-relaxed text-pretty",
  /** Captions and supporting notes. */
  small: "text-sm leading-normal text-muted",
  /** Mono eyebrow labels. */
  label: "font-mono text-xs font-medium uppercase tracking-widest",
} as const;
