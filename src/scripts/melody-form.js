/**
 * Store page — melody list form.
 *
 * Posts same-origin to /api/subscribe. The browser never sees the Apps
 * Script URL or the shared secret; the Cloudflare Function holds both.
 *
 * Design contract: idle -> success only. Trim the value, require a
 * non-empty string containing '@', otherwise do nothing. On success the
 * whole form is replaced by the confirmation paragraph.
 */

const ENDPOINT = '/api/subscribe';

export function initMelodyForm(root = document) {
  const form = root.querySelector('[data-melody-form]');
  if (!form) return;

  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('input[name="website"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const value = (input.value || '').trim();
    if (!value || !value.includes('@')) return;
    if (honeypot && honeypot.value) return;

    button.disabled = true;
    button.dataset.pending = 'true';

    let ok = false;
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      ok = response.ok;
    } catch {
      ok = false;
    }

    if (!ok) {
      // No error state exists in the design — flagged, not invented.
      button.disabled = false;
      delete button.dataset.pending;
      return;
    }

    input.value = '';
    showConfirmation(form);
  });
}

function showConfirmation(form) {
  const p = document.createElement('p');
  p.className = 'melody-confirmation';
  p.setAttribute('role', 'status');
  p.textContent = "Got it. I'll send melodies to that address.";
  form.replaceWith(p);
}
