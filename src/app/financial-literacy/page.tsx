import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllArticles, getAllModels } from "@/lib/notion";
import ArticleGrid from "@/components/articles/ArticleGrid";
import CategoryFilter from "@/components/articles/CategoryFilter";
import SearchBar from "@/components/articles/SearchBar";
import ContentEmptyState from "@/components/ui/ContentEmptyState";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Financial Literacy",
  description:
    "Real talk about money. Articles on savings, credit cards, investing, ETFs, crypto, and more, built for Canadian students.",
};

interface PageProps {
  searchParams: { category?: string };
}

async function Articles({ category }: { category?: string }) {
  const [articles, models] = await Promise.all([getAllArticles(), getAllModels()]);
  const filtered = category
    ? articles.filter((a) => a.category === category)
    : articles;

  if (filtered.length === 0) {
    return (
      <ContentEmptyState
        title={category ? `No articles in this category yet` : "Articles Coming Soon"}
        description="Our team is working on content. Check back soon!"
        cta={{ label: "View All Articles", href: "/financial-literacy" }}
      />
    );
  }

  return <ArticleGrid articles={filtered} allArticles={articles} allModels={models} />;
}

export default function FinancialLiteracyPage({ searchParams }: PageProps) {
  const category = searchParams.category;

  return (
    <div className="pt-16">
      {/* Page Hero */}
      <div className="relative overflow-hidden bg-cfn-navy py-16">
        <div className="absolute inset-0 animate-kb-1">
          <Image
            src="/images/articles/creditcard.webp"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-cfn-navy/75" />
        <div className="section-container relative z-10">
          <p className="text-cfn-gold text-sm font-bold uppercase tracking-widest mb-3">Learn</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Financial Literacy
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Real talk about money. No jargon, no fluff, just practical knowledge for every stage of your financial journey.
          </p>
        </div>
      </div>

      {/* Filter + Search row */}
      <Suspense>
        <CategoryFilter />
      </Suspense>

      {/* Search bar */}
      <div className="section-container py-6">
        <Suspense>
          <SearchBarWrapper />
        </Suspense>
      </div>

      {/* Articles grid */}
      <div className="section-container pb-20">
        <Suspense fallback={<SkeletonGrid count={6} />}>
          <Articles category={category} />
        </Suspense>
      </div>
    </div>
  );
}

async function SearchBarWrapper() {
  const [articles, models] = await Promise.all([getAllArticles(), getAllModels()]);
  return <SearchBar articles={articles} models={models} />;
}
