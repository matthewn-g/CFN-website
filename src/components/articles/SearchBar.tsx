"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { createSearchIndex, getResultUrl, type SearchResult } from "@/lib/search";
import type { ArticleFrontmatter } from "@/types/article";
import type { ModelFrontmatter } from "@/types/model";

interface SearchBarProps {
  articles: ArticleFrontmatter[];
  models: ModelFrontmatter[];
}

export default function SearchBar({ articles, models }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const index = createSearchIndex(articles, models);
      const raw = index.search(query);
      setResults(raw.map((r) => r.item).slice(0, 8));
    }, 300);
    return () => clearTimeout(timer);
  }, [query, articles, models]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cfn-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search articles and models..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-cfn-navy-100 bg-cfn-cream text-cfn-charcoal placeholder:text-cfn-muted focus:outline-none focus:border-cfn-navy focus:ring-1 focus:ring-cfn-navy/30 transition-colors text-sm"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setResults([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cfn-muted hover:text-cfn-charcoal transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cfn-cream border border-cfn-navy-100 rounded-xl shadow-card-hover z-20 overflow-hidden">
          <div className="p-2">
            <p className="text-xs text-cfn-muted px-2 py-1 mb-1">
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            {results.map((result) => (
              <button
                key={result.slug}
                onClick={() => {
                  router.push(getResultUrl(result));
                  setQuery("");
                  setOpen(false);
                }}
                className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-cfn-navy-100 transition-colors group"
              >
                <span className="flex-shrink-0 text-xs font-bold uppercase px-2 py-0.5 rounded mt-0.5 bg-cfn-navy-100 text-cfn-muted">
                  {result.type === "article" ? "Article" : "Model"}
                </span>
                <div>
                  <p className="text-sm font-semibold text-cfn-charcoal group-hover:text-cfn-navy line-clamp-1">
                    {result.title}
                  </p>
                  <p className="text-xs text-cfn-muted line-clamp-1 mt-0.5">
                    {result.excerpt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cfn-cream border border-cfn-navy-100 rounded-xl shadow-card-hover z-20 p-4 text-center">
          <p className="text-sm text-cfn-muted">
            No results for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
