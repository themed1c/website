/**
 * All page content lives here so copy, links and numbers are edited in
 * one place. Values transcribed verbatim from README.md - do not
 * paraphrase or invent replacements.
 */

export const nav = [
  { label: 'Overview', href: '/' },
  { label: 'Artwork', href: '/artwork' },
  { label: 'Store', href: '/store' },
];

export const profile = {
  name: 'themed1c',
  kicker: 'producer: florida',
  bio: '> a million plays across all platforms, with another 150k from my own songs / production. I also make stupid drawings.',
  email: 'thejitmed1c@gmail.com',
  instagram: 'https://www.instagram.com/themed1c/',
  instagramLabel: '@themed1c on instagram',
};

export const stats = [
  { number: '1M+', label: 'plays across tracks I produced' },
  { number: '150K+', label: 'plays on my own releases' },
];

export const credits = [
  { name: 'dom corleo', href: 'https://open.spotify.com/artist/6nFBSlEb2tkIOH3YtIIw6F' },
  { name: 'kevin pollari', href: 'https://open.spotify.com/artist/4A55B07fj8Dwb525T2vlqJ' },
  { name: '8485', href: 'https://open.spotify.com/artist/3LwiPwIJNshV4ItekGcIMo' },
  { name: 'bruhmanegod', href: 'https://open.spotify.com/artist/4jKJcl7HTKV6FXKizgJiaY' },
  { name: 'capoxxo', href: 'https://open.spotify.com/artist/4lDzMjsz7xLw4CFmfWJmWJ' },
  { name: 'and more', href: null },
];

export const recentKit = {
  title: 'War$Dogs: @1rott x @themed1c',
  href: 'https://1rott.sellfy.store/p/wardogs-the-multi-kit/',
  platform: 'Sellfy',
  cover: '/uploads/WARDOGS_FINAL_COVER01.jpg',
  alt: 'War$Dogs kit cover art',
};

export const listen = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/3niYBKyr8or30uBpAW4CyA' },
  // Client-supplied 2026-08-25 (closes README open question #1).
  { label: 'YouTube', href: 'https://www.youtube.com/@themed1c' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/med1c' },
];

/**
 * Play counts are point-in-time and hardcoded (README open question #2).
 * Live counts checked 2026-08-24: dimb 47,278 / hopeurhappynow 27,567.
 * Displayed values below are the client-approved README figures.
 */
export const tracks = [
  {
    href: 'https://soundcloud.com/med1c/dimb',
    plays: '47.2K plays',
    platform: 'SoundCloud',
    cover: '/uploads/track-dimb.jpg',
    alt: 'Cover art for dimb',
  },
  {
    href: 'https://soundcloud.com/med1c/hoperurhappynow',
    plays: '27.5K plays',
    platform: 'SoundCloud',
    cover: '/uploads/track-hopeurhappynow.jpg',
    alt: 'Cover art for hopeurhappynow',
  },
];

/** Content-driven - the grid grows by adding entries here. */
export const artwork = [
  { caption: '"fruity limiter"', src: '/uploads/Fruity_Limiter_1.jpg' },
  { caption: '"dog"', src: '/uploads/Dog.jpg' },
  { caption: '"andrews computer"', src: '/uploads/AJ_the_Freak.jpg' },
  { caption: "\"gokami's keyboard\"", src: '/uploads/gokami_evil_keyboard.png' },
];

export const products = [
  {
    title: 'Glorida Vol. 1',
    href: null,
    status: 'Coming soon',
    cover: '/uploads/Glorida_Final_Animation_first_frame_square_lossless.png',
    alt: 'Glorida Vol. 1 cover art',
  },
  {
    title: 'War$Dogs: @1rott x @themed1c',
    href: 'https://1rott.sellfy.store/p/wardogs-the-multi-kit/',
    status: null,
    cover: '/uploads/WARDOGS_FINAL_COVER01.jpg',
    alt: 'War$Dogs kit cover art',
  },
];

export const footer = '© 2026';
