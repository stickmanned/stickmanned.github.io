"use client";

import { useSyncExternalStore } from "react";
import { LuPalette } from "react-icons/lu";

const STORAGE_KEY = "site-theme";

// "" is the original dark theme (no data-theme attribute).
const THEMES = [
  { id: "", label: "Midnight" },
  { id: "light-blue", label: "Light Blue" },
  { id: "white", label: "White" },
];

// The <html> data-theme attribute is the source of truth; it is set before
// hydration by the inline script in app/layout.tsx.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme() {
  return document.documentElement.getAttribute("data-theme") ?? "";
}

/** Cycles between the three site themes. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "");

  const current = THEMES.find((item) => item.id === theme) ?? THEMES[0];
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];

  function cycle() {
    if (next.id) {
      document.documentElement.setAttribute("data-theme", next.id);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, next.id);
    } catch {
      // Storage unavailable (private mode); theme still applies this visit.
    }
  }

  return (
    <button
      className="theme-button"
      type="button"
      onClick={cycle}
      title={`Theme: ${current.label} (switch to ${next.label})`}
      aria-label={`Switch theme to ${next.label}`}
    >
      <LuPalette aria-hidden="true" />
    </button>
  );
}
