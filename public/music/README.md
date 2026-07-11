# Music

- `tracks/`: put playlist MP3s here, then register each one in
  `lib/music.ts` (`musicTracks`) so the mini player can list it.
- `art/`: cover art for the player. The player looks for an image with the
  same basename as the track (e.g. `art/<track>.jpg`), and otherwise shows a
  placeholder. A track can also point at a specific image via the optional
  `art` field in `lib/music.ts`. The current covers were extracted from each
  MP3's embedded artwork.

The mini player renders paused on page load; nothing plays until the
visitor presses play (no autoplay).
