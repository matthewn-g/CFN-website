import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllModels } from "@/lib/notion";
import ModelGrid from "@/components/models/ModelGrid";
import DifficultyFilter from "@/components/models/DifficultyFilter";
import ContentEmptyState from "@/components/ui/ContentEmptyState";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import type { DifficultyLevel } from "@/types/model";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Models & Frameworks",
  description:
    "Build the technical skills to land your first finance role. DCF, LBO, comps, financial statements — step-by-step tutorials built for Canadian students.",
};

interface PageProps {
  searchParams: { difficulty?: string; category?: string };
}

async function Models({ difficulty, category }: { difficulty?: string; category?: string }) {
  const all = await getAllModels();
  let filtered = all;
  if (difficulty) filtered = filtered.filter((m) => m.difficulty === difficulty);
  if (category)   filtered = filtered.filter((m) => m.category === category);

  if (filtered.length === 0) {
    return (
      <ContentEmptyState
        title="No models match these filters"
        description="Try a different combination of difficulty and category."
        cta={{ label: "View All Models", href: "/models-frameworks" }}
      />
    );
  }

  return <ModelGrid models={filtered} />;
}

export default function ModelsPage({ searchParams }: PageProps) {
  const difficulty = searchParams.difficulty as DifficultyLevel | undefined;
  const category = searchParams.category;

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-cfn-navy py-16">
        <div className="absolute inset-0 animate-kb-1">
          <Image
            src="/images/models/wallstreet-bull.webp"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-cfn-navy/75" />
        <div className="section-container relative z-10">
          <p className="text-cfn-gold text-sm font-bold uppercase tracking-widest mb-3">
            Technical Skills
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Models &amp; Frameworks
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            The technical toolkit for breaking into finance. Build DCF models, LBO analyses, and more — all explained from first principles.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-cfn-navy-100 dark:border-white/10 py-4">
        <div className="section-container">
          <Suspense>
            <DifficultyFilter />
          </Suspense>
        </div>
      </div>

      {/* Grid */}
      <div className="section-container py-12 pb-20">
        <Suspense fallback={<SkeletonGrid count={4} />}>
          <Models difficulty={difficulty} category={category} />
        </Suspense>
      </div>
    </div>
  );
}
