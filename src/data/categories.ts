import type { ArticleCategory } from "@/types/article";
import type { ModelCategory, DifficultyLevel } from "@/types/model";

export const articleCategories: {
  slug: ArticleCategory;
  label: string;
  icon: string;
  color: string;
}[] = [
  { slug: "personal-finance",     label: "Personal Finance",     icon: "PiggyBank",  color: "#10B981" },
  { slug: "investments",          label: "Investments",          icon: "TrendingUp", color: "#8B5CF6" },
  { slug: "market-rundown",       label: "Market Rundown",       icon: "Activity",   color: "#EF4444" },
  { slug: "career-growth",        label: "Career Growth",        icon: "Briefcase",  color: "#0284C7" },
  { slug: "personal-development", label: "Personal Development", icon: "Brain",      color: "#06B6D4" },
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
