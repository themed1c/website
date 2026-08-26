# Deploy

## Local

```
npm install
./scripts/fetch-covers.sh   # replaces the two placeholder track covers
npm run dev                 # http://localhost:4321 (Astro dev server)
npm run build               # -> dist/
npm run preview             # build, then wrangler dev (the real Worker runtime)
npm run check               # astro type diagnostics
```

> `public/uploads/track-dimb.jpg` and `track-hopeurhappynow.jpg` currently
> hold a placeholder image so the build is never broken. Run
> `fetch-covers.sh` before shipping or both tracks show the War$Dogs cover.

## Push to GitHub

```
git init
git add -A
git commit -m "themed1c site: design handoff build"
git branch -M main
git remote add origin https://github.com/themed1c/website.git
git push -u origin main
```

## Cloudflare Workers

The site deploys as a **Worker** (not Pages). `wrangler.jsonc` is the
config: static assets from `dist/`, server code from `dist/_worker.js/`,
custom domains `themed1c.com` and `www.themed1c.com`.

Pushing to `main` triggers Workers Builds, which builds and deploys
automatically. To deploy by hand:

```
npm run deploy        # astro build + wrangler deploy
```

Secrets live on the Worker (dashboard: Worker > Settings > Variables and
Secrets, type **Secret**), or from the CLI:

```
npx wrangler secret put MELODY_SCRIPT_URL
npx wrangler secret put MELODY_SHARED_SECRET
```

Note: `wrangler secret put` deploys a new Worker version **immediately**.

The API route is `src/pages/api/subscribe.js`, served at `/api/subscribe`
by the Worker. `public/.assetsignore` keeps `dist/_worker.js` (the server
code) and `dist/_routes.json` out of the public asset upload - deleting
that file would publish the Worker source at a public URL, so leave it be.

See `melody-list/SETUP.md` for the Google Sheet half.

## Post-deploy checks

1. All three routes load: `/`, `/artwork`, `/store`.
2. Active tab shows the coral underline on each.
3. Submit the melody form once; confirm the row lands in the Sheet.
4. View source on `/store` and search `script.google.com` - zero hits.
5. Resize to 375px wide and confirm the single-column collapse.
