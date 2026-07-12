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
      </section>
      <ExperienceTimeline items={experienceItems} />
    </main>
  );
}
