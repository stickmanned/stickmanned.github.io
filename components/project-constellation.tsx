"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
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
    duration: 42,
    direction: "normal",
  },
  {
    slug: "blossom",
    short: "Blossom",
    size: 48,
    radius: 228,
    angle: 108,
    duration: 42,
    direction: "normal",
  },
  {
    slug: "ai-nerf-aimbot",
    short: "Nerf",
    size: 54,
    radius: 228,
    angle: 228,
    duration: 42,
    direction: "normal",
  },
  {
    slug: "ncase-m2",
    short: "NCASE",
    size: 50,
    radius: 328,
    angle: 48,
    duration: 58,
    direction: "reverse",
  },
  {
    slug: "spacegoose",
    short: "Goose",
    size: 46,
    radius: 328,
    angle: 168,
    duration: 58,
    direction: "reverse",
  },
  {
    slug: "lamp-pro",
    short: "Lamp",
    size: 42,
    radius: 328,
    angle: 288,
    duration: 58,
    direction: "reverse",
  },
];

type OrbitStyle = CSSProperties &
  Record<
    | "--orbit-radius"
    | "--orbit-angle"
    | "--orbit-duration"
    | "--orbit-direction"
    | "--size",
    string
  >;

type ConstellationStyle = CSSProperties & {
  "--orbit-center-x": string;
  "--orbit-center-y": string;
  "--constellation-scale": string;
};

type ConstellationLayout = {
  centerX: number;
  centerY: number;
  scale: number;
  visible: boolean;
};

// Outer orbit (328px) + the largest outer node radius (25px) + a small
// anti-aliasing buffer. Using the real footprint keeps the constellation as
// large as possible without letting it touch adjacent content.
const PROJECT_EXTENT = 356;
const MIN_SCALE = 0.58;
const MOBILE_BREAKPOINT = 760;

export function ProjectConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<ConstellationLayout>({
    centerX: 82,
    centerY: 50,
    scale: 0.74,
    visible: false,
  });

  useLayoutEffect(() => {
    const constellation = ref.current;
    const heroInner = constellation?.parentElement;
    const heroCopy = heroInner?.querySelector<HTMLElement>(".hero-copy");
    if (!constellation || !heroInner || !heroCopy) return;
    const hero = heroInner;
    const copy = heroCopy;

    let frame = 0;

    function measure() {
      frame = 0;
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setLayout((current) => ({ ...current, visible: false }));
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const copyRect = copy.getBoundingClientRect();
      const heroStyles = getComputedStyle(hero);
      const rightPadding = Number.parseFloat(heroStyles.paddingRight) || 0;
      const gap = Math.max(42, Math.min(52, window.innerWidth * 0.035));
      const availableLeft = copyRect.right + gap;
      const availableRight = heroRect.right - rightPadding;
      const availableWidth = Math.max(0, availableRight - availableLeft);
      const scale = Math.min(1, availableWidth / (PROJECT_EXTENT * 2));

      if (scale < MIN_SCALE) {
        setLayout((current) => ({ ...current, visible: false }));
        return;
      }

      const centerX = (availableLeft + availableRight) / 2 - heroRect.left;
      setLayout({
        centerX: (centerX / heroRect.width) * 100,
        centerY: 50,
        scale,
        visible: true,
      });
    }

    function scheduleMeasure() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(hero);
    observer.observe(copy);
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    measure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  const containerStyle: ConstellationStyle = {
    "--orbit-center-x": `${layout.centerX}%`,
    "--orbit-center-y": `${layout.centerY}%`,
    "--constellation-scale": `${layout.scale}`,
    opacity: layout.visible ? 1 : 0,
    visibility: layout.visible ? "visible" : "hidden",
  };

  return (
    <div
      ref={ref}
      className="constellation depth-2"
      data-depth="2"
      aria-label="Project constellation"
      aria-hidden={!layout.visible}
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
                "--orbit-direction": node.direction,
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
