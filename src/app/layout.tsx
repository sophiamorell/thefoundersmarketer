import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content";

/* The Groovy design system's three faces, self-hosted by next/font and
   subset to latin. Alfa Slab One is the wordmark only; Hanken Grotesk is
   headings, body and UI; Space Mono is kickers, labels, prices and notes. */
const display = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-alfa",
  fallback: ["Rockwell", "Georgia", "serif"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-hanken",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f0eae1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
