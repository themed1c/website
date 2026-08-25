# Deploy

## Local

```
npm install
./scripts/fetch-covers.sh   # replaces the two placeholder track covers
npm run dev                 # http://localhost:4321
npm run build               # -> dist/
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

## Cloudflare Pages

Create the project from the repo (Workers & Pages > Create > Pages >
Connect to Git):

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

Then **Settings > Variables and Secrets**, add both as **Secret**
(encrypted) for Production *and* Preview:

```
MELODY_SCRIPT_URL     = https://script.google.com/macros/s/.../exec
MELODY_SHARED_SECRET  = <same value as the Apps Script property>
```

`functions/api/subscribe.js` deploys automatically as a Pages Function at
`/api/subscribe`. No extra config.

See `melody-list/SETUP.md` for the Google Sheet half.

## Post-deploy checks

1. All three routes load: `/`, `/artwork`, `/store`.
2. Active tab shows the coral underline on each.
3. Submit the melody form once; confirm the row lands in the Sheet.
4. View source on `/store` and search `script.google.com` — zero hits.
5. Resize to 375px wide and confirm the single-column collapse.
