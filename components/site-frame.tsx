"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { socials } from "@/lib/site-data";
import { SocialGlyph } from "@/components/social-icons";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
  { label: "Experience", href: "/experience/" },
  { label: "Writing", href: "/writing/" },
  { label: "About", href: "/about/" },
  { label: "Resume", href: "/resume/" },
  { label: "Contact", href: "/contact/" },
];

const commands = [
  ...navItems.map((item) => ({
    label: `Go to ${item.label}`,
    hint: "route",
    href: item.href,
  })),
  {
    label: "Email William",
    hint: "link",
    href: "mailto:williamwen25@gmail.com",
  },
  {
    label: "Open GitHub",
    hint: "link",
    href: "https://github.com/stickmanned",
  },
  {
    label: "Open YouTube / FHC Tech",
    hint: "link",
    href: "https://www.youtube.com/@fhctech",
  },
  { label: "Capybara?", hint: "secret", href: "#secret" },
];

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
        setSecretOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let clicks = 0;
    let lastClick = 0;
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-secret-portrait]")) return;
      const now = Date.now();
      if (now - lastClick > 1500) clicks = 0;
      lastClick = now;
      clicks += 1;
      if (clicks >= 10) {
        clicks = 0;
        setSecretOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || paletteOpen || secretOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, paletteOpen, secretOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commands.filter(
      (command) => !q || command.label.toLowerCase().includes(q),
    );
  }, [query]);

  const runCommand = (href: string) => {
    setPaletteOpen(false);
    setQuery("");
    if (href === "#secret") {
      setSecretOpen(true);
      return;
    }
    if (href.startsWith("http") || href.startsWith("mailto:")) {
      window.location.href = href;
    } else {
      window.location.href = href;
    }
  };

  return (
    <>
      <InteractionBoot />
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <header className="site-nav depth-4" data-depth="4">
        <Link href="/" className="brand" aria-label="William Wen home">
          <img src="/design-assets/logo.png" alt="" aria-hidden="true" />
          <span>William Wen</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="key-button"
            type="button"
            onClick={() => {
              setSelected(0);
              setPaletteOpen(true);
            }}
          >
            <span aria-hidden="true">Ctrl K</span>
            <span className="sr-only">Open command palette</span>
          </button>
          <Link className="accent-button small" href="/resume/">
            Resume
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div>
          <strong>William Wen</strong>
          <p>Hardware, web apps, games, writing, and community projects.</p>
        </div>
        <div className="footer-links">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label={social.label}
              title={social.label}
            >
              <SocialGlyph name={social.icon} />
            </a>
          ))}
          <a
            href="mailto:williamwen25@gmail.com"
            className="social-link"
            aria-label="Email William"
            title="Email William"
          >
            <SocialGlyph name="mail" />
          </a>
        </div>
      </footer>

      {portalRoot && menuOpen
        ? createPortal(
            <div className="mobile-menu" role="dialog" aria-modal="true">
              <button
                type="button"
                className="close-button"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>,
            portalRoot,
          )
        : null}

      {portalRoot && paletteOpen
        ? createPortal(
            <div
              className="palette-backdrop"
              role="dialog"
              aria-modal="true"
              onClick={() => setPaletteOpen(false)}
            >
              <div
                className="palette"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSelected(0);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setSelected((value) =>
                        Math.min(Math.max(0, filtered.length - 1), value + 1),
                      );
                    }
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setSelected((value) => Math.max(0, value - 1));
                    }
                    const activeIndex = Math.min(
                      selected,
                      Math.max(0, filtered.length - 1),
                    );
                    if (event.key === "Enter" && filtered[activeIndex]) {
                      runCommand(filtered[activeIndex].href);
                    }
                  }}
                  placeholder="Type a command..."
                  aria-label="Command search"
                />
                <div className="palette-list">
                  {filtered.length ? (
                    filtered.map((command, index) => (
                      <button
                        key={`${command.label}-${command.href}`}
                        className={
                          index ===
                          Math.min(selected, Math.max(0, filtered.length - 1))
                            ? "selected"
                            : ""
                        }
                        type="button"
                        onMouseEnter={() => setSelected(index)}
                        onClick={() => runCommand(command.href)}
                      >
                        <span>{command.label}</span>
                        <small>{command.hint}</small>
                      </button>
                    ))
                  ) : (
                    <p>No commands found.</p>
                  )}
                </div>
              </div>
            </div>,
            portalRoot,
          )
        : null}

      {portalRoot && secretOpen
        ? createPortal(
            <div className="secret-backdrop" role="dialog" aria-modal="true">
              <div className="secret-card">
                <h2>Do you like capybaras?</h2>
                <div className="button-row">
                  <a
                    className="accent-button"
                    href="https://williamwen.xyz/site"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Yes
                  </a>
                  <button
                    className="quiet-button"
                    type="button"
                    onClick={() => setSecretOpen(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>,
            portalRoot,
          )
        : null}
    </>
  );
}

function InteractionBoot() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanup: (() => void)[] = [];

    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));

      const mo = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            if (node.hasAttribute("data-reveal")) node.classList.add("is-visible");
            node.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      cleanup.push(() => mo.disconnect());
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      revealEls.forEach((el) => io.observe(el));

      const mo = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) continue;
            if (node.hasAttribute("data-reveal")) io.observe(node);
            node.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      cleanup.push(() => {
        io.disconnect();
        mo.disconnect();
      });
    }

    const countEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );
    const animateCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count || "0");
      if (prefersReduced) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1300);
        el.textContent = String(
          Math.round(target * (1 - Math.pow(1 - progress, 3))),
        );
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (prefersReduced || !("IntersectionObserver" in window)) {
      countEls.forEach(animateCount);
    } else {
      const countIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              countIo.unobserve(entry.target);
              animateCount(entry.target as HTMLElement);
            }
          });
        },
        { threshold: 0.5 },
      );
      countEls.forEach((el) => countIo.observe(el));
      cleanup.push(() => countIo.disconnect());
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (!prefersReduced && finePointer) {
      const glow = document.querySelector<HTMLElement>(".cursor-glow");
      if (glow) {
        let glowRaf = 0;
        let lastEvent: MouseEvent | null = null;
        let activeTarget: HTMLElement | null = null;
        let targetCache: { el: HTMLElement; rect: DOMRect }[] = [];
        let cacheDirty = true;

        const clearTarget = (target: HTMLElement | null) => {
          if (!target) return;
          target.classList.remove("is-cursor-near");
          target.style.removeProperty("--cursor-local-x");
          target.style.removeProperty("--cursor-local-y");
          target.style.removeProperty("--cursor-proximity");
        };

        const markCacheDirty = () => {
          cacheDirty = true;
        };

        const refreshTargets = () => {
          targetCache = Array.from(
            document.querySelectorAll<HTMLElement>(
              ".accent-button, .quiet-button, .key-button, .menu-button, .close-button, .expand-button, .project-card, .desktop-nav a, .text-link, .writing-cards a, .writing-grid a, .social-link, [data-orbit-node], [data-graph-node]",
            ),
          )
            .filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true")
            .map((el) => ({ el, rect: el.getBoundingClientRect() }))
            .filter(({ rect }) => rect.width > 0 && rect.height > 0);
          cacheDirty = false;
        };

        const nearestInteractive = (event: MouseEvent) => {
          if (cacheDirty) refreshTargets();

          let nearest: { el: HTMLElement; distance: number; x: number; y: number; rect: DOMRect } | null = null;
          for (const { el, rect } of targetCache) {
            const x = Math.max(rect.left, Math.min(event.clientX, rect.right));
            const y = Math.max(rect.top, Math.min(event.clientY, rect.bottom));
            const dx = event.clientX - x;
            const dy = event.clientY - y;
            const distance = Math.hypot(dx, dy);
            if (distance > 110) continue;
            if (!nearest || distance < nearest.distance) nearest = { el, distance, x, y, rect };
          }
          return nearest;
        };

        const onGlowMove = (event: MouseEvent) => {
          lastEvent = event;
          if (glowRaf) return;
          glowRaf = requestAnimationFrame(() => {
            glowRaf = 0;
            if (!lastEvent) return;
            const nearest = nearestInteractive(lastEvent);
            glow.style.setProperty("--cursor-x", `${lastEvent.clientX}px`);
            glow.style.setProperty("--cursor-y", `${lastEvent.clientY}px`);
            if (nearest) {
              const strength = Math.max(0, 1 - nearest.distance / 110);
              glow.style.setProperty("--cursor-alpha", String(0.07 - strength * 0.02));
              glow.style.setProperty("--cursor-size", `${260 - strength * 34}px`);
              if (activeTarget !== nearest.el) {
                clearTarget(activeTarget);
                activeTarget = nearest.el;
                activeTarget.classList.add("is-cursor-near");
              }
              activeTarget.style.setProperty("--cursor-local-x", `${nearest.x - nearest.rect.left}px`);
              activeTarget.style.setProperty("--cursor-local-y", `${nearest.y - nearest.rect.top}px`);
              activeTarget.style.setProperty("--cursor-proximity", strength.toFixed(3));
            } else {
              glow.style.setProperty("--cursor-alpha", "0.095");
              glow.style.setProperty("--cursor-size", "260px");
              clearTarget(activeTarget);
              activeTarget = null;
            }
            glow.style.opacity = "1";
          });
        };
        const onGlowLeave = () => {
          glow.style.opacity = "0";
          glow.style.setProperty("--cursor-alpha", "0.095");
          glow.style.setProperty("--cursor-size", "260px");
          clearTarget(activeTarget);
          activeTarget = null;
        };
        const mutationObserver = new MutationObserver(markCacheDirty);
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        window.addEventListener("mousemove", onGlowMove, { passive: true });
        window.addEventListener("scroll", markCacheDirty, { passive: true });
        window.addEventListener("resize", markCacheDirty);
        document.addEventListener("mouseleave", onGlowLeave);
        cleanup.push(() => {
          window.removeEventListener("mousemove", onGlowMove);
          window.removeEventListener("scroll", markCacheDirty);
          window.removeEventListener("resize", markCacheDirty);
          document.removeEventListener("mouseleave", onGlowLeave);
          mutationObserver.disconnect();
          if (glowRaf) cancelAnimationFrame(glowRaf);
          clearTarget(activeTarget);
        });
      }
    }

    if (!prefersReduced && !window.matchMedia("(pointer: coarse)").matches) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(1000px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-6px)`;
        };
        const onLeave = () => {
          card.style.transform = "";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanup.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
