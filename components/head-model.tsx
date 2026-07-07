"use client";

import { useEffect, useRef, useState } from "react";
import type { Material, Mesh } from "three";

const MODEL_URL = "/models/William.glb";
const VIEW_SIZE = 340;
const AUTO_SPIN_SPEED = 0.35;
// Radians of yaw per pixel of horizontal drag.
const DRAG_SENSITIVITY = 0.011;
// Cap the release velocity (radians/frame) so a fast flick spins
// playfully without whipping around forever.
const MAX_FLING = 0.3;

/**
 * Interactive 3D head rendered at the centre of the orbit rings.
 * Loads three.js and the 30MB model lazily (desktop only) and spins slowly.
 * The head can be rotated left/right by clicking and dragging on it. Pitch is
 * never touched.
 * If WebGL or the model fails, it renders nothing and the constellation
 * looks exactly as it did before.
 */
export function ConstellationHead() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    // The constellation is hidden under 761px; never fetch the model there.
    if (!window.matchMedia("(min-width: 761px)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function init() {
      try {
        const [THREE, { GLTFLoader }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
        ]);
        if (disposed || !mount) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(VIEW_SIZE, VIEW_SIZE);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
        camera.position.set(0, 0, 5);

        // Soft key light plus accent-colored rims that track the active
        // theme's palette (read from the CSS variables on <html>).
        scene.add(new THREE.AmbientLight(0xffffff, 1.1));
        const key = new THREE.DirectionalLight(0xffffff, 1.6);
        key.position.set(1.5, 2, 3);
        scene.add(key);
        const rimAccent = new THREE.DirectionalLight(0xc9ff3b, 0.55);
        rimAccent.position.set(-3, 1, -2);
        scene.add(rimAccent);
        const rimCyan = new THREE.DirectionalLight(0x4cc9f0, 0.45);
        rimCyan.position.set(3, -1, -2);
        scene.add(rimCyan);

        function applyThemeLights() {
          const styles = getComputedStyle(document.documentElement);
          const accent = styles.getPropertyValue("--accent").trim();
          const cyan = styles.getPropertyValue("--cyan").trim();
          if (accent) rimAccent.color.set(accent);
          if (cyan) rimCyan.color.set(cyan);
        }
        applyThemeLights();
        const themeObserver = new MutationObserver(applyThemeLights);
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"],
        });

        const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
        if (disposed) {
          renderer.dispose();
          return;
        }

        // Centre the model and scale it to a known size so framing
        // doesn't depend on how the GLB was exported.
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 1.9 / Math.max(size.x, size.y, size.z);
        const pivot = new THREE.Group();
        model.position.copy(center).multiplyScalar(-1);
        pivot.add(model);
        pivot.scale.setScalar(scale);
        scene.add(pivot);

        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );

        let baseYaw = 0;
        let isDragging = false;
        let previousPointerX = 0;
        let dragVelocity = 0;
        let rafId = 0;
        let visible = true;
        let lastTime = performance.now();

        function onPointerDown(event: PointerEvent) {
          // Only left button / primary touch starts a drag.
          if (event.button !== 0) return;
          event.preventDefault();
          isDragging = true;
          previousPointerX = event.clientX;
          dragVelocity = 0;
          if (mount) mount.style.cursor = "grabbing";
          // Keep the grabbing cursor and suppress text selection even
          // when the pointer leaves the head mid-drag.
          document.body.style.cursor = "grabbing";
          document.body.style.userSelect = "none";
        }

        function onPointerMove(event: PointerEvent) {
          if (!isDragging) return;
          // Only the horizontal component drives rotation; vertical
          // movement is ignored entirely.
          const deltaX = event.clientX - previousPointerX;
          previousPointerX = event.clientX;
          baseYaw += deltaX * DRAG_SENSITIVITY;
          // Smooth the per-event velocity so the release fling reflects
          // recent motion rather than the last jittery event.
          const eventVelocity = deltaX * DRAG_SENSITIVITY;
          dragVelocity = dragVelocity * 0.6 + eventVelocity * 0.4;
        }

        function onPointerUp() {
          if (!isDragging) return;
          isDragging = false;
          dragVelocity = Math.max(
            -MAX_FLING,
            Math.min(MAX_FLING, dragVelocity),
          );
          if (mount) mount.style.cursor = "grab";
          document.body.style.cursor = "";
          document.body.style.userSelect = "";
        }

        mount.style.cursor = "grab";
        mount.style.touchAction = "none";
        mount.style.userSelect = "none";

        mount.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);

        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        observer.observe(mount);

        function tick(now: number) {
          rafId = requestAnimationFrame(tick);
          const dt = Math.min((now - lastTime) / 1000, 0.1);
          lastTime = now;
          if (!visible || document.hidden) return;

          if (!reducedMotion.matches && !isDragging) {
            baseYaw += AUTO_SPIN_SPEED * dt;
          }

          // Inertia after release; skipped under reduced motion so the
          // head stops exactly where the drag left it.
          if (!isDragging && !reducedMotion.matches) {
            baseYaw += dragVelocity * dt * 60;
            dragVelocity *= Math.pow(0.94, dt * 60);
            if (Math.abs(dragVelocity) < 0.0001) dragVelocity = 0;
          }

          pivot.rotation.y = baseYaw;
          renderer.render(scene, camera);
        }
        rafId = requestAnimationFrame(tick);
        setLoaded(true);

        cleanup = () => {
          cancelAnimationFrame(rafId);
          observer.disconnect();
          themeObserver.disconnect();
          mount.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          window.removeEventListener("pointercancel", onPointerUp);
          document.body.style.cursor = "";
          document.body.style.userSelect = "";
          scene.traverse((object) => {
            const mesh = object as Mesh;
            if (mesh.isMesh) {
              mesh.geometry?.dispose();
              const materials: Material[] = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];
              for (const material of materials) material?.dispose();
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        // WebGL unavailable or the model failed to load: leave the
        // constellation untouched.
      }
    }

    init();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`constellation-head${loaded ? " is-loaded" : ""}`}
      aria-hidden="true"
    />
  );
}
