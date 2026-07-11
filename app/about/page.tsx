import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="about-page-grid">
        <figure className="portrait-card">
          <img src="/design-assets/portrait.png" alt="William Wen" data-secret-portrait />
        </figure>
        <div>
          <p className="kicker">About</p>
          <h1>Friendly, technical, and always making something real.</h1>
          <p>
            Hey there — I&apos;m William, a high school student and co-founder of Fraser Hack Club. I build across
            hardware, web apps, games, writing, and community projects.
          </p>
          <p>
            I started coding in Grade 2 with Scratch and have since explored Python, Java, HTML, CSS, JavaScript,
            TypeScript, C++, React, AP Computer Science A, Godot, Unity, Roblox, AutoCAD, OpenSCAD, and 3D printing.
          </p>
          <p>
            Hardware and PC building are a major thread: small form factor PCs, component selection, benchmarking,
            thermal constraints, printed parts, and single-board-computer experiments.
          </p>
        </div>
      </section>
      <section className="section-wrap no-pad">
        <div className="capability-grid">
          {[
            ["Coding", "Scratch in Grade 2, then Python, Java, JS/TS, C++, React, games, and web apps."],
            ["PC Building", "SFF builds, high-performance parts, thermals, cable management, and benchmarking."],
            ["3D Modeling", "Learning 3D modeling and printing parts that help with projects and daily life."],
            ["Games", "Roblox, BeamNG.drive, Scratch projects, and game-jam experiments."],
            ["Art", "Digital art in Procreate and a creative thread that shows up in project presentation."],
            ["Pets", "The personal side: Bread the cat, guinea pigs, and goldfish."]
          ].map(([title, desc], index) => (
            <article key={title} data-reveal>
              <span>/{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pet-strip">
        <img src="/img/bread.jpg" alt="Bread the cat" loading="lazy" />
        <img src="/img/guineapigs.jpg" alt="William's guinea pigs" loading="lazy" />
      </section>
    </main>
  );
}
