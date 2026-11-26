import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "./reference.css";

const displayFont = Bricolage_Grotesque({
  axes: ["opsz"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CribDesk — A little more possible",
  description:
    "You show the homes. Build the relationships. Let your AI co-agent help with what comes next. Join the CribDesk waitlist.",
  openGraph: {
    title: "CribDesk — A little more possible",
    description:
      "Respond to leads, capture showings and write listing content in your voice.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
