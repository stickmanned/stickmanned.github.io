import type { Metadata } from "next";
import { writingEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Writing"
};

const groups = ["Books", "Essays", "Short Stories", "Other"] as const;

export default function WritingPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="kicker">Writing</p>
        <h1>Essays, short stories, books, and notes.</h1>
        <p>Writing is a secondary strength here: organized, readable, and tied back to curiosity.</p>
      </section>
      {groups.map((group) => {
        const entries = writingEntries.filter((entry) => entry.category === group);
        if (!entries.length) return null;
        return (
          <section key={group} className="writing-section">
            <div className="section-heading">
              <p>{group}</p>
              <h2>{group === "Books" ? "Longer creative work." : group}</h2>
            </div>
            <div className="writing-grid">
              {entries.map((entry) => (
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
          </section>
        );
      })}
    </main>
  );
}
