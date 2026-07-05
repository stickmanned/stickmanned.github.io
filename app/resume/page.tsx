import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume"
};

export default function ResumePage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <p className="kicker">Resume</p>
        <h1>Current resume.</h1>
        <p>A clean preview of the resume image from the existing site, with a downloadable document link.</p>
        <a className="accent-button" href="/resume/Resum%C3%A9.docx" download>
          Download resume
        </a>
      </section>
      <figure className="resume-preview">
        <img src="/img/resume.png" alt="William Wen resume preview" />
      </figure>
    </main>
  );
}
