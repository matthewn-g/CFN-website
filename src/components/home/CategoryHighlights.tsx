import Link from "next/link";
import { PiggyBank, TrendingUp, Activity, Briefcase, Brain } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = [
  { slug: "personal-finance",     label: "Personal Finance",     Icon: PiggyBank,  color: "#10B981" },
  { slug: "investments",          label: "Investments",          Icon: TrendingUp, color: "#8B5CF6" },
  { slug: "market-rundown",       label: "Market Rundown",       Icon: Activity,   color: "#EF4444" },
  { slug: "career-growth",        label: "Career Growth",        Icon: Briefcase,  color: "#0284C7" },
  { slug: "personal-development", label: "Personal Development", Icon: Brain,      color: "#06B6D4" },
];

export default function CategoryHighlights() {
  return (
    <section className="py-16 bg-cfn-cream-dark dark:bg-cfn-dark-bg border-y border-cfn-navy-100 dark:border-white/5">
      <div className="section-container">
        <SectionHeader
          title="What Are You Learning Today?"
          subtitle="Explore topics from personal finance to market analysis."
          centered
        />
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(({ slug, label, Icon, color }) => (
            <Link
              key={slug}
              href={`/financial-literacy?category=${slug}`}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-transparent hover:border-cfn-navy dark:hover:border-white font-semibold text-sm transition-all duration-200 hover:shadow-card"
              style={{
                backgroundColor: `${color}15`,
                color,
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
