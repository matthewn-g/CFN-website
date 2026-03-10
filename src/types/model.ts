export type ModelCategory =
  | "valuation"
  | "dcf"
  | "lbo"
  | "comparable-analysis"
  | "financial-statements"
  | "merger-model";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface ModelFrontmatter {
  title:        string;
  slug:         string;
  excerpt:      string;
  category:     ModelCategory;
  difficulty:   DifficultyLevel;
  tags:         string[];
  author:       string;
  publishedAt:  string;
  readingTime:  number;
  featured:     boolean;
  coverImage:   string;
  hasTemplate:  boolean;
  templateUrl?: string;
  steps:        number;
  prerequisites: string[];
}

export interface Model extends ModelFrontmatter {
  content: string;
}
