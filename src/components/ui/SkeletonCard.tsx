export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-white/5 rounded-card overflow-hidden shadow-card">
      <div className="skeleton aspect-video w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-6 w-2/3 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="flex gap-4 pt-2">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
