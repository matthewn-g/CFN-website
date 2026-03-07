import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ModelCard from "@/components/models/ModelCard";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentEmptyState from "@/components/ui/ContentEmptyState";
import type { ModelFrontmatter } from "@/types/model";

interface FeaturedModelsProps {
  models: ModelFrontmatter[];
}

export default function FeaturedModels({ models }: FeaturedModelsProps) {
  return (
    <section className="py-20 bg-cfn-cream-dark dark:bg-cfn-dark-bg">
      <div className="section-container">
        <SectionHeader
          title="Latest Models &amp; Frameworks"
          subtitle="Build the technical skills finance employers actually want."
          action={
            <Link
              href="/models-frameworks"
              className="flex items-center gap-1 text-cfn-gold font-semibold text-sm hover:text-cfn-gold-light transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          }
        />

        {models.length === 0 ? (
          <ContentEmptyState
            title="Models Coming Soon"
            description="We're building comprehensive financial model tutorials. Stay tuned!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
