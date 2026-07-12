import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="about-page-grid">
        <figure className="portrait-card">
          <img src="/design-assets/portrait.jpg" alt="William Wen" data-secret-portrait />
        </figure>
        <div>
          <p className="kicker">About</p>
          <h1>Hey There! 👋</h1>
          <h3 style={{marginTop: "var(--s-3)"}}>Who am I?</h3>
          <p>
            I&apos;m William, a high school student and co-founder of <a href="/hack-club" className="link">Fraser Hack Club</a>. I build across
            hardware, web apps, games, and anything that I find interesting.
          </p>
          <h3 style={{marginTop: "var(--s-3)"}}>A bit about me</h3>
          <p>
            I started programming in Grade 2 with Scratch. Since then, I have explored Python, Java, HTML, CSS, JavaScript,
            TypeScript, C++, React, Godot, Unity, Roblox, & more.
          </p>
          <h3 style={{marginTop: "var(--s-3)"}}>My Interests</h3>
          <p>
            I enjoy building, tinkering, and exploring everything tech! My favorite hobbies are 3D printing, PC building, gaming, and creating something amazing whether it&apos;s hardware or software.
          </p>
        </div>
      </section>
      <h3 style={{marginTop: "var(--s-3)"}}>Some more about me</h3>
      <section className="section-wrap no-pad">
        <div className="capability-grid">
          {[
            ["Coding Journey", "I started with Scratch, then Python, then C++, a bit of Roblox Lua, and a lot of web development, and eventually full game development. "],
            ["PC Building", "I enjoy building SFF (Small Form Factor) PCs using high-performance parts, while keeping thermals and cable management under control."],
            ["3D Modeling", "I mainly use Fusion for modelling stuff for my projects, but I have since explored programs such as Onshape, OpenSCAD, and Blender."],
            ["Games", "My favorite games are Roblox and BeamNG.drive. I also enjoy creating games by myself or with my friends."],
            ["Art", "I enjoy digital art using Procreate, as well as filmmaking and video editing."],
            ["Pets", "I have a plethora of pets: 1 cat, 2 guinea pigs, and 2 goldfish."]
          ].map(([title, desc], index) => (
            <article key={title} data-reveal>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
