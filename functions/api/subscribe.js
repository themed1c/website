/**
 * POST /api/subscribe
 *
 * Same-origin endpoint for the melody form. Holds the Apps Script URL and
 * shared secret as Cloudflare secrets so neither ever reaches the browser.
 *
 * Required environment (Pages > Settings > Variables and Secrets):
 *   MELODY_SCRIPT_URL     https://script.google.com/macros/s/AKfy.../exec
 *   MELODY_SHARED_SECRET  same value as the Apps Script property
 *
 * Both must be created as Secrets, not plaintext variables.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // Reject cross-origin posts. Only our own pages should reach this.
  const origin = request.headers.get('Origin');
  const host = request.headers.get('Host');
  if (origin && new URL(origin).host !== host) {
    return json({ ok: false }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  const email = String(body.email || '').trim();
  if (!email || !email.includes('@') || email.length > 254) {
    return json({ ok: false }, 400);
  }

  // Honeypot. Return success so bots learn nothing.
  if (body.website) {
    return json({ ok: true });
  }

  try {
    const upstream = await fetch(env.MELODY_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        email,
        source: 'store',
        secret: env.MELODY_SHARED_SECRET,
      }),
    });

    if (!upstream.ok) {
      return json({ ok: false }, 502);
    }
  } catch {
    return json({ ok: false }, 502);
  }

  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false }, 405);
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
