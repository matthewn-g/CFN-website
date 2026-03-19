import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug } from "@/lib/notion";
import { generateArticleMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "@/components/ui/Badge";
import ReadingProgress from "@/components/articles/ReadingProgress";
import { Clock, User, Calendar } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);
    return generateArticleMetadata(article);
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  let article;
  try {
    article = await getArticleBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <article className="pt-16">
        {/* Hero */}
        <div className="bg-cfn-navy py-16">
          <div className="section-container max-w-article mx-auto">
            <CategoryBadge category={article.category} className="mb-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="section-container py-12">
          <div className="max-w-article mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-cfn-navy-100 text-cfn-navy rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article content */}
            <div
              className="prose-cfn"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Bottom author card */}
            <div className="mt-16 p-6 bg-cfn-navy-100 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cfn-navy flex items-center justify-center text-cfn-gold font-black text-lg flex-shrink-0">
                {article.author[0]}
              </div>
              <div>
                <p className="font-bold text-cfn-navy">{article.author}</p>
                <p className="text-sm text-cfn-muted">{article.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
