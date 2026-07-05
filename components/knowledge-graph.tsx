"use client";

import { useEffect, useRef } from "react";

type Node = { id: string; label: string; x: number; y: number; r: number; kind: "core" | "domain" | "leaf" };

const nodes: Node[] = [
  { id: "me", label: "william", x: 0.5, y: 0.5, r: 20, kind: "core" },
  { id: "hw", label: "hardware", x: 0.26, y: 0.32, r: 13, kind: "domain" },
  { id: "web", label: "web", x: 0.76, y: 0.28, r: 13, kind: "domain" },
  { id: "games", label: "games", x: 0.76, y: 0.72, r: 13, kind: "domain" },
  { id: "cad", label: "3d / cad", x: 0.26, y: 0.74, r: 13, kind: "domain" },
  { id: "write", label: "writing", x: 0.5, y: 0.14, r: 11, kind: "domain" },
  { id: "club", label: "hack club", x: 0.5, y: 0.86, r: 11, kind: "domain" },
  { id: "pine", label: "pine a64", x: 0.09, y: 0.2, r: 8, kind: "leaf" },
  { id: "ncase", label: "ncase m2", x: 0.1, y: 0.48, r: 8, kind: "leaf" },
  { id: "nerf", label: "nerf", x: 0.32, y: 0.13, r: 8, kind: "leaf" },
  { id: "blossom", label: "blossom", x: 0.91, y: 0.15, r: 8, kind: "leaf" },
  { id: "goose", label: "spacegoose", x: 0.92, y: 0.85, r: 8, kind: "leaf" },
  { id: "lamp", label: "lamp pro", x: 0.09, y: 0.87, r: 8, kind: "leaf" }
];

const edges = [
  ["me", "hw"],
  ["me", "web"],
  ["me", "games"],
  ["me", "cad"],
  ["me", "write"],
  ["me", "club"],
  ["hw", "pine"],
  ["hw", "ncase"],
  ["hw", "nerf"],
  ["web", "blossom"],
  ["games", "goose"],
  ["cad", "lamp"],
  ["club", "goose"]
];

export function KnowledgeGraph() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!canvasContext) return;
    const ctx: CanvasRenderingContext2D = canvasContext;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let t = Math.random() * 10;
    let hover: Node | null = null;
    let drag: Node | null = null;
    const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      draw();
    };

    const pos = (node: Node, index: number) => ({
      x: node.x * width + (drag === node || reduced ? 0 : Math.sin(t * 1.3 + index * 2.1) * 3),
      y: node.y * height + (drag === node || reduced ? 0 : Math.cos(t + index * 1.7) * 3)
    });

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const positions = nodes.map(pos);
      const index = Object.fromEntries(nodes.map((node, i) => [node.id, i]));
      edges.forEach(([a, b]) => {
        const hot = hover && (hover === byId[a] || hover === byId[b]);
        ctx.strokeStyle = hot ? "#c9ff3b" : "rgba(255,255,255,0.11)";
        ctx.globalAlpha = hot ? 0.9 : 1;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(positions[index[a]].x, positions[index[a]].y);
        ctx.lineTo(positions[index[b]].x, positions[index[b]].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      nodes.forEach((node, i) => {
        const point = positions[i];
        const hot = hover === node;
        ctx.beginPath();
        ctx.arc(point.x, point.y, node.r + (hot ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = node.kind === "core" ? "#c9ff3b" : "#12151a";
        ctx.fill();
        ctx.strokeStyle = hot || node.kind === "core" ? "#c9ff3b" : "rgba(255,255,255,0.26)";
        ctx.lineWidth = hot ? 1.6 : 1;
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.font = node.kind === "core" ? '700 11px "Space Mono", monospace' : '10px "Space Mono", monospace';
        ctx.fillStyle = node.kind === "core" ? "#08090b" : hot ? "#f5f7fa" : "#8a94a6";
        ctx.fillText(node.kind === "core" ? "WW" : node.label, point.x, point.y + (node.kind === "core" ? 4 : node.r + 15));
      });
    }

    const loop = () => {
      t += 0.01;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const hit = (mx: number, my: number) => {
      for (let i = nodes.length - 1; i >= 0; i -= 1) {
        const point = pos(nodes[i], i);
        const dx = mx - point.x;
        const dy = my - point.y;
        if (dx * dx + dy * dy < (nodes[i].r + 8) * (nodes[i].r + 8)) return nodes[i];
      }
      return null;
    };

    const pointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return [event.clientX - rect.left, event.clientY - rect.top] as const;
    };

    const onPointerMove = (event: PointerEvent) => {
      const [mx, my] = pointer(event);
      if (drag) {
        drag.x = Math.min(0.97, Math.max(0.03, mx / width));
        drag.y = Math.min(0.93, Math.max(0.06, my / height));
      } else {
        hover = hit(mx, my);
        canvas.style.cursor = hover ? "grab" : "default";
      }
      if (reduced) draw();
    };

    const onPointerDown = (event: PointerEvent) => {
      const [mx, my] = pointer(event);
      drag = hit(mx, my);
      if (drag) canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      drag = null;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    if (reduced) draw();
    else loop();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="knowledge-canvas" aria-label="Draggable knowledge graph" />;
}
