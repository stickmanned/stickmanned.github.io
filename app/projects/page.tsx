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
          A filterable work hub for William&apos;s strongest projects and earlier games, grounded in the old site&apos;s
          project archive.
        </p>
      </section>
      <ProjectGrid projects={allProjects} />
    </main>
  );
}
