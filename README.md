# themed1c

Three-page site for themed1c - producer, Florida. Astro static build,
deployed on Cloudflare Pages.

```
src/
  data/site.js       all copy, links and numbers - edit content here
  layouts/Base.astro shared shell: fonts, nav, content column
  components/        Cover.astro (square image box)
  pages/             index / artwork / store
  scripts/           melody-form.js (client handler)
  styles/global.css  design tokens + all styling
functions/api/       subscribe.js - Cloudflare Pages Function
melody-list/         Google Apps Script + setup for the email capture
public/uploads/      images
scripts/             fetch-covers.sh
```

- `HANDOFF-SPEC.md` - the original design spec. Source of truth for
  colour, type, spacing and copy.
- `DECISIONS.md` - what was decided, what is still open, where this
  departs from the prototype. **Read before changing anything visual.**
- `DEPLOY.md` - build and deploy steps.

## Adding content

Artwork and products are mapped lists. Add an entry to `artwork` or
`products` in `src/data/site.js`, drop the image in `public/uploads/`,
done - no template edits.

## Before first deploy

```
npm install
./scripts/fetch-covers.sh
npm run build
```
