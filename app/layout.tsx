import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  metadataBase: new URL("https://williamwen.xyz"),
  title: {
    default: "William Wen",
    template: "%s | William Wen"
  },
  description:
    "Hardware-focused student builder creating web apps, games, and physical computing projects.",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "William Wen",
    description:
      "Hardware-focused student builder creating web apps, games, and physical computing projects.",
    url: "https://williamwen.xyz",
    siteName: "William Wen",
    images: ["/design-assets/portrait.png"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
