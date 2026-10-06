# Hyde Park Avenue Action

A resident-led campaign archive documenting advocacy for safer repaving on Hyde Park Avenue, with an October 2026 outcome update and a letter to neighbors. The original email form is disabled; the update letter offers a separate thank-you email link.

## Public site

[foresthills.boston](https://foresthills.boston/)

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

## Campaign archive

The October 2026 letter is displayed directly over the resident photograph, followed by a simple Campaign Archive band. The update is built into `app/page.tsx`, using the resident photograph in `public/hyde-park-avenue-october-2026.jpg`. The letter is a saved snapshot of the supplied Google Doc, preserving its wording and links. It does not sync automatically with Google Docs. Edit the letter in the page source for future changes. The former campaign email action is preserved as a disabled fieldset with no draft or copy handlers.
