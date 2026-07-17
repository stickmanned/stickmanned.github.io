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

// CC0 PBR texture sets under public/textures/. The oak set (Poly Haven,
// WebP-compressed) is shared by every wood prop: natural for trim, tinted
// down to walnut for benches. The quartz floor detail map is a colour-
// normalised, WebP copy of the provided Marble Tiles AO photo — a crisp
// white mosaic-tile grid rather than a full PBR set, so the floor material
// supplies roughness/reflectivity as flat scalars instead of maps.
const QUARTZ_TEX = {
  detail: "/textures/quartz-tiles/quartz-tiles_detail.webp",
} as const;
const OAK_TEX = {
  albedo: "/textures/oak-wood/oak-wood_albedo.webp",
  roughness: "/textures/oak-wood/oak-wood_roughness.webp",
  normal: "/textures/oak-wood/oak-wood_normal.webp",
  ao: "/textures/oak-wood/oak-wood_ao.webp",
} as const;
// Physical size of one texture repeat, in metres. Every surface that shares
// a texture derives its UVs from these, so scale stays consistent room to
// room and object to object.
const NOISE_TILE = 3; // subtle procedural wall/ceiling noise
const QUARTZ_TILE = 6; // quartz floor repeat (~20 tiles/image → ~30cm tiles)
const WOOD_TILE = 1.4; // oak grain repeat across benches and trim

// Reference-photo palette.
const WALL_WHITE = 0xf2f1ee; // matte gallery drywall (walls + ceiling)
const FLOOR_FALLBACK = 0xededea; // flat floor tone until the detail map loads
const FRAME_BLACK = 0x0d0d0d; // thin brushed-metal picture frames
const TRACK_BLACK = 0x1a1a1a; // track-lighting hardware + bench legs
const POT_BLACK = 0x1c1c1c; // matte ceramic planter pots
// Per-channel multiplier that lands the oak albedo (avg #A17E57) on the
// walnut bench tone (#5C4433).
const WALNUT_TINT = 0x918a96;

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

// Rescale a BoxGeometry's per-face UVs from 0..1 to world units so a
// RepeatWrapping texture tiles at the same physical size on every box,
// whatever its dimensions. BoxGeometry lays out 4 vertices per face in the
// order +x, -x, +y, -y, +z, -z.
function worldScaleBoxUVs(
  geometry: import("three").BoxGeometry,
  sx: number,
  sy: number,
  sz: number,
  worldSize: number,
) {
  const uv = geometry.getAttribute("uv");
  const faceDims: [number, number][] = [
    [sz, sy],
    [sz, sy],
    [sx, sz],
    [sx, sz],
    [sx, sy],
    [sx, sy],
  ];
  for (let i = 0; i < uv.count; i++) {
    const [du, dv] = faceDims[Math.floor(i / 4)];
    uv.setXY(i, (uv.getX(i) * du) / worldSize, (uv.getY(i) * dv) / worldSize);
  }
  uv.needsUpdate = true;
}

// Same idea for a PlaneGeometry (used by the roof caps).
function worldScalePlaneUVs(
  geometry: import("three").PlaneGeometry,
  w: number,
  h: number,
  worldSize: number,
) {
  const uv = geometry.getAttribute("uv");
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, (uv.getX(i) * w) / worldSize, (uv.getY(i) * h) / worldSize);
  }
  uv.needsUpdate = true;
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
  const [showHint, setShowHint] = useState(true);
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

        // Canvas text is rasterized once, so wait for the active theme's web
        // fonts before drawing signs and plaques to avoid baking in a fallback.
        await document.fonts.ready;
        if (disposed || !mount) return;

        const styles = getComputedStyle(document.documentElement);
        const cssColor = (name: string, fallback: string) =>
          styles.getPropertyValue(name).trim() || fallback;
        const accent = cssColor("--accent", "#c9ff3b");
        const bg = cssColor("--bg", "#08090b");
        const panel = cssColor("--panel-2", "#12151a");
        const textColor = cssColor("--text-strong", "#f7f9fc");
        const dummyHeading = document.createElement("h1");
        dummyHeading.style.display = "none";
        document.body.appendChild(dummyHeading);
        const headingFont = getComputedStyle(dummyHeading).fontFamily;
        document.body.removeChild(dummyHeading);

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
        // Every textured surface starts on a flat colour (or a cheap
        // procedural fallback) and upgrades in place once its PBR maps
        // arrive; a failed load simply keeps the fallback, so a missing
        // file can never blank a surface.
        const textureLoader = new THREE.TextureLoader();
        const maxAnisotropy = Math.min(
          8,
          renderer.capabilities.getMaxAnisotropy(),
        );
        function loadSurfaceTexture(
          url: string,
          isColor: boolean,
          onReady: (texture: import("three").Texture) => void,
        ) {
          textureLoader.load(
            url,
            (texture) => {
              if (disposed) {
                texture.dispose();
                return;
              }
              track(texture);
              // Only albedo maps are sRGB; data maps (roughness/normal/AO)
              // must stay linear or lighting breaks subtly.
              if (isColor) texture.colorSpace = THREE.SRGBColorSpace;
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
              texture.anisotropy = maxAnisotropy;
              onReady(texture);
            },
            undefined,
            () => {
              console.warn(`Gallery texture failed to load: ${url}`);
            },
          );
        }

        // Soft studio environment shared by the reflective materials — the
        // polished floor, bench legs and metal frames pick up faint white
        // ceiling reflections from it, like the reference photo.
        const { RoomEnvironment } = await import(
          "three/examples/jsm/environments/RoomEnvironment.js"
        );
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envScene = new RoomEnvironment();
        const envTarget = track(pmrem.fromScene(envScene, 0.04));
        envScene.dispose?.();
        pmrem.dispose();
        const envMap = envTarget.texture;

        // Walls + ceiling: matte gallery white. The reference reads as
        // flat smooth drywall, so no photo texture here — just the faint
        // procedural noise so large planes don't look CG-flat.
        const wallTexture = track(makePlasterTexture(THREE, "#ffffff"));
        const wallMaterial = track(
          new THREE.MeshStandardMaterial({
            map: wallTexture,
            color: WALL_WHITE,
            roughness: 0.92,
            metalness: 0,
          }),
        );
        const roofMaterial = track(
          new THREE.MeshStandardMaterial({
            map: wallTexture,
            color: WALL_WHITE,
            roughness: 0.95,
            metalness: 0,
            side: THREE.DoubleSide,
          }),
        );
        // One oak PBR set is shared by every wood prop (bench seats and
        // baseboard trim); each user registers its tinted material here and
        // the maps attach to all of them as they load. The oak roughness
        // map averages ~0.53, so a 0.9 scalar lands final roughness ≈ 0.48.
        const woodMaterials: import("three").MeshStandardMaterial[] = [];
        function makeWoodMaterial(color: number, roughness = 0.9) {
          const material = track(
            new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 }),
          );
          material.normalScale.set(0.7, 0.7);
          woodMaterials.push(material);
          return material;
        }
        loadSurfaceTexture(OAK_TEX.albedo, true, (texture) => {
          for (const material of woodMaterials) {
            material.map = texture;
            material.needsUpdate = true;
          }
        });
        loadSurfaceTexture(OAK_TEX.roughness, false, (texture) => {
          for (const material of woodMaterials) {
            material.roughnessMap = texture;
            material.needsUpdate = true;
          }
        });
        loadSurfaceTexture(OAK_TEX.normal, false, (texture) => {
          for (const material of woodMaterials) {
            material.normalMap = texture;
            material.needsUpdate = true;
          }
        });
        loadSurfaceTexture(OAK_TEX.ao, false, (texture) => {
          texture.channel = 0;
          for (const material of woodMaterials) {
            material.aoMap = texture;
            material.needsUpdate = true;
          }
        });
        // Baseboards double as the gallery's light-oak trim accent.
        const moldingMaterial = makeWoodMaterial(0xffffff);
        const carpetMaterial = track(
          new THREE.MeshLambertMaterial({ color: CARPET_COLOR }),
        );
        // Black metal shared by the sunburst chandelier frame (canopy,
        // rods, joint beads) — a bit of sheen so it reads as metal rather
        // than flat-painted plastic.
        const trackMaterial = track(
          new THREE.MeshStandardMaterial({
            color: TRACK_BLACK,
            roughness: 0.4,
            metalness: 0.6,
            envMap,
            envMapIntensity: 0.5,
          }),
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
        // Polished quartz tile: glossy, near-white, faintly reflective —
        // roughness is a flat scalar since the detail map carries only
        // colour/grout shading, no separate roughness data.
        const floorMaterial = track(
          new THREE.MeshStandardMaterial({
            color: FLOOR_FALLBACK,
            roughness: 0.22,
            metalness: 0,
            envMap,
            envMapIntensity: 0.45,
          }),
        );
        // The detail map is exclusive to the floor, so texture.repeat is
        // safe here (every other shared texture scales via UVs instead).
        loadSurfaceTexture(QUARTZ_TEX.detail, true, (texture) => {
          texture.repeat.set(floorW / QUARTZ_TILE, floorD / QUARTZ_TILE);
          floorMaterial.map = texture;
          // Detail map is pre-normalised to the fallback tone offline;
          // drop the flat tint so it isn't applied twice.
          floorMaterial.color.set(0xffffff);
          floorMaterial.needsUpdate = true;
        });
        const floor = new THREE.Mesh(
          track(new THREE.PlaneGeometry(floorW, floorD)),
          floorMaterial,
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
          const wallGeometry = track(
            new THREE.BoxGeometry(
              alongX ? length : WALL_T,
              height,
              alongX ? WALL_T : length,
            ),
          );
          worldScaleBoxUVs(
            wallGeometry,
            alongX ? length : WALL_T,
            height,
            alongX ? WALL_T : length,
            NOISE_TILE,
          );
          const wall = new THREE.Mesh(wallGeometry, wallMaterial);
          wall.position.set(cx, height / 2, cz);
          scene.add(wall);
          // Baseboard runs a hair short of the wall so its end faces never
          // share a plane with the wall's end faces (coplanar same-facing
          // ends z-fight at exposed door jambs).
          const baseHeight = alongX ? 0.18 : 0.165;
          const baseLength = Math.max(0.1, length - 0.05);
          const baseGeometry = track(
            new THREE.BoxGeometry(
              alongX ? baseLength : WALL_T + 0.08,
              baseHeight,
              alongX ? WALL_T + 0.08 : baseLength,
            ),
          );
          // Oak trim: grain follows the board's run.
          worldScaleBoxUVs(
            baseGeometry,
            alongX ? baseLength : WALL_T + 0.08,
            baseHeight,
            alongX ? WALL_T + 0.08 : baseLength,
            WOOD_TILE,
          );
          const base = new THREE.Mesh(baseGeometry, moldingMaterial);
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
          const lintelGeometry = track(
            new THREE.BoxGeometry(
              alongX ? DOOR_HALF * 2 : WALL_T,
              WALL_HEIGHT - DOOR_HEIGHT,
              alongX ? WALL_T : DOOR_HALF * 2,
            ),
          );
          worldScaleBoxUVs(
            lintelGeometry,
            alongX ? DOOR_HALF * 2 : WALL_T,
            WALL_HEIGHT - DOOR_HEIGHT,
            alongX ? WALL_T : DOOR_HALF * 2,
            NOISE_TILE,
          );
          const lintel = new THREE.Mesh(lintelGeometry, wallMaterial);
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
          // the sloped panels at the same physical size as the walls.
          const uvs: number[] = [];
          for (let i = 0; i < positions.length; i += 3) {
            uvs.push(
              positions[i] / NOISE_TILE,
              positions[i + 2] / NOISE_TILE,
            );
          }
          geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
          geometry.computeVertexNormals();
          scene.add(new THREE.Mesh(geometry, roofMaterial));

          // Solid flat cap closing the roof.
          const capW = inner.maxX - inner.minX;
          const capD = inner.maxZ - inner.minZ;
          const capGeometry = track(new THREE.PlaneGeometry(capW, capD));
          worldScalePlaneUVs(capGeometry, capW, capD, NOISE_TILE);
          const cap = new THREE.Mesh(capGeometry, roofMaterial);
          cap.rotation.x = Math.PI / 2;
          cap.position.set(
            (inner.minX + inner.maxX) / 2,
            peak,
            (inner.minZ + inner.maxZ) / 2,
          );
          scene.add(cap);
          // No separate skylight cut-out here — each room's single ceiling
          // bar light (added in decorateRoom) is the only light fixture, so
          // the cap stays plain roof material.
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
              font: `700 96px ${headingFont}`,
              color: textColor,
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

        // Wood-and-metal gallery bench: walnut-tinted oak seat, matte black
        // metal legs with a hint of env reflection.
        const benchSeatMaterial = makeWoodMaterial(WALNUT_TINT);
        const benchLegMaterial = track(
          new THREE.MeshStandardMaterial({
            color: TRACK_BLACK,
            roughness: 0.4,
            metalness: 0.85,
            envMap,
            envMapIntensity: 0.5,
          }),
        );
        const benchSeatGeometry = track(new THREE.BoxGeometry(1.7, 0.09, 0.55));
        // Grain runs along the seat's length (the oak maps are pre-rotated
        // so grain follows U, which world-scaled box UVs map to each
        // face's long axis here).
        worldScaleBoxUVs(benchSeatGeometry, 1.7, 0.09, 0.55, WOOD_TILE);
        const benchLegGeometry = track(new THREE.BoxGeometry(0.08, 0.42, 0.5));
        const potMaterial = track(
          new THREE.MeshStandardMaterial({
            color: POT_BLACK,
            roughness: 0.75,
            metalness: 0,
          }),
        );
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

        // Ceiling fixture: a flush-mount sunburst chandelier — a round
        // black canopy with thin rods radiating outward in a ring,
        // alternating long and short, each tipped with a small white bulb.
        // Actual illumination still comes from real SpotLights aimed down
        // at the art walls (~30–45° from vertical); those lights have no
        // visible geometry of their own, so the sunburst is purely decor.
        const SUNBURST_SPOKES = 24;
        const SUNBURST_LONG_R = 1.05;
        const SUNBURST_SHORT_R = 0.68;
        const SUNBURST_BASE_R = 0.16;
        const SUNBURST_DROOP = 0.16; // tips hang slightly below the canopy
        const sunburstCanopyGeometry = track(
          new THREE.CylinderGeometry(0.34, 0.34, 0.07, 28),
        );
        // Unit-length rod, non-uniformly scaled per spoke so one shared
        // geometry covers both the long and short spoke lengths.
        const sunburstRodGeometry = track(
          new THREE.CylinderGeometry(0.014, 0.018, 1, 6),
        );
        const sunburstBeadGeometry = track(new THREE.SphereGeometry(0.028, 8, 6));
        const sunburstBulbGeometry = track(
          new THREE.CylinderGeometry(0.026, 0.026, 0.16, 8),
        );
        const sunburstBulbMaterial = track(
          new THREE.MeshBasicMaterial({ color: 0xfff6e8 }),
        );
        const sunburstUp = new THREE.Vector3(0, 1, 0);
        const sunburstBase = new THREE.Vector3();
        const sunburstTip = new THREE.Vector3();
        const sunburstDir = new THREE.Vector3();
        const sunburstMid = new THREE.Vector3();

        function addSunburstLight(x: number, z: number, y: number) {
          const group = new THREE.Group();
          group.position.set(x, y, z);
          const canopy = new THREE.Mesh(sunburstCanopyGeometry, trackMaterial);
          canopy.position.y = -0.02;
          group.add(canopy);

          for (let i = 0; i < SUNBURST_SPOKES; i++) {
            const angle = (i / SUNBURST_SPOKES) * Math.PI * 2;
            const radius = i % 2 === 0 ? SUNBURST_LONG_R : SUNBURST_SHORT_R;
            const droop = SUNBURST_DROOP * (radius / SUNBURST_LONG_R);
            sunburstBase.set(
              Math.cos(angle) * SUNBURST_BASE_R,
              -0.02,
              Math.sin(angle) * SUNBURST_BASE_R,
            );
            sunburstTip.set(
              Math.cos(angle) * radius,
              -0.02 - droop,
              Math.sin(angle) * radius,
            );
            sunburstDir.copy(sunburstTip).sub(sunburstBase);
            const length = sunburstDir.length();
            sunburstMid.copy(sunburstBase).add(sunburstTip).multiplyScalar(0.5);
            sunburstDir.normalize();

            const rod = new THREE.Mesh(sunburstRodGeometry, trackMaterial);
            rod.scale.y = length;
            rod.position.copy(sunburstMid);
            rod.quaternion.setFromUnitVectors(sunburstUp, sunburstDir);
            group.add(rod);

            const bead = new THREE.Mesh(sunburstBeadGeometry, trackMaterial);
            bead.position.copy(sunburstTip);
            group.add(bead);

            const bulb = new THREE.Mesh(sunburstBulbGeometry, sunburstBulbMaterial);
            bulb.position.copy(sunburstTip).addScaledVector(sunburstDir, 0.1);
            bulb.quaternion.setFromUnitVectors(sunburstUp, sunburstDir);
            group.add(bulb);
          }
          scene.add(group);
        }

        function addTrackLight(
          x: number,
          z: number,
          y: number,
          alongX: boolean,
          aims: [number, number][],
        ) {
          addSunburstLight(x, z, y);
          aims.forEach((aim, i) => {
            const t = aims.length === 1 ? 0 : i / (aims.length - 1) - 0.5;
            const fx = x + (alongX ? t * 2 : 0);
            const fz = z + (alongX ? 0 : t * 2);
            const fy = y - 0.14;
            const spot = new THREE.SpotLight(
              0xfff1e0,
              50,
              32,
              Math.PI / 6.5,
              0.45,
              1.35,
            );
            spot.position.set(fx, fy, fz);
            spot.target.position.set(aim[0], 1.9, aim[1]);
            scene.add(spot);
            scene.add(spot.target);
          });
        }

        // Rug, bench, corner planters and chandelier(s) for one room.
        function decorateRoom(rect: Rect) {
          const cx = (rect.minX + rect.maxX) / 2;
          const cz = (rect.minZ + rect.maxZ) / 2;
          const w = rect.maxX - rect.minX;
          const d = rect.maxZ - rect.minZ;

          // Small accent rug under the bench — sized so the polished
          // concrete stays the room's floor rather than the carpet.
          const rugAlongX = w >= d;
          const rug = new THREE.Mesh(
            track(
              new THREE.PlaneGeometry(rugAlongX ? 3.2 : 2.1, rugAlongX ? 2.1 : 3.2),
            ),
            carpetMaterial,
          );
          rug.rotation.x = -Math.PI / 2;
          rug.position.set(cx, 0.02, cz);
          scene.add(rug);

          addBench(cx, cz, w >= d ? 0 : Math.PI / 2);
          addPlant(rect.minX + 1.1, rect.minZ + 1.1);
          addPlant(rect.maxX - 1.1, rect.maxZ - 1.1);

          // Ceiling tracks along the room's long axis; large rooms get two.
          // Each track's spots aim at the art walls flanking it; square
          // rooms (which hang art on every wall) get a four-spot track.
          const trackAlongX = w >= d;
          const sideAims = (px: number, pz: number): [number, number][] =>
            trackAlongX
              ? [
                  [px, rect.minZ + 0.2],
                  [px, rect.maxZ - 0.2],
                ]
              : [
                  [rect.minX + 0.2, pz],
                  [rect.maxX - 0.2, pz],
                ];
          const mount = (px: number, pz: number, aims: [number, number][]) =>
            addTrackLight(
              px,
              pz,
              roofHeightAt(rect, px, pz) - 0.26,
              trackAlongX,
              aims,
            );
          if (w === d) {
            mount(cx, cz, [
              [cx, rect.minZ + 0.2],
              [cx, rect.maxZ - 0.2],
              [rect.minX + 0.2, cz],
              [rect.maxX - 0.2, cz],
            ]);
          } else {
            mount(cx, cz, sideAims(cx, cz));
          }
        }

        // ---- Frames ----------------------------------------------------
        const artMeshes: import("three").Mesh[] = [];
        const frameBorders = new Map<number, import("three").MeshStandardMaterial>();
        const frameGroups = new Map<number, import("three").Group>();
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

          // Thin black metal frame, slightly metallic for a brushed-
          // aluminium sheen. Per-frame material so hover can highlight one
          // frame via its emissive channel.
          const borderMaterial = track(
            new THREE.MeshStandardMaterial({
              color: FRAME_BLACK,
              roughness: 0.4,
              metalness: 0.2,
              envMap,
              envMapIntensity: 0.4,
            }),
          );
          const border = new THREE.Mesh(
            track(new THREE.BoxGeometry(ART_W + 0.08, ART_H + 0.08, 0.06)),
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
          art.position.z = 0.035;
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
              font: `500 52px ${headingFont}`,
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

          // Wall-wash glow behind the frame — a faked spotlight wash, far
          // cheaper than a real per-frame light, standing in for the
          // ceiling bar light's spot now doing the actual illumination.
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          glow.position.set(0, 0.35, -0.145);
          group.add(glow);

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
        // Neutral base light for a bright white gallery: soft ambient +
        // sky-to-floor hemisphere. Direction and drama come from the
        // per-room skylight fills and the track spots; artwork is unlit
        // material so it stays fully readable.
        scene.add(new THREE.AmbientLight(0xffffff, 0.25));
        const hemisphere = new THREE.HemisphereLight(0xffffff, 0xbfb9ae, 0.15);
        scene.add(hemisphere);

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
            frameBorders.get(hoveredIndex)?.emissive.setHex(0x000000);
            frameGroups.get(hoveredIndex)?.scale.setScalar(1);
          }
          hoveredIndex = index;
          // Hover is only an affordance: accent glow + pointer cursor. The
          // glow is emissive rather than a colour swap so the wood-grain
          // map keeps its dark tint underneath.
          if (index !== null) {
            const material = frameBorders.get(index);
            if (material) {
              material.emissive.set(accent);
              material.emissiveIntensity = 0.55;
            }
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
        // Dev-only hook so tooling can reposition the camera and force a
        // render — the loop above pauses whenever the tab reports itself
        // hidden, which headless/preview browsers do permanently.
        if (process.env.NODE_ENV !== "production") {
          (window as unknown as Record<string, unknown>).__galleryDebug = {
            goto: (x: number, z: number, yw = 0, p = 0) => {
              camera.position.set(x, EYE_HEIGHT, z);
              yaw = yw;
              pitch = p;
              camera.rotation.set(pitch, yaw, 0);
              renderer.render(scene, camera);
            },
            render: () => renderer.render(scene, camera),
          };
        }

        rafId = requestAnimationFrame(tick);
        setStatus("ready");

        cleanup = () => {
          cancelAnimationFrame(rafId);
          delete (window as unknown as Record<string, unknown>).__galleryDebug;
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

      {status === "ready" && showHint && (
        <div className="gallery-hint" aria-hidden="true">
          <span>
            {isTouch
              ? "Drag to look around • Use the arrows to walk • Tap a frame for details"
              : "WASD / arrows — walk • Hold right-click — look around • Click a frame — details • Esc — close / exit"}
          </span>
          <button 
            type="button" 
            className="gallery-hint-close" 
            onClick={() => setShowHint(false)} 
            aria-label="Dismiss hint"
          >
            ×
          </button>
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
