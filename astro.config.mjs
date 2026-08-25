import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Static by default. Only /api/subscribe opts out via `prerender = false`,
  // so every page is still prerendered HTML served from the edge.
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  build: { format: 'directory' },
});
