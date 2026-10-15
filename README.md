# My First Website

A modern, production-ready website built with:

- **[Next.js](https://nextjs.org)** (App Router) + **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com)** for styling
- **[Motion](https://motion.dev)** for animations
- **[Lucide](https://lucide.dev)** for icons

The design is responsive and mobile-first, and it supports light and dark mode automatically.

## Where to edit things

| What you want to change         | File                          |
| ------------------------------- | ----------------------------- |
| Site name, description, menu    | `src/lib/site.ts`             |
| Homepage sections (order)       | `src/app/page.tsx`            |
| Hero (top banner)               | `src/components/hero.tsx`     |
| Features cards                  | `src/components/features.tsx` |
| About section                   | `src/components/about.tsx`    |
| Contact section / email address | `src/components/contact.tsx`  |
| Colors                          | `src/app/globals.css`         |

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
