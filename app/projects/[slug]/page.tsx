import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, projectBySlug, allProjects, type ProjectCategory } from "@/lib/site-data";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.image]
    }
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) notFound();
  const galleryHeading = project.galleryHeading ?? {
    eyebrow: "Gallery",
    title: "Project evidence.",
  };

  const cleanCategories: ProjectCategory[] = project.categories.filter((cat) => cat !== "Featured");
  let similarProjects = allProjects.filter(
    (p) => p.slug !== project.slug && p.categories.some((cat) => cleanCategories.includes(cat))
  );
  if (similarProjects.length === 0) {
    similarProjects = allProjects.filter((p) => p.slug !== project.slug);
  }
  similarProjects = similarProjects.slice(0, 3);

  return (
    <main className="case-study">
      <section className="case-hero">
        <div>
          <p className="kicker">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="button-row">
            {project.links.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.href} className="quiet-button" href={link.href}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} className="quiet-button" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
        <figure>
          <img src={project.image} alt="" />
        </figure>
      </section>

      <section className="case-body">
        <aside>
          <span>{project.year}</span>
          <strong>
            {project.categories
              .filter((category) => category !== "Featured")
              .join(" / ")}
          </strong>

          <hr style={{ borderColor: 'var(--border)', margin: '16px 0', opacity: 0.5 }} />

          <strong>Table of Contents</strong>
          {project.sections.map((section) => {
            const id = slugify(section.title);
            return (
              <a key={id} href={`#${id}`}>
                {section.title}
              </a>
            );
          })}

          <hr style={{ borderColor: 'var(--border)', margin: '16px 0', opacity: 0.5 }} />

          <strong>Similar Projects</strong>
          {similarProjects.map((p) => (
            <Link key={p.slug} href={p.href}>
              {p.title}
            </Link>
          ))}

          <hr style={{ borderColor: 'var(--border)', margin: '16px 0', opacity: 0.5 }} />

          <Link href="/projects/">All projects</Link>
        </aside>
        <div>
          {project.sections.map((section) => {
            const id = slugify(section.title);
            return (
              <article key={section.title} id={id} className="case-section" data-reveal>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {section.links ? (
                  <div className="button-row">
                    {section.links.map((link) =>
                      link.href.startsWith("/") ? (
                        <Link key={link.href} className="quiet-button" href={link.href}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={link.href}
                          className="quiet-button"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      {project.components ? (
        <section className="section-wrap">
          <div className="section-heading">
            <p>{project.components.heading}</p>
            <h2>What&apos;s inside the build.</h2>
          </div>
          <div className="spec-table-wrap">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item</th>
                  <th className="spec-price">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {project.components.rows.map((row) => (
                  <tr key={`${row.type}-${row.item}`}>
                    <td data-label="Type">{row.type}</td>
                    <td data-label="Item">{row.item}</td>
                    <td data-label="Price" className="spec-price">{row.price}</td>
                  </tr>
                ))}
              </tbody>
              {project.components.total ? (
                <tfoot>
                  <tr>
                    <td colSpan={2}>{project.components.totalNote ?? "Total"}</td>
                    <td className="spec-price">{project.components.total}</td>
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
          <div className="spec-meta">
            {project.components.note ? <span>{project.components.note}</span> : null}
            {project.components.listHref ? (
              <a href={project.components.listHref} target="_blank" rel="noreferrer">
                View full PCPartPicker list →
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      {project.video ? (
        <section className="section-wrap">
          <div className={`section-heading gallery-section-heading${project.video.centered ? " is-centered" : ""}`}>
            <div>
              <h2>{project.video.title}</h2>
            </div>
          </div>
          <div className="video-embed" data-reveal>
            <iframe
              src={project.video.embedUrl}
              title={project.video.iframeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      ) : project.gallery ? (
        <section className="section-wrap">
          <div className={`section-heading gallery-section-heading${galleryHeading.centered ? " is-centered" : ""}`}>
            <div>
              {galleryHeading.eyebrow ? <p>{galleryHeading.eyebrow}</p> : null}
              <h2>{galleryHeading.title}</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {project.gallery.map((image) => (
              <figure key={image.src} data-reveal>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {project.changelog ? (
        <section className="section-wrap">
          <div className="section-heading">
            <p>Changelog</p>
            <h2>How the build evolved.</h2>
          </div>
          <ol className="changelog">
            {project.changelog.map((entry) => (
              <li key={entry.date}>
                <span>{entry.date}</span>
                <p>{entry.note}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </main>
  );
}
