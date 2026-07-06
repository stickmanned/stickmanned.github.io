import Link from "next/link";
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
  x: number;
  y: number;
  r: number;
  kind: "core" | "domain" | "leaf";
  href: string;
  icon?: IconType;
};

const nodes: GraphNode[] = [
  { id: "me", label: "William Wen", x: 50, y: 50, r: 34, kind: "core", href: "/" },
  { id: "hw", label: "Hardware", x: 24, y: 31, r: 25, kind: "domain", href: "/projects/", icon: LuCpu },
  { id: "web", label: "Web Apps", x: 76, y: 28, r: 25, kind: "domain", href: "/projects/", icon: LuBrainCircuit },
  { id: "games", label: "Games", x: 76, y: 72, r: 25, kind: "domain", href: "/projects/", icon: LuGamepad2 },
  { id: "cad", label: "3D / CAD", x: 25, y: 74, r: 25, kind: "domain", href: "/projects/", icon: LuPrinter },
  { id: "write", label: "Writing", x: 50, y: 15, r: 23, kind: "domain", href: "/writing/", icon: LuPenLine },
  { id: "club", label: "Hack Club", x: 50, y: 86, r: 22, kind: "domain", href: "/experience/", icon: LuUsers },
  { id: "books", label: "Books", x: 33, y: 8, r: 18, kind: "leaf", href: "/writing/", icon: LuBookOpen },
  { id: "stories", label: "Short Stories", x: 67, y: 8, r: 18, kind: "leaf", href: "/writing/", icon: LuScrollText },
  { id: "essays", label: "Essays", x: 50, y: 28, r: 18, kind: "leaf", href: "/writing/", icon: LuFileText },
  { id: "pine", label: "Pine A64", x: 8, y: 18, r: 17, kind: "leaf", href: "/projects/pine-a64-gaming-pc/", icon: LuBoxes },
  { id: "ncase", label: "NCASE M2", x: 8, y: 49, r: 17, kind: "leaf", href: "/projects/ncase-m2/", icon: LuMonitor },
  { id: "nerf", label: "AI Nerf", x: 31, y: 17, r: 17, kind: "leaf", href: "/projects/ai-nerf-aimbot/", icon: LuRocket },
  { id: "blossom", label: "Blossom", x: 92, y: 16, r: 17, kind: "leaf", href: "/projects/blossom/", icon: LuFlower2 },
  { id: "goose", label: "SpaceGoose", x: 92, y: 85, r: 17, kind: "leaf", href: "/projects/spacegoose/", icon: LuGamepad2 },
  { id: "lamp", label: "Lamp Pro", x: 9, y: 88, r: 17, kind: "leaf", href: "/projects/lamp-pro/", icon: LuLamp },
];

const edges = [
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

type NodeStyle = CSSProperties & Record<"--x" | "--y" | "--r", string>;

export function KnowledgeGraph() {
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  return (
    <div className="knowledge-graph" aria-label="Clickable knowledge graph">
      <svg className="knowledge-edges" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        {edges.map(([a, b]) => {
          const start = byId[a];
          const end = byId[b];
          return <line key={`${a}-${b}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} />;
        })}
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
                "--x": `${node.x}%`,
                "--y": `${node.y}%`,
                "--r": `${node.r}px`,
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
