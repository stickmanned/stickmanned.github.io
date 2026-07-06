"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-grid";
import type { Project } from "@/lib/site-data";

const INITIAL_COUNT = 8;

export function SelectedWork({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);

  const initial = projects.slice(0, INITIAL_COUNT);
  const rest = projects.slice(INITIAL_COUNT);

  return (
    <div className="selected-work">
      <div className="selected-grid">
        {initial.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Extra cards are only mounted when expanded: keeps the collapsed state
          light and keeps hidden cards out of the tab order automatically. */}
      {expanded && rest.length > 0 ? (
        <div className="selected-grid selected-grid-rest">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="selected-actions">
          <button
            type="button"
            className="expand-button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            <span>
              {expanded ? "Show fewer" : `Show all ${projects.length} projects`}
            </span>
            <svg
              className="expand-chevron"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
