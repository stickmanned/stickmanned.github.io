import type { IconType } from "react-icons";
import {
  SiPython,
  SiOpenjdk,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiReact,
  SiGodotengine,
  SiUnity,
  SiRoblox,
  SiScratch,
  SiAutodesk,
  SiGit,
} from "react-icons/si";
import {
  LuCpu,
  LuMonitor,
  LuCrosshair,
  LuFlower2,
  LuGamepad2,
  LuLamp,
  LuBox,
  LuPrinter,
} from "react-icons/lu";

// Brand/utility glyphs for the toolbox chips. Simple Icons brand marks where a
// real logo exists; Lucide line icons for tools with no brand mark (OpenSCAD,
// generic 3D printing). All render in currentColor so hover/focus stay in CSS.
const toolIcons: Record<string, IconType> = {
  Python: SiPython,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  "HTML / CSS": SiHtml5,
  React: SiReact,
  Godot: SiGodotengine,
  Unity: SiUnity,
  "Roblox / Luau": SiRoblox,
  Scratch: SiScratch,
  AutoCAD: SiAutodesk,
  OpenSCAD: LuBox,
  "3D Printing": LuPrinter,
  Git: SiGit,
};

// Lucide line icons for the featured project constellation nodes, keyed by slug.
const projectIcons: Record<string, IconType> = {
  "pine-a64-gaming-pc": LuCpu,
  "ncase-m2": LuMonitor,
  "ai-nerf-aimbot": LuCrosshair,
  blossom: LuFlower2,
  spacegoose: LuGamepad2,
  "lamp-pro": LuLamp,
};

export function ToolIcon({ name }: { name: string }) {
  const Icon = toolIcons[name] ?? LuBox;
  return <Icon aria-hidden="true" focusable="false" />;
}

export function ProjectIcon({ slug }: { slug: string }) {
  const Icon = projectIcons[slug] ?? LuBox;
  return <Icon aria-hidden="true" focusable="false" />;
}
