import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell narrow">
      <section className="page-hero">
        <p className="kicker">404</p>
        <h1>Page not found.</h1>
        <p>The portfolio route you requested does not exist.</p>
        <Link className="accent-button" href="/">
          Go home
        </Link>
      </section>
    </main>
  );
}
