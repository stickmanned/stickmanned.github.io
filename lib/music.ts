export type MusicTrack = {
  title: string;
  src: string;
};

/**
 * Startup song played once per session when the site opens.
 * Drop the file at public/music/startup.mp3 — if it's missing, the
 * startup step is skipped silently. It is intentionally NOT part of
 * the playlist below.
 */
export const STARTUP_SRC = "/music/startup.mp3";

/**
 * Playlist for the mini player. Add MP3s to public/music/tracks/ and
 * list them here, e.g.
 *   { title: "Track Name", src: "/music/tracks/track-name.mp3" },
 * The player only renders when this list is non-empty.
 */
export const musicTracks: MusicTrack[] = [];
