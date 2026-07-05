"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ExperienceItem } from "@/lib/site-data";

const filters = ["All", "Hackathon", "Leadership", "Award", "Tech"] as const;

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(() => {
    const filtered = active === "All" ? items : items.filter((item) => item.kind === active);
    return filtered.slice().sort((a, b) => Date.parse(b.dateISO) - Date.parse(a.dateISO));
  }, [active, items]);

  return (
    <div>
      <div className="segmented-control" role="tablist" aria-label="Experience filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={active === filter ? "is-active" : ""}
            onClick={() => setActive(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="timeline">
        {visible.map((item) => (
          <article key={`${item.title}-${item.dateISO}`} className="timeline-item" data-reveal>
            <img src={item.image} alt="" loading="lazy" />
            <div>
              <time dateTime={item.dateISO}>{item.date}</time>
              <span>{item.kind}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.href ? (
                item.href.startsWith("http") ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Open source
                  </a>
                ) : (
                  <Link href={item.href}>View related project</Link>
                )
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
