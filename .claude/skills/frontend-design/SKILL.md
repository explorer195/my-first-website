---
name: frontend-design
description: The permanent visual design standard for this website. Use it whenever you design, build, restyle or modify anything visible on the site, including pages, sections, components, layout, typography, colors, spacing, animation and responsive behavior, even for a small UI tweak. Read it before writing or editing any file in src/app or src/components, or src/app/globals.css.
---

# Frontend design standard

This is the permanent visual standard for this project. Every UI change must follow it. If a request conflicts with a rule here, point out the conflict to the user before going ahead.

Project facts you need:
- Next.js App Router, TypeScript, Tailwind CSS v4, Motion for React (`motion/react`), Lucide (`lucide-react`), GSAP + ScrollTrigger (scroll storytelling), three.js + React Three Fiber (hero globe only).
- Design tokens are in `src/app/globals.css` (CSS variables exposed through `@theme inline`). The type scale presets are in `src/lib/typography.ts`.
- Site-wide text is in `src/lib/site.ts`. Page content (divisions A–Z, practices, markets, FAQ) is in `src/content/`. Sections are in `src/components/sections/`, primitives in `src/components/ui/`, animation helpers in `src/components/motion/`.
- This Next.js version differs from older ones. Check `node_modules/next/dist/docs/` before using a Next.js API (see `AGENTS.md`). Cache Components is on: never call `new Date()` or `Math.random()` while rendering.

## 1. Design direction

The goal is a polished, agency-quality site that does not look AI-generated. Brand idea: **"signal in the dark"**, the night-side globe from the DigitalScope emblem. Deep navy, royal blue, and gold used sparingly as the "signal".

- **Avoid generic AI aesthetics.** Avoid these patterns: purple-to-pink gradients, a glowing blob behind the hero, a centered badge pill above a centered headline, three or four identical icon cards in a row, and stock phrases like "Build something amazing".
- **Use intentional hierarchy.** Each section has one focal point. Rank its elements by size, weight, color and space so the reader's eye knows where to go first, second and third.
- **Use sophisticated layouts, not repeated card grids.** Before reaching for a grid of cards, consider a numbered list, a split layout, a table, a timeline, alternating rows, an index, or one large feature next to supporting details.
- **Use whitespace deliberately.** Empty space separates ideas and gives important elements room. Don't fill every gap.
- **Use few gradients.** At most one subtle gradient per page, and only when it has a purpose (the globe's placeholder sphere is the one on the homepage). Never put gradients on text, buttons or card backgrounds.
- **Square corners.** Controls and panels use no rounding. Circles are reserved for meaning: the gold scope dot, status dots, map nodes.
- **Avoid unnecessary pills.** Don't use `rounded-full` on buttons, badges or tags.
- **No random icons.** Use an icon only when it adds meaning a word cannot (arrows on links, search, plus/close). One size per context (`size-4` in buttons and links).
- **Don't center every section.** Left-aligned text is the default.
- **The gold scope dot** (`<ScopeDot />`) replaces the full stop in headlines; the gold orb (`scope-o`) replaces the "o" in "Scope". Use gold only for these signals, focus rings on dark sections and tiny highlights.
- **Honest content.** Never invent client names, testimonials, statistics or results. Illustrative interfaces must be labeled "Illustrative". Never promise guaranteed rankings or AI visibility.

## 2. Typography

Two families, loaded through `next/font` in `src/app/layout.tsx`:
- **Mona Sans** (variable, with a width axis) for display and body. Headlines use the expanded width (`font-stretch-expanded` or `font-stretch-semi-expanded`).
- **Geist Mono** for labels, numbers and codes.

Use only the presets in `src/lib/typography.ts` (`type.hero`, `type.mega`, `type.display`, `type.heading`, `type.subheading`, `type.lead`, `type.body`, `type.small`, `type.label`). Do not invent sizes or use arbitrary values like `text-[37px]`.

| Role                    | Preset            | Size                                       |
| ----------------------- | ----------------- | ------------------------------------------ |
| Hero statement (h1)     | `type.hero`       | `text-hero` token (fluid, 34px → 128px)     |
| Closing statement       | `type.mega`       | `text-mega` token (fluid, 48px → 176px)     |
| Footer wordmark         | `text-wordmark`   | fills the container width                   |
| Large section heading   | `type.display`    | `text-4xl` → `md:text-5xl` → `lg:text-6xl`  |
| Section heading / h3    | `type.heading`    | `text-3xl` → `md:text-4xl` → `lg:text-5xl`  |
| Subheading              | `type.subheading` | `text-xl` → `md:text-2xl`                   |
| Lead paragraph          | `type.lead`       | `text-lg` → `md:text-xl`, muted             |
| Body                    | `type.body`       | `text-base`                                 |
| Small / caption         | `type.small`      | `text-sm`, muted                            |
| Label / eyebrow         | `type.label`      | mono `text-xs`, uppercase, widest tracking  |

- Body text is never smaller than `text-base` (16px).
- Keep line lengths readable: `max-w-prose` or narrower for paragraphs, `max-w-md`/`max-w-xl` for leads.
- Headings use `text-balance`, paragraphs `text-pretty`. One `h1` per page, then `h2`, `h3` in order.
- Section labels use `<SectionLabel number="02">Name</SectionLabel>`.

## 3. Spacing (8px system)

All spacing is a multiple of 8px. A Tailwind spacing step is 4px, so use even steps only:
`2` (8px), `4` (16), `6` (24), `8` (32), `10` (40), `12` (48), `16` (64), `20` (80), `24` (96), `32` (128), `40` (160).

- Don't use odd steps such as `p-3`, `gap-5` or `mt-7`, and don't use arbitrary pixel values. The only exceptions are hairline details (`0.5`, `1`) inside small controls, em-based optical adjustments in headlines, and viewport-based layout heights for scroll scenes.
- **Section spacing** is the same everywhere: `py-16 md:py-24 lg:py-32`, through the `<Section>` component.
- **Container:** use `<Container>` (`max-w-7xl px-4 md:px-8 lg:px-12`, widening to `2xl:max-w-8xl` on large desktops). Never repeat the container classes inline.
- **Vertical rhythm inside a section:** about 16px from label to heading, 24px from heading to lead, and 48–64px from the intro to the content.
- **Proportional scaling:** spacing grows from mobile to desktop in steps (for example `gap-8 md:gap-12 lg:gap-16`).

## 4. Color tokens and section tones

Brand colors (measured from the logo) are defined once, as raw palette variables at the top of `globals.css`. Components never use them directly; they use semantic tokens.

Every section sets a **tone** with `data-tone="paper"` (warm ivory, the default) or `data-tone="night"` (deep navy). The tone redefines the semantic tokens, so the same classes work on both. In the visitor's dark mode, paper sections become "dusk" navy and night sections go deeper, so tones stay distinct.

| Token        | Tailwind usage                                  | Purpose                                     |
| ------------ | ----------------------------------------------- | ------------------------------------------- |
| Background   | `bg-background`                                 | Section background (set by the tone)        |
| Surface      | `bg-surface`                                    | Raised or alternate areas, panels           |
| Text         | `text-foreground`                               | Main text                                   |
| Muted text   | `text-muted`                                    | Secondary text, captions                    |
| Border       | `border-border`                                 | Hairlines and dividers                      |
| Primary      | `bg-primary`, `hover:bg-primary-hover`, `text-primary-foreground` | Primary buttons (royal blue) |
| Secondary    | `bg-secondary`, `text-secondary-foreground`     | Inverted buttons                            |
| Highlight    | `text-highlight`                                | Blue emphasis in text, links, the "Scope" wordmark |
| Accent       | `text-accent`                                   | Small gold text accents (contrast-safe per tone) |
| Signal       | `bg-signal`, `stroke-signal`                    | The gold scope dot and decorative gold marks |
| Ring         | (global `:focus-visible`)                       | Focus outline: blue on paper, gold on night |

Rules:
- **Never put hex, rgb or hsl values in components**, and don't use Tailwind's built-in palette colors. If a token is missing, add it to `globals.css` for both tones and both color schemes.
- Code that can't use CSS classes reads the tokens instead: the 3D scene reads CSS variables at runtime; the Open Graph image reads `globals.css` at build time.
- Opacity modifiers on tokens are fine (`bg-foreground/5`, `border-signal/50`).
- Text must meet WCAG AA contrast (4.5:1 body, 3:1 large text) in both tones and both color schemes. Re-check contrast when changing a token. Never dim body text with opacity.

## 5. Components

Build reusable components in `src/components/` (primitives in `src/components/ui/`). Pages and sections compose them; they don't restyle them inline.

- **Buttons:** `<Button>` with `variant` (`primary`, `secondary`, `ghost`), `size` (`md`, `lg`), optional Lucide `icon` and `iconMotion`. It renders a link when given `href`. The label rolls up on hover. Minimum height `h-12`. Wrap the main call to action in `<Magnetic>`.
- **Links:** `<ArrowLink>` for text links with the animated underline (`link-underline` utility). `<SmartLink>` chooses Next.js navigation or a plain anchor.
- **Cards:** where a card is genuinely right, use one structure (label, title, body, action) with the same padding (`p-6 md:p-8`), a hairline border and no rounding.
- **Forms:** shared `Input`, `Textarea` and `Label` (to be built with the contact page): `h-12`, hairline border, visible labels, helper and error text via `aria-describedby`, clear focus, invalid and disabled styles.
- **Interaction states:** hover (Tailwind's `hover:` only fires on hover-capable devices), press (`active:`), and keyboard focus (global `:focus-visible` ring; never remove it).
- **Accessibility:** real `<button>` and `<a>` elements, `aria-label` on icon-only buttons, decorative icons and art `aria-hidden`, `aria-expanded`/`aria-controls` on toggles, touch targets at least 48×48px. Accessible names must contain the visible text (for example the logo keeps a hidden "o" inside the gold orb). Prefer native elements: the FAQ uses `<details>`.

## 6. Layout

- **Editorial compositions** on a 12-column grid (`grid-cols-4 md:grid-cols-8 lg:grid-cols-12`). Place content across columns deliberately (heading in columns 1–8, lead in 9–12).
- **Use asymmetry where it helps:** uneven splits, sticky side columns, art that breaks the container edge.
- **Mix full-bleed and contained:** tone changes run full width while content stays in the `Container`.
- **Vary the sections:** adjacent sections differ in structure and tone. Current homepage rhythm: hero (night) → positioning (night, statement) → AI search (paper, sticky visual) → practices (night, horizontal) → A–Z index (paper) → markets (night, map) → approach (paper) → FAQ (paper surface) → closing call to action (night, scope reveal) → footer (night).
- **Show the structure:** hairlines, numbered labels and alignment instead of boxes and shadows.

## 7. Animation

Use the right tool for each job, with restraint. Not every section should fade up: vary the technique and give each one a purpose.

- **CSS** for the hero intro (it must run before JavaScript loads), hover transitions, and line drawings (`draw` utility with `pathLength="1"`, triggered by `<DrawOnView>`).
- **Motion for React** (`motion/react`) for component and UI animation: reveals (`<Reveal>`, `<RevealList>`/`<RevealItem>`), menus, accordions, layout transitions, magnetic buttons, the cursor, counters.
- **GSAP + ScrollTrigger** for scroll-linked storytelling only: scrubbed text, pinned scenes, horizontal scrolling, clip-path transitions, parallax. Always use `useScrollScene(ref, setup)` from `src/lib/gsap.ts` and wrap effects in `gsap.matchMedia()` with `motionQueries` so they only run where intended.
- **three.js / React Three Fiber** only for the hero globe, loaded lazily (`next/dynamic`, `ssr: false`) after the browser is idle, only on hardware-accelerated WebGL, paused when off screen, with a static fallback. Don't add 3D elsewhere without a brand reason.
- **Reduced motion:** `MotionConfig reducedMotion="user"` covers Motion transforms. For anything that changes what is rendered, use `usePrefersReducedMotion()` (never Motion's `useReducedMotion`, which causes hydration mismatches). Horizontal and pinned layouts use the `h-scroll:` variant, which only applies with motion allowed on large screens. CSS animations need a `motion-reduce:` or media-query fallback. With reduced motion, every piece of content must still be visible.
- **Timing:** reveals 0.6–0.9s with the `ease-out-expo` curve, staggers 0.04–0.1s, nothing that delays reading the main text.
- **LCP-safe hero text:** the hero headline is painted from the first frame; a background-colored shutter lifts to reveal it. Don't animate the LCP text from fully hidden.

## 8. Responsive design

- **Mobile-first:** base classes for a 360–430px phone, then `md:` (tablet), `lg:` (laptop), `xl:`/`2xl:` (desktop and large desktop).
- **Design the tablet layout separately** (for example the search steps sit beside their visual at `md`).
- **Don't just shrink the desktop design.** Reorder, stack, simplify: horizontal scrolling becomes stacked panels, the pinned visual becomes one visual per step, the index preview becomes an accordion.
- **Render only what a breakpoint shows** when a component is heavy (`useMediaQuery` with a sensible server default), rather than hiding duplicates with CSS.
- No horizontal page scroll at any width from 320px up. Check 390px, 768px, 1024px, 1440px and 1920px.

## 9. Quality and performance

- **Semantic HTML:** `header`, `nav`, `main`, `section` (with a heading or `aria-labelledby`), `article`, `footer`, lists for lists, `figure` for illustrations.
- **Accessibility:** WCAG 2.2 AA, logical headings, a skip link, visible focus, alt text (`alt=""` for decorative images). Target 100 in Lighthouse accessibility.
- **SEO:** every page exports `metadata` (unique title and description). Keep `metadataBase`, `app/sitemap.ts` (add each new page), `app/robots.ts`, the Open Graph image and the JSON-LD in `src/components/seo/structured-data.tsx` up to date.
- **Images:** `next/image` with dimensions or `fill` + `sizes`; `preload` only for an above-the-fold hero image (`priority` is deprecated here).
- **Fonts:** only through `next/font`; preload only the font used above the fold.
- **Performance (measured on this site):** server components by default; `"use client"` only on the smallest interactive piece. Keep heavy interactive components lean (prefer CSS for repeated decorative animation). Things that were measured and made Lighthouse worse here: wrapping static sections in `<Suspense>`, `LazyMotion`, and deferring GSAP until after load. Don't reintroduce them without re-measuring.
- Never compute values that differ between server and browser during render (round floating-point SVG coordinates; read dates and media queries on the client).

## Before you finish any UI change

1. Every color is a token, every spacing value is an 8px step, and every font size comes from the type presets.
2. Check the page against section 1. Remove any generic AI pattern or invented claim that slipped in.
3. Hover, active, focus and disabled states work, and everything can be used with the keyboard.
4. Reduced motion is respected and all content is visible with it on.
5. `npm run lint`, `npm run typecheck` and `npm run build` all pass, with no console errors or hydration warnings.
6. Look at the page at 390px, 768px, 1024px, 1440px and 1920px, in light and dark mode, and re-run Lighthouse for pages with new interactive or animated sections.
