# Music

- `startup.mp3` (place directly in this folder): plays once per session when
  the site opens. If autoplay is blocked, a small "Enable sound" pill appears
  instead. If the file is missing, the startup step is skipped silently.
- `tracks/`: put playlist MP3s here, then register each one in
  `lib/music.ts` (`musicTracks`) so the mini player can list it.

The startup song is intentionally not part of the player playlist.
