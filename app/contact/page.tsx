import type { Metadata } from "next";
import { socials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <main className="page-shell narrow">
      <section className="page-hero">

        <h1>Open to internships, admissions, collaborations, and chats :)</h1>
      </section>
      <div className="contact-list">
        <a href="mailto:williamwen25@gmail.com">
          <span>Email</span>
          williamwen25@gmail.com
        </a>
        {socials.map((social) => (
          <a key={social.href} href={social.href} target="_blank" rel="noreferrer">
            <span>{social.label}</span>
            {social.display ?? social.href}
          </a>
        ))}
      </div>
    </main>
  );
}
