import type { Metadata } from "next";
import Link from "next/link";
import { projectBySlug, CaseStudy, allProjects } from "@/lib/site-data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Lamp Pro — AutoCAD Project",
  description:
    "A Mac Pro–inspired lamp pattern workflow: Fusion 360 → DXF → AutoCAD with math behind the iconic perforations.",
  openGraph: {
    title: "Lamp Pro — AutoCAD Project",
    description:
      "A Mac Pro–inspired lamp pattern workflow: Fusion 360 → DXF → AutoCAD with math behind the iconic perforations.",
    type: "article",
    images: ["https://stickmanned.github.io/img/projects/LampPro/1.png"],
    url: "https://stickmanned.github.io/projects/LampPro/",
  },
};

export default function LampProPage() {
  const project = projectBySlug.get("lamp-pro") as CaseStudy | undefined;
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
          <a href="#intro">Introduction</a>
          <a href="#topbottom">Top & Bottom</a>
          <a href="#sides">Side Pieces</a>
          <a href="#math">Math & Method</a>
          <a href="#refs">References</a>

          <hr style={{ borderColor: 'var(--border)', margin: '16px 0', opacity: 0.5 }} />

          <strong>Similar Projects</strong>
          {allProjects
            .filter((p) => p.slug !== "lamp-pro" && p.categories.includes("Hardware"))
            .slice(0, 3)
            .map((p) => (
              <Link key={p.slug} href={p.href}>
                {p.title}
              </Link>
            ))}

          <hr style={{ borderColor: 'var(--border)', margin: '16px 0', opacity: 0.5 }} />

          <Link href="/projects/">All projects</Link>
        </aside>
        <div>
          {/* Custom Lamp Pro Content instead of project.sections.map */}
          
          <article id="intro" className="case-section" data-reveal>
            <h2>Introduction</h2>
            <p>
              Apple’s Mac Pro features one of the best computer case designs in my
              opinion. Often called the “cheese grater” Mac, it is an icon of
              modern computing—both positive and negative. Because the pattern is
              visually compelling, I designed a lamp inspired by it. Lamp dimensions
              were provided as a template by my drafting teacher. (Build Process
              soon)
            </p>
          </article>

          <article id="topbottom" className="case-section" data-reveal>
            <h2>Top/bottom</h2>
            <p>
              I started the design with the top and bottom pieces. Since the lamp
              needed at least two distinct designs, I chose a second pattern: the
              Noctua Fan Grille.
            </p>
            <p>
              The Noctua fan grille’s circular motif makes it a great fit for both
              top and bottom. To bring this into AutoCAD, I first located a 3D model
              of the grille.
            </p>
            <p>
              <strong>Model link:</strong>{" "}
              <a
                href="https://www.printables.com/model/1096961-high-efficiency-noctua-120mm-fan-grill"
                target="_blank"
                rel="noopener"
              >
                High‑Efficiency Noctua 120mm Fan Grill (Printables)
              </a>
            </p>
            <p>
              Using Fusion 360, I imported the STL as a mesh. The original mesh had
              too much detail to convert directly to a sketch, so I simplified it
              using the Reduce tool.
            </p>
            
            <figure data-reveal>
              <img src="/img/projects/LampPro/1.png" alt="Fusion 360 Reduce Mesh example" />
            </figure>
            
            <p>
              After simplifying the grille, we still need a 2D sketch. Using the{" "}
              <em>Create Mesh Section Sketch</em> tool, I generated a mesh sketch.
            </p>
            
            <figure data-reveal>
              <img src="/img/projects/LampPro/2.png" alt="Create Mesh Section Sketch result" />
            </figure>

            <p>Now there is a mesh sketch of the fan grille:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/3.png" alt="Mesh sketch of the fan grille" />
            </figure>

            <p>
              If we want to export to AutoCAD, we need a normal sketch. The orange
              lines indicate a mesh sketch. Convert it using{" "}
              <em>Fit Curves to Mesh Section</em> to trace the lines. Then
              right‑click the sketch in the browser and export as DXF for AutoCAD.
            </p>
            <p>
              In AutoCAD, scale the fan grille DXF to fit inside the lamp template,
              and center it precisely using Move + object snaps. After centering, the
              template looks like this:
            </p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/4.png" alt="Centered fan grille pattern in template" />
            </figure>
            <p>For the second plate (top or bottom), I mirrored the pattern:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/5.png" alt="Mirrored fan grille pattern" />
            </figure>
            <p>Top pieces complete. The real challenge is the side panels.</p>
          </article>

          <article id="sides" className="case-section" data-reveal>
            <h2>Side Pieces</h2>
            <p>
              This is where the project becomes interesting. Huge thanks to J.
              Peterson’s article for the mathematics behind the Mac Pro holes:{" "}
              <a
                href="https://saccade.com/blog/2019/06/how-to-make-apples-mac-pro-holes/"
                target="_blank"
                rel="noopener"
              >
                How to Make Apple’s Mac Pro Holes
              </a>
              .
            </p>
            <p>
              <strong>Disclaimer:</strong> The Mac Pro holes are 3D; I approximated
              them in 2D. The inner holes are perfectly circular in 3D, but appear
              slightly oval from a front view, so my 2D version uses ellipses to
              match that appearance.
            </p>
            <p>
              Starting from the example 3D model provided in the article, I imported
              it into Fusion 360 and repeated the STL→mesh→section→DXF workflow. The
              inner “small holes” are not directly captured in the 2D conversion, so
              I constructed those using the article’s geometry.
            </p>
            <p>In the template, I centered the larger holes. They look like this:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/6.png" alt="Centered large holes layout" />
            </figure>
            <p>Next, we need the smaller holes. Use the diagram from the article as a guide:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/7.png" alt="Diagram for small hole construction" />
            </figure>
          </article>

          <article id="math" className="case-section" data-reveal>
            <h2>Math &amp; Method</h2>
            <p>First, find the base length <em>x</em> of the construction triangle using:</p>
            <figure data-reveal>
              <img
                src="/img/projects/LampPro/math1.png"
                alt="Formula for x with r and pi/6"
                style={{ width: 'auto', maxHeight: '100px', display: 'block' }}
              />
            </figure>
            <p>…where <em>r</em> is the radius of the large holes and π/6 is 30°.</p>
            <p>To find the height <em>h</em>, follow the derivation in the article; the conclusion is:</p>
            <figure data-reveal>
              <img
                src="/img/projects/LampPro/math2.png"
                alt="Formula for h derived from the article"
                style={{ width: 'auto', maxHeight: '100px', display: 'block' }}
              />
            </figure>
            <p>After determining the variables, construct an equilateral triangle (60°) as a reference:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/8.png" alt="Equilateral triangle construction" />
            </figure>
            <p>From each triangle vertex, draw a circle matching the large hole diameter. Repeat the triangle/circle placement until each large hole has three overlapping circles:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/9.png" alt="Overlapping circles inside large hole" />
            </figure>
            <p>Delete the construction triangles and trim the arcs outside the main circle to reveal the characteristic Mac Pro “petal” shapes:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/10.png" alt="Trimmed arcs to form Mac Pro pattern petals" />
            </figure>
            <p>The interior arcs serve as guides for the “small holes.” Because we’re flattening a 3D pattern, these appear as ellipses. I drew a guide line from the arc midpoint to the outer edge, another at 1/6 of that length, and created an ellipse with the same effective diameter as the reference arc:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/11.png" alt="Ellipse guide for small hole" />
            </figure>
            <p>For aesthetics, I made the ellipse slightly smaller and rounder to resemble the Mac Pro design more closely:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/12.png" alt="Refined ellipse for small hole" />
            </figure>
            <p>Repeat for each hole to produce the final side panel pattern:</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/13.png" alt="Completed side panel pattern" />
            </figure>
            <p>Repeat the process for each side panel to complete the lamp.</p>
            <figure data-reveal>
              <img src="/img/projects/LampPro/14.png" alt="Final Lamp Pro design with all panels" />
            </figure>
            <p>This is the entire Lamp design, including the top and side pieces.</p>
          </article>

          <article id="refs" className="case-section" data-reveal>
            <h2>References</h2>
            <ul>
              <li>
                <a
                  href="https://saccade.com/blog/2019/06/how-to-make-apples-mac-pro-holes/"
                  target="_blank"
                  rel="noopener"
                >
                  How to Make Apple’s Mac Pro Holes — J. Peterson
                </a>
              </li>
              <li>
                <a
                  href="https://www.printables.com/model/1096961-high-efficiency-noctua-120mm-fan-grill"
                  target="_blank"
                  rel="noopener"
                >
                  High‑Efficiency Noctua 120mm Fan Grill — Printables
                </a>
              </li>
            </ul>
          </article>
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
