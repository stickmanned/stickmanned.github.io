import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { experienceItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Experience"
};

export default function ExperiencePage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="kicker">Experience</p>
        <h1>Hackathons, leadership, awards, and milestones.</h1>
        <p>
          A merged, filterable timeline of events from the old Events, Achievements, and Achievement Timeline pages.
        </p>
      </section>
      <ExperienceTimeline items={experienceItems} />
    </main>
  );
}
