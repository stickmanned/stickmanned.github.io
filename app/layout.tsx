import type { Metadata } from "next";
import Script from "next/script";
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
    // suppressHydrationWarning: the theme-init script below sets data-theme
    // before hydration, which React would otherwise report as a mismatch.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Apply the stored theme before first paint to avoid a flash. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {'try{var t=localStorage.getItem("site-theme");if(t==="light-blue"||t==="white")document.documentElement.setAttribute("data-theme",t)}catch(e){}'}
        </Script>
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
