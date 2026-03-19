import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types/model";

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
}

const styles: Record<DifficultyLevel, string> = {
  Beginner:     "bg-cfn-mid text-cfn-blue-text",
  Intermediate: "bg-cfn-mid text-cfn-blue-text",
  Advanced:     "bg-cfn-mid text-cfn-blue-text",
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
