import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import DualCTABanner from "@/components/home/DualCTABanner";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturedModels from "@/components/home/FeaturedModels";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { getFeaturedArticles, getAllModels } from "@/lib/notion";
import { STATIC_MODELS } from "@/data/staticModels";

export const revalidate = 3600;

async function ArticlesSection() {
  const articles = await getFeaturedArticles();
  return <FeaturedArticles articles={articles} />;
}

async function ModelsSection() {
  const notionModels = await getAllModels();
  const staticSlugs  = new Set(STATIC_MODELS.map((m) => m.slug));
  const all = [
    ...STATIC_MODELS,
    ...notionModels.filter((m) => !staticSlugs.has(m.slug)),
  ];
  const models = all.filter((m) => m.featured).slice(0, 3);
  return <FeaturedModels models={models} />;
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryHighlights />
      <Suspense fallback={
        <section className="py-20 bg-cfn-cream">
          <div className="section-container">
            <div className="h-8 w-48 skeleton rounded mb-10" />
            <SkeletonGrid count={3} />
          </div>
        </section>
      }>
        <ArticlesSection />
      </Suspense>
      <DualCTABanner />
      <Suspense fallback={
        <section className="py-20 bg-cfn-cream-dark">
          <div className="section-container">
            <div className="h-8 w-48 skeleton rounded mb-10" />
            <SkeletonGrid count={3} />
          </div>
        </section>
      }>
        <ModelsSection />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
