import type { Metadata } from "next";
import { Users, Target, Heart, Star, Shield } from "lucide-react";
import { teamMembers } from "@/data/team";
import CommunityBanner from "@/components/ui/CommunityBanner";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Built by students, for every student. The story behind the Canadian Financial Network — who we are, why we started, and what we're building.",
};

const values = [
  {
    Icon: Shield,
    title: "Accessibility",
    desc: "Finance knowledge shouldn't require a trust fund or a personal connection. We make every concept, model, and resource available to any student who wants it.",
    color: "text-emerald-500",
    bg:   "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    Icon: Heart,
    title: "Authenticity",
    desc: "We're students, not advisors. We share what we're learning, not what sounds impressive. If we don't know, we say so.",
    color: "text-rose-500",
    bg:   "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    Icon: Users,
    title: "Community",
    desc: "Your network is your net worth. We connect students across Canada who share the same curiosity and drive.",
    color: "text-blue-500",
    bg:   "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    Icon: Star,
    title: "Excellence",
    desc: "We hold our work to a high standard — because the students reading it deserve nothing less.",
    color: "text-cfn-gold",
    bg:   "bg-amber-50 dark:bg-amber-900/20",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-cfn-navy py-20">
        <div className="section-container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Finance Shouldn&apos;t Be Gatekept.
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            We started CFN because we were tired of feeling like outsiders in a world we were genuinely passionate about.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-cfn-cream dark:bg-cfn-dark-bg">
        <div className="section-container max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-10 bg-cfn-gold rounded-full" />
            <h2 className="text-3xl font-black text-cfn-navy dark:text-white">Our Story</h2>
          </div>
          <div className="space-y-6 text-lg text-cfn-charcoal dark:text-cfn-dark-text leading-relaxed">
            <p>
              Finance clubs at Canadian universities have always had a reputation for being exclusive — a place for people who already know the jargon, already have the network, already know someone on the inside. We started CFN because we were tired of feeling like outsiders in a world we were genuinely passionate about.
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
            <Target className="w-6 h-6 text-cfn-gold mr-2" />
            <p className="text-cfn-gold text-sm font-bold uppercase tracking-widest">Our Mission</p>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white max-w-3xl mx-auto leading-relaxed">
            &ldquo;To promote financial literacy, make learning technical skills more accessible, and create networking opportunities for students across Canada — regardless of background.&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cfn-cream-dark dark:bg-cfn-dark-bg">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-cfn-navy dark:text-white mb-3">
              What We Stand For
            </h2>
            <p className="text-cfn-muted dark:text-cfn-dark-muted text-lg">
              The values that guide everything we build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-card"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-cfn-navy dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-cfn-muted dark:text-cfn-dark-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cfn-cream dark:bg-cfn-dark-bg">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-cfn-navy dark:text-white mb-3">
              Meet the Team
            </h2>
            <p className="text-cfn-muted dark:text-cfn-dark-muted text-lg">
              Built by students from UBC and Queen&apos;s University.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-cfn-navy flex items-center justify-center text-cfn-gold font-black text-2xl mb-4">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-cfn-navy dark:text-white text-lg">{member.name}</h3>
                <p className="text-cfn-gold text-sm font-semibold mb-1">{member.role}</p>
                {member.school && (
                  <p className="text-xs text-cfn-muted dark:text-cfn-dark-muted mb-3">{member.school}</p>
                )}
                <p className="text-sm text-cfn-muted dark:text-cfn-dark-muted leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community + Join Us */}
      <section className="py-20 bg-cfn-cream-dark dark:bg-cfn-dark-bg">
        <div className="section-container max-w-[700px] mx-auto space-y-8">
          <CommunityBanner variant="section" />
          <div className="bg-cfn-gold rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black text-cfn-navy mb-3">Want to Write for CFN?</h3>
            <p className="text-cfn-navy/70 mb-6">
              We&apos;re always looking for passionate students to join the team — whether you write articles, build models, or create content.
            </p>
            <Button
              href="mailto:thecanadianfinancialnetwork@gmail.com"
              variant="secondary"
              className="!border-cfn-navy !text-cfn-navy hover:!bg-cfn-navy hover:!text-white"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
