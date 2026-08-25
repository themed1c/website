# Build decisions & open items

Anything here that departs from `README.md` is recorded, not silently applied.

## Client decisions taken

| Item | Decision | Date |
| :-- | :-- | :-- |
| Store "Coming soon" size | **12px** (design capture said 13px; client overrode) | 2026-08-24 |
| Track cover sourcing | Self-host at 1080x1080 via `scripts/fetch-covers.sh` | 2026-08-24 |
| Design direction | White/coral editorial. Supersedes the earlier "Amber Console" concept. | 2026-08-24 |
| YouTube URL | `https://www.youtube.com/@themed1c` (closes README open question #1) | 2026-08-25 |
| Play counts | Keep the README figures (47.2K / 27.5K) even though live counts drift | 2026-08-25 |
| Mobile layout | **Approved and built out.** Client asked for a full smartphone pass. All of it stays in the one `@media (max-width:700px)` block at the bottom of `src/styles/global.css`: single-column collapse, 48/36px rhythm, full-width covers, wrapping melody form, 16px input font (stops iOS focus zoom), taller nav tap targets. | 2026-08-25 |

## Still open

1. **Form pending / error states** - do not exist in the design. README says
   flag rather than invent. Current stubs: button drops to 55% opacity while
   in flight; on network failure it silently re-enables with no message.
   Both need a real design.
2. **Artwork page copy** - "hey" and "*subject to change" ship as written.
   README open question #5 asks for confirmation.

## Deliberate departures from the prototype

- `support.js` / `image-slot.js` not ported. README marks them DO NOT PORT.
- `<image-slot>` replaced by `Cover.astro` - a plain `<img>` with
  `object-fit:cover` in the aspect-ratio box, per the translation notes.
- `style-hover` / `style-focus` attributes converted to real `:hover` /
  `:focus` CSS.
- `localStorage` submission removed. It was prototype scaffolding; the form
  now POSTs to `/api/subscribe`.
- Keyboard focus ring added (`:focus-visible`). The prototype omits one and
  the README asks for it.
- Inline styles replaced by a stylesheet with CSS custom properties.
- Transitions capped at 120ms colour only, per README guidance, and disabled
  under `prefers-reduced-motion`.

## Asset filename mapping

Uploads were sanitized. Referenced paths differ from the README:

| README | Repo |
| :-- | :-- |
| `Fruity Limiter 1.jpg` | `Fruity_Limiter_1.jpg` |
| `AJ the Freak.jpg` | `AJ_the_Freak.jpg` |
| `gokami evil keyboard.png` | `gokami_evil_keyboard.png` |
| `WARDOGS_FINAL_COVER-01.jpg` | `WARDOGS_FINAL_COVER01.jpg` |
