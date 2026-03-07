import { cn } from "@/lib/utils";
import type { ArticleCategory } from "@/types/article";
import { articleCategories } from "@/data/categories";

interface BadgeProps {
  label: string;
  color?: string;
  className?: string;
  size?: "sm" | "md";
}

export default function Badge({ label, color, className, size = "sm" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold uppercase tracking-wide rounded-full",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className
      )}
      style={
        color
          ? { backgroundColor: `${color}20`, color }
          : { backgroundColor: "#0D2B5520", color: "#0D2B55" }
      }
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
      color={cat?.color}
      className={className}
    />
  );
}
