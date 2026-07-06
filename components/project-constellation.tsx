import Link from "next/link";
import type { CSSProperties } from "react";
import { featuredProjects } from "@/lib/site-data";
import { ProjectIcon } from "@/components/icons";

const nodeMeta = [
  {
    slug: "pine-a64-gaming-pc",
    short: "Pine A64",
    size: 58,
    radius: 258,
    angle: -12,
    duration: 34,
  },
  {
    slug: "blossom",
    short: "Blossom",
    size: 48,
    radius: 258,
    angle: 108,
    duration: 34,
  },
  {
    slug: "ai-nerf-aimbot",
    short: "Nerf",
    size: 54,
    radius: 258,
    angle: 228,
    duration: 34,
  },
  {
    slug: "ncase-m2",
    short: "NCASE",
    size: 50,
    radius: 372,
    angle: 48,
    duration: 48,
  },
  {
    slug: "spacegoose",
    short: "Goose",
    size: 46,
    radius: 372,
    angle: 168,
    duration: 48,
  },
  {
    slug: "lamp-pro",
    short: "Lamp",
    size: 42,
    radius: 372,
    angle: 288,
    duration: 48,
  },
];

type OrbitStyle = CSSProperties & Record<"--orbit-radius" | "--orbit-angle" | "--orbit-duration" | "--size", string>;

export function ProjectConstellation() {
  return (
    <div className="constellation depth-2" data-depth="2" aria-label="Project constellation">
      <div className="depth-ring ring-a" aria-hidden="true" />
      <div className="depth-ring ring-b" aria-hidden="true" />
      {nodeMeta.map((node) => {
        const project = featuredProjects.find((item) => item.slug === node.slug);
        if (!project) return null;
        return (
          <Link
            key={node.slug}
            className="constellation-node"
            href={project.href}
            aria-label={project.title}
            data-orbit-node
            style={
              {
                "--orbit-radius": `${node.radius}px`,
                "--orbit-angle": `${node.angle}deg`,
                "--orbit-duration": `${node.duration}s`,
                "--size": `${node.size}px`,
              } as OrbitStyle
            }
          >
            <span className="constellation-node-shell">
              <span className="constellation-node-icon" aria-hidden="true">
                <ProjectIcon slug={node.slug} />
              </span>
              <small aria-hidden="true">{node.short}</small>
              <em>{project.title}</em>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
