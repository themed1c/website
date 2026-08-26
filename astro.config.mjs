import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Canonical origin. og/canonical URLs derive from this via Astro.site;
  // wrangler.jsonc routes must stay in step if it ever changes.
  site: 'https://themed1c.com',
  // Static by default. Only /api/subscribe opts out via `prerender = false`,
  // so every page is still prerendered HTML served from the edge.
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  build: { format: 'directory' },
});
