import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export default function LoadingFinancialLiteracy() {
  return (
    <div className="pt-16">
      {/* Hero skeleton */}
      <div className="bg-cfn-navy py-16">
        <div className="section-container">
          <div className="skeleton h-10 w-64 rounded mb-3 bg-white/20" />
          <div className="skeleton h-6 w-96 rounded bg-white/10" />
        </div>
      </div>
      {/* Filter skeleton */}
      <div className="border-b border-cfn-navy-100 py-3">
        <div className="section-container flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="py-12">
        <div className="section-container">
          <SkeletonGrid count={6} />
        </div>
      </div>
    </div>
  );
}
