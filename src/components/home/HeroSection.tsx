import Button from "@/components/ui/Button";
import CommunityBanner from "@/components/ui/CommunityBanner";
import { TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cfn-navy/50 pointer-events-none" />

      <div className="section-container relative z-10 py-32 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cfn-gold/20 border border-cfn-gold/30 text-cfn-gold text-sm font-semibold mb-8 animate-fade-in">
          <TrendingUp className="w-4 h-4" />
          <span>Canadian Financial Network</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto text-balance animate-slide-up">
          Built by Students.
          <br />
          <span className="text-cfn-gold">For Every Student.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Finance is for everyone. Whether you&apos;re opening your first TFSA or building
          your first DCF model, CFN gives you the tools, the knowledge, and the community
          to grow — no gatekeeping required.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <Button href="/financial-literacy" variant="primary" size="lg">
            Explore Financial Literacy
          </Button>
          <Button href="/models-frameworks" variant="outline-white" size="lg">
            View Models &amp; Frameworks
          </Button>
        </div>

        {/* Community chip */}
        <div className="mt-8 flex justify-center animate-fade-in">
          <CommunityBanner variant="chip" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
