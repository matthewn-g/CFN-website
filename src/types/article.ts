export type ArticleCategory =
  | "savings"
  | "credit-cards"
  | "investing"
  | "etfs"
  | "crypto"
  | "market-rundown"
  | "career-growth"
  | "mindset";

export interface ArticleFrontmatter {
  title:       string;
  slug:        string;
  excerpt:     string;
  category:    ArticleCategory;
  tags:        string[];
  author:      string;
  authorRole:  string;
  publishedAt: string;
  updatedAt?:  string;
  readingTime: number;
  featured:    boolean;
  coverImage:  string;
}

export interface Article extends ArticleFrontmatter {
  content:      string;
  relatedSlugs: string[];
}
