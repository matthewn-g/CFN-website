import { BookOpen, LineChart } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DualCTABanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
      {/* Financial Literacy — navy */}
      <div className="bg-cfn-navy flex flex-col justify-center px-8 py-16 lg:px-16">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3">Financial Literacy</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-sm">
          Master your money, one article at a time. From your first credit card to your first ETF.
        </p>
        <Button href="/financial-literacy" variant="outline-white" size="md" className="self-start">
          Start Learning
        </Button>
      </div>

      {/* Models & Frameworks — gold */}
      <div className="bg-cfn-gold flex flex-col justify-center px-8 py-16 lg:px-16">
        <div className="w-12 h-12 rounded-xl bg-cfn-navy/10 flex items-center justify-center mb-5">
          <LineChart className="w-6 h-6 text-cfn-navy" />
        </div>
        <h2 className="text-3xl font-black text-cfn-navy mb-3">Models &amp; Frameworks</h2>
        <p className="text-cfn-navy/70 text-lg leading-relaxed mb-8 max-w-sm">
          Build the skills to land your first finance role. DCF, LBO, comps — start here.
        </p>
        <Button
          href="/models-frameworks"
          variant="secondary"
          size="md"
          className="self-start !border-cfn-navy !text-cfn-navy hover:!bg-cfn-navy hover:!text-white"
        >
          Explore Models
        </Button>
      </div>
    </section>
  );
}
