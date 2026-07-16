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
        <h1>Essays, short stories, books, notes, & more</h1>
      </section>

      <WritingGrid writings={writingEntries} />
    </main>
  );
}
