import type { Metadata } from "next";
import { writingEntries } from "@/lib/site-data";
import { WritingGrid } from "@/components/writing-grid";

export const metadata: Metadata = {
  title: "Writing",
};

export default function WritingPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="kicker">Writing</p>
        <h1>Essays, short stories, books, and notes.</h1>
        <p>
          From competition essays to self-published books — the ideas behind
          the projects, written down.
        </p>
      </section>

      <WritingGrid writings={writingEntries} />
    </main>
  );
}
