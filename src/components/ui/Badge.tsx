import { cn } from "@/lib/utils";
import type { ArticleCategory } from "@/types/article";
import { articleCategories } from "@/data/categories";

// Navy-family pill: #1C3A5E bg, #C8D8F0 text — consistent across all categories
const PILL_BG   = "#1C3A5E";
const PILL_TEXT = "#C8D8F0";

interface BadgeProps {
  label: string;
  color?: string;  // kept for API compat but ignored — always navy-family
  className?: string;
  size?: "sm" | "md";
}

export default function Badge({ label, className, size = "sm" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wide rounded-full",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className
      )}
      style={{ backgroundColor: PILL_BG, color: PILL_TEXT }}
    >
      {label}
    </span>
  );
}

export function CategoryBadge({
  category,
  className,
}: {
  category: ArticleCategory;
  className?: string;
}) {
  const cat = articleCategories.find((c) => c.slug === category);
  return (
    <Badge
      label={cat?.label ?? category}
      className={className}
    />
  );
}
