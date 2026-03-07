import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types/model";

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
}

const styles: Record<DifficultyLevel, string> = {
  Beginner:     "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced:     "bg-red-100 text-red-700",
};

export default function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold text-xs px-2.5 py-1 rounded-full uppercase tracking-wide",
        styles[level],
        className
      )}
    >
      {level}
    </span>
  );
}
