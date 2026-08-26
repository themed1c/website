/**
 * Store page - melody list form.
 *
 * Posts same-origin to /api/subscribe. The browser never sees the Apps
 * Script URL or the shared secret; the Cloudflare Worker holds both.
 *
 * States (client-approved 2026-08-25):
 *   idle -> pending: button dims and reads the sending label while in flight.
 *   pending -> success: the form is swapped for the confirmation line.
 *   pending -> error: one muted line under the form, cleared on retry.
 *
 * Copy lives in src/data/site.js (melodyForm), per the repo convention.
 */

import { melodyForm as copy } from '../data/site.js';

const ENDPOINT = '/api/subscribe';

export function initMelodyForm(root = document) {
  const form = root.querySelector('[data-melody-form]');
  if (!form) return;

  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('input[name="website"]');
  const confirmation = root.querySelector('[data-melody-confirmation]');
  if (!input || !button) return;

  const idleLabel = button.textContent;

  // Browser autofill can fill the off-screen honeypot alongside the
  // email field. Real people interact with the visible input; scripted
  // form-fillers usually don't. Track that so an autofill victim is not
  // treated as a bot.
  let interacted = false;
  ['input', 'keydown', 'pointerdown'].forEach(function (type) {
    input.addEventListener(type, function () { interacted = true; });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const value = (input.value || '').trim();
    if (!value || !value.includes('@')) return;

    if (honeypot && honeypot.value) {
      if (!interacted) {
        // Bot: show the same success a person would see. Learn nothing.
        showConfirmation(form, confirmation);
        return;
      }
      // A person whose autofill filled the trap: clear it and continue.
      honeypot.value = '';
    }

    clearError(form);
    button.disabled = true;
    button.dataset.pending = 'true';
    button.textContent = copy.sending;

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

    input.value = '';
    showConfirmation(form, confirmation);
  });
}

function showError(form) {
  const p = document.createElement('p');
  p.className = 'melody-error';
  p.setAttribute('role', 'alert');
  p.textContent = copy.error;
  form.insertAdjacentElement('afterend', p);
}

function clearError(form) {
  const next = form.nextElementSibling;
  if (next && next.classList.contains('melody-error')) next.remove();
}

function showConfirmation(form, confirmation) {
  clearError(form);
  if (confirmation) {
    // The confirmation element pre-exists in the markup as a live
    // region, so screen readers announce the text change; focus moves
    // onto it because the focused submit button is being removed.
    confirmation.textContent = copy.thanks;
    confirmation.hidden = false;
    form.remove();
    confirmation.focus();
    return;
  }
  const p = document.createElement('p');
  p.className = 'melody-confirmation';
  p.setAttribute('role', 'status');
  p.textContent = copy.thanks;
  form.replaceWith(p);
}
