import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blossom Privacy Policy"
};

export default function BlossomPrivacyPolicyPage() {
  return (
    <main className="page-shell narrow">
      <section className="page-hero">
        <p className="kicker">Blossom</p>
        <h1>Privacy Policy</h1>
        <p>Last Updated: April 2, 2026</p>
      </section>
      <article className="policy-card">
        <h2>1. Data Collection</h2>
        <p>
          Blossom collects and stores data strictly necessary for its core focus and gamification features. This
          includes your focus duration, coin balance, garden state, and your list of blocked domains.
        </p>
        <h2>2. Local Storage</h2>
        <p>
          All data collected by Blossom is stored locally on your device using the chrome.storage.local API. This data
          is never transmitted to our servers, nor is it shared with any third parties.
        </p>
        <h2>3. Website Monitoring</h2>
        <p>
          To provide the distraction blocking feature, Blossom checks the current website URL against your local
          blocklist while a focus timer is active. This information is processed locally on your machine and is never
          logged or transmitted.
        </p>
        <h2>4. Third-Party Access</h2>
        <p>Blossom does not sell, trade, or otherwise transfer your information to outside parties.</p>
        <h2>5. Your Consent</h2>
        <p>By using the Blossom extension, you consent to this privacy policy.</p>
      </article>
      <Link className="text-link" href="/projects/blossom/">
        Back to Blossom
      </Link>
    </main>
  );
}
