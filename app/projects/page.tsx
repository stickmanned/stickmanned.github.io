import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { allProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="kicker">Projects</p>
        <h1>Hardware, software, games, and more!</h1>
        <p>
          Everything I&apos;ve ever made so far, from featured projects to my earliest
          games. Filter by category, and enter the Gallery for a truly immersive experience!
        </p>
      </section>
      <ProjectGrid projects={allProjects} />
    </main>
  );
}
