import type { ArticleCategory } from "@/types/article";
import type { ModelCategory, DifficultyLevel } from "@/types/model";

export const articleCategories: {
  slug: ArticleCategory;
  label: string;
  icon: string;
  color: string;
}[] = [
  { slug: "savings",        label: "Savings",        icon: "PiggyBank",  color: "#10B981" },
  { slug: "credit-cards",   label: "Credit Cards",   icon: "CreditCard", color: "#3B82F6" },
  { slug: "investing",      label: "Investing",      icon: "TrendingUp", color: "#C9A84C" },
  { slug: "etfs",           label: "ETFs",           icon: "BarChart2",  color: "#8B5CF6" },
  { slug: "crypto",         label: "Crypto",         icon: "Bitcoin",    color: "#F59E0B" },
  { slug: "market-rundown", label: "Market Rundown", icon: "Activity",   color: "#EF4444" },
  { slug: "career-growth",  label: "Career Growth",  icon: "Briefcase",  color: "#0D2B55" },
  { slug: "mindset",        label: "Mindset",        icon: "Brain",      color: "#06B6D4" },
];

export const modelCategories: {
  slug: ModelCategory;
  label: string;
}[] = [
  { slug: "dcf",                  label: "DCF Valuation"         },
  { slug: "lbo",                  label: "LBO Modeling"          },
  { slug: "comparable-analysis",  label: "Comps Analysis"        },
  { slug: "financial-statements", label: "Financial Statements"  },
  { slug: "merger-model",         label: "Merger Models"         },
  { slug: "credit-analysis",      label: "Credit Analysis"       },
];

export const difficultyLevels: {
  level: DifficultyLevel;
  color: string;
  bg: string;
}[] = [
  { level: "Beginner",     color: "#059669", bg: "#D1FAE5" },
  { level: "Intermediate", color: "#D97706", bg: "#FEF3C7" },
  { level: "Advanced",     color: "#DC2626", bg: "#FEE2E2" },
];
