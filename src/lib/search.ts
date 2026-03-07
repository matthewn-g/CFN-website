import Fuse, { type IFuseOptions } from "fuse.js";
import type { ArticleFrontmatter } from "@/types/article";
import type { ModelFrontmatter } from "@/types/model";

export type SearchResult =
  | ({ type: "article" } & ArticleFrontmatter)
  | ({ type: "model" } & ModelFrontmatter);

const fuseOptions: IFuseOptions<SearchResult> = {
  keys: [
    { name: "title",   weight: 0.5 },
    { name: "excerpt", weight: 0.3 },
    { name: "tags",    weight: 0.2 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
};

export function createSearchIndex(
  articles: ArticleFrontmatter[],
  models: ModelFrontmatter[]
): Fuse<SearchResult> {
  const combined: SearchResult[] = [
    ...articles.map((a) => ({ ...a, type: "article" as const })),
    ...models.map((m) => ({ ...m, type: "model" as const })),
  ];
  return new Fuse(combined, fuseOptions);
}

export function getResultUrl(result: SearchResult): string {
  if (result.type === "article") return `/financial-literacy/${result.slug}`;
  return `/models-frameworks/${result.slug}`;
}
