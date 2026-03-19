import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  centered,
  light,
  className,
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10",
        centered && "text-center",
        className
      )}
    >
      <div className={cn("flex items-end justify-between gap-4", centered && "justify-center flex-col items-center")}>
        <div>
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold tracking-tight",
              light ? "text-white" : "text-cfn-navy"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "mt-3 text-lg",
                light ? "text-white/70" : "text-cfn-muted"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}
