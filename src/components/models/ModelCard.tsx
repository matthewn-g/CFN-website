import Link from "next/link";
import { Clock, Download, ChevronRight } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";
import { cn } from "@/lib/utils";
import type { ModelFrontmatter } from "@/types/model";

interface ModelCardProps {
  model: ModelFrontmatter;
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link
      href={`/models-frameworks/${model.slug}`}
      className={cn(
        "group block bg-white dark:bg-white/5 rounded-card overflow-hidden transition-all duration-200",
        "shadow-card hover:shadow-card-hover hover:-translate-y-1"
      )}
    >
      {/* Cover */}
      <div className="relative aspect-video overflow-hidden bg-cfn-navy">
        <div className="w-full h-full bg-gradient-to-br from-cfn-navy to-cfn-navy-800 flex items-center justify-center">
          <div className="text-center">
            <span className="text-cfn-gold/20 text-5xl font-black block">
              {model.category.toUpperCase().slice(0, 3)}
            </span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <DifficultyBadge level={model.difficulty} />
        </div>
        {model.hasTemplate && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-cfn-gold/90 text-cfn-navy text-xs font-bold rounded-full">
            <Download className="w-3 h-3" />
            Template
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-cfn-navy dark:text-white text-lg leading-snug group-hover:text-cfn-gold transition-colors line-clamp-2 mb-2">
          {model.title}
        </h3>
        <p className="text-sm text-cfn-muted dark:text-cfn-dark-muted line-clamp-2 leading-relaxed mb-4">
          {model.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {model.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-cfn-navy-100 dark:bg-white/10 text-cfn-navy dark:text-white/70 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-cfn-muted dark:text-cfn-dark-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {model.readingTime} min · {model.steps} steps
          </span>
          <span className="flex items-center gap-0.5 text-cfn-gold font-semibold group-hover:gap-1.5 transition-all">
            Start <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
