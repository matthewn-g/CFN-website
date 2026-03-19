import Link from "next/link";
import { PiggyBank, TrendingUp, Activity, Briefcase, Brain } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const categories = [
  { slug: "personal-finance",     label: "Personal Finance",     Icon: PiggyBank  },
  { slug: "investments",          label: "Investments",          Icon: TrendingUp },
  { slug: "market-rundown",       label: "Market Rundown",       Icon: Activity   },
  { slug: "career-growth",        label: "Career Growth",        Icon: Briefcase  },
  { slug: "personal-development", label: "Personal Development", Icon: Brain      },
];

const PILL_BG   = "#4A6080";
const PILL_TEXT = "#F8F6F1";

export default function CategoryHighlights() {
  return (
    <section className="py-16 bg-cfn-cream border-y border-cfn-navy-100">
      <div className="section-container">
        <SectionHeader
          title="What Are You Learning Today?"
          subtitle="Explore topics from personal finance to market analysis."
          centered
        />
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(({ slug, label, Icon }) => (
            <Link
              key={slug}
              href={`/financial-literacy?category=${slug}`}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-card"
              style={{ backgroundColor: PILL_BG, color: PILL_TEXT }}
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
