---
name: frontend-design
description: The permanent visual design standard for this website. Use it whenever you design, build, restyle or modify anything visible on the site, including pages, sections, components, layout, typography, colors, spacing, animation and responsive behavior, even for a small UI tweak. Read it before writing or editing any file in src/app or src/components, or src/app/globals.css.
---

# Frontend design standard

This is the permanent visual standard for this project. Every UI change must follow it. If a request conflicts with a rule here, point out the conflict to the user before going ahead.

Project facts you need:
- Next.js App Router, TypeScript, Tailwind CSS v4, Motion for React (`motion/react`), Lucide (`lucide-react`).
- Design tokens are in `src/app/globals.css` (CSS variables exposed through `@theme inline`).
- Site-wide text is in `src/lib/site.ts`. Sections are in `src/components/`.
- This Next.js version differs from older ones. Check `node_modules/next/dist/docs/` before using a Next.js API (see `AGENTS.md`).

## 1. Design direction

The goal is a polished, agency-quality site that does not look AI-generated.

- **Avoid generic AI aesthetics.** Avoid these patterns: purple-to-pink gradients, a glowing blob behind the hero, a centered badge pill above a centered headline, three or four identical icon cards in a row, and stock phrases like "Build something amazing".
- **Use intentional hierarchy.** Each section has one focal point. Rank its elements by size, weight, color and space so the reader's eye knows where to go first, second and third.
- **Use sophisticated layouts, not repeated card grids.** Before reaching for a grid of cards, consider a numbered list, a split layout, a table, a timeline, alternating rows or one large feature next to supporting details.
- **Use whitespace deliberately.** Empty space separates ideas and gives important elements room. Don't fill every gap.
- **Use few gradients.** At most one subtle gradient per page, and only when it has a purpose. Never put gradients on text, buttons or card backgrounds by default.
- **Limit rounded rectangles.** Choose one small radius scale and stick to it: `rounded-sm` or `rounded-md` for controls and `rounded-lg` at most for large surfaces. Not every block needs a rounded box around it. Often a border line or plain spacing is enough.
- **Avoid unnecessary pills.** Don't use `rounded-full` on buttons, badges or tags unless the shape carries meaning (for example, a status dot or avatar).
- **No random icons.** Use an icon only when it adds meaning a word cannot. Never add an icon just to decorate a heading or card. Use one icon size and stroke weight per context.
- **Don't center every section.** Left-aligned text is the default. Use centering rarely and on purpose, for example a single short closing statement.

## 2. Typography

Use only this scale. Do not invent sizes or use arbitrary values like `text-[37px]`.

| Role               | Mobile → desktop classes                                    | Weight / tracking                         |
| ------------------ | ----------------------------------------------------------- | ----------------------------------------- |
| Display (hero h1)  | `text-5xl` → `md:text-6xl` → `lg:text-7xl`                   | `font-semibold tracking-tight leading-[1.05]` |
| Section heading h2 | `text-3xl` → `md:text-4xl` → `lg:text-5xl`                   | `font-semibold tracking-tight leading-tight` |
| Subheading h3      | `text-xl` → `md:text-2xl`                                    | `font-medium leading-snug`                |
| Lead paragraph     | `text-lg` → `md:text-xl`                                     | `font-normal leading-relaxed text-muted`  |
| Body               | `text-base`                                                 | `leading-relaxed`                          |
| Small / caption    | `text-sm`                                                   | `leading-normal text-muted`                |
| Label / eyebrow    | `text-xs` or `text-sm`                                      | `font-medium uppercase tracking-widest`   |

- Each role must look clearly different from its neighbors. Body text never competes with headings.
- Body text is never smaller than `text-base` (16px) on any screen size.
- Keep line lengths readable. Use `max-w-prose` (about 65 characters) for paragraphs, `max-w-3xl` or narrower for lead text, and roughly `max-w-4xl` for display headings.
- Use `text-balance` on headings and `text-pretty` on paragraphs.
- Use at most two font families, loaded through `next/font`: a sans for UI and body, plus an optional display or serif face for headings. Expose them as `--font-sans` and `--font-display` in `@theme`.
- Use one page-level `h1`, then follow heading order (`h2`, then `h3`). Choose a heading level for meaning and get its size from the scale above.

## 3. Spacing (8px system)

All spacing is a multiple of 8px. A Tailwind spacing step is 4px, so use even steps only:
`2` (8px), `4` (16), `6` (24), `8` (32), `10` (40), `12` (48), `16` (64), `20` (80), `24` (96), `32` (128), `40` (160).

- Don't use odd steps such as `p-3`, `gap-5` or `mt-7`, and don't use arbitrary values like `mt-[13px]`. The only exceptions are hairline details (`0.5`, `1`) inside small controls, such as the gap between an icon and its label.
- **Section spacing** is the same everywhere: `py-16 md:py-24 lg:py-32` (64 / 96 / 128px). Use a larger value only for the hero or for a deliberate pause.
- **Container:** `mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12`. Put it in one reusable `Container` component and don't repeat it inline.
- **Vertical rhythm inside a section:** about 16px from eyebrow to heading, 24px from heading to lead, and 48–64px from the intro to the content.
- **Proportional scaling:** spacing grows from mobile to desktop in steps (for example `gap-8 md:gap-12 lg:gap-16`). Never use the same tight value on desktop as on mobile.

## 4. Color tokens

Every color comes from a token defined in `src/app/globals.css`, with light values in `:root` and dark values in `@media (prefers-color-scheme: dark)`. Each token is exposed through `@theme inline` so Tailwind classes like `bg-surface` work.

| Token        | CSS variable   | Tailwind usage                  | Purpose                                  |
| ------------ | -------------- | ------------------------------- | ---------------------------------------- |
| Primary      | `--primary`    | `bg-primary`, `text-primary`    | Main brand color, primary buttons        |
| Primary text | `--primary-foreground` | `text-primary-foreground` | Text on top of primary                |
| Secondary    | `--secondary`  | `bg-secondary`                  | Secondary buttons, quiet fills           |
| Accent       | `--accent`     | `text-accent`, `bg-accent`      | Small highlights, links, focus rings     |
| Background   | `--background` | `bg-background`                 | Page background                          |
| Surface      | `--surface`    | `bg-surface`                    | Raised or alternate areas, cards, inputs |
| Text         | `--foreground` | `text-foreground`               | Main text                                |
| Muted text   | `--muted`      | `text-muted`                    | Secondary text, captions                 |
| Border       | `--border`     | `border-border`                 | Dividers, outlines                       |

Rules:
- **Never put hex, rgb or hsl values in components**, and don't use Tailwind's built-in palette colors (`indigo-500`, `slate-900`, `white` and so on) for brand or UI color. If a token is missing, add it to `globals.css` for both light and dark mode, then use it.
- Opacity modifiers on tokens are fine, for example `bg-accent/10` or `border-border/60`.
- Use the accent sparingly. If everything is highlighted, nothing is.
- Text must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text) in both light and dark mode.

## 5. Components

Build reusable components in `src/components/` (put small primitives in `src/components/ui/`). Pages and sections compose these components; they don't restyle them inline.

- **Buttons:** one `Button` component with a `variant` (`primary`, `secondary`, `ghost`) and a `size` (`md`, `lg`). It renders as a `<button>`, or as a `Link` when given an `href`. Every variant defines its default, `hover`, `active`, `focus-visible` and `disabled` states. The minimum height is `h-12` (48px) for touch.
- **Cards:** where cards are the right choice, use one shared structure: optional media, then label, then title, then body, then action, with the same padding (`p-6 md:p-8`), border and radius everywhere. Don't use cards just to put a box around content.
- **Forms:** a shared `Input`, `Textarea` and `Label`, with the same height (`h-12`), border, radius and padding. Each has a visible `<label>`, helper or error text linked through `aria-describedby`, and clear `focus-visible`, `invalid` and `disabled` styles.
- **Interaction states:** everything interactive shows a clear state on hover (only on devices that support hover), on press (`active:`) and on keyboard focus. Use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` consistently, and never remove focus outlines without a replacement.
- **Accessibility:** use real `<button>` and `<a>` elements (never clickable `<div>`s), give icon-only buttons an `aria-label`, hide decorative icons with `aria-hidden`, make sure every action works with the keyboard, and set `aria-expanded` and `aria-controls` on toggles. Every touch target is at least 48×48px.

## 6. Layout

- **Use editorial compositions** built on a 12-column grid (`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12`). Place content across columns deliberately, for example a heading in columns 1–5 and body text in columns 7–12.
- **Use asymmetry where it helps.** Uneven splits (5/7, 4/8), offset headings, and images that break the container edge all create rhythm. Use them on purpose, not at random.
- **Mix full-width and contained layouts.** Full-bleed bands (a statement, an image, a background change) alternate with contained content. Backgrounds can go full-bleed while the content inside stays in the `Container`.
- **Vary the sections.** Adjacent sections should differ in structure (split, list, full-bleed, grid) and in density. No two sections in a row should share the same layout.
- **Show the structure.** Hairline borders (`border-border`), numbered labels such as "01 / Services", and clear alignment lines often work better than boxes and shadows.

## 7. Animation (Motion for React)

- Import from `motion/react`. Use Motion for all JavaScript animation; plain CSS transitions are fine for simple hover color and opacity changes.
- **Reduced motion:** wrap the app in `<MotionConfig reducedMotion="user">` (in a client provider component used by the root layout) so position and scale animations turn off for people who ask for less motion. Any custom movement must also check `useReducedMotion()`. CSS animations need a `motion-reduce:` fallback.
- **Scroll reveals:** keep them subtle. Use opacity 0→1 and `y` of 16–24px, a duration of 0.4–0.6s, an ease-out curve, and `viewport={{ once: true }}`. Use one shared `Reveal` component. Don't animate the same element twice.
- **Stagger** related items (list rows, grid items) by 0.06–0.1s, with no more than about 6 items in a stagger.
- **Hover:** small and smooth changes only, for example color, a 2–4px shift or an underline. No large scaling, bouncing, spinning or parallax-heavy effects.
- **Animation supports hierarchy.** Animate the focal element first, then the supporting elements. Never animate the main text in a way that delays reading it, and keep the page usable even if JavaScript fails. Never animate layout properties (`width`, `height`, `top`) when `transform` or `opacity` can do the job.

## 8. Responsive design

- **Mobile-first:** write base classes for a 360–430px phone, then add `md:` for tablets and `lg:`/`xl:` for desktop.
- **Design the tablet layout (768–1024px) separately.** Don't just stretch the mobile version or squeeze the desktop one. Tablets often get a two-column layout where desktop uses three or an asymmetric 12-column split.
- **Design the desktop layout properly:** use the width for editorial compositions instead of one wide centered column.
- **Don't just shrink the desktop design.** On small screens, reorder, stack, simplify or hide content. Change the composition, not only the font sizes.
- No horizontal scrolling at any width from 320px up. Check at 390px, 768px and 1440px before you finish.

## 9. Quality

- **Semantic HTML:** use `header`, `nav`, `main`, `section` (with a heading or `aria-labelledby`), `article`, `footer`, `ul`/`ol` for lists, and `figure`/`figcaption` for media.
- **Accessibility:** follow WCAG 2.2 AA, use logical heading order, provide `lang`, alt text (empty `alt=""` for decorative images), visible focus and a "skip to content" link.
- **SEO basics:** each page exports `metadata` (a unique `title` and `description`, plus Open Graph). Include `metadataBase`, a sitemap (`app/sitemap.ts`), `app/robots.ts` and meaningful link text.
- **Images:** always use `next/image` with `width`/`height` (or `fill` with `sizes`). Add `preload` only on the above-the-fold hero image (`priority` is deprecated in this Next.js version). Use modern formats and never ship oversized source files.
- **Fonts:** load them only through `next/font`, use at most two families, and limit weights to the ones actually used.
- **Performance:** server components are the default. Add `"use client"` only to the smallest component that needs interactivity or Motion. Don't add heavy libraries for small effects, and keep the homepage statically prerendered.
- **Reusable components:** if markup appears twice, make it a component. Keep components small and typed with TypeScript props, and don't duplicate design decisions.

## Before you finish any UI change

1. Every color is a token, every spacing value is an 8px step, and every font size is from the type scale.
2. Check the page against section 1. If any of those generic AI patterns slipped in, remove them.
3. Hover, active, focus and disabled states all work, and everything can be used with the keyboard.
4. Reduced motion is respected.
5. `npm run lint`, `npm run typecheck` and `npm run build` all pass.
6. Look at the page at 390px, 768px and 1440px, in both light and dark mode.
