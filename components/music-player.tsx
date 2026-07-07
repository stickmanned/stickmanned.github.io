"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
import { musicTracks, STARTUP_SRC } from "@/lib/music";

const DONE_EVENT = "startup-audio-done";

type Phase = "boot" | "blocked" | "intro";

// In-memory flag so the startup track replays on full page reload/visit,
// but does not play again during client-side route transitions.
let startupPlayed = false;

function subscribeDone(onChange: () => void) {
  window.addEventListener(DONE_EVENT, onChange);
  return () => window.removeEventListener(DONE_EVENT, onChange);
}

function readDone() {
  return startupPlayed;
}

function markDone() {
  startupPlayed = true;
  window.dispatchEvent(new Event(DONE_EVENT));
}

/**
 * Startup-song flow followed by a minimal playlist player.
 * - The startup song plays once per session; if autoplay is blocked a
 *   small pill invites one click, and if the file is missing everything
 *   is skipped silently (no errors, no UI).
 * - The player only renders when lib/music.ts lists at least one track.
 */
export function MusicPlayer() {
  const done = useSyncExternalStore(subscribeDone, readDone, () => false);
  const [phase, setPhase] = useState<Phase>("boot");
  const startupRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (done) return;

    const audio = new Audio(STARTUP_SRC);
    startupRef.current = audio;
    audio.preload = "auto";

    audio.addEventListener("ended", markDone);
    audio.addEventListener("error", markDone);

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setPhase("intro");
          removeListeners();
        })
        .catch(() => {
          if (audio.error) {
            markDone();
            removeListeners();
          } else {
            setPhase("blocked");
          }
        });
    };

    const handleInteraction = () => {
      tryPlay();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    // Try playing immediately
    tryPlay();

    // Listen for first interaction to trigger play if it was blocked
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      audio.removeEventListener("ended", markDone);
      audio.removeEventListener("error", markDone);
      audio.pause();
      startupRef.current = null;
      removeListeners();
    };
  }, [done]);

  const skipIntro = () => {
    startupRef.current?.pause();
    markDone();
  };

  if (done) {
    return musicTracks.length > 0 ? <TrackPlayer /> : null;
  }

  if (phase === "blocked") {
    return (
      <button
        className="audio-start-pill"
        type="button"
        onClick={() => {
          startupRef.current
            ?.play()
            .then(() => setPhase("intro"))
            .catch(skipIntro);
        }}
      >
        <LuVolume2 aria-hidden="true" />
        Enable sound
      </button>
    );
  }

  if (phase === "intro") {
    return (
      <button className="audio-start-pill" type="button" onClick={skipIntro}>
        <LuVolumeX aria-hidden="true" />
        Skip intro
      </button>
    );
  }

  return null;
}

function TrackPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errored, setErrored] = useState(false);

  const track = musicTracks[index];

  const step = (direction: 1 | -1) => {
    setErrored(false);
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
        onClick={() => setHidden(false)}
      >
        <LuMusic aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className="music-player" role="region" aria-label="Music player">
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
      <div className="music-player-top">
        <span className="music-player-title">
          {errored ? `${track.title} — unavailable` : track.title}
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
            onClick={() => setHidden(true)}
          >
            <LuChevronDown aria-hidden="true" />
          </button>
        </div>
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
  );
}
