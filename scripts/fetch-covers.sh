#!/usr/bin/env bash
# Downloads the two SoundCloud track covers for self-hosting.
# Run from the repo root. Requires curl.
#
# Artwork URLs verified live 2026-08-24. If SoundCloud rotates them,
# re-read the og:image meta tag on each track page and update below.

set -euo pipefail

DEST="public/uploads"
mkdir -p "$DEST"

fetch() {
  local url="$1" out="$2"
  echo "-> $out"
  curl -fsSL "$url" -o "$DEST/$out"
}

# dimb — https://soundcloud.com/med1c/dimb
fetch "https://i1.sndcdn.com/artworks-GTJ9nWl6ScRUsLdy-tXYHtA-t1080x1080.jpg" "track-dimb.jpg"

# hopeurhappynow — https://soundcloud.com/med1c/hoperurhappynow
fetch "https://i1.sndcdn.com/artworks-JKiM6HZnW5vHynpl-y3ypiw-t1080x1080.jpg" "track-hopeurhappynow.jpg"

echo
echo "Done. Verify both are 1080x1080:"
echo "  file $DEST/track-*.jpg"
