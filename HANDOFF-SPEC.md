# Handoff: themed1c producer site

## Overview
A three-page personal site for **themed1c**, a music producer based in Florida who also
draws. The site is an editorial, single-column portfolio:

1. **Overview** — name, one-line bio, play-count stats, credits list, most recent sample
   kit, streaming links, two featured tracks, contact.
2. **Artwork** — a square 2-up grid of hand-drawn images with lowercase quoted captions.
3. **Store** — a 2-up grid of sample kits (one live, one "Coming soon") plus a small
   email-capture form for melody requests.

All three pages share one persistent tab bar as the only navigation.

## About the Design Files
The files under `design/` are **design references created in HTML** — prototypes that show
the intended look, copy, and behavior. They are not production code to lift directly: they
depend on a proprietary streaming-component runtime (`support.js`, the `<x-dc>` /
`<sc-if>` tags, `style-hover` attributes) that does not exist outside this design tool.

The task is to **recreate these designs in the target codebase's existing environment**
(React/Next, Vue, Astro, plain HTML+CSS — whatever is already there) using its established
patterns, routing, and component conventions. If no codebase exists yet, this is a small
static marketing site: any modern static framework (Next.js/Astro/plain HTML) is
appropriate; three routes and one shared layout is the whole app.

Translation notes:
- `style-hover` / `style-focus` attributes → normal `:hover` / `:focus` CSS.
- `<sc-if value>` → conditional rendering.
- `<image-slot src=…>` → a plain `<img>` with `object-fit:cover` inside the aspect-ratio box.
- Inline styles are an artifact of the prototyping tool; use the codebase's normal styling
  layer (CSS modules, Tailwind, etc.).

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final and should be matched
closely. Every value used is listed in *Design Tokens* below. Content is real (real artist
links, real play counts, real product URLs) — do not paraphrase or invent replacements.

## Shared shell (all three pages)

- Page background `#FFFFFF`, text `#161616`.
- Body font: **Space Grotesk** (400/500/600). Secondary/meta font: **Hanken Grotesk**
  (400/500/600/700). Both loaded from Google Fonts.
- Outer horizontal padding: `28px`. Content column: `max-width:660px; margin:0 auto`.
- `::selection` = background `#FF5C00`, color `#FFFFFF`. Links have no underline by default.

### Tab bar
- `<nav>` with `border-bottom:1px solid #E4E4E4`, full-bleed; inner 660px column with
  `display:flex; gap:28px; padding:22px 0 0`.
- Tabs: **Overview**, **Artwork**, **Store**.
- Tab type: Hanken Grotesk, 13px, weight 600, `letter-spacing:0.09em`, uppercase,
  `padding-bottom:6px`.
- Inactive: color `#8A8A8A`, `border-bottom:2px solid transparent`. Hover: color `#161616`.
- Active: color `#161616`, `border-bottom-color:#FF5C00`.

### Content column
`padding:76px 0 96px` under the nav on every page.

## Screen 1 — Overview (`ProducerSite.dc.html`)

**Purpose:** establish who themed1c is, prove reach, link out to music and the kit.

Layout is a single 660px column; several rows use
`grid-template-columns: minmax(0,1fr) 280px; gap:48px`.

Blocks, top to bottom:

1. **H1 "themed1c"** — `clamp(38px,5.6vw,58px)`, weight 600, line-height 1.05,
   letter-spacing `-0.028em`, margin 0.
2. **Kicker "producer: florida"** — Hanken Grotesk 14px/500, `letter-spacing:0.01em`,
   `#8A8A8A`, `margin-top:14px`.
3. **Bio** — 20px, line-height 1.6, `#3A3A3A`, `margin-top:26px`. Exact copy:
   `> a million plays across all platforms, with another 150k from my own songs / production. I also make stupid drawings.`
4. **Stats row** (`margin-top:52px`, the 1fr/280px grid) — two cells:
   - `1M+` / "plays across tracks I produced"
   - `150K+` / "plays on my own releases"
   Number: 32px, weight 600, `letter-spacing:-0.02em`. Label: Hanken Grotesk 14px/400,
   `#8A8A8A`, `margin-top:6px`.
5. **"Worked with" + "Recent kit" row** (`margin-top:76px`, `align-items:start`).
   - Section label style (used for every section heading on the site): Hanken Grotesk,
     12px, weight 600, `letter-spacing:0.11em`, uppercase, `#8A8A8A`.
   - Credits list: `list-style:none`, flex column, `gap:14px`, `margin-top:20px`. Each item
     22px, weight 500, `letter-spacing:-0.015em`, color `#161616`,
     `border-bottom:1px solid transparent`; on hover the border becomes `#FF5C00`.
     Items and links (all `target="_blank" rel="noreferrer noopener"`):
     - dom corleo — https://open.spotify.com/artist/6nFBSlEb2tkIOH3YtIIw6F
     - kevin pollari — https://open.spotify.com/artist/4A55B07fj8Dwb525T2vlqJ
     - 8485 — https://open.spotify.com/artist/3LwiPwIJNshV4ItekGcIMo
     - bruhmanegod — https://open.spotify.com/artist/4jKJcl7HTKV6FXKizgJiaY
     - capoxxo — https://open.spotify.com/artist/4lDzMjsz7xLw4CFmfWJmWJ
     - "and more" — not a link, color `#8A8A8A`.
   - Recent kit card (280px column): square box, `aspect-ratio:1/1`,
     `border:1px solid #E4E4E4`, `overflow:hidden`, cover image
     `uploads/WARDOGS_FINAL_COVER-01.jpg` at `object-fit:cover`; the whole box is a link to
     https://1rott.sellfy.store/p/wardogs-the-multi-kit/ .
     Caption below (`margin-top:12px`): title `War$Dogs: @1rott x @themed1c` at 16px/500,
     `letter-spacing:-0.01em`, `white-space:nowrap`; then a row (Hanken Grotesk 13px,
     `#8A8A8A`, `gap:6px`, `margin-top:5px`) reading `Sellfy ↗` with the ↗ in `#FF5C00`.
6. **"Listen"** section label at `margin-top:76px`; row of links `display:flex; gap:36px;
   flex-wrap:wrap; margin-top:20px`, each 22px/500, `letter-spacing:-0.015em`, `#161616`,
   with a `#FF5C00` `↗`:
   - Spotify → https://open.spotify.com/artist/3niYBKyr8or30uBpAW4CyA
   - YouTube → **placeholder `#` — needs a real URL from the client**
   - SoundCloud → https://soundcloud.com/med1c
7. **Two featured tracks** (`margin-top:44px`, same 1fr/280px grid). Each: 280px-max square
   cover (same 1px `#E4E4E4` border box) linking to the track, then a Hanken Grotesk 14px
   `#8A8A8A` meta row (`margin-top:12px`, `display:flex; gap:8px; align-items:baseline`)
   with play count left, `SoundCloud` pushed right via `margin-left:auto`, and a `#FF5C00` ↗.
   - "dimb" — 47.2K plays — https://soundcloud.com/med1c/dimb —
     cover https://i1.sndcdn.com/artworks-GTJ9nWl6ScRUsLdy-tXYHtA-t500x500.jpg
   - "hoperurhappynow" — 27.5K plays — https://soundcloud.com/med1c/hoperurhappynow —
     cover https://i1.sndcdn.com/artworks-JKiM6HZnW5vHynpl-y3ypiw-t500x500.jpg
   (Titles are not displayed in the design — only play count + platform.)
8. **"Contact"** section label at `margin-top:76px`; two lines at 22px/500,
   `letter-spacing:-0.015em`, color `#161616`, each with
   `border-bottom:2px solid #FF5C00; padding-bottom:2px`:
   - `thejitmed1c@gmail.com` → `mailto:thejitmed1c@gmail.com` (`margin-top:20px`)
   - `@themed1c on instagram` → https://www.instagram.com/themed1c/ (`margin-top:12px`)
9. **Footer** — `margin-top:96px`, `padding-top:24px`, `border-top:1px solid #EAEAEA`,
   Hanken Grotesk 13px, `#A6A6A6`, text `© 2026`.

## Screen 2 — Artwork (`Artwork.dc.html`)

**Purpose:** show the producer's drawings.

- **H1 "Artwork"** — `clamp(34px,4.8vw,48px)`, weight 600, line-height 1.05,
  `letter-spacing:-0.028em`. Immediately after it, inline at `align-items:flex-start;
  gap:12px`, a small note `*subject to change` — Hanken Grotesk 12px, `#A6A6A6`,
  `margin-top:6px`.
- Kicker below: `hey` — Hanken Grotesk 14px/500, `#8A8A8A`, `margin-top:14px`.
  (Intentionally casual; keep as-is unless the client changes it.)
- **Grid**: `repeat(2,minmax(0,1fr))`, `gap:20px`, `margin-top:44px`. Each item is a
  `<figure>` (margin 0) containing a square `aspect-ratio:1/1` box with
  `border:1px solid #E4E4E4; overflow:hidden` and a `object-fit:cover` image, then a
  `<figcaption>` at `margin-top:10px`, Hanken Grotesk 13px/500, `letter-spacing:0.01em`,
  `#8A8A8A`.
- Items in order (captions are lowercase and quoted, exactly as written):
  1. `"fruity limiter"` — `uploads/Fruity Limiter 1.jpg`
  2. `"dog"` — `uploads/Dog.jpg`
  3. `"andrews computer"` — `uploads/AJ the Freak.jpg`
  4. `"gokami's keyboard"` — `uploads/gokami evil keyboard.png`
- The grid is content-driven and will grow; implement it as a mapped list, not four
  hardcoded blocks.

## Screen 3 — Store (`Store.dc.html`)

**Purpose:** sell sample kits and collect emails for melody sends.

- **H1 "Store"** — same as the Artwork H1 scale (`clamp(34px,4.8vw,48px)`).
- Kicker: `kits` — Hanken Grotesk 14px/500, `#8A8A8A`, `margin-top:14px`.
- **Product grid**: `repeat(2,minmax(0,1fr))`, `gap:20px`, `margin-top:44px`. Square cover
  box identical to the Artwork tile; caption at `margin-top:12px`.
  1. **Glorida Vol. 1** — cover
     `uploads/Glorida_Final_Animation_first_frame_square_lossless.png`. Caption row is
     `display:flex; align-items:baseline; gap:10px`: title 18px/500,
     `letter-spacing:-0.015em`, `#161616`; then `Coming soon` pushed right
     (`margin-left:auto`) in Hanken Grotesk 12px/600, `letter-spacing:0.09em`, uppercase,
     `#A6A6A6`. Not clickable.
  2. **War$Dogs: @1rott x @themed1c** — cover `uploads/WARDOGS_FINAL_COVER-01.jpg`; both
     cover and title link to https://1rott.sellfy.store/p/wardogs-the-multi-kit/ .
     Title 18px/500, `#161616`, hover `#FF5C00`, with a trailing `↗` always in `#FF5C00`.
- **Email capture**: section label `Want my melodies? :)` (standard 12px uppercase label
  style) at `margin-top:76px`.
  - Form: `display:flex; gap:10px; margin-top:18px; max-width:420px`.
  - Input: `type=email`, `required`, placeholder `your@email.com`, `flex:1; min-width:0;
    padding:13px 14px`, Hanken Grotesk 15px, `border:1px solid #D8D8D8`,
    `border-radius:0`, no outline. **Focus:** border `#161616` (no colored ring).
  - Button: label `Submit`, `padding:13px 20px`, Hanken Grotesk 13px/600,
    `letter-spacing:0.09em`, uppercase, white on `#161616`, `border-radius:0`.
    **Hover:** background and border → `#FF5C00`.
  - On submit: trim the value, require a non-empty string containing `@`, otherwise do
    nothing. On success the whole form is replaced by
    `Got it. I'll send melodies to that address.` (Hanken Grotesk 15px, `#161616`,
    `margin-top:18px`) and the field is cleared.

## Interactions & Behavior

- **Navigation:** three routes, full page loads in the prototype. Active tab = coral
  underline. No mobile menu is designed — see *Responsive*.
- **Hover:** the only hover treatments in the design are (a) nav tab color `#8A8A8A`→
  `#161616`, (b) credits-list coral bottom border appearing, (c) Store product title →
  `#FF5C00`, (d) Submit button fill → `#FF5C00`. No shadows, no scale, no lifts.
- **Transitions:** none specified. If the codebase animates by default, keep it to a short
  (~100–150ms) color transition; nothing longer.
- **Focus:** inputs darken their border to `#161616`. Add a visible keyboard focus ring for
  links/buttons per the codebase's a11y standard (the prototype omits one).
- **Email form states:** idle → success only. There is **no** loading, error, or duplicate
  state in the design; if the real implementation posts to a backend, a pending state and
  an inline error line (reuse the 15px Hanken Grotesk paragraph style) will need to be
  designed — flag it rather than inventing a look.
- **External links** all open in a new tab with `rel="noreferrer noopener"`.
- **Responsive:** the prototype is desktop-first at a fixed 660px column and is untested
  below ~700px. Recommended (needs confirmation): collapse every
  `minmax(0,1fr) 280px` grid and every 2-up grid to one column, keep the 28px gutters,
  reduce the `76px` section rhythm to ~48px, and let the H1 `clamp()` handle type. The
  `white-space:nowrap` on the War$Dogs title must be dropped on narrow screens.

## State Management

Only one piece of state exists in the whole design, on the Store page:

- `email: string` — controlled input value.
- `sent: boolean` — false shows the form, true shows the confirmation. One-way; never
  resets in the design.

The prototype persists submissions to `localStorage` under the key
`themed1c-melody-list` (array of `{ email, at: ISO string }`). **That is prototype
scaffolding, not intended behavior** — replace it with a real POST to whatever mailing-list
service the client uses.

No data fetching anywhere else; all content is static except the two SoundCloud cover
images and the play counts, which are hardcoded and will go stale.

## Design Tokens

Colors
| Token | Value | Use |
| :-- | :-- | :-- |
| ink | `#161616` | headings, body, primary button fill |
| ink-soft | `#3A3A3A` | bio paragraph |
| muted | `#8A8A8A` | labels, captions, meta, inactive tabs |
| faint | `#A6A6A6` | footer, "coming soon", small notes |
| border | `#E4E4E4` | image-box borders, nav rule |
| border-soft | `#EAEAEA` | footer rule |
| field-border | `#D8D8D8` | input idle border |
| accent | `#FF5C00` | active tab underline, ↗ glyphs, hover states, selection |
| surface | `#FFFFFF` | page background |

Spacing scale in use: `2, 5, 6, 10, 12, 14, 18, 20, 22, 24, 26, 28, 36, 44, 48, 52, 76, 96` px.
Section rhythm is `76px` between major sections, `44px` before a grid, `20px` after a label.

Typography
| Role | Font | Size / weight | Tracking |
| :-- | :-- | :-- | :-- |
| Page H1 (home) | Space Grotesk | `clamp(38px,5.6vw,58px)` / 600 | `-0.028em`, lh 1.05 |
| Page H1 (sub) | Space Grotesk | `clamp(34px,4.8vw,48px)` / 600 | `-0.028em`, lh 1.05 |
| Stat number | Space Grotesk | 32 / 600 | `-0.02em` |
| Bio | Space Grotesk | 20 / 400 | lh 1.6 |
| List / link item | Space Grotesk | 22 / 500 | `-0.015em` |
| Product title | Space Grotesk | 18 / 500 | `-0.015em` |
| Kit title | Space Grotesk | 16 / 500 | `-0.01em` |
| Field / confirmation | Hanken Grotesk | 15 / 400 | — |
| Meta, captions | Hanken Grotesk | 13–14 / 400–500 | `0–0.01em` |
| Section label | Hanken Grotesk | 12 / 600 uppercase | `0.11em` |
| Tab / button | Hanken Grotesk | 13 / 600 uppercase | `0.09em` |

Radius: **0 everywhere** — no rounded corners on any element, including inputs and buttons.
Shadows: **none**. Borders are all 1px, except the 2px coral underlines on the active tab
and the contact links.

## Assets

In `design/uploads/` (client-supplied):
- `Fruity Limiter 1.jpg` — drawing, "fruity limiter"
- `Dog.jpg` — drawing, "dog"
- `AJ the Freak.jpg` — drawing, "andrews computer"
- `gokami evil keyboard.png` — drawing, "gokami's keyboard"
- `WARDOGS_FINAL_COVER-01.jpg` — War$Dogs kit cover (used on Overview + Store)
- `Glorida_Final_Animation_first_frame_square_lossless.png` — Glorida Vol. 1 cover

Remote, hotlinked in the prototype (download and self-host in production):
- https://i1.sndcdn.com/artworks-GTJ9nWl6ScRUsLdy-tXYHtA-t500x500.jpg
- https://i1.sndcdn.com/artworks-JKiM6HZnW5vHynpl-y3ypiw-t500x500.jpg

Fonts: Space Grotesk and Hanken Grotesk, Google Fonts. No icon set — the only glyphs are
the literal characters `↗` and `>`. No logo exists yet.

## Files

```
design/
  ProducerSite.dc.html   Overview page
  Artwork.dc.html        Artwork page
  Store.dc.html          Store page (contains the only JS logic)
  support.js             prototyping runtime — DO NOT port
  image-slot.js          drag-drop image placeholder — replace with <img>
  uploads/               all client images
```

## Open questions for the client
1. The Overview "YouTube" link is a placeholder `#`.
2. Play counts (1M+, 150K+, 47.2K, 27.5K) are point-in-time and hardcoded.
3. Where should the melody-request email actually go?
4. Mobile layout was never designed — the recommendation above needs approval.
5. Artwork page copy ("hey", "*subject to change") is deliberately informal — confirm it
   ships that way.
