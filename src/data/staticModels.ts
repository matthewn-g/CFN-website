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
    excerpt:     "Master the most foundational valuation method in finance. Project free cash flows, choose a discount rate, and calculate intrinsic value per share, then run it live with our interactive calculator.",
    category:    "dcf",
    difficulty:  "Intermediate",
    tags:        ["Valuation", "DCF", "Free Cash Flow"],
    author:      "CFN",
    publishedAt: "2024-01-01T00:00:00.000Z",
    readingTime: 10,
    featured:    true,
    coverImage:  "/images/models/DCF.jpg",
    hasTemplate: false,
    steps:       5,
    prerequisites: [],
  },
];
