# Hyde Park Avenue Action

A resident-led campaign site explaining Boston’s inadequate 2026 resurfacing plan for Hyde Park Avenue, comparing it with stronger earlier designs, and helping residents write directly to City leaders.

## Public site

[benjaminsiegel.github.io/hydeparkavenue](https://benjaminsiegel.github.io/hydeparkavenue/)

## Work on the site

Node.js 22 or newer is required.

```bash
npm install
npm run dev
```

The local preview opens at `http://localhost:3000`.

Most site content is in `app/page.tsx`; the visual design is in `app/globals.css`. Plan drawings and photographs are in `public/`.

## Publish changes

Push changes to `main`. GitHub Actions builds and publishes the site to GitHub Pages automatically. The workflow can also be run manually from the repository’s Actions tab.

Before pushing, verify the production build:

```bash
npm run build:pages
```

The design rationale and content structure are documented in `DESIGN_BRIEF.md`.
