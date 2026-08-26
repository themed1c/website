/**
 * Store page - melody list form.
 *
 * Posts same-origin to /api/subscribe. The browser never sees the Apps
 * Script URL or the shared secret; the Cloudflare Worker holds both.
 *
 * States (client-approved 2026-08-25):
 *   idle -> pending: button dims and reads "Sending..." while in flight.
 *   pending -> success: the whole form is replaced by the confirmation.
 *   pending -> error: one muted line under the form, cleared on retry.
 */

const ENDPOINT = '/api/subscribe';
const ERROR_TEXT = 'Something went wrong. Try again.';

export function initMelodyForm(root = document) {
  const form = root.querySelector('[data-melody-form]');
  if (!form) return;

  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('input[name="website"]');
  const idleLabel = button.textContent;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const value = (input.value || '').trim();
    if (!value || !value.includes('@')) return;
    if (honeypot && honeypot.value) return;

    clearError(form);
    button.disabled = true;
    button.dataset.pending = 'true';
    button.textContent = 'Sending...';

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
      button.disabled = false;
      delete button.dataset.pending;
      button.textContent = idleLabel;
      showError(form);
      return;
    }

    clearError(form);
    input.value = '';
    showConfirmation(form);
  });
}

function showError(form) {
  const p = document.createElement('p');
  p.className = 'melody-error';
  p.setAttribute('role', 'alert');
  p.textContent = ERROR_TEXT;
  form.insertAdjacentElement('afterend', p);
}

function clearError(form) {
  const next = form.nextElementSibling;
  if (next && next.classList.contains('melody-error')) next.remove();
}

function showConfirmation(form) {
  const p = document.createElement('p');
  p.className = 'melody-confirmation';
  p.setAttribute('role', 'status');
  p.textContent = 'thanks!';
  form.replaceWith(p);
}
