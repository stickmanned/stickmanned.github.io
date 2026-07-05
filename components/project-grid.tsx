"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/site-data";

const categories: ProjectCategory[] = ["Featured", "Hardware", "Web Apps", "Games", "Experiments"];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory>("Featured");
  const visible = useMemo(
    () => projects.filter((project) => project.categories.includes(active)),
    [active, projects]
  );

  return (
    <div>
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
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const internal = project.href !== "#";
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
        <strong>{internal ? "View case study" : "Project note"}</strong>
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

  return (
    <article className={className} data-reveal>
      {body}
    </article>
  );
}
