export default function LoadingArticle() {
  return (
    <div className="pt-16">
      <div className="bg-cfn-navy h-64 skeleton" />
      <div className="section-container py-12">
        <div className="max-w-article mx-auto space-y-4">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-8 w-3/4 rounded" />
          <div className="skeleton h-8 w-2/3 rounded" />
          <div className="flex gap-4">
            <div className="skeleton h-4 w-24 rounded" />
            <div className="skeleton h-4 w-32 rounded" />
          </div>
          <div className="pt-8 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`skeleton h-4 rounded ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
