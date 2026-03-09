import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  icons: {
    icon: "/images/logo/bull.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="font-serif antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
