# Melody list -> private Google Sheet

Visitors submit an email. It lands in a Sheet only you can open.
Nobody can read the list, discover the Sheet, or find the Apps Script URL.

## How the privacy actually works

```
browser  --POST /api/subscribe-->  Cloudflare Function  --POST /exec-->  Apps Script  --append-->  private Sheet
         (same origin, no secrets)  (holds URL + secret)   (checks secret)  (runs as you)
```

- The **Sheet stays private.** Do not change its sharing. It is never linked,
  never embedded, and has no public URL.
- The **Apps Script runs as you** ("Execute as: Me"). That is what gives it
  permission to write to your private Sheet. Visitors are never asked to
  sign in and never gain any access themselves.
- The web app's "Anyone" access setting exposes the **endpoint**, not the
  Sheet. And that endpoint has no read path - `doPost` only appends,
  `doGet` returns `{"ok":true}` and nothing else.
- The `/exec` URL and shared secret live only in Cloudflare secrets, so
  they never appear in the site's page source.

## Setup

### 1. Generate a secret

Run locally, or use any long random string:

```
openssl rand -hex 32
```

### 2. Google Sheet + Apps Script

1. Create a Sheet. Leave sharing as-is - private to you.
2. **Extensions > Apps Script**. Paste in `Code.gs`. Save.
3. **Project Settings > Script properties > Add script property**
   - Property: `MELODY_SHARED_SECRET`
   - Value: the secret from step 1
4. **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorize. Google warns that the app is unverified - expected for your
   own script. Advanced > Go to (project) > Allow.
6. Copy the deployment URL ending in `/exec`.

### 3. Cloudflare

The endpoint is the Astro API route `src/pages/api/subscribe.js`, already
deployed with the Worker. It reads both values from the Worker's encrypted
secrets at runtime.

From the repo root, with wrangler authenticated:

```
npx wrangler secret put MELODY_SCRIPT_URL
npx wrangler secret put MELODY_SHARED_SECRET
```

Each command prompts for the value (the `/exec` URL and the shared secret
respectively). Or use the dashboard: **Worker > Settings > Variables and
Secrets**, type **Secret**, not plaintext.

`wrangler secret put` deploys a new Worker version **immediately**. When
rotating the shared secret, update the Apps Script property first, then
the Cloudflare secret, so the two sides never disagree while live.

For local testing (`npm run preview`), put the same two values in a
`.dev.vars` file at the repo root (already gitignored):

```
MELODY_SCRIPT_URL=https://script.google.com/macros/s/.../exec
MELODY_SHARED_SECRET=<the secret>
```

Without it, local submissions return 503 `not_configured` by design.

### 4. Wire the form

Include `melody-form.js` on the Store page. The form markup needs:

```html
<form data-melody-form>
  <input type="email" required placeholder="your@email.com">
  <input type="text" name="website" tabindex="-1" autocomplete="off"
         aria-hidden="true" style="position:absolute;left:-9999px">
  <button type="submit">Submit</button>
</form>
```

The `website` input is the honeypot. Keep it off-screen, never
`display:none` - some bots skip hidden fields.

## Verify

1. Open the `/exec` URL in a browser. It returns `{"ok":true}` and reveals
   nothing about the list. That is correct.
2. `curl` the `/exec` URL with a POST and no secret. It returns
   `{"ok":false,"error":"forbidden"}` and writes nothing.
3. Submit the real form once. Confirm the row lands in the Sheet.
4. View source on the live Store page and search for `script.google.com`.
   Zero hits is the pass condition.

## Redeploying

Apps Script pins a deployment to a code version. After editing `Code.gs`,
use **Deploy > Manage deployments > edit > Version: New version**, not a
new deployment, so the `/exec` URL stays the same.

## Residual risk

Someone reading the page source can find `/api/subscribe` and POST junk
emails to it. They cannot read the list, reach the Sheet, or learn the
Apps Script URL - the worst case is spam rows you delete.

If that starts happening, add Cloudflare Turnstile to the form and verify
the token inside the Function. It is free and does not need a code change
anywhere else.
