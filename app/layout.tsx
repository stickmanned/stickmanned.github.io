import type { Metadata } from "next";
import {
  Geist,
  Lora,
  Newsreader,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteFrame } from "@/components/site-frame";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-loaded",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora-loaded",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader-loaded",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk-loaded",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono-loaded",
  weight: ["400", "700"],
});

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
    images: ["/design-assets/portrait.jpg"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVariables = [
    geist.variable,
    lora.variable,
    newsreader.variable,
    spaceGrotesk.variable,
    spaceMono.variable,
  ].join(" ");

  return (
    // suppressHydrationWarning: the theme-init script below sets data-theme
    // before hydration, which React would otherwise report as a mismatch.
    <html
      lang="en"
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Apply the stored theme before first paint to avoid a flash. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {'try{var t=localStorage.getItem("site-theme");if(t==="light-blue"||t==="white")document.documentElement.setAttribute("data-theme",t)}catch(e){}'}
        </Script>
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
