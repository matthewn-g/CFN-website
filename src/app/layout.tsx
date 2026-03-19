import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Primary font: Nunito (Avenir-like; Times New Roman is system font, no import needed)
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://canadianfinancialnetwork.ca"),
  title: {
    default:  "Canadian Financial Network | CFN",
    template: "%s | CFN",
  },
  description:
    "Financial literacy and professional development for Canadian university students. Articles, models, and networking events.",
  keywords: [
    "Canadian finance", "financial literacy", "university students",
    "ETF", "investing Canada", "DCF model", "LBO modeling", "TFSA",
    "investment banking Canada", "finance career",
  ],
  openGraph: {
    siteName: "Canadian Financial Network",
    locale:   "en_CA",
    type:     "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
