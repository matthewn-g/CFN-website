import ModelCard from "./ModelCard";
import type { ModelFrontmatter } from "@/types/model";

interface ModelGridProps {
  models: ModelFrontmatter[];
}

export default function ModelGrid({ models }: ModelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <ModelCard key={model.slug} model={model} />
      ))}
    </div>
  );
}
