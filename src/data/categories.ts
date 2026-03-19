import type { ArticleCategory } from "@/types/article";
import type { ModelCategory, DifficultyLevel } from "@/types/model";

// All categories use the navy-family palette: #1C3A5E bg / #C8D8F0 text
const CFN_MID = "#1C3A5E";

export const articleCategories: {
  slug: ArticleCategory;
  label: string;
  icon: string;
  color: string;
}[] = [
  { slug: "personal-finance",     label: "Personal Finance",     icon: "PiggyBank",  color: CFN_MID },
  { slug: "investments",          label: "Investments",          icon: "TrendingUp", color: CFN_MID },
  { slug: "market-rundown",       label: "Market Rundown",       icon: "Activity",   color: CFN_MID },
  { slug: "career-growth",        label: "Career Growth",        icon: "Briefcase",  color: CFN_MID },
  { slug: "personal-development", label: "Personal Development", icon: "Brain",      color: CFN_MID },
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
];

// Difficulty levels use navy-family only
export const difficultyLevels: {
  level: DifficultyLevel;
  color: string;
  bg: string;
}[] = [
  { level: "Beginner",     color: "#C8D8F0", bg: "#1C3A5E" },
  { level: "Intermediate", color: "#C8D8F0", bg: "#1C3A5E" },
  { level: "Advanced",     color: "#C8D8F0", bg: "#1C3A5E" },
];
