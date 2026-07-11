"use client";

import { useEffect, useRef, useState } from "react";
import {
  LuChevronDown,
  LuMusic,
  LuPause,
  LuPlay,
  LuSkipBack,
  LuSkipForward,
  LuVolume2,
  LuVolumeX,
} from "react-icons/lu";
import { musicTracks, type MusicTrack } from "@/lib/music";

/**
 * Minimal playlist player.
 * - Renders paused on page load; nothing plays until the visitor presses
 *   play. There is no autoplay.
 * - The player only renders when lib/music.ts lists at least one track.
 */
export function MusicPlayer() {
  return musicTracks.length > 0 ? <TrackPlayer /> : null;
}

/**
 * Turn a stored/filename-derived title into a clean, readable one:
 * drops any audio file extension, converts filename separators
 * (underscores, repeated hyphens) to spaces, and collapses whitespace.
 * Meaningful punctuation — single hyphens, parentheses, "feat.", etc. —
 * is left intact.
 */
function formatTitle(raw: string): string {
  return raw
    .replace(/\.(mp3|wav|ogg|m4a|flac|aac)$/i, "")
    .replace(/_/g, " ")
    .replace(/\s*-{2,}\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Matching cover extracted from the MP3, unless the track overrides it. */
function artFor(track: MusicTrack): string {
  return (
    track.art ??
    track.src.replace("/music/tracks/", "/music/art/").replace(/\.mp3$/i, ".jpg")
  );
}

function TrackPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const artRef = useRef<HTMLImageElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [closing, setClosing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errored, setErrored] = useState(false);
  const [artFailed, setArtFailed] = useState(false);

  const track = musicTracks[index];

  const step = (direction: 1 | -1) => {
    setErrored(false);
    setArtFailed(false);
    setProgress(0);
    setIndex(
      (value) =>
        (value + direction + musicTracks.length) % musicTracks.length,
    );
  };

  // Keep the element in sync when the track changes while playing.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [index, playing]);

  // Catch covers that already failed before hydration (the SSR'd <img> can
  // fire its error event before React attaches onError), so the fallback
  // still shows instead of a broken image.
  useEffect(() => {
    const img = artRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setArtFailed(true);
    }
  }, [index]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || errored) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };
  if (hidden) {
    return (
      <button
        className="music-fab"
        type="button"
        aria-label="Show music player"
        onClick={() => {
          setClosing(false);
          setHidden(false);
        }}
      >
        <LuMusic aria-hidden="true" />
      </button>
    );
  }

  const title = formatTitle(track.title);
  const displayTitle = errored ? `${title} — unavailable` : title;

  return (
    <div
      className={`music-player${closing ? " music-player-closing" : ""}`}
      role="region"
      aria-label="Music player"
      onAnimationEnd={(event) => {
        // Only react to the container's own open/close animation, not the
        // bubbled entrance animations of its children.
        if (event.target === event.currentTarget && closing) {
          setHidden(true);
          setClosing(false);
        }
      }}
    >
      <audio
        ref={audioRef}
        src={track.src}
        muted={muted}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setProgress((audio.currentTime / audio.duration) * 100);
          }
        }}
        onEnded={() => step(1)}
        onError={() => {
          setErrored(true);
          setPlaying(false);
        }}
      />
      <div className="music-player-body">
        <div className="music-art" aria-hidden="true">
          {artFailed ? (
            <div className="music-art-fallback">
              <LuMusic aria-hidden="true" />
            </div>
          ) : (
            // Static export uses unoptimized images, so a plain <img> matches
            // the rest of the site. The title text is the label, so the cover
            // is decorative (alt="").
            <img
              ref={artRef}
              src={artFor(track)}
              alt=""
              loading="lazy"
              draggable={false}
              onError={() => setArtFailed(true)}
            />
          )}
        </div>
        <span className="music-player-title" title={displayTitle}>
          {displayTitle}
        </span>
        <div className="music-player-controls">
          <button
            type="button"
            aria-label="Previous track"
            onClick={() => step(-1)}
          >
            <LuSkipBack aria-hidden="true" />
          </button>
          <button
            className="music-play"
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
          >
            {playing ? (
              <LuPause aria-hidden="true" />
            ) : (
              <LuPlay aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={() => step(1)}
          >
            <LuSkipForward aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => setMuted((value) => !value)}
          >
            {muted ? (
              <LuVolumeX aria-hidden="true" />
            ) : (
              <LuVolume2 aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            aria-label="Hide music player"
            onClick={() => setClosing(true)}
          >
            <LuChevronDown aria-hidden="true" />
          </button>
        </div>
        <input
          className="music-progress"
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label="Track progress"
        />
      </div>
    </div>
  );
}
