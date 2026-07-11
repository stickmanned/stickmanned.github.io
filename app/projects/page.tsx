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
        <h1>Hardware, web apps, games, and experiments.</h1>
        <p>
          Everything I&apos;ve shipped — from featured hardware builds and web apps back to my earliest
          Scratch games. Filter by category.
        </p>
      </section>
      <ProjectGrid projects={allProjects} />
    </main>
  );
}
