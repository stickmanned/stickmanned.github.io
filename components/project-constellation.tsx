"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "@/lib/site-data";
import { ProjectIcon } from "@/components/icons";
import { ConstellationHead } from "@/components/head-model";

const nodeMeta = [
  {
    slug: "pine-a64-gaming-pc",
    short: "Pine A64",
    size: 58,
    radius: 228,
    angle: -12,
    duration: 34,
  },
  {
    slug: "blossom",
    short: "Blossom",
    size: 48,
    radius: 228,
    angle: 108,
    duration: 34,
  },
  {
    slug: "ai-nerf-aimbot",
    short: "Nerf",
    size: 54,
    radius: 228,
    angle: 228,
    duration: 34,
  },
  {
    slug: "ncase-m2",
    short: "NCASE",
    size: 50,
    radius: 328,
    angle: 48,
    duration: 48,
  },
  {
    slug: "spacegoose",
    short: "Goose",
    size: 46,
    radius: 328,
    angle: 168,
    duration: 48,
  },
  {
    slug: "lamp-pro",
    short: "Lamp",
    size: 42,
    radius: 328,
    angle: 288,
    duration: 48,
  },
];

type OrbitStyle = CSSProperties &
  Record<
    "--orbit-radius" | "--orbit-angle" | "--orbit-duration" | "--size",
    string
  >;

type ConstellationStyle = CSSProperties & {
  "--orbit-center-x": string;
  "--orbit-center-y": string;
  "--constellation-scale": string;
};

/**
 * Compute the dynamic layout values for the constellation based on
 * the current viewport width.
 * Mathematically guarantees the rings won't cut off on the right
 * and won't overlap the hero text on the left.
 */
function getConstellationLayout(viewportWidth: number) {
  // If viewport is very small, early exit.
  if (viewportWidth < 760) {
    return { centerX: 50, centerY: 50, scale: 0, opacity: 0 };
  }

  // The container max-width is 1180px, centered on the screen.
  const containerMaxWidth = 1180;
  const leftMargin = viewportWidth > containerMaxWidth ? (viewportWidth - containerMaxWidth) / 2 : 0;
  
  // Left padding is clamp(18px, 4vw, 44px)
  const leftPadding = Math.max(18, Math.min(44, viewportWidth * 0.04));
  
  // The visual width of the text column (aligned with container max-width 520px)
  const textWidth = 520;
  
  // Spacing gap between text and constellation elements to prevent proximity crowding
  const gap = 55;
  
  // Calculate the exact right edge of the text in pixels relative to viewport
  const textRightEdge = leftMargin + leftPadding + textWidth + gap;
  
  // The max radius of the orbiting project nodes is 328px + icon overhang.
  const projectRadius = 380; 
  
  // Padding from the right screen edge
  const rightPadding = 30;

  // Calculate the scale required to exactly fit between the text and the right edge.
  let scale = (viewportWidth - textRightEdge - rightPadding) / (projectRadius * 2);
  
  // Cap at 1.0 so it doesn't get massive on ultra-wide screens
  if (scale > 1) {
    scale = 1;
  }
  
  // If the required scale is too small, it means the space is too cramped.
  // Hide it completely.
  if (scale < 0.6) {
    return { centerX: 50, centerY: 50, scale: 0, opacity: 0 };
  }
  
  // Place the center next to the text column with the minimal gap.
  const centerX = leftMargin + leftPadding + textWidth + gap + (projectRadius * scale);

  const containerWidth = Math.min(viewportWidth, containerMaxWidth);
  const relativeCenterX = centerX - leftMargin;

  return { 
    centerX: (relativeCenterX / containerWidth) * 100, // Percentage of the parent container
    centerY: 54, 
    scale,
    opacity: 1
  };
}

export function ProjectConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ centerX: 84, centerY: 54, scale: 1, opacity: 1 });

  useEffect(() => {
    function update() {
      setLayout(getConstellationLayout(window.innerWidth));
    }
    update(); // Initial calculation
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const containerStyle: ConstellationStyle = {
    "--orbit-center-x": `${layout.centerX}%`,
    "--orbit-center-y": `${layout.centerY}%`,
    "--constellation-scale": `${layout.scale}`,
    opacity: layout.opacity,
    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
  };

  return (
    <div
      ref={ref}
      className="constellation depth-2"
      data-depth="2"
      aria-label="Project constellation"
      style={containerStyle}
    >
      <div className="depth-ring ring-a" aria-hidden="true" />
      <div className="depth-ring ring-b" aria-hidden="true" />
      <ConstellationHead />
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
              <em>{project.title}</em>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
