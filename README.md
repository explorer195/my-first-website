# DigitalScope Marketing

The website for **DigitalScope Marketing**, a global digital growth, AI and technology company.
_Grow brands. Generate leads. Scale globally._

Built with:

- **[Next.js](https://nextjs.org)** (App Router) + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com)** for styling
- **[Motion](https://motion.dev)** for interface animation
- **[GSAP](https://gsap.com) + ScrollTrigger** for scroll storytelling
- **[three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs)** for the 3D globe in the hero
- **[Lucide](https://lucide.dev)** icons

## Where to edit things

| What you want to change                          | File                                    |
| ------------------------------------------------ | --------------------------------------- |
| Company name, email, website address, menu       | `src/lib/site.ts`                       |
| The 26 divisions (A–Z) and their service lists   | `src/content/divisions.ts`              |
| The five practices (Visibility, Growth …)        | `src/content/practices.ts`              |
| Markets (countries) and globe routes             | `src/content/markets.ts`                |
| FAQ questions and answers                        | `src/content/faq.ts`                    |
| Principles and ways of working                   | `src/content/approach.ts`               |
| SEO / AEO / GEO / AI search steps                | `src/content/search-stack.ts`           |
| Homepage section order                           | `src/app/page.tsx`                      |
| Colors, fonts, type sizes                        | `src/app/globals.css`, `src/lib/typography.ts` |

The design rules for the whole site are in `.claude/skills/frontend-design/SKILL.md`.

## Before launch: please confirm

- **Email address:** `hello@digitalscopemarketing.com` is a placeholder in `src/lib/site.ts`. All "Book a strategy call" buttons open an email to it.
- **Website address:** `https://digitalscopemarketing.com` (used for SEO and social previews).
- **Copy:** service descriptions, principles and FAQ answers were written from the project brief. Please review them.

## Running it on your computer

Requires [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:3000
```

Other useful commands:

```bash
npm run build      # create a production build
npm start          # run the production build
npm run lint       # check code for problems
npm run typecheck  # check TypeScript types
```

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import this repository.
3. Click **Deploy**. No settings need to change; Vercel detects Next.js automatically.

After that, every push to GitHub redeploys the site automatically.

## Credits

Map data: [Natural Earth](https://www.naturalearthdata.com) (public domain).
Fonts: Mona Sans and Geist Mono (SIL Open Font License).
