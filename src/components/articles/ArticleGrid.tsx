import ArticleCard from "./ArticleCard";
import type { ArticleFrontmatter } from "@/types/article";
import type { ModelFrontmatter } from "@/types/model";

interface ArticleGridProps {
  articles: ArticleFrontmatter[];
  allArticles?: ArticleFrontmatter[];
  allModels?: ModelFrontmatter[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <ArticleCard
          key={article.slug}
          article={article}
          variant="featured"
          priority={i < 3}
        />
      ))}
    </div>
  );
}
