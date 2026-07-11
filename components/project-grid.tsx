"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/site-data";

const categories: ProjectCategory[] = ["Featured", "Hardware", "Web Apps", "Games", "Experiments"];

// The 3D gallery (and three.js with it) is only fetched when it opens.
const ProjectGallery = dynamic(
  () => import("@/components/project-gallery"),
  { ssr: false, loading: () => <div className="gallery-overlay gallery-status">Opening the gallery…</div> }
);

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>("Featured");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const visible = useMemo(
    () => projects.filter((project) => project.categories.includes(active)),
    [active, projects]
  );

  return (
    <div>
      <div className="project-toolbar">
        <div className="segmented-control" role="tablist" aria-label="Project categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={active === category ? "is-active" : ""}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="sort-button gallery-enter-button"
          onClick={() => setGalleryOpen(true)}
        >
          🖼️ Enter Gallery
        </button>
      </div>
      {galleryOpen && (
        <ProjectGallery projects={projects} onExit={() => setGalleryOpen(false)} />
      )}
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const internal = project.href.startsWith("/");
  const external = project.href.startsWith("http");
  const className = wide ? "project-card project-card-wide" : "project-card";
  const body = (
    <>
      <figure>
        <img src={project.image} alt="" loading="lazy" />
        <span>{project.year}</span>
      </figure>
      <div className="project-card-body">
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        <strong>
          {internal ? "View case study" : external ? "Play / view project ↗" : "Write-up coming soon"}
        </strong>
      </div>
    </>
  );

  if (internal) {
    return (
      <Link className={className} href={project.href} data-tilt data-reveal>
        {body}
      </Link>
    );
  }

  if (external) {
    return (
      <a
        className={className}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        data-tilt
        data-reveal
      >
        {body}
      </a>
    );
  }

  return (
    <article className={className} data-reveal>
      {body}
    </article>
  );
}
