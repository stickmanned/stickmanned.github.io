"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/site-data";

// Category priority used for the preview panel's category label ("Featured"
// is a flag, not a category room).
const ROOM_ORDER = [
  { key: "Games", label: "Games" },
  { key: "Hardware", label: "Hardware" },
  { key: "Web Apps", label: "Web / Software" },
  { key: "Experiments", label: "Experiments" },
] as const;

const EYE_HEIGHT = 1.7;
const WALL_HEIGHT = 5;
const WALL_T = 0.3; // wall thickness
const CENTER_HALF = 7; // half-size of the square centre room
const DOOR_HALF = 1.7; // half-width of doorways
const DOOR_HEIGHT = 3.4;
const FRAME_SPACING = 2.7; // distance between frame centres along a wall
const SLOT_MARGIN = 1.7; // wall length reserved at segment ends — keeps frames off corners
const ART_W = 1.7;
const ART_H = 1.275;
const MOVE_SPEED = 3.4; // walking pace
const LOOK_SENSITIVITY = 0.0028;
const PITCH_LIMIT = 1.0; // ~57° up/down — enough to view art, no disorientation
const PLAYER_MARGIN = 0.55; // keep-out distance from walls
// One consistent light-green carpet across every room and theme.
const CARPET_COLOR = 0x9dc18b;
const WARM_LIGHT = 0xffd9a0;

type Side = "n" | "e" | "s" | "w";
type Dir = "N" | "E" | "S" | "W";
type Rect = { minX: number; maxX: number; minZ: number; maxZ: number };

function roomKeyFor(project: Project): string {
  for (const room of ROOM_ORDER) {
    if ((project.categories as string[]).includes(room.key)) return room.key;
  }
  return "Experiments";
}

function roomLabelFor(project: Project): string {
  const key = roomKeyFor(project);
  return ROOM_ORDER.find((room) => room.key === key)?.label ?? key;
}

// Tileable plank pattern for the floor, drawn in theme colours.
function makeWoodTexture(
  THREE: typeof import("three"),
  base: string,
  seam: string,
) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  const plankWidth = size / 4;
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
      ctx.fillRect(i * plankWidth, 0, plankWidth, size);
    }
    ctx.fillStyle = seam;
    ctx.fillRect(i * plankWidth, 0, 2, size);
    // Staggered end-of-plank seams.
    ctx.fillRect(i * plankWidth, (i * 96 + 40) % size, plankWidth, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Subtle plaster texture for walls and roof: faint horizontal striations
// plus light speckle, drawn in theme colours. Striations survive the UV
// stretching that box-mapped walls of different lengths produce.
function makePlasterTexture(THREE: typeof import("three"), base: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${0.012 + Math.random() * 0.02})`;
    ctx.fillRect(0, Math.random() * size, size, 1 + Math.random() * 2);
  }
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle =
      Math.random() < 0.5 ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.045)";
    ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Soft radial gradient used as a wall-wash "picture light" glow.
function makeGlowTexture(THREE: typeof import("three")) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 4,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.75)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function makeTextTexture(
  THREE: typeof import("three"),
  text: string,
  options: { width: number; height: number; font: string; color: string; background?: string },
) {
  const canvas = document.createElement("canvas");
  canvas.width = options.width;
  canvas.height = options.height;
  const ctx = canvas.getContext("2d")!;
  if (options.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.fillStyle = options.color;
  ctx.font = options.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Positions along one wall segment, centred, with end margins.
function segmentSlots(from: number, to: number): number[] {
  const usable = to - from - SLOT_MARGIN * 2;
  if (usable < 0) return [];
  const n = Math.floor(usable / FRAME_SPACING) + 1;
  const span = (n - 1) * FRAME_SPACING;
  const start = (from + to) / 2 - span / 2;
  return Array.from({ length: n }, (_, i) => start + i * FRAME_SPACING);
}

// Every room is symmetric around its doorway axis, so doors always sit at
// coordinate 0 of the wall they pierce.
function wallSegments(from: number, to: number, hasDoor: boolean): [number, number][] {
  return hasDoor
    ? [
        [from, -DOOR_HALF],
        [DOOR_HALF, to],
      ]
    : [[from, to]];
}

// Frame anchor points around a room's perimeter, ordered far wall → side
// walls → entrance wall so rooms fill from the back. With maxPerSegment 1
// each wall segment gets a single centred frame — used by the featured
// room so works spread evenly instead of clustering on one wall.
function slotsForRoom(
  rect: Rect,
  doors: Side[],
  sideOrder: Side[],
  maxPerSegment = Infinity,
): { x: number; z: number; rotY: number }[] {
  const out: { x: number; z: number; rotY: number }[] = [];
  const inset = WALL_T / 2 + 0.17;
  for (const side of sideOrder) {
    const alongX = side === "n" || side === "s";
    const [from, to] = alongX ? [rect.minX, rect.maxX] : [rect.minZ, rect.maxZ];
    for (const [a, b] of wallSegments(from, to, doors.includes(side))) {
      const ts =
        maxPerSegment === 1
          ? b - a >= SLOT_MARGIN * 2
            ? [(a + b) / 2]
            : []
          : segmentSlots(a, b);
      for (const t of ts) {
        if (side === "n") out.push({ x: t, z: rect.minZ + inset, rotY: 0 });
        else if (side === "s") out.push({ x: t, z: rect.maxZ - inset, rotY: Math.PI });
        else if (side === "w") out.push({ x: rect.minX + inset, z: t, rotY: Math.PI / 2 });
        else out.push({ x: rect.maxX - inset, z: t, rotY: -Math.PI / 2 });
      }
    }
  }
  return out;
}

// Smallest room (width × depth) whose perimeter holds `count` frames.
function roomSize(count: number): [number, number] {
  let w = 9;
  let d = 9;
  for (let i = 0; i < 30; i++) {
    const rect: Rect = { minX: -w / 2, maxX: w / 2, minZ: -d, maxZ: 0 };
    if (slotsForRoom(rect, ["s"], ["n", "w", "e", "s"]).length >= count) break;
    if (w <= d) w += FRAME_SPACING;
    else d += FRAME_SPACING;
  }
  return [w, d];
}

function rectFor(dir: Dir, w: number, d: number): Rect {
  switch (dir) {
    case "N":
      return { minX: -w / 2, maxX: w / 2, minZ: -CENTER_HALF - d, maxZ: -CENTER_HALF };
    case "S":
      return { minX: -w / 2, maxX: w / 2, minZ: CENTER_HALF, maxZ: CENTER_HALF + d };
    case "E":
      return { minX: CENTER_HALF, maxX: CENTER_HALF + d, minZ: -w / 2, maxZ: w / 2 };
    case "W":
      return { minX: -CENTER_HALF - d, maxX: -CENTER_HALF, minZ: -w / 2, maxZ: w / 2 };
  }
}

// The side of a spoke room that opens onto the centre room.
const ENTRANCE: Record<Dir, Side> = { N: "s", S: "n", E: "w", W: "e" };
const OPPOSITE: Record<Side, Side> = { n: "s", s: "n", e: "w", w: "e" };

// Hip-roof shape shared by the roof builder and the chandelier mounts.
function roofParams(rect: Rect) {
  const w = rect.maxX - rect.minX;
  const d = rect.maxZ - rect.minZ;
  const inset = Math.max(1.5, Math.min(w, d) * 0.3);
  const peak = WALL_HEIGHT + Math.min(4.2, Math.min(w, d) * 0.45);
  return { inset, peak };
}

// Height of the sloped roof above a point inside the room.
function roofHeightAt(rect: Rect, x: number, z: number) {
  const { inset, peak } = roofParams(rect);
  const edge = Math.min(x - rect.minX, rect.maxX - x, z - rect.minZ, rect.maxZ - z);
  const t = Math.max(0, Math.min(1, edge / inset));
  return WALL_HEIGHT + (peak - WALL_HEIGHT) * t;
}

/**
 * Full-screen 3D art-gallery view of the projects, laid out hub-and-spoke:
 * a central Featured room with four doorways — Hardware (N), Web (E),
 * Games (S) and an empty Coming Soon room (W). Built with plain three.js
 * (already a dependency) and only ever loaded on demand via next/dynamic.
 */
export function ProjectGallery({
  projects,
  onExit,
}: {
  projects: Project[];
  onExit: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [active, setActive] = useState<Project | null>(null);
  const [roomLabel, setRoomLabel] = useState<string>("");
  // Mirror of `active` for event handlers that live outside React's render.
  const activeRef = useRef<Project | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const exitButtonRef = useRef<HTMLButtonElement>(null);
  // Rendered with ssr:false, so window is available on first render.
  const [isTouch] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches,
  );
  // -1 back / 0 idle / 1 forward, driven by the on-screen touch buttons.
  const touchMoveRef = useRef(0);

  // Keep the ref in sync and manage focus: into the panel when it opens,
  // back to a visible control when it closes (otherwise focus falls onto
  // the page hidden behind the overlay).
  useEffect(() => {
    const hadActive = activeRef.current !== null;
    activeRef.current = active;
    if (active) {
      panelRef.current?.focus();
    } else if (hadActive) {
      exitButtonRef.current?.focus();
    }
  }, [active]);

  // Lock page scroll while the overlay is open. Escape closes the preview
  // panel first if one is open, otherwise exits the gallery.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (activeRef.current) {
        setActive(null);
      } else {
        onExit();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onExit]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function init() {
      try {
        const THREE = await import("three");
        if (disposed || !mount) return;

        const styles = getComputedStyle(document.documentElement);
        const cssColor = (name: string, fallback: string) =>
          styles.getPropertyValue(name).trim() || fallback;
        const accent = cssColor("--accent", "#c9ff3b");
        const bg = cssColor("--bg", "#08090b");
        const panel = cssColor("--panel-2", "#12151a");
        const textColor = cssColor("--text-strong", "#f7f9fc");

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(bg);
        scene.fog = new THREE.Fog(bg, 24, 60);

        const camera = new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          0.1,
          120,
        );
        camera.rotation.order = "YXZ";
        // Spawn in the centre (Featured) room facing the Hardware door,
        // offset from the door axis so the centre bench never pins a
        // straight-ahead walk (off-axis contact slides around it).
        camera.position.set(1.1, EYE_HEIGHT, 3.6);

        const disposables: { dispose: () => void }[] = [];
        const track = <T extends { dispose: () => void }>(resource: T): T => {
          disposables.push(resource);
          return resource;
        };

        // ---- Room plan -------------------------------------------------
        // Featured metadata exists on the data model (a "Featured" category
        // flag), so the centre room uses it directly. Category rooms show
        // every project of that category — a featured project may hang in
        // both, which the shared data supports cleanly.
        const featured = projects.filter((p) =>
          (p.categories as string[]).includes("Featured"),
        );
        const byCategory = (key: string) =>
          projects.filter((p) => (p.categories as string[]).includes(key));

        const centerRect: Rect = {
          minX: -CENTER_HALF,
          maxX: CENTER_HALF,
          minZ: -CENTER_HALF,
          maxZ: CENTER_HALF,
        };
        const spokes = (
          [
            { dir: "N" as Dir, label: "Hardware", sign: "HARDWARE", items: byCategory("Hardware") },
            { dir: "E" as Dir, label: "Web / Software", sign: "WEB / SOFTWARE", items: byCategory("Web Apps") },
            { dir: "S" as Dir, label: "Games", sign: "GAMES", items: byCategory("Games") },
            { dir: "W" as Dir, label: "Coming Soon", sign: "COMING SOON", items: [] as Project[] },
          ]
        ).map((spoke) => {
          const [w, d] = roomSize(Math.max(spoke.items.length, 1));
          return { ...spoke, rect: rectFor(spoke.dir, w, d) };
        });
        const allRects = [centerRect, ...spokes.map((s) => s.rect)];

        // ---- Materials -------------------------------------------------
        // Theme surfaces nudged toward the text colour so walls read as
        // museum walls in every theme, with a subtle plaster texture so
        // the floor isn't the only textured surface.
        const wallBase = new THREE.Color(panel).lerp(new THREE.Color(textColor), 0.18);
        const wallTexture = track(
          makePlasterTexture(THREE, `#${wallBase.getHexString()}`),
        );
        const wallMaterial = track(
          new THREE.MeshLambertMaterial({ map: wallTexture }),
        );
        const roofBase = new THREE.Color(panel).lerp(new THREE.Color(textColor), 0.08);
        const roofTexture = track(
          makePlasterTexture(THREE, `#${roofBase.getHexString()}`),
        );
        const roofMaterial = track(
          new THREE.MeshLambertMaterial({
            map: roofTexture,
            side: THREE.DoubleSide,
          }),
        );
        const moldingMaterial = track(
          new THREE.MeshLambertMaterial({
            color: new THREE.Color(panel).lerp(new THREE.Color(textColor), 0.32),
          }),
        );
        const carpetMaterial = track(
          new THREE.MeshLambertMaterial({ color: CARPET_COLOR }),
        );

        // ---- Floor -----------------------------------------------------
        const bounds = allRects.reduce(
          (acc, r) => ({
            minX: Math.min(acc.minX, r.minX),
            maxX: Math.max(acc.maxX, r.maxX),
            minZ: Math.min(acc.minZ, r.minZ),
            maxZ: Math.max(acc.maxZ, r.maxZ),
          }),
          { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity },
        );
        const floorW = bounds.maxX - bounds.minX + WALL_T;
        const floorD = bounds.maxZ - bounds.minZ + WALL_T;
        const floorBase = new THREE.Color(bg).lerp(new THREE.Color(textColor), 0.1);
        const floorSeam = new THREE.Color(bg).lerp(new THREE.Color(textColor), 0.03);
        const floorTexture = track(
          makeWoodTexture(
            THREE,
            `#${floorBase.getHexString()}`,
            `#${floorSeam.getHexString()}`,
          ),
        );
        floorTexture.repeat.set(Math.ceil(floorW / 3), Math.ceil(floorD / 3));
        const floor = new THREE.Mesh(
          track(new THREE.PlaneGeometry(floorW, floorD)),
          track(new THREE.MeshLambertMaterial({ map: floorTexture })),
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(
          (bounds.minX + bounds.maxX) / 2,
          0,
          (bounds.minZ + bounds.maxZ) / 2,
        );
        scene.add(floor);

        // ---- Walls -----------------------------------------------------
        // Solid wall run with an integrated baseboard. Walls running along
        // Z are a hair shorter than walls running along X: boxes overlap at
        // room corners, and identical heights leave coplanar top faces that
        // z-fight (the flicker seen at main-room junctions).
        function addWall(cx: number, cz: number, length: number, alongX: boolean) {
          if (length <= 0.01) return;
          const height = alongX ? WALL_HEIGHT : WALL_HEIGHT - 0.015;
          const wall = new THREE.Mesh(
            track(
              new THREE.BoxGeometry(
                alongX ? length : WALL_T,
                height,
                alongX ? WALL_T : length,
              ),
            ),
            wallMaterial,
          );
          wall.position.set(cx, height / 2, cz);
          scene.add(wall);
          // Baseboard runs a hair short of the wall so its end faces never
          // share a plane with the wall's end faces (coplanar same-facing
          // ends z-fight at exposed door jambs).
          const baseHeight = alongX ? 0.18 : 0.165;
          const baseLength = Math.max(0.1, length - 0.05);
          const base = new THREE.Mesh(
            track(
              new THREE.BoxGeometry(
                alongX ? baseLength : WALL_T + 0.08,
                baseHeight,
                alongX ? WALL_T + 0.08 : baseLength,
              ),
            ),
            moldingMaterial,
          );
          base.position.set(cx, baseHeight / 2, cz);
          scene.add(base);
        }

        // Boundary wall between the centre room and a spoke: two segments
        // flanking a centred doorway plus a lintel above it.
        function addDoorwayWall(dir: Dir, span: number) {
          const alongX = dir === "N" || dir === "S";
          const plane = dir === "N" ? -CENTER_HALF : dir === "S" ? CENTER_HALF
            : dir === "W" ? -CENTER_HALF : CENTER_HALF;
          for (const [a, b] of [[-span, -DOOR_HALF], [DOOR_HALF, span]] as const) {
            const mid = (a + b) / 2;
            const len = b - a;
            if (alongX) addWall(mid, plane, len, true);
            else addWall(plane, mid, len, false);
          }
          const lintel = new THREE.Mesh(
            track(
              new THREE.BoxGeometry(
                alongX ? DOOR_HALF * 2 : WALL_T,
                WALL_HEIGHT - DOOR_HEIGHT,
                alongX ? WALL_T : DOOR_HALF * 2,
              ),
            ),
            wallMaterial,
          );
          lintel.position.set(
            alongX ? 0 : plane,
            DOOR_HEIGHT + (WALL_HEIGHT - DOOR_HEIGHT) / 2,
            alongX ? plane : 0,
          );
          scene.add(lintel);
        }

        // The three outer walls of a spoke room (the fourth is the shared
        // doorway wall).
        function addSpokeWalls(rect: Rect, entrance: Side) {
          const cx = (rect.minX + rect.maxX) / 2;
          const cz = (rect.minZ + rect.maxZ) / 2;
          const w = rect.maxX - rect.minX;
          const d = rect.maxZ - rect.minZ;
          if (entrance !== "n") addWall(cx, rect.minZ, w, true);
          if (entrance !== "s") addWall(cx, rect.maxZ, w, true);
          if (entrance !== "w") addWall(rect.minX, cz, d, false);
          if (entrance !== "e") addWall(rect.maxX, cz, d, false);
        }

        // ---- Slanted roof ------------------------------------------------
        // Four steep trapezoid panels rise from the wall tops to a smaller
        // flat cap, echoing a classic gallery clerestory. The cap is solid
        // roof material — no glowing skylight; light comes from fixtures.
        function addRoof(rect: Rect) {
          const { inset, peak } = roofParams(rect);
          const inner: Rect = {
            minX: rect.minX + inset,
            maxX: rect.maxX - inset,
            minZ: rect.minZ + inset,
            maxZ: rect.maxZ - inset,
          };
          const lo = WALL_HEIGHT;
          // prettier-ignore
          const quads = [
            // north slope
            [rect.minX, lo, rect.minZ, rect.maxX, lo, rect.minZ, inner.maxX, peak, inner.minZ, inner.minX, peak, inner.minZ],
            // south slope
            [rect.minX, lo, rect.maxZ, rect.maxX, lo, rect.maxZ, inner.maxX, peak, inner.maxZ, inner.minX, peak, inner.maxZ],
            // west slope
            [rect.minX, lo, rect.minZ, rect.minX, lo, rect.maxZ, inner.minX, peak, inner.maxZ, inner.minX, peak, inner.minZ],
            // east slope
            [rect.maxX, lo, rect.minZ, rect.maxX, lo, rect.maxZ, inner.maxX, peak, inner.maxZ, inner.maxX, peak, inner.minZ],
          ];
          const positions: number[] = [];
          for (const q of quads) {
            const [ax, ay, az, bx, by, bz, cx2, cy, cz2, dx, dy, dz] = q;
            positions.push(ax, ay, az, bx, by, bz, cx2, cy, cz2);
            positions.push(ax, ay, az, cx2, cy, cz2, dx, dy, dz);
          }
          const geometry = track(new THREE.BufferGeometry());
          geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3),
          );
          // Planar UVs from world x/z so the plaster texture tiles across
          // the sloped panels.
          const uvs: number[] = [];
          for (let i = 0; i < positions.length; i += 3) {
            uvs.push(positions[i] * 0.25, positions[i + 2] * 0.25);
          }
          geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
          geometry.computeVertexNormals();
          scene.add(new THREE.Mesh(geometry, roofMaterial));

          // Solid flat cap closing the roof.
          const cap = new THREE.Mesh(
            track(
              new THREE.PlaneGeometry(inner.maxX - inner.minX, inner.maxZ - inner.minZ),
            ),
            roofMaterial,
          );
          cap.rotation.x = Math.PI / 2;
          cap.position.set(
            (inner.minX + inner.maxX) / 2,
            peak,
            (inner.minZ + inner.maxZ) / 2,
          );
          scene.add(cap);
        }

        // ---- Signs -----------------------------------------------------
        function addSign(
          text: string,
          x: number,
          y: number,
          z: number,
          rotY: number,
          width = 4.4,
        ) {
          const texture = track(
            makeTextTexture(THREE, text.toUpperCase(), {
              width: 1024,
              height: 192,
              font: "700 96px 'Space Grotesk', sans-serif",
              color: accent,
            }),
          );
          const sign = new THREE.Mesh(
            track(new THREE.PlaneGeometry(width, width * 0.1875)),
            track(new THREE.MeshBasicMaterial({ map: texture, transparent: true })),
          );
          sign.position.set(x, y, z);
          sign.rotation.y = rotY;
          scene.add(sign);
        }

        // ---- Decor -----------------------------------------------------
        // Circular keep-out zones around benches and planters.
        const colliders: { x: number; z: number; r: number }[] = [];

        const benchSeatMaterial = track(new THREE.MeshLambertMaterial({ color: 0x51402f }));
        const benchLegMaterial = track(new THREE.MeshLambertMaterial({ color: 0x241d15 }));
        const benchSeatGeometry = track(new THREE.BoxGeometry(1.7, 0.09, 0.55));
        const benchLegGeometry = track(new THREE.BoxGeometry(0.08, 0.42, 0.5));
        const potMaterial = track(new THREE.MeshLambertMaterial({ color: 0x2b2b30 }));
        const potGeometry = track(new THREE.CylinderGeometry(0.22, 0.17, 0.42, 10));
        const foliageMaterialA = track(new THREE.MeshLambertMaterial({ color: 0x3f7a4a }));
        const foliageMaterialB = track(new THREE.MeshLambertMaterial({ color: 0x356c40 }));
        const foliageGeometry = track(new THREE.IcosahedronGeometry(1, 0));

        function addBench(x: number, z: number, rotY = 0) {
          const bench = new THREE.Group();
          const seat = new THREE.Mesh(benchSeatGeometry, benchSeatMaterial);
          seat.position.y = 0.46;
          bench.add(seat);
          for (const legX of [-0.68, 0.68]) {
            const leg = new THREE.Mesh(benchLegGeometry, benchLegMaterial);
            leg.position.set(legX, 0.21, 0);
            bench.add(leg);
          }
          bench.position.set(x, 0, z);
          bench.rotation.y = rotY;
          scene.add(bench);
          colliders.push({ x, z, r: 0.95 });
        }

        function addPlant(x: number, z: number) {
          const plant = new THREE.Group();
          const pot = new THREE.Mesh(potGeometry, potMaterial);
          pot.position.y = 0.21;
          plant.add(pot);
          const tufts: [number, number, number, number][] = [
            [0, 0.72, 0, 0.3],
            [0.13, 0.92, 0.08, 0.24],
            [-0.12, 1.0, -0.07, 0.19],
          ];
          tufts.forEach(([ox, oy, oz, scale], i) => {
            const tuft = new THREE.Mesh(
              foliageGeometry,
              i % 2 === 0 ? foliageMaterialA : foliageMaterialB,
            );
            tuft.position.set(ox, oy, oz);
            tuft.scale.setScalar(scale);
            plant.add(tuft);
          });
          plant.position.set(x, 0, z);
          scene.add(plant);
          colliders.push({ x, z, r: 0.55 });
        }

        // Chandelier: ring + warm bulbs hung on a rod that runs all the way
        // up to the sloped roof, finished with a canopy so the fixture is
        // visibly mounted rather than floating. These are the room lights.
        const chandRingGeometry = track(new THREE.TorusGeometry(0.55, 0.045, 8, 20));
        const chandMetalMaterial = track(new THREE.MeshLambertMaterial({ color: 0x2a2622 }));
        const bulbGeometry = track(new THREE.SphereGeometry(0.09, 8, 6));
        const bulbMaterial = track(new THREE.MeshBasicMaterial({ color: 0xffe9c4 }));
        const canopyGeometry = track(new THREE.CylinderGeometry(0.1, 0.16, 0.12, 10));

        function addChandelier(x: number, z: number, ceilY: number) {
          const group = new THREE.Group();
          const ringY = 3.35;
          const rodLength = Math.max(0.5, ceilY - ringY + 0.06);
          const rod = new THREE.Mesh(
            track(new THREE.CylinderGeometry(0.022, 0.022, rodLength, 6)),
            chandMetalMaterial,
          );
          rod.position.y = ringY + rodLength / 2 - 0.03;
          group.add(rod);
          const canopy = new THREE.Mesh(canopyGeometry, chandMetalMaterial);
          canopy.position.y = ceilY;
          group.add(canopy);
          const ring = new THREE.Mesh(chandRingGeometry, chandMetalMaterial);
          ring.rotation.x = Math.PI / 2;
          ring.position.y = ringY;
          group.add(ring);
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
            bulb.position.set(Math.cos(angle) * 0.55, ringY + 0.07, Math.sin(angle) * 0.55);
            group.add(bulb);
          }
          group.position.set(x, 0, z);
          scene.add(group);
          const light = new THREE.PointLight(WARM_LIGHT, 14, 26, 1.8);
          light.position.set(x, 3.1, z);
          scene.add(light);
        }

        // Rug, bench, corner planters and chandelier(s) for one room.
        function decorateRoom(rect: Rect) {
          const cx = (rect.minX + rect.maxX) / 2;
          const cz = (rect.minZ + rect.maxZ) / 2;
          const w = rect.maxX - rect.minX;
          const d = rect.maxZ - rect.minZ;

          const rug = new THREE.Mesh(
            track(
              new THREE.PlaneGeometry(
                Math.min(w - 3.5, 7.5),
                Math.min(d - 3.5, 7.5),
              ),
            ),
            carpetMaterial,
          );
          rug.rotation.x = -Math.PI / 2;
          rug.position.set(cx, 0.02, cz);
          scene.add(rug);

          addBench(cx, cz, w >= d ? 0 : Math.PI / 2);
          addPlant(rect.minX + 1.1, rect.minZ + 1.1);
          addPlant(rect.maxX - 1.1, rect.maxZ - 1.1);

          // Large rooms get two chandeliers along their long axis; each rod
          // is mounted to the roof at its own position's roof height.
          const mount = (px: number, pz: number) =>
            addChandelier(px, pz, roofHeightAt(rect, px, pz) + 0.04);
          if (Math.max(w, d) > 15) {
            if (w >= d) {
              mount(cx - w / 4, cz);
              mount(cx + w / 4, cz);
            } else {
              mount(cx, cz - d / 4);
              mount(cx, cz + d / 4);
            }
          } else {
            mount(cx, cz);
          }
        }

        // ---- Frames ----------------------------------------------------
        const textureLoader = new THREE.TextureLoader();
        const artMeshes: import("three").Mesh[] = [];
        const frameBorders = new Map<number, import("three").MeshLambertMaterial>();
        const frameGroups = new Map<number, import("three").Group>();
        const borderBaseColor = new THREE.Color(panel).lerp(
          new THREE.Color(textColor),
          0.25,
        );
        // Shared wall-wash glow + picture-lamp resources for every frame.
        const glowTexture = track(makeGlowTexture(THREE));
        const glowMaterial = track(
          new THREE.MeshBasicMaterial({
            map: glowTexture,
            color: 0xffe6c0,
            transparent: true,
            opacity: 0.34,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        const glowGeometry = track(new THREE.PlaneGeometry(ART_W + 1.5, ART_H + 1.7));
        const lampGeometry = track(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 8));
        const lampMaterial = track(new THREE.MeshLambertMaterial({ color: 0x1a1c20 }));

        const projectList: Project[] = [];

        function addFrame(
          project: Project,
          position: { x: number; z: number; rotY: number },
        ) {
          const index = projectList.length;
          projectList.push(project);
          const group = new THREE.Group();
          group.position.set(position.x, 2, position.z);
          group.rotation.y = position.rotY;

          const borderMaterial = track(
            new THREE.MeshLambertMaterial({ color: borderBaseColor.clone() }),
          );
          const border = new THREE.Mesh(
            track(new THREE.BoxGeometry(ART_W + 0.18, ART_H + 0.18, 0.08)),
            borderMaterial,
          );
          border.userData.projectIndex = index;
          group.add(border);

          const artMaterial = track(
            new THREE.MeshBasicMaterial({ color: new THREE.Color(panel) }),
          );
          const art = new THREE.Mesh(
            track(new THREE.PlaneGeometry(ART_W, ART_H)),
            artMaterial,
          );
          art.position.z = 0.05;
          art.userData.projectIndex = index;
          group.add(art);

          textureLoader.load(project.image, (texture) => {
            if (disposed) {
              texture.dispose();
              return;
            }
            track(texture);
            texture.colorSpace = THREE.SRGBColorSpace;
            // Crop-to-cover so artwork keeps its aspect ratio in the frame.
            const image = texture.image as HTMLImageElement;
            const imageAspect = image.width / image.height;
            const frameAspect = ART_W / ART_H;
            if (imageAspect > frameAspect) {
              texture.repeat.x = frameAspect / imageAspect;
              texture.offset.x = (1 - texture.repeat.x) / 2;
            } else {
              texture.repeat.y = imageAspect / frameAspect;
              texture.offset.y = (1 - texture.repeat.y) / 2;
            }
            artMaterial.map = texture;
            artMaterial.color.set("#ffffff");
            artMaterial.needsUpdate = true;
          });
          // On texture failure the frame simply keeps its panel colour and
          // the plaque still identifies the project.

          const plaqueTitle =
            project.title.length > 34
              ? `${project.title.slice(0, 33)}…`
              : project.title;
          const plaqueTexture = track(
            makeTextTexture(THREE, `${project.emoji ?? "🖼️"} ${plaqueTitle} — ${project.year}`, {
              width: 1024,
              height: 128,
              font: "500 52px 'Space Grotesk', sans-serif",
              color: textColor,
              background: bg,
            }),
          );
          const plaque = new THREE.Mesh(
            track(new THREE.PlaneGeometry(1.5, 0.1875)),
            track(new THREE.MeshBasicMaterial({ map: plaqueTexture })),
          );
          plaque.position.set(0, -(ART_H / 2 + 0.24), 0.05);
          group.add(plaque);

          // Wall-wash glow behind the frame plus a small picture lamp above
          // it — a faked spotlight, far cheaper than real per-frame lights.
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          glow.position.set(0, 0.35, -0.145);
          group.add(glow);
          const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
          lamp.rotation.z = Math.PI / 2;
          lamp.position.set(0, ART_H / 2 + 0.3, 0.1);
          group.add(lamp);

          scene.add(group);
          artMeshes.push(art, border);
          frameBorders.set(index, borderMaterial);
          frameGroups.set(index, group);
        }

        // ---- Build the museum -------------------------------------------
        // Centre room: four doorway walls, roof, decor, featured frames.
        for (const spoke of spokes) {
          const spokeHalf =
            spoke.dir === "N" || spoke.dir === "S"
              ? (spoke.rect.maxX - spoke.rect.minX) / 2
              : (spoke.rect.maxZ - spoke.rect.minZ) / 2;
          addDoorwayWall(spoke.dir, Math.max(CENTER_HALF, spokeHalf));
          addSpokeWalls(spoke.rect, ENTRANCE[spoke.dir]);
          addRoof(spoke.rect);
          decorateRoom(spoke.rect);
        }
        addRoof(centerRect);
        decorateRoom(centerRect);

        // Doorway signs face the centre room so visitors can read where
        // each door leads.
        const signInset = CENTER_HALF - 0.35;
        for (const spoke of spokes) {
          if (spoke.dir === "N") addSign(spoke.sign, 0, 4.15, -signInset, 0);
          if (spoke.dir === "S") addSign(spoke.sign, 0, 4.15, signInset, Math.PI);
          if (spoke.dir === "E") addSign(spoke.sign, signInset, 4.15, 0, -Math.PI / 2);
          if (spoke.dir === "W") addSign(spoke.sign, -signInset, 4.15, 0, Math.PI / 2);
        }
        // Big centred sign inside the empty west room.
        const west = spokes.find((s) => s.dir === "W")!;
        addSign(
          "Coming Soon",
          west.rect.minX + 0.4,
          2.6,
          (west.rect.minZ + west.rect.maxZ) / 2,
          Math.PI / 2,
          5.2,
        );

        // Hang the artwork.
        // One frame per wall segment: featured works spread evenly across
        // all four walls of the main room instead of packing one wall.
        const centerSlots = slotsForRoom(
          centerRect,
          ["n", "e", "s", "w"],
          ["n", "e", "s", "w"],
          1,
        );
        featured.forEach((project, i) => {
          if (centerSlots[i]) addFrame(project, centerSlots[i]);
        });
        for (const spoke of spokes) {
          if (spoke.items.length === 0) continue;
          const entrance = ENTRANCE[spoke.dir];
          const order: Side[] = [
            OPPOSITE[entrance],
            ...(["n", "e", "s", "w"] as Side[]).filter(
              (s) => s !== entrance && s !== OPPOSITE[entrance],
            ),
            entrance,
          ];
          const slots = slotsForRoom(spoke.rect, [entrance], order);
          spoke.items.forEach((project, i) => {
            if (slots[i]) addFrame(project, slots[i]);
          });
        }

        // ---- Lights ------------------------------------------------------
        // Low, cinematic base light — the warm chandeliers and the frames'
        // own wash lights carry the mood; artwork is unlit material so it
        // stays fully readable.
        scene.add(new THREE.AmbientLight(0xffffff, 0.55));
        const hemisphere = new THREE.HemisphereLight(
          new THREE.Color(textColor),
          new THREE.Color(bg),
          0.35,
        );
        scene.add(hemisphere);
        const keyLight = new THREE.DirectionalLight(0xffffff, 0.4);
        keyLight.position.set(2, 8, 3);
        scene.add(keyLight);

        // ---- Walkable area -----------------------------------------------
        // Movement is valid inside any room rect (shrunk by the player
        // margin) or inside a doorway rect bridging two rooms.
        const walkRects: Rect[] = allRects.map((r) => ({
          minX: r.minX + PLAYER_MARGIN,
          maxX: r.maxX - PLAYER_MARGIN,
          minZ: r.minZ + PLAYER_MARGIN,
          maxZ: r.maxZ - PLAYER_MARGIN,
        }));
        const doorSpanIn = DOOR_HALF - 0.3;
        const doorSpanOut = PLAYER_MARGIN + 0.25;
        for (const spoke of spokes) {
          const alongX = spoke.dir === "N" || spoke.dir === "S";
          const plane =
            spoke.dir === "N" ? -CENTER_HALF : spoke.dir === "S" ? CENTER_HALF
            : spoke.dir === "W" ? -CENTER_HALF : CENTER_HALF;
          walkRects.push(
            alongX
              ? { minX: -doorSpanIn, maxX: doorSpanIn, minZ: plane - doorSpanOut, maxZ: plane + doorSpanOut }
              : { minX: plane - doorSpanOut, maxX: plane + doorSpanOut, minZ: -doorSpanIn, maxZ: doorSpanIn },
          );
        }
        function isWalkable(x: number, z: number) {
          return walkRects.some(
            (r) => x >= r.minX && x <= r.maxX && z >= r.minZ && z <= r.maxZ,
          );
        }

        const roomAreas = [
          { label: "Featured", rect: centerRect },
          ...spokes.map((s) => ({ label: s.label, rect: s.rect })),
        ];

        // ---- Controls -------------------------------------------------
        const keysDown = new Set<string>();
        const velocity = new THREE.Vector3();
        let looking = false;
        let lastPointerX = 0;
        let lastPointerY = 0;
        // The camera's default forward is -Z, toward the Hardware room.
        let yaw = 0;
        let pitch = 0;

        const raycaster = new THREE.Raycaster();
        const pointerNdc = new THREE.Vector2();
        let hoveredIndex: number | null = null;

        function setHovered(index: number | null) {
          if (index === hoveredIndex) return;
          if (hoveredIndex !== null) {
            frameBorders.get(hoveredIndex)?.color.copy(borderBaseColor);
            frameGroups.get(hoveredIndex)?.scale.setScalar(1);
          }
          hoveredIndex = index;
          // Hover is only an affordance: accent border + pointer cursor.
          // The preview panel itself opens on click.
          if (index !== null) {
            frameBorders.get(index)?.color.set(accent);
            frameGroups.get(index)?.scale.setScalar(1.03);
          }
          renderer.domElement.style.cursor = index !== null ? "pointer" : "";
        }

        function raycastAt(clientX: number, clientY: number): number | null {
          pointerNdc.set(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1,
          );
          raycaster.setFromCamera(pointerNdc, camera);
          const hits = raycaster.intersectObjects(artMeshes, false);
          const hit = hits.find((h) => h.distance < 14);
          return hit ? (hit.object.userData.projectIndex as number) : null;
        }

        function onKeyDown(event: KeyboardEvent) {
          if (
            ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
              event.code,
            )
          ) {
            event.preventDefault();
          }
          keysDown.add(event.code);
        }
        function onKeyUp(event: KeyboardEvent) {
          keysDown.delete(event.code);
        }

        function onPointerDown(event: PointerEvent) {
          // Right button pans on desktop; any touch drag pans on mobile.
          if (event.button === 2 || event.pointerType === "touch") {
            looking = true;
            lastPointerX = event.clientX;
            lastPointerY = event.clientY;
            try {
              renderer.domElement.setPointerCapture(event.pointerId);
            } catch {
              // Pointer capture is a nicety; dragging still works without it.
            }
          }
        }
        function onPointerMove(event: PointerEvent) {
          if (looking) {
            const dx = event.clientX - lastPointerX;
            const dy = event.clientY - lastPointerY;
            lastPointerX = event.clientX;
            lastPointerY = event.clientY;
            yaw -= dx * LOOK_SENSITIVITY;
            pitch -= dy * LOOK_SENSITIVITY;
            pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch));
          } else if (event.pointerType !== "touch") {
            setHovered(raycastAt(event.clientX, event.clientY));
          }
        }
        function onPointerUp(event: PointerEvent) {
          if (looking) {
            looking = false;
            if (renderer.domElement.hasPointerCapture(event.pointerId)) {
              renderer.domElement.releasePointerCapture(event.pointerId);
            }
          }
        }
        function onClick(event: MouseEvent) {
          // Click/tap a frame to open its preview; empty space closes it.
          const index = raycastAt(event.clientX, event.clientY);
          setActive(index !== null ? projectList[index] : null);
        }
        function onContextMenu(event: MouseEvent) {
          event.preventDefault();
        }
        function onResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }

        renderer.domElement.style.touchAction = "none";
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("resize", onResize);
        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        renderer.domElement.addEventListener("click", onClick);
        renderer.domElement.addEventListener("contextmenu", onContextMenu);

        // ---- Movement + render loop -----------------------------------
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        const wishDirection = new THREE.Vector3();
        const reducedMotion = { matches: false };
        let bobPhase = 0;
        let currentRoom = "";
        let rafId = 0;
        let lastTime = performance.now();

        function applyMovement(dt: number) {
          const keyForward =
            (keysDown.has("KeyW") || keysDown.has("ArrowUp") ? 1 : 0) -
            (keysDown.has("KeyS") || keysDown.has("ArrowDown") ? 1 : 0) +
            touchMoveRef.current;
          const keyStrafe =
            (keysDown.has("KeyD") || keysDown.has("ArrowRight") ? 1 : 0) -
            (keysDown.has("KeyA") || keysDown.has("ArrowLeft") ? 1 : 0);

          // Grounded walking: heading comes from yaw only, never pitch, so
          // looking up at a frame doesn't lift the visitor off the floor.
          forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
          right.set(Math.cos(yaw), 0, -Math.sin(yaw));
          wishDirection
            .set(0, 0, 0)
            .addScaledVector(forward, keyForward)
            .addScaledVector(right, keyStrafe);
          if (wishDirection.lengthSq() > 1) wishDirection.normalize();

          // Exponential smoothing gives walking a soft start/stop.
          const smoothing = 1 - Math.pow(0.0001, dt);
          velocity.lerp(wishDirection.multiplyScalar(MOVE_SPEED), smoothing);

          const prevX = camera.position.x;
          const prevZ = camera.position.z;
          let nextX = prevX + velocity.x * dt;
          let nextZ = prevZ + velocity.z * dt;

          // Wall collision: the position must stay inside the walkable
          // rects; blocked axes slide along the wall instead of sticking.
          if (!isWalkable(nextX, nextZ)) {
            if (isWalkable(nextX, prevZ)) {
              nextZ = prevZ;
              velocity.z = 0;
            } else if (isWalkable(prevX, nextZ)) {
              nextX = prevX;
              velocity.x = 0;
            } else {
              nextX = prevX;
              nextZ = prevZ;
            }
          }

          // Keep the visitor out of benches and planters by pushing them
          // back to the edge of the keep-out circle.
          for (const collider of colliders) {
            const dx = nextX - collider.x;
            const dz = nextZ - collider.z;
            const distSq = dx * dx + dz * dz;
            if (distSq < collider.r * collider.r) {
              const dist = Math.sqrt(distSq) || 0.001;
              const pushedX = collider.x + (dx / dist) * collider.r;
              const pushedZ = collider.z + (dz / dist) * collider.r;
              if (isWalkable(pushedX, pushedZ)) {
                nextX = pushedX;
                nextZ = pushedZ;
              } else {
                nextX = prevX;
                nextZ = prevZ;
              }
            }
          }

          // Subtle head bob while walking (skipped under reduced motion).
          const speed = Math.hypot(velocity.x, velocity.z);
          let bob = 0;
          if (!reducedMotion.matches && speed > 0.2) {
            bobPhase += dt * (4 + speed * 1.6);
            bob = Math.sin(bobPhase) * 0.028 * Math.min(speed / MOVE_SPEED, 1);
          }

          camera.position.set(nextX, EYE_HEIGHT + bob, nextZ);
          camera.rotation.set(pitch, yaw, 0);

          const room = roomAreas.find(
            (r) =>
              nextX >= r.rect.minX && nextX <= r.rect.maxX &&
              nextZ >= r.rect.minZ && nextZ <= r.rect.maxZ,
          );
          if (room && room.label !== currentRoom) {
            currentRoom = room.label;
            setRoomLabel(room.label);
          }
        }

        function tick(now: number) {
          rafId = requestAnimationFrame(tick);
          const dt = Math.min((now - lastTime) / 1000, 0.1);
          lastTime = now;
          if (document.hidden) return;
          applyMovement(dt);
          renderer.render(scene, camera);
        }
        rafId = requestAnimationFrame(tick);
        setStatus("ready");

        cleanup = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("keyup", onKeyUp);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          renderer.domElement.removeEventListener("pointerdown", onPointerDown);
          renderer.domElement.removeEventListener("click", onClick);
          renderer.domElement.removeEventListener("contextmenu", onContextMenu);
          for (const resource of disposables) resource.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!disposed) setStatus("error");
      }
    }

    init();

    return () => {
      disposed = true;
      cleanup?.();
    };
    // The project list and router are stable for the lifetime of the overlay.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeHasPage = active ? active.href !== "#" : false;

  function openProject(project: Project) {
    if (project.href.startsWith("/")) {
      router.push(project.href);
    } else {
      window.open(project.href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label="3D project gallery">
      <div ref={mountRef} className="gallery-canvas" />

      {status === "loading" && (
        <div className="gallery-status">Hanging the artwork…</div>
      )}
      {status === "error" && (
        <div className="gallery-status">
          <p>The 3D gallery needs WebGL, which isn&apos;t available here.</p>
          <button type="button" className="accent-button" onClick={onExit}>
            Back to Projects
          </button>
        </div>
      )}

      <div className="gallery-hud-top">
        {roomLabel && <span className="gallery-room-chip">{roomLabel}</span>}
        <button
          ref={exitButtonRef}
          type="button"
          className="gallery-exit accent-button"
          onClick={onExit}
        >
          Exit Gallery
        </button>
      </div>

      {status === "ready" && (
        <div className="gallery-hint" aria-hidden="true">
          {isTouch
            ? "Drag to look around • Use the arrows to walk • Tap a frame for details"
            : "WASD / arrows — walk • Hold right-click — look around • Click a frame — details • Esc — close / exit"}
        </div>
      )}

      {isTouch && status === "ready" && (
        <div className="gallery-touch-controls">
          <button
            type="button"
            aria-label="Walk forward"
            onPointerDown={() => (touchMoveRef.current = 1)}
            onPointerUp={() => (touchMoveRef.current = 0)}
            onPointerCancel={() => (touchMoveRef.current = 0)}
          >
            ▲
          </button>
          <button
            type="button"
            aria-label="Walk backward"
            onPointerDown={() => (touchMoveRef.current = -1)}
            onPointerUp={() => (touchMoveRef.current = 0)}
            onPointerCancel={() => (touchMoveRef.current = 0)}
          >
            ▼
          </button>
        </div>
      )}

      {active && (
        <aside
          key={active.slug}
          ref={panelRef}
          className="gallery-panel"
          role="dialog"
          aria-label={`${active.title} details`}
          tabIndex={-1}
        >
          <button
            type="button"
            className="gallery-panel-close"
            aria-label="Close project details"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <p className="gallery-panel-kicker">
            {active.emoji ? `${active.emoji} ` : ""}
            {roomLabelFor(active)} • {active.year}
          </p>
          <h3>{active.title}</h3>
          <p className="gallery-panel-blurb">{active.blurb}</p>
          <div className="gallery-panel-tags">
            {active.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {activeHasPage && (
            <button
              type="button"
              className="accent-button small"
              onClick={() => openProject(active)}
            >
              Learn more
            </button>
          )}
        </aside>
      )}
    </div>
  );
}

export default ProjectGallery;
