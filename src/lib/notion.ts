import { Client } from "@notionhq/client";
import type { ArticleFrontmatter } from "@/types/article";
import type { ModelFrontmatter } from "@/types/model";
import type { CFNEvent } from "@/types/event";
import type { EventFormat, EventStatus, EventSpeaker } from "@/types/event";

export const revalidate = 3600;

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProperty(page: any, name: string): any {
  return page.properties?.[name];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageToArticle(page: any): ArticleFrontmatter {
  const props = page.properties;
  return {
    title:       props.Title?.title?.[0]?.plain_text ?? "",
    slug:        props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    excerpt:     props.Excerpt?.rich_text?.[0]?.plain_text ?? "",
    category:    props.Category?.select?.name?.toLowerCase().replace(/ /g, "-") ?? "personal-finance",
    tags:        props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
    author:      props.Author?.rich_text?.[0]?.plain_text ?? "CFN Team",
    authorRole:  props.AuthorRole?.rich_text?.[0]?.plain_text ?? "CFN Research",
    publishedAt: props["Published At"]?.date?.start ?? new Date().toISOString(),
    readingTime: props["Reading Time"]?.number ?? 5,
    featured:    props.Featured?.checkbox ?? false,
    coverImage:  props["Cover Image URL"]?.url ?? props["Cover Image URL"]?.rich_text?.[0]?.plain_text ?? "/images/articles/default.jpg",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageToModel(page: any): ModelFrontmatter {
  const props = page.properties;
  return {
    title:        props.Title?.title?.[0]?.plain_text ?? "",
    slug:         props.Slug?.rich_text?.[0]?.plain_text ?? page.id,
    excerpt:      props.Excerpt?.rich_text?.[0]?.plain_text ?? "",
    category:     props.Category?.select?.name?.toLowerCase().replace(" ", "-") ?? "valuation",
    difficulty:   props.Difficulty?.select?.name ?? "Beginner",
    tags:         props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
    author:       props.Author?.rich_text?.[0]?.plain_text ?? "CFN Team",
    publishedAt:  props["Published At"]?.date?.start ?? new Date().toISOString(),
    readingTime:  props["Reading Time"]?.number ?? 15,
    featured:     props.Featured?.checkbox ?? false,
    coverImage:   props["Cover Image URL"]?.url ?? props["Cover Image URL"]?.rich_text?.[0]?.plain_text ?? "/images/models/default.jpg",
    hasTemplate:  props["Has Template"]?.checkbox ?? false,
    templateUrl:  props["Template URL"]?.url ?? props["Template URL"]?.rich_text?.[0]?.plain_text,
    steps:        props.Steps?.number ?? 5,
    prerequisites:props.Prerequisites?.multi_select?.map((t: { name: string }) => t.name) ?? [],
  };
}

export async function getAllArticles(): Promise<ArticleFrontmatter[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ARTICLES) {
    return [];
  }
  try {
    const db = await notion.databases.query({
      database_id: process.env.NOTION_DB_ARTICLES,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Published At", direction: "descending" }],
    });
    return db.results.map(mapPageToArticle);
  } catch (err) {
    console.error("Notion articles fetch failed:", err);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<ArticleFrontmatter[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.featured).slice(0, 3);
}

export async function getArticleBySlug(slug: string): Promise<ArticleFrontmatter & { content: string }> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_ARTICLES) {
    throw new Error(`Article not found: ${slug}`);
  }
  const pages = await notion.databases.query({
    database_id: process.env.NOTION_DB_ARTICLES!,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  if (!pages.results.length) throw new Error(`Article not found: ${slug}`);
  const page = pages.results[0];
  const article = mapPageToArticle(page);
  const blocks = await notion.blocks.children.list({ block_id: page.id });
  const content = renderBlocksToHtml(blocks.results);
  return { ...article, content };
}

export async function getAllModels(): Promise<ModelFrontmatter[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_MODELS) {
    return [];
  }
  try {
    const db = await notion.databases.query({
      database_id: process.env.NOTION_DB_MODELS,
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Published At", direction: "descending" }],
    });
    return db.results.map(mapPageToModel);
  } catch (err) {
    console.error("Notion models fetch failed:", err);
    return [];
  }
}

export async function getModelBySlug(slug: string): Promise<ModelFrontmatter & { content: string }> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_MODELS) {
    throw new Error(`Model not found: ${slug}`);
  }
  const pages = await notion.databases.query({
    database_id: process.env.NOTION_DB_MODELS!,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  if (!pages.results.length) throw new Error(`Model not found: ${slug}`);
  const page = pages.results[0];
  const model = mapPageToModel(page);
  const blocks = await notion.blocks.children.list({ block_id: page.id });
  const content = renderBlocksToHtml(blocks.results);
  return { ...model, content };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageToEvent(page: any): CFNEvent {
  const props = page.properties;
  const speakerName = props["Speaker Name"]?.rich_text?.[0]?.plain_text;
  const speakerRole = props["Speaker Role"]?.rich_text?.[0]?.plain_text;
  const speakers: EventSpeaker[] = speakerName
    ? [{ name: speakerName, role: speakerRole ?? "" }]
    : [];
  return {
    id:           page.id,
    title:        props["CFN Events"]?.title?.[0]?.plain_text ?? "",
    description:  props.Description?.rich_text?.[0]?.plain_text ?? "",
    date:         props.Date?.date?.start ?? new Date().toISOString(),
    duration:     props.Duration?.number ?? 60,
    format:       (props.Format?.select?.name?.toLowerCase() as EventFormat) ?? "webinar",
    status:       (props.Status?.select?.name?.toLowerCase().replace(" ", "-") as EventStatus) ?? "upcoming",
    speakers,
    coverImage:   props["Cover Image URL"]?.rich_text?.[0]?.plain_text ?? "",
    tags:         props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
    lumaUrl:      props["Registration URL"]?.url ?? undefined,
    recordingUrl: props["Recording URL"]?.files?.[0]?.file?.url ?? props["Recording URL"]?.files?.[0]?.external?.url ?? undefined,
  };
}

export async function getAllEvents(): Promise<CFNEvent[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DB_EVENTS) {
    return [];
  }
  try {
    const db = await notion.databases.query({
      database_id: process.env.NOTION_DB_EVENTS,
      filter: { property: "CFN Events", title: { is_not_empty: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });
    return db.results.map(mapPageToEvent);
  } catch (err) {
    console.error("Notion events fetch failed:", err);
    return [];
  }
}

// Simple Notion block → HTML renderer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlocksToHtml(blocks: any[]): string {
  return blocks.map((block) => {
    const type = block.type;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const richText = (arr: any[]) => arr?.map((t: any) => {
      let text = t.plain_text;
      if (t.annotations?.bold)   text = `<strong>${text}</strong>`;
      if (t.annotations?.italic) text = `<em>${text}</em>`;
      if (t.annotations?.code)   text = `<code>${text}</code>`;
      if (t.href) text = `<a href="${t.href}">${text}</a>`;
      return text;
    }).join("") ?? "";

    switch (type) {
      case "heading_1": return `<h1>${richText(block.heading_1.rich_text)}</h1>`;
      case "heading_2": return `<h2>${richText(block.heading_2.rich_text)}</h2>`;
      case "heading_3": return `<h3>${richText(block.heading_3.rich_text)}</h3>`;
      case "paragraph": return `<p>${richText(block.paragraph.rich_text)}</p>`;
      case "bulleted_list_item": return `<li>${richText(block.bulleted_list_item.rich_text)}</li>`;
      case "numbered_list_item": return `<li>${richText(block.numbered_list_item.rich_text)}</li>`;
      case "quote":     return `<blockquote>${richText(block.quote.rich_text)}</blockquote>`;
      case "code":      return `<pre><code>${block.code.rich_text?.[0]?.plain_text ?? ""}</code></pre>`;
      case "callout":   return `<div class="callout"><p>${richText(block.callout.rich_text)}</p></div>`;
      case "divider":   return `<hr />`;
      case "image": {
        const url = block.image?.file?.url ?? block.image?.external?.url ?? "";
        const caption = richText(block.image?.caption ?? []);
        return `<figure><img src="${url}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`;
      }
      default: return "";
    }
  }).join("\n");
}

void getProperty; // suppress unused warning
