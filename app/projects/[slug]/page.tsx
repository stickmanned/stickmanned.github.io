import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, projectBySlug } from "@/lib/site-data";

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
          <strong>{project.categories.filter((category) => category !== "Featured").join(" / ")}</strong>
          <Link href="/projects/">All projects</Link>
        </aside>
        <div>
          {project.sections.map((section) => (
            <article key={section.title} className="case-section" data-reveal>
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
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <p>Gallery</p>
          <h2>Project evidence.</h2>
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
    </main>
  );
}
