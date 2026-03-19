import { FileText } from "lucide-react";
import Button from "./Button";

interface ContentEmptyStateProps {
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
}

export default function ContentEmptyState({
  title = "Content Coming Soon",
  description = "We're working on it. Check back soon or follow us on Instagram for updates.",
  cta,
}: ContentEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-cfn-navy-100 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-cfn-navy/40" />
      </div>
      <h3 className="text-xl font-semibold text-cfn-navy mb-2">{title}</h3>
      <p className="text-cfn-muted max-w-md mb-6">{description}</p>
      {cta && (
        <Button href={cta.href} variant="secondary" size="sm">
          {cta.label}
        </Button>
      )}
    </div>
  );
}
