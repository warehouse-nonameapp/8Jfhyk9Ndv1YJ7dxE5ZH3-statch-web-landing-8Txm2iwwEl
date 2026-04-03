# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **Statch** — a mobile inventory/sales tracking app. Built with Astro (static site generator) + React islands for interactivity. Bilingual: Ukrainian (default) / English. Deployed to GitHub Pages at https://statch.io.

## Commands

```bash
npm run dev      # Dev server at http://localhost:4321
npm run build    # Production build to ./dist/
npm run preview  # Preview production build locally
```

No test runner or linter is configured.

## Architecture

**Astro 5 + React 19 Islands** — Most content is static Astro components (zero client JS). Interactive parts use React "islands" hydrated via client directives (`client:load`, `client:visible`).

### Key Directories

- `src/pages/` — File-based routing: `index.astro` (homepage), `privacy.astro`, `terms.astro`, `404.astro`, `500.astro`
- `src/layouts/Layout.astro` — Master layout (~410 lines) with SEO meta, font preloads, i18n bootstrap script, scroll animation observer
- `src/components/` — Astro components (static sections)
- `src/components/islands/` — React components (interactive): `BetaSubscriptionButton.tsx`, `FAQList.tsx`, `FloatingFooter.tsx`
- `src/content/` — Astro Content Collections: `faq/all.json`, `features/all.json` (bilingual JSON data)
- `src/i18n/translations.ts` — Full translation dictionary (uk/en)
- `src/consts/strings.ts` — Hardcoded default strings for Astro components (Ukrainian)
- `src/services/api.ts` — API client for beta signup with retry logic
- `src/styles/global.css` — Tailwind v4 theme, custom utilities, animations

### Internationalization

Client-side i18n without page reloads:
- `Layout.astro` loads translations into `window.i18nTranslations` and provides `window.applyLocale(locale)`
- Locale stored in `localStorage('locale')`, default: `'uk'`
- Language changes dispatch a `localechange` CustomEvent
- Astro templates use `data-i18n="key"` attributes; React islands use a `useLocale()` hook
- Content collections have bilingual fields: `question_uk`/`question_en`, etc.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (not PostCSS)
- Color theme defined with `@theme` in `src/styles/global.css` (primary: `#1C4FD8`, background-dark: `#0D0E10`, etc.)
- Font: **Mulish** (400, 600, 700, 800) with Latin & Cyrillic WOFF2 variants preloaded
- Scroll animations: `.animate-on-scroll` elements get `.is-visible` class via IntersectionObserver
- Custom classes: `.btn-gradient-border`, `.bg-gradient-light`, `.bg-gradient-dark`

### API

Beta signup endpoint: `POST https://api.statch.io/api/Service/signup-to-beta-test`
- Dev uses `/api-proxy` (local proxy), production uses the real URL
- Switched via `import.meta.env.DEV`

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`): push to `main` → Astro build → GitHub Pages.

## Conventions

- **Astro components**: PascalCase `.astro` files with frontmatter (`---`) for imports/data fetching
- **React islands**: PascalCase `.tsx` in `src/components/islands/`, exported as named exports
- **Responsive**: Mobile-first with Tailwind breakpoints (`md:`, `lg:`, `xl:`)
- **Bilingual content**: Always provide both `uk` and `en` variants in data and translations
- **Images**: WebP for mobile, PNG for desktop; always set width/height to prevent layout shift
