"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types/model";
import { modelCategories } from "@/data/categories";

const difficulties: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];
const difficultyColors: Record<DifficultyLevel, string> = {
  Beginner:     "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced:     "bg-red-100 text-red-700",
};

export default function DifficultyFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const activeDiff = params.get("difficulty") as DifficultyLevel | null;
  const activeCat = params.get("category");

  const buildUrl = (diff: DifficultyLevel | null, cat: string | null) => {
    const p = new URLSearchParams();
    if (diff) p.set("difficulty", diff);
    if (cat)  p.set("category", cat);
    const q = p.toString();
    return `/models-frameworks${q ? `?${q}` : ""}`;
  };

  return (
    <div className="space-y-3">
      {/* Difficulty */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-cfn-muted">
          Difficulty:
        </span>
        <button
          onClick={() => router.push(buildUrl(null, activeCat))}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
            !activeDiff
              ? "bg-cfn-navy text-white"
              : "bg-cfn-navy-100 text-cfn-navy hover:bg-cfn-navy/20"
          )}
        >
          All
        </button>
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => router.push(buildUrl(d, activeCat))}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
              activeDiff === d
                ? difficultyColors[d]
                : "bg-cfn-navy-100 text-cfn-navy hover:bg-cfn-navy/20"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Category */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-cfn-muted">
          Category:
        </span>
        <button
          onClick={() => router.push(buildUrl(activeDiff, null))}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
            !activeCat
              ? "bg-cfn-navy text-white"
              : "bg-cfn-navy-100 text-cfn-navy hover:bg-cfn-navy/20"
          )}
        >
          All
        </button>
        {modelCategories.map((c) => (
          <button
            key={c.slug}
            onClick={() => router.push(buildUrl(activeDiff, c.slug))}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
              activeCat === c.slug
                ? "bg-cfn-navy text-white"
                : "bg-cfn-navy-100 text-cfn-navy hover:bg-cfn-navy/20"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
