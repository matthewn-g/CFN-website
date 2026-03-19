"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { articleCategories } from "@/data/categories";
import type { ArticleCategory } from "@/types/article";

interface CategoryFilterProps {
  basePath?: string;
}

export default function CategoryFilter({ basePath = "/financial-literacy" }: CategoryFilterProps) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("category") as ArticleCategory | null;

  const handleSelect = (slug: ArticleCategory | null) => {
    if (slug) {
      router.push(`${basePath}?category=${slug}`);
    } else {
      router.push(basePath);
    }
  };

  return (
    <div className="sticky top-16 z-10 bg-cfn-cream/95 backdrop-blur-sm border-b border-cfn-navy-100 py-3">
      <div className="section-container">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => handleSelect(null)}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors",
              !active
                ? "bg-cfn-navy text-cfn-cream"
                : "bg-cfn-navy-100 text-cfn-navy hover:bg-cfn-navy/20"
            )}
          >
            All
          </button>
          {articleCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleSelect(cat.slug)}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap",
                active === cat.slug
                  ? ""
                  : "bg-cfn-navy-100 text-cfn-navy hover:bg-cfn-navy/20"
              )}
              style={
                active === cat.slug
                  ? { backgroundColor: "#1C3A5E", color: "#C8D8F0" }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
