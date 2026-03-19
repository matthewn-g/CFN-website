export default function LoadingModel() {
  return (
    <div className="pt-16">
      <div className="bg-cfn-navy py-16">
        <div className="section-container">
          <div className="skeleton h-6 w-24 rounded-full mb-4 bg-cfn-cream/20" />
          <div className="skeleton h-10 w-3/4 rounded mb-3 bg-cfn-cream/20" />
          <div className="skeleton h-6 w-2/4 rounded bg-cfn-cream/10" />
        </div>
      </div>
      <div className="section-container py-12">
        <div className="max-w-article mx-auto space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`skeleton h-4 rounded ${i % 5 === 4 ? "w-1/2" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
