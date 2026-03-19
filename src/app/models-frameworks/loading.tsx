import { SkeletonGrid } from "@/components/ui/SkeletonCard";

export default function LoadingModels() {
  return (
    <div className="pt-16">
      <div className="bg-cfn-navy py-16">
        <div className="section-container">
          <div className="skeleton h-10 w-72 rounded mb-3 bg-cfn-cream/20" />
          <div className="skeleton h-6 w-96 rounded bg-cfn-cream/10" />
        </div>
      </div>
      <div className="py-12">
        <div className="section-container">
          <div className="flex gap-2 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-28 rounded-full" />
            ))}
          </div>
          <SkeletonGrid count={4} />
        </div>
      </div>
    </div>
  );
}
