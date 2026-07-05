import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SiteFrame } from "@/components/site-frame";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono"
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
    images: ["/design-assets/portrait.png"],
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
