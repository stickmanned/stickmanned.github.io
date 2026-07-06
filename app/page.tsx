import Link from "next/link";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import { ProjectConstellation } from "@/components/project-constellation";
import { SelectedWork } from "@/components/selected-work";
import { ToolIcon } from "@/components/icons";
import { allProjects, experienceItems, stats, toolbox, writingEntries } from "@/lib/site-data";

export default function HomePage() {
  const timeline = experienceItems.slice(0, 6);
  const selectedWriting = writingEntries.slice(0, 3);

  return (
    <main id="top">
      <section className="hero scene" data-scene="hero" aria-labelledby="hero-title">
        <div className="layer depth-0 hero-grid" data-depth="0" aria-hidden="true" />
        <div className="layer depth-1 hero-sweep" data-depth="1" aria-hidden="true" />
        <div className="hero-inner">
          <ProjectConstellation />
          <div className="hero-copy depth-4" data-depth="4">
          <p className="eyebrow">
            <span /> Student builder - hardware x software
          </p>
          <h1 id="hero-title">William Wen</h1>
          <p className="hero-lede">
            Hardware-focused student builder creating <strong>web apps, games, and physical computing</strong>{" "}
            projects.
          </p>
          <div className="hero-proof">
            <span>Now</span>
            <p>
              Co-founder of{" "}
              <a href="http://fraser.hackclub.com/" target="_blank" rel="noreferrer">
                Fraser Hack Club
              </a>{" "}
              and deep in hardware builds.
            </p>
            <span>Prev</span>
            <p>2nd place at Equinox Vancouver, Juice 2025 in Shanghai, and Scrapyard Vancouver.</p>
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
          <p>01 - Selected Work</p>
          <h2>Things I&apos;ve built.</h2>
          <span>A mix of hardware experiments, web apps, and games. Every one shipped, documented, and real.</span>
        </div>
        <SelectedWork projects={allProjects} />
      </section>

      <section className="section-band" id="range">
        <div className="section-wrap">
          <div className="section-heading" data-reveal>
            <p>02 - Range</p>
            <h2>Comfortable across the whole stack, solder to screen.</h2>
          </div>
          <div className="range-layout">
            <figure className="graph-card range-map" data-reveal>
              <KnowledgeGraph />
              <span>Domain map - linked routes</span>
            </figure>
            <div className="capability-grid">
              {[
                ["Hardware & PCs", "SFF builds, custom cooling, single-board computers, and printed enclosures."],
                ["Web Apps", "Full-stack sites and browser extensions with HTML, CSS, JS/TS, and React."],
                ["Game Dev", "Games in Godot, Unity, Roblox, and Scratch, from jams to releases."],
                ["3D & CAD Design", "Modeling in AutoCAD and OpenSCAD, then printing real parts."],
                ["Writing", "Essays, short stories, and notes that communicate ideas clearly."],
                ["Leadership", "Co-founded Fraser Hack Club, the largest coding club in Coquitlam, BC."]
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
          <p>03 - Experience & Proof</p>
          <h2>Hackathons, leadership, and wins.</h2>
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
            <p className="kicker">04 - Writing</p>
            <h2>A knowledgebase, not just a blog.</h2>
            <p>
              Essays, short stories, books, and notes: a connected record of what William is thinking and building.
            </p>
            <Link className="text-link" href="/writing/">
              Read writing
            </Link>
          </div>
        </div>
        <div className="section-wrap writing-cards">
          {selectedWriting.map((entry) => (
            <a key={entry.title} href={entry.href} target={entry.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
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
          <p className="kicker">05 - About</p>
          <h2>Curious since Grade 2, still building.</h2>
          <p>
            William started coding in Grade 2 with Scratch and has since explored Python, Java, HTML, CSS,
            JavaScript, TypeScript, C++, AP Computer Science A, full-stack web, game development, and small-form-factor
            hardware.
          </p>
          <p>
            Away from the keyboard: golf, PC building, gaming, 3D printing, digital art, and planning the next project.
          </p>
          <Link className="text-link" href="/about/">
            More about William
          </Link>
        </div>
      </section>

      <section className="contact-cta">
        <p className="kicker">06 - Contact</p>
        <h2>Let&apos;s build something.</h2>
        <p>Open to internships, admissions conversations, collaborations, or talking hardware.</p>
        <div className="button-row">
          <a className="accent-button" href="mailto:williamwen25@gmail.com">
            williamwen25@gmail.com
          </a>
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
      <img src="/design-assets/portrait.png" alt="William Wen" data-secret-portrait />
    </div>
  );
}
