import type { Metadata } from "next";
import type { ArticleFrontmatter } from "@/types/article";
import type { ModelFrontmatter } from "@/types/model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://canadianfinancialnetwork.ca";

export function generateArticleMetadata(article: ArticleFrontmatter): Metadata {
  return {
    title:       article.title,
    description: article.excerpt,
    openGraph: {
      title:       article.title,
      description: article.excerpt,
      type:        "article",
      publishedTime: article.publishedAt,
      authors:     [article.author],
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
    alternates: { canonical: `${BASE_URL}/financial-literacy/${article.slug}` },
  };
}

export function generateModelMetadata(model: ModelFrontmatter): Metadata {
  return {
    title:       model.title,
    description: model.excerpt,
    openGraph: {
      title:       model.title,
      description: model.excerpt,
      type:        "article",
      images: [{ url: model.coverImage, width: 1200, height: 630, alt: model.title }],
    },
    twitter: { card: "summary_large_image", title: model.title, description: model.excerpt },
    alternates: { canonical: `${BASE_URL}/models-frameworks/${model.slug}` },
  };
}
