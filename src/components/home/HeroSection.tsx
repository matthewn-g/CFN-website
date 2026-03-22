import Link from "next/link";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import CommunityBanner from "@/components/ui/CommunityBanner";

export default function HeroSection() {
  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Static hero image ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero/toronto.jpeg"
          alt="University of Toronto"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
      </div>

      {/* ── Hero content — sits above slideshow + overlay ── */}
      <div className="section-container relative z-10 py-32 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cfn-cream/15 border border-cfn-cream/30 text-cfn-cream text-sm font-semibold mb-8 animate-fade-in">
          <TrendingUp className="w-4 h-4" />
          <span className="font-serif">Canadian Financial Network</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-cfn-cream leading-tight tracking-tight max-w-4xl mx-auto text-balance animate-slide-up">
          Built by Students.
          <br />
          For <span style={{ color: "#C8D8F0" }}>Every Student.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-cfn-cream/75 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Finance is for everyone. Whether you&apos;re opening your first TFSA or building
          your first DCF model, CFN gives you the tools, the knowledge, and the community
          to grow. No gatekeeping required.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          {/* Solid white — primary action */}
          <Link
            href="/financial-literacy"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl bg-cfn-cream text-cfn-navy font-semibold hover:bg-cfn-cream/90 transition-colors duration-200"
          >
            Explore Financial Literacy
          </Link>
          {/* Outlined white — secondary action */}
          <Link
            href="/models-frameworks"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg rounded-xl bg-transparent text-cfn-cream border-2 border-cfn-cream font-semibold hover:bg-cfn-cream/10 transition-colors duration-200"
          >
            View Models &amp; Frameworks
          </Link>
        </div>

        {/* Community chip */}
        <div className="mt-8 flex justify-center animate-fade-in">
          <CommunityBanner variant="chip" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-cfn-cream/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-cfn-cream/50" />
        </div>
      </div>
    </section>
  );
}
