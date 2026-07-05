"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { featuredProjects } from "@/lib/site-data";

const nodeMeta = [
  {
    slug: "pine-a64-gaming-pc",
    mono: "Pi",
    short: "Pine A64",
    left: "66%",
    top: "18%",
    size: 58,
    px: 30,
    py: 30,
  },
  {
    slug: "ncase-m2",
    mono: "M2",
    short: "NCASE",
    left: "64%",
    top: "46%",
    size: 50,
    px: 38,
    py: 38,
  },
  {
    slug: "ai-nerf-aimbot",
    mono: "AI",
    short: "Nerf",
    left: "60%",
    top: "68%",
    size: 54,
    px: 44,
    py: 44,
  },
  {
    slug: "blossom",
    mono: "Bl",
    short: "Blossom",
    left: "83%",
    top: "38%",
    size: 48,
    px: 22,
    py: 22,
  },
  {
    slug: "spacegoose",
    mono: "SG",
    short: "Goose",
    left: "80%",
    top: "70%",
    size: 46,
    px: 28,
    py: 28,
  },
  {
    slug: "lamp-pro",
    mono: "Lp",
    short: "Lamp",
    left: "90%",
    top: "14%",
    size: 42,
    px: 16,
    py: 16,
  },
];

export function ProjectConstellation() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (event: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = stage.getBoundingClientRect();
        const mx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const my = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        stage.style.setProperty("--mx", mx.toFixed(3));
        stage.style.setProperty("--my", my.toFixed(3));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="constellation depth-2"
      data-depth="2"
      ref={stageRef}
      aria-label="Project constellation"
    >
      <div className="depth-ring ring-a" aria-hidden="true" />
      <div className="depth-ring ring-b" aria-hidden="true" />
      <div className="constellation-line" aria-hidden="true" />
      {nodeMeta.map((node) => {
        const project = featuredProjects.find(
          (item) => item.slug === node.slug,
        );
        if (!project) return null;
        return (
          <Link
            key={node.slug}
            className="constellation-node"
            href={project.href}
            style={
              {
                "--left": node.left,
                "--top": node.top,
                "--size": `${node.size}px`,
                "--px": `${node.px}px`,
                "--py": `${node.py}px`,
              } as CSSProperties
            }
          >
            <span>{node.mono}</span>
            <small>{node.short}</small>
            <em>{project.title}</em>
          </Link>
        );
      })}
    </div>
  );
}
