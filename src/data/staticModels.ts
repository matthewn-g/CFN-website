import type { ModelFrontmatter } from "@/types/model";

/**
 * Hardcoded model cards that always appear in listings regardless of Notion
 * content. Each entry is deduped against any Notion entry sharing the same
 * slug so the static version always wins.
 */
export const STATIC_MODELS: ModelFrontmatter[] = [
  {
    title:       "DCF Valuation",
    slug:        "dcf-valuation",
    excerpt:     "Learn how professionals value any business, then try it yourself with a live calculator.",
    category:    "dcf",
    difficulty:  "Intermediate",
    tags:        ["Valuation", "DCF", "Live Calculator"],
    author:      "CFN",
    publishedAt: "2024-01-01T00:00:00.000Z",
    readingTime: 10,
    featured:    true,
    coverImage:  "/images/models/DCF.jpg",
    hasTemplate: false,
    steps:       5,
    prerequisites: [],
  },
  {
    title:       "Financial Statements",
    slug:        "financial-statements",
    excerpt:     "Master the Income Statement, Balance Sheet, and Cash Flow Statement, and learn how the three connect to tell a company's full financial story.",
    category:    "financial-statements",
    difficulty:  "Beginner",
    tags:        ["Accounting", "Financial Statements", "Fundamentals"],
    author:      "CFN",
    publishedAt: "2024-01-01T00:00:00.000Z",
    readingTime: 12,
    featured:    true,
    coverImage:  "/images/models/Financial statements.jpg",
    hasTemplate: false,
    steps:       3,
    prerequisites: [],
  },
];
