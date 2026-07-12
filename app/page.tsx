import { ToolIcon } from "@/components/icons";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import { ProjectConstellation } from "@/components/project-constellation";
import { SelectedWork } from "@/components/selected-work";
import {
  allProjects,
  experienceItems,
  stats,
  toolbox,
  writingEntries,
} from "@/lib/site-data";
import Link from "next/link";

export default function HomePage() {
  const timeline = experienceItems.slice(0, 6);
  const selectedWriting = writingEntries.slice(0, 3);

  return (
    <main id="top">
      <section
        className="hero scene"
        data-scene="hero"
        aria-labelledby="hero-title"
      >
        <div
          className="layer depth-0 hero-grid"
          data-depth="0"
          aria-hidden="true"
        />
        <div
          className="layer depth-1 hero-sweep"
          data-depth="1"
          aria-hidden="true"
        />
        <div className="hero-inner">
          <ProjectConstellation />
          <div className="hero-copy depth-4" data-depth="4">
            <h1 id="hero-title">William Wen</h1>
            <p className="hero-lede">
              High school student builder creating{" "}
              <strong>apps, games, hardware, and more</strong>.
            </p>
            <div className="hero-proof">
              <span>Now</span>
              <p>
                Co-founder of{" "}
                <a
                  href="http://fraser.hackclub.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Fraser Hack Club
                </a>{" "}
                and deep in hardware projects.
              </p>
              <span>Prev</span>
              <p>
                2nd place at Equinox Vancouver, Juice 2025 in Shanghai, and
                Scrapyard Vancouver.
              </p>
            </div>
            <div className="button-row">
              <Link className="accent-button" href="/projects/">
                View Projects
              </Link>
              <Link className="quiet-button" href="/contact/">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Portfolio stats">
        {stats.map((stat) => (
          <div key={stat.label} data-reveal>
            <strong>
              <span data-count={stat.value}>0</span>
              {stat.suffix}
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section-wrap" id="work">
        <div className="section-heading" data-reveal>

          <h2>Things I&apos;ve built</h2>

        </div>
        <SelectedWork projects={allProjects} />
      </section>

      <section className="section-band" id="range">
        <div className="section-wrap">
          <div className="section-heading" data-reveal>
            <h2>My stack</h2>
          </div>
          <div className="range-layout">
            <figure className="graph-card range-map" data-reveal>
              <KnowledgeGraph />
            </figure>
            <div className="capability-grid">
              {[
                [
                  "Hardware & PCs",
                  "SFF builds, custom cooling, single-board computers, and printed enclosures.",
                ],
                [
                  "Web Apps",
                  "Full-stack sites and browser extensions with HTML, CSS, JS/TS, and React.",
                ],
                [
                  "Game Dev",
                  "Games in Godot, Unity, Roblox, and Scratch, from jams to releases.",
                ],
                [
                  "3D & CAD Design",
                  "2D design in AutoCAD, 3D in Fusion and OpenSCAD, then 3D printing into real life!",
                ],
                [
                  "Writing",
                  "Essays, short stories, and notes that communicate ideas clearly.",
                ],
                [
                  "Leadership",
                  "Co-founded Fraser Hack Club, the largest coding club in Coquitlam, BC.",
                ],
              ].map(([title, desc], index) => (
                <article key={title} data-reveal>
                  <span>/{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="toolbox" data-reveal>
            {toolbox.map((tool) => (
              <span key={tool.name}>
                <i aria-hidden="true">
                  <ToolIcon name={tool.name} />
                </i>
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap" id="experience">
        <div className="section-heading" data-reveal>
          <h2>Hackathons, leadership, and events.</h2>
        </div>
        <div className="compact-timeline">
          {timeline.map((item) => (
            <article key={item.title} data-reveal>
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/experience/">
          View full timeline
        </Link>
      </section>

      <section className="section-band" id="writing">
        <div className="section-wrap">
          <div className="writing-intro" data-reveal>
            <h2>A knowledge base, not just a blog.</h2>
            <Link className="text-link" href="/writing/">
              Read writing
            </Link>
          </div>
        </div>
        <div className="section-wrap writing-cards">
          {selectedWriting.map((entry) => (
            <a
              key={entry.title}
              href={entry.href}
              target={entry.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              <img src={entry.image} alt="" loading="lazy" />
              <span>{entry.category}</span>
              <h3>{entry.title}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="section-wrap about-preview" id="about">
        <PortraitEgg />
        <div data-reveal>
          <h2>Curious since Grade 2, still building.</h2>
          <p>
            I started coding in Grade 2 with Scratch and have since explored
            Python, Java, HTML, CSS, JavaScript, TypeScript, C++, AP Computer
            Science A, full-stack web, game development, and small-form-factor
            hardware.
          </p>
          <p>
            Away from the keyboard: golf, PC building, gaming, 3D printing,
            digital art, and planning the next project.
          </p>
          <Link className="text-link" href="/about/">
            More about me
          </Link>
        </div>
      </section>

      <section className="contact-cta">
        <h2>Contact me</h2>
        <p>
          Open to internships, admissions, collaborations, or
          anything tech!
        </p>
        <div className="button-row">
          <Link className="accent-button" href="/contact/">
            Get in touch
          </Link>
          <Link className="quiet-button" href="/resume/">
            Resume
          </Link>
        </div>
      </section>
    </main>
  );
}

function PortraitEgg() {
  return (
    <div className="portrait-card" data-reveal>
      <img
        src="/design-assets/portrait.jpg"
        alt="William Wen"
        data-secret-portrait
      />
    </div>
  );
}
