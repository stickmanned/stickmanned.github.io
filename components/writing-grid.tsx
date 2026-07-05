"use client";

import { useMemo, useState } from "react";
import type { WritingEntry } from "@/lib/site-data";
import { featuredWritings } from "@/lib/site-data";

type FilterTab =
  "Featured" | "All Works" | "Books" | "Essays" | "Short Stories" | "Other";
type SortMode = "date-desc" | "date-asc" | "title-asc";

const tabs: FilterTab[] = [
  "Featured",
  "All Works",
  "Books",
  "Essays",
  "Short Stories",
  "Other",
];

export function WritingGrid({ writings }: { writings: WritingEntry[] }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("Featured");
  const [sortMode, setSortMode] = useState<SortMode>("date-desc");

  const visible = useMemo(() => {
    let list: WritingEntry[];
    if (activeTab === "Featured") {
      list = [...featuredWritings];
    } else if (activeTab === "All Works") {
      list = [...writings];
    } else {
      list = writings.filter((w) => w.category === activeTab);
    }

    if (sortMode === "date-desc") {
      return list.sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
      );
    } else if (sortMode === "date-asc") {
      return list.sort(
        (a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime(),
      );
    } else {
      return list.sort((a, b) =>
        a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
      );
    }
  }, [activeTab, sortMode, writings]);

  return (
    <div>
      <div
        className="segmented-control"
        role="tablist"
        aria-label="Writing categories"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? "is-active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <button
          className="button"
          onClick={() => {
            if (sortMode === "date-desc") setSortMode("date-asc");
            else if (sortMode === "date-asc") setSortMode("title-asc");
            else setSortMode("date-desc");
          }}
        >
          Sort:{" "}
          {sortMode === "date-desc"
            ? "Date ↓"
            : sortMode === "date-asc"
              ? "Date ↑"
              : "A-Z"}
        </button>
      </div>

      <div className="writing-grid">
        {visible.length === 0 && (
          <p style={{ opacity: 0.6 }}>No writing found in this category.</p>
        )}
        {visible.map((entry) => (
          <a
            key={entry.title}
            href={entry.href}
            target={entry.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-reveal
          >
            <img src={entry.image} alt="" loading="lazy" />
            <span>{entry.date}</span>
            <h3>{entry.title}</h3>
            <p>{entry.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
