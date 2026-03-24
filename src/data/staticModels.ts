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
    excerpt:     "Learn how professionals value any business from its future cash flows and with a live calculator to make it real.",
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
];
