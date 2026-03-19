"use client";

import { cn } from "@/lib/utils";

interface StepProgressProps {
  current: number;
  total: number;
}

export default function StepProgress({ current, total }: StepProgressProps) {
  return (
    <div className="flex items-center gap-2 my-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
              i + 1 <= current
                ? "bg-cfn-navy text-cfn-cream"
                : i + 1 === current + 1
                ? "bg-cfn-navy-100 text-cfn-navy border-2 border-cfn-navy"
                : "bg-cfn-navy-100 text-cfn-muted"
            )}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5",
                i + 1 < current ? "bg-cfn-navy" : "bg-cfn-navy-100"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
