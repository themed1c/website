export const prerender = false;

export async function POST({ request, locals }) {
  const env = locals?.runtime?.env ?? {};

  // Reject cross-origin posts. Only our own pages should reach this.
  const origin = request.headers.get('Origin');
  const host = request.headers.get('Host');
  if (origin && new URL(origin).host !== host) return json({ ok: false }, 403);

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
  if (body.website) return json({ ok: true });

  if (!env.MELODY_SCRIPT_URL || !env.MELODY_SHARED_SECRET) {
    return json({ ok: false, error: 'not_configured' }, 503);
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
    if (!upstream.ok) return json({ ok: false }, 502);
  } catch {
    return json({ ok: false }, 502);
  }

  return json({ ok: true });
}

export function GET() {
  return json({ ok: false }, 405);
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
