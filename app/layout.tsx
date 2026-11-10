import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
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
  title: "CribDesk — Your AI co-agent for real estate",
  description:
    "Team-level follow-up for solo agents. Join the CribDesk waitlist and be first to meet the AI co-agent built for your whole workday.",
  openGraph: {
    title: "CribDesk — Team-level follow-up for solo agents",
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
