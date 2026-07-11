"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import {
  LuBookOpen,
  LuBoxes,
  LuBrainCircuit,
  LuCpu,
  LuFileText,
  LuFlower2,
  LuGamepad2,
  LuLamp,
  LuMonitor,
  LuPenLine,
  LuPrinter,
  LuRocket,
  LuScrollText,
  LuUsers,
} from "react-icons/lu";
import type { IconType } from "react-icons";

type GraphNode = {
  id: string;
  label: string;
  /** initial position as a percentage of the container, used for first paint */
  ix: number;
  iy: number;
  /** visual radius of the icon circle, in px */
  r: number;
  kind: "core" | "domain" | "leaf";
  href: string;
  icon?: IconType;
};

const nodes: GraphNode[] = [
  { id: "me", label: "William", ix: 50, iy: 50, r: 28, kind: "core", href: "/" },
  { id: "hw", label: "Hardware", ix: 24, iy: 31, r: 20, kind: "domain", href: "/projects/", icon: LuCpu },
  { id: "web", label: "Web Apps", ix: 76, iy: 28, r: 20, kind: "domain", href: "/projects/", icon: LuBrainCircuit },
  { id: "games", label: "Games", ix: 76, iy: 72, r: 20, kind: "domain", href: "/projects/", icon: LuGamepad2 },
  { id: "cad", label: "3D / CAD", ix: 25, iy: 74, r: 20, kind: "domain", href: "/projects/", icon: LuPrinter },
  { id: "write", label: "Writing", ix: 50, iy: 15, r: 19, kind: "domain", href: "/writing/", icon: LuPenLine },
  { id: "club", label: "Hack Club", ix: 50, iy: 86, r: 19, kind: "domain", href: "/experience/", icon: LuUsers },
  { id: "books", label: "Books", ix: 33, iy: 8, r: 15, kind: "leaf", href: "/writing/", icon: LuBookOpen },
  { id: "stories", label: "Stories", ix: 67, iy: 8, r: 15, kind: "leaf", href: "/writing/", icon: LuScrollText },
  { id: "essays", label: "Essays", ix: 50, iy: 28, r: 15, kind: "leaf", href: "/writing/", icon: LuFileText },
  { id: "pine", label: "Pine A64", ix: 8, iy: 18, r: 15, kind: "leaf", href: "/projects/pine-a64-gaming-pc/", icon: LuBoxes },
  { id: "ncase", label: "NCASE M2", ix: 8, iy: 49, r: 15, kind: "leaf", href: "/projects/ncase-m2/", icon: LuMonitor },
  { id: "nerf", label: "AI Nerf", ix: 31, iy: 17, r: 15, kind: "leaf", href: "/projects/ai-nerf-aimbot/", icon: LuRocket },
  { id: "blossom", label: "Blossom", ix: 92, iy: 16, r: 15, kind: "leaf", href: "/projects/blossom/", icon: LuFlower2 },
  { id: "goose", label: "SpaceGoose", ix: 92, iy: 85, r: 15, kind: "leaf", href: "/projects/spacegoose/", icon: LuGamepad2 },
  { id: "lamp", label: "Lamp Pro", ix: 9, iy: 88, r: 15, kind: "leaf", href: "/projects/lamp-pro/", icon: LuLamp },
];

const edges: [string, string][] = [
  ["me", "hw"],
  ["me", "web"],
  ["me", "games"],
  ["me", "cad"],
  ["me", "write"],
  ["me", "club"],
  ["write", "books"],
  ["write", "stories"],
  ["write", "essays"],
  ["hw", "pine"],
  ["hw", "ncase"],
  ["hw", "nerf"],
  ["web", "blossom"],
  ["games", "goose"],
  ["cad", "lamp"],
  ["club", "goose"],
];

type NodeStyle = CSSProperties & Record<"--r", string>;

type Body = {
  id: string;
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** William stays pinned at the center; everything else orbits and bounces around him. */
  fixed: boolean;
};

/** slow, constant drift speed in px/s */
const SPEED = 18;

export function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const els = Array.from(container.querySelectorAll<HTMLElement>(".knowledge-node"));
    if (els.length !== nodes.length) return;

    const lineEls = Array.from(svg.querySelectorAll<SVGLineElement>("line"));

    const reduceMotion = false;

    let W = container.clientWidth;
    let H = container.clientHeight;

    // Collision radius encloses BOTH the icon circle and the label beneath it,
    // so neither icons nor text can ever overlap between two bodies.
    const bodies: Body[] = nodes.map((node, i) => {
      const el = els[i];
      const label = el.querySelector("span");
      const labelWidth = label ? label.getBoundingClientRect().width : 0;
      const radius = Math.max(node.r + 22, labelWidth / 2 + 6);
      const fixed = node.kind === "core";
      return {
        id: node.id,
        el,
        radius,
        fixed,
        x: fixed ? W / 2 : (node.ix / 100) * W,
        y: fixed ? H / 2 : (node.iy / 100) * H,
        vx: 0,
        vy: 0,
      };
    });

    const byId = Object.fromEntries(bodies.map((b) => [b.id, b]));
    const edgeBodies = edges.map(([a, b]) => [byId[a], byId[b]] as const);

    const pinCenter = () => {
      for (const b of bodies) {
        if (b.fixed) {
          b.x = W / 2;
          b.y = H / 2;
        }
      }
    };

    const clampToWalls = () => {
      for (const b of bodies) {
        if (b.fixed) continue;
        b.x = Math.min(W - b.radius, Math.max(b.radius, b.x));
        b.y = Math.min(H - b.radius, Math.max(b.radius, b.y));
      }
    };

    // Push two bodies apart without touching velocity (used for initial layout).
    // A fixed body (William) never moves; the other absorbs the full correction.
    const separate = (a: Body, b: Body) => {
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let dist = Math.hypot(dx, dy);
      const min = a.radius + b.radius;
      if (dist >= min) return;
      if (dist === 0) {
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        dist = Math.hypot(dx, dy) || 1;
      }
      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = min - dist;

      if (a.fixed) {
        b.x += nx * overlap;
        b.y += ny * overlap;
      } else if (b.fixed) {
        a.x -= nx * overlap;
        a.y -= ny * overlap;
      } else {
        a.x -= nx * (overlap / 2);
        a.y -= ny * (overlap / 2);
        b.x += nx * (overlap / 2);
        b.y += ny * (overlap / 2);
      }
    };

    pinCenter();
    clampToWalls();
    // Relaxation pass: guarantee an overlap-free starting layout.
    for (let iter = 0; iter < 140; iter++) {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          separate(bodies[i], bodies[j]);
        }
      }
      pinCenter();
      clampToWalls();
    }

    const draw = () => {
      for (const b of bodies) {
        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
      }
      // Lines are redrawn every frame so each connection tracks its two nodes
      // and the graph stays visibly organized as bodies bounce around William.
      for (let i = 0; i < edgeBodies.length; i++) {
        const [a, b] = edgeBodies[i];
        const line = lineEls[i];
        if (!line) continue;
        line.setAttribute("x1", `${a.x}`);
        line.setAttribute("y1", `${a.y}`);
        line.setAttribute("x2", `${b.x}`);
        line.setAttribute("y2", `${b.y}`);
      }
    };

    const setSvgSize = () => {
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    };

    setSvgSize();
    draw();

    if (reduceMotion) return; // static, non-overlapping layout only

    // Seed each free body with a slow velocity in a random direction.
    for (const b of bodies) {
      if (b.fixed) continue;
      const angle = Math.random() * Math.PI * 2;
      b.vx = Math.cos(angle) * SPEED;
      b.vy = Math.sin(angle) * SPEED;
    }

    // Elastic collision with 50/50 positional correction between two free bodies;
    // a fixed body (William) acts like an immovable wall that reflects the other.
    const collide = (a: Body, b: Body) => {
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let dist = Math.hypot(dx, dy);
      const min = a.radius + b.radius;
      if (dist >= min) return;
      if (dist === 0) {
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        dist = Math.hypot(dx, dy) || 1;
      }
      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = min - dist;

      if (a.fixed || b.fixed) {
        const moving = a.fixed ? b : a;
        const sign = a.fixed ? 1 : -1;
        moving.x += sign * nx * overlap;
        moving.y += sign * ny * overlap;

        const vn = moving.vx * nx * sign + moving.vy * ny * sign;
        if (vn < 0) {
          moving.vx -= 2 * vn * nx * sign;
          moving.vy -= 2 * vn * ny * sign;
        }
        return;
      }

      a.x -= nx * (overlap / 2);
      a.y -= ny * (overlap / 2);
      b.x += nx * (overlap / 2);
      b.y += ny * (overlap / 2);

      // Only resolve if the bodies are actually approaching.
      const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (vn < 0) {
        const jn = -vn; // equal mass, e = 1
        a.vx -= jn * nx;
        a.vy -= jn * ny;
        b.vx += jn * nx;
        b.vy += jn * ny;
      }
    };

    let hovered: HTMLElement | null = null;
    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(".knowledge-node");
      hovered = target;
    };
    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(".knowledge-node");
      if (target === hovered) hovered = null;
    };
    container.addEventListener("pointerover", onPointerOver);
    container.addEventListener("pointerout", onPointerOut);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05; // guard against tab-switch jumps

      for (const b of bodies) {
        if (b.fixed) continue; // William stays pinned at the center
        if (b.el === hovered) continue; // frozen so it stays clickable
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        if (b.x < b.radius) {
          b.x = b.radius;
          b.vx = Math.abs(b.vx);
        } else if (b.x > W - b.radius) {
          b.x = W - b.radius;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y < b.radius) {
          b.y = b.radius;
          b.vy = Math.abs(b.vy);
        } else if (b.y > H - b.radius) {
          b.y = H - b.radius;
          b.vy = -Math.abs(b.vy);
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          collide(bodies[i], bodies[j]);
        }
      }

      // Re-normalize to a constant slow pace: never speed up, stall, or clump.
      for (const b of bodies) {
        if (b.fixed) continue;
        const mag = Math.hypot(b.vx, b.vy);
        if (mag > 0.0001) {
          b.vx = (b.vx / mag) * SPEED;
          b.vy = (b.vy / mag) * SPEED;
        } else {
          const angle = Math.random() * Math.PI * 2;
          b.vx = Math.cos(angle) * SPEED;
          b.vy = Math.sin(angle) * SPEED;
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => {
      W = container.clientWidth;
      H = container.clientHeight;
      setSvgSize();
      pinCenter();
      clampToWalls();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      container.removeEventListener("pointerover", onPointerOver);
      container.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <div className="knowledge-graph" ref={containerRef} aria-label="Clickable knowledge graph">
      <svg className="knowledge-edges" ref={svgRef} aria-hidden="true" focusable="false">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} />
        ))}
      </svg>
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <Link
            key={node.id}
            className={`knowledge-node is-${node.kind}`}
            href={node.href}
            aria-label={`${node.label} page`}
            data-graph-node
            style={
              {
                "--r": `${node.r}px`,
                left: `${node.ix}%`,
                top: `${node.iy}%`,
              } as NodeStyle
            }
          >
            {node.kind === "core" ? (
              <img src="/design-assets/logo.png" alt="" aria-hidden="true" />
            ) : Icon ? (
              <Icon aria-hidden="true" focusable="false" />
            ) : null}
            <span>{node.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
