import Link from "next/link";
import { Clock, User } from "lucide-react";
import { CategoryBadge } from "@/components/ui/Badge";
import { formatDateShort, cn } from "@/lib/utils";
import type { ArticleFrontmatter } from "@/types/article";

interface ArticleCardProps {
  article: ArticleFrontmatter;
  variant?: "featured" | "compact";
  priority?: boolean;
}

export default function ArticleCard({ article, variant = "featured" }: ArticleCardProps) {
  return (
    <Link
      href={`/financial-literacy/${article.slug}`}
      className={cn(
        "group block bg-white dark:bg-white/5 rounded-card overflow-hidden transition-all duration-200",
        "shadow-card hover:shadow-card-hover hover:-translate-y-1",
        variant === "compact" && "flex gap-4 p-4"
      )}
    >
      {variant === "featured" && (
        <div className="relative aspect-video overflow-hidden bg-cfn-navy-100 dark:bg-white/10">
          {article.coverImage && !article.coverImage.includes("placeholder") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cfn-navy to-cfn-navy-800 flex items-center justify-center">
              <span className="text-cfn-gold/30 text-4xl font-black">CFN</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} />
          </div>
        </div>
      )}

      <div className={cn("p-5", variant === "compact" && "p-0 flex-1")}>
        {variant === "compact" && (
          <CategoryBadge category={article.category} className="mb-2" />
        )}
        <h3 className="font-bold text-cfn-navy dark:text-white text-lg leading-snug group-hover:text-cfn-gold transition-colors line-clamp-2">
          {article.title}
        </h3>
        {variant === "featured" && (
          <p className="mt-2 text-sm text-cfn-muted dark:text-cfn-dark-muted line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 mt-4 text-xs text-cfn-muted dark:text-cfn-dark-muted">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {article.author}
          </span>
          <span>·</span>
          <span>{formatDateShort(article.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
