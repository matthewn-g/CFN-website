import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/articles/ArticleCard";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentEmptyState from "@/components/ui/ContentEmptyState";
import type { ArticleFrontmatter } from "@/types/article";

interface FeaturedArticlesProps {
  articles: ArticleFrontmatter[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <section className="py-20 bg-cfn-cream-dark">
      <div className="section-container">
        <SectionHeader
          title="Featured Articles"
          subtitle="Real talk about money. No jargon, no fluff."
          action={
            <Link
              href="/financial-literacy"
              className="flex items-center gap-1 text-cfn-navy font-semibold text-sm hover:text-cfn-navy-800 transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {articles.length === 0 ? (
          <ContentEmptyState
            title="Articles Coming Soon"
            description="Our team is working on in-depth articles. Check back soon!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} variant="featured" priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
