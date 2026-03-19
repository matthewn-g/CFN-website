import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllModels, getModelBySlug } from "@/lib/notion";
import { generateModelMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import DifficultyBadge from "@/components/models/DifficultyBadge";
import StepProgress from "@/components/models/StepProgress";
import ReadingProgress from "@/components/articles/ReadingProgress";
import Button from "@/components/ui/Button";
import { Clock, Download, CheckCircle } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const models = await getAllModels();
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const model = await getModelBySlug(params.slug);
    return generateModelMetadata(model);
  } catch {
    return { title: "Model Not Found" };
  }
}

export default async function ModelPage({ params }: PageProps) {
  let model;
  try {
    model = await getModelBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <article className="pt-16">
        {/* Hero */}
        <div className="bg-cfn-navy py-16">
          <div className="section-container max-w-[900px] mx-auto">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <DifficultyBadge level={model.difficulty} className="mb-4" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  {model.title}
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-2xl">
                  {model.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {model.readingTime} min · {model.steps} steps
                  </span>
                  <span>{formatDate(model.publishedAt)}</span>
                </div>
              </div>
              {model.hasTemplate && model.templateUrl && (
                <Button
                  href={model.templateUrl}
                  variant="primary"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Download Excel Template
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {model.prerequisites.length > 0 && (
          <div className="border-b border-cfn-navy-100 bg-cfn-cream-dark">
            <div className="section-container max-w-[900px] mx-auto py-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-cfn-navy uppercase tracking-wide">
                  Prerequisites:
                </span>
                {model.prerequisites.map((p) => (
                  <span key={p} className="flex items-center gap-1 text-sm text-cfn-muted">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step progress */}
        <div className="section-container max-w-[900px] mx-auto pt-8">
          <p className="text-sm font-bold text-cfn-muted uppercase tracking-wide mb-2">
            Tutorial Progress
          </p>
          <StepProgress current={0} total={model.steps} />
        </div>

        {/* Content */}
        <div className="section-container max-w-[900px] mx-auto pb-20">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {model.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-cfn-navy-100 text-cfn-navy rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="prose-cfn"
            dangerouslySetInnerHTML={{ __html: model.content }}
          />

          {/* Template CTA at bottom */}
          {model.hasTemplate && model.templateUrl && (
            <div className="mt-12 p-6 bg-cfn-gold/10 border border-cfn-gold/30 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cfn-gold/20 flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-cfn-gold" />
              </div>
              <div>
                <p className="font-bold text-cfn-navy mb-1">
                  Ready to practice? Download the Excel template.
                </p>
                <p className="text-sm text-cfn-muted mb-3">
                  Apply what you&apos;ve learned with a pre-built template that follows along with this tutorial.
                </p>
                <Button
                  href={model.templateUrl}
                  variant="primary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Download Free Template
                </Button>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
