import { getAllArticles, getAllModels } from "@/lib/notion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://canadianfinancialnetwork.ca";

export default async function sitemap() {
  let articles: Awaited<ReturnType<typeof getAllArticles>> = [];
  let models: Awaited<ReturnType<typeof getAllModels>> = [];

  try {
    [articles, models] = await Promise.all([getAllArticles(), getAllModels()]);
  } catch {
    // Return static routes on error
  }

  const staticRoutes = [
    { url: `${BASE_URL}`,                   priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: `${BASE_URL}/financial-literacy`,priority: 0.9,  changeFrequency: "daily"   as const },
    { url: `${BASE_URL}/models-frameworks`, priority: 0.9,  changeFrequency: "weekly"  as const },
    { url: `${BASE_URL}/about`,             priority: 0.7,  changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/events`,            priority: 0.8,  changeFrequency: "weekly"  as const },
  ].map((r) => ({ ...r, lastModified: new Date() }));

  const articleRoutes = articles.map((a) => ({
    url: `${BASE_URL}/financial-literacy/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: a.featured ? 0.8 : 0.6,
  }));

  const modelRoutes = models.map((m) => ({
    url: `${BASE_URL}/models-frameworks/${m.slug}`,
    lastModified: new Date(m.publishedAt),
    changeFrequency: "monthly" as const,
    priority: m.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...modelRoutes];
}
