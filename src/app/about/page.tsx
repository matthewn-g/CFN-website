import type { Metadata } from "next";
import Image from "next/image";
import { Users, Target, Heart, Star, Shield } from "lucide-react";
import { teamMembers } from "@/data/team";
import CommunityBanner from "@/components/ui/CommunityBanner";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Built by students, for every student. The story behind the Canadian Financial Network: who we are, why we started, and what we're building.",
};

const values = [
  {
    Icon: Shield,
    title: "Accessibility",
    desc: "We believe great financial education belongs to every student. Every concept, model, and resource we create is open to anyone ready to learn, wherever you're starting from.",
    color: "text-cfn-blue-text",
    bg:   "bg-cfn-mid",
  },
  {
    Icon: Heart,
    title: "Authenticity",
    desc: "We're students sharing what we're genuinely passionate about. Our content reflects real curiosity and honest learning, because authenticity builds more trust than polish alone.",
    color: "text-cfn-blue-text",
    bg:   "bg-cfn-mid",
  },
  {
    Icon: Users,
    title: "Community",
    desc: "Finance is better together. We bring students from across Canada into one community, sharing ideas, asking questions, and building connections that last well beyond graduation.",
    color: "text-cfn-blue-text",
    bg:   "bg-cfn-mid",
  },
  {
    Icon: Star,
    title: "Excellence",
    desc: "Everything we publish is crafted with care, because we want CFN to be a resource students can genuinely rely on as they take their next steps in finance.",
    color: "text-cfn-blue-text",
    bg:   "bg-cfn-mid",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-cfn-navy py-20">
        <div className="absolute inset-0 animate-kb-1">
          <Image
            src="/images/team/clubs.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-cfn-navy/75" />
        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-cfn-cream mb-6">
            Finance Shouldn&apos;t Be Gatekept.
          </h1>
          <p className="text-cfn-cream/70 text-xl max-w-2xl mx-auto leading-relaxed">
            We started CFN because we were tired of feeling like outsiders in a world we were genuinely passionate about.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-cfn-cream">
        <div className="section-container max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-cfn-navy rounded-full" />
            <h2 className="text-3xl font-black text-cfn-navy">Our Story</h2>
          </div>
          <div className="space-y-6 text-lg text-cfn-charcoal leading-relaxed">
            <p>
              Finance clubs at Canadian universities have always had a reputation for being exclusive, a space for people who already know the jargon, already have the network, already know someone on the inside. We started CFN because we were tired of feeling like outsiders in a world we were genuinely passionate about.
            </p>
            <p>
              CFN is the club we wish had existed when we started. We&apos;re building a platform where any student can learn to invest smarter, build technical finance skills, and connect with others who are figuring it out too. No prior knowledge required. No connections necessary. Just curiosity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-cfn-navy">
        <div className="section-container text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-6 h-6 text-cfn-blue-text mr-2" />
            <p className="text-cfn-blue-text text-sm font-bold uppercase tracking-widest">Our Mission</p>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif text-cfn-cream max-w-3xl mx-auto leading-relaxed">
            &ldquo;To promote financial literacy, make learning technical skills more accessible, and create networking opportunities for students across Canada, regardless of background.&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cfn-cream-dark">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-cfn-navy mb-3">
              What We Stand For
            </h2>
            <p className="text-cfn-muted text-lg">
              The values that guide everything we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="bg-cfn-cream rounded-2xl p-6 shadow-card"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-cfn-navy mb-2">{title}</h3>
                <p className="text-sm text-cfn-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="meet-the-team" className="py-20 bg-cfn-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-cfn-navy mb-3">
              Meet the Team
            </h2>
            <p className="text-cfn-muted text-lg">
              Built by students from universities across Canada.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-cfn-cream rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-cfn-navy flex items-center justify-center text-cfn-cream font-black font-serif text-2xl mb-4">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-cfn-navy text-lg">{member.name}</h3>
                <p className="text-cfn-navy-800 text-sm font-semibold mb-1">{member.role}</p>
                {member.school && (
                  <p className="text-xs text-cfn-muted mb-3">{member.school}</p>
                )}
                <p className="text-sm text-cfn-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community + Join Us */}
      <section id="join-cfn-community" className="py-20 bg-cfn-cream-dark">
        <div className="section-container max-w-[700px] mx-auto space-y-8">
          <CommunityBanner variant="section" />
          <div id="want-to-write" className="bg-cfn-navy rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-cfn-cream mb-3">Want to Write for CFN?</h3>
            <p className="text-cfn-cream/70 mb-6">
              We&apos;re always looking for passionate students to join the team, whether you write articles, build models, or create content.
            </p>
            <Button
              href="mailto:thecanadianfinancialnetwork@gmail.com"
              variant="outline-white"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
