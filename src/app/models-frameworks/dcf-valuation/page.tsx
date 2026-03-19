import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, BookOpen, TrendingUp, Target } from "lucide-react";
import DCFCalculator from "@/components/models/DCFCalculator";

export const metadata: Metadata = {
  title: "DCF Valuation | Models & Frameworks",
  description:
    "Learn how to build a Discounted Cash Flow model from scratch, then run one live. Project cash flows, choose a discount rate, and calculate intrinsic value per share.",
};

/* ─── Static worked example values (defaults: $100M sales, 5% growth, 10% EBIT, 8% WACC, 2% g) ── */
const EX = {
  y0:  { sales: "100.00" },
  y1:  { sales: "105.00", ebit: "10.50", nopat: "7.35",  da: "2.10",  capex: "(3.15)", dnwc: "(0.25)", fcf: "6.05", pv: "5.60" },
  y2:  { sales: "110.25", ebit: "11.03", nopat: "7.72",  da: "2.21",  capex: "(3.31)", dnwc: "(0.26)", fcf: "6.36", pv: "5.45" },
  y3:  { sales: "115.76", ebit: "11.58", nopat: "8.10",  da: "2.32",  capex: "(3.47)", dnwc: "(0.28)", fcf: "6.67", pv: "5.29" },
  sum: "16.34",
  tv:  "113.39",
  pvtv:"90.01",
  ev:  "106.35",
  eq:  "76.35",
  pps: "$7.64",
};

const KEY_TERMS = [
  { term: "Free Cash Flow (FCF)",      def: "Cash the business generates after operating costs and investments. This is what gets discounted back to today." },
  { term: "WACC",                      def: "Weighted Average Cost of Capital: the minimum return investors require. Higher risk means a higher WACC." },
  { term: "Discount Rate",             def: "Applied to convert future cash flows into present value. Usually set equal to WACC." },
  { term: "Terminal Value (TV)",        def: "Lump-sum value of all cash flows beyond the projection window. Typically 60–80% of total enterprise value." },
  { term: "Perpetual Growth Rate (g)", def: "Assumed annual FCF growth rate into infinity. Must stay below long-run GDP growth (≤ 3%)." },
  { term: "NOPAT",                     def: "Net Operating Profit After Tax: EBIT × (1 − Tax Rate). The pre-cash starting point for FCF." },
  { term: "Enterprise Value (EV)",     def: "Total value of the business (debt + equity). Sum of PV of FCFs plus PV of Terminal Value." },
  { term: "Net Present Value (NPV)",   def: "Sum of all discounted future cash flows. A positive NPV implies the asset generates value above the required return." },
  { term: "Bridge to Equity",          def: "EV minus Net Debt, divided by shares outstanding. Converts enterprise value into intrinsic value per share." },
];

const STEPS: Array<{
  num: string;
  title: string;
  body: string;
  formulaHtml: string;
  vars: Array<{ symHtml: string; def: string }>;
}> = [
  {
    num: "01",
    title: "Project Revenue & EBIT",
    body: "Forecast revenue for 3–5 years using an assumed growth rate. Apply your EBIT margin to derive operating profit. Use historical performance as a starting point, then adjust for sector trends.",
    formulaHtml: "Sales<sub>n</sub> = Sales<sub>0</sub> × (1 + g<sub>rev</sub>)<sup>n</sup><br>EBIT<sub>n</sub>  = Sales<sub>n</sub> × EBIT Margin",
    vars: [
      { symHtml: "Sales<sub>0</sub>", def: "Base year (Year 0) revenue" },
      { symHtml: "g<sub>rev</sub>",   def: "Annual revenue growth rate" },
      { symHtml: "n",                 def: "Forecast year number (1, 2, 3 …)" },
      { symHtml: "EBIT<sub>n</sub>",  def: "Earnings Before Interest & Tax in year n" },
    ],
  },
  {
    num: "02",
    title: "Convert EBIT to Free Cash Flow",
    body: "Adjust for taxes, add back non-cash D&A, subtract capital expenditures, and account for changes in working capital. FCF is what the business can actually return to investors.",
    formulaHtml: "FCF   = NOPAT + D&amp;A − CAPEX − ΔNWC<br>NOPAT = EBIT × (1 − Tax Rate)",
    vars: [
      { symHtml: "NOPAT", def: "Net Operating Profit After Tax: EBIT × (1 − Tax Rate)" },
      { symHtml: "D&amp;A",   def: "Depreciation & Amortization, a non-cash item added back to FCF" },
      { symHtml: "CAPEX", def: "Capital Expenditures: reinvestment spending" },
      { symHtml: "ΔNWC",  def: "Change in Net Working Capital" },
    ],
  },
  {
    num: "03",
    title: "Choose a Discount Rate (WACC)",
    body: "WACC blends the required returns for all capital providers: equity holders and debt holders. A higher-risk business demands a higher WACC, which shrinks the PV of future cash flows.",
    formulaHtml: "WACC = (W<sub>e</sub> × K<sub>e</sub>) + (W<sub>d</sub> × K<sub>d</sub> × (1 − T))",
    vars: [
      { symHtml: "W<sub>e</sub>", def: "Weight of equity in the capital structure" },
      { symHtml: "K<sub>e</sub>", def: "Cost of equity (e.g. derived via CAPM)" },
      { symHtml: "W<sub>d</sub>", def: "Weight of debt in the capital structure" },
      { symHtml: "K<sub>d</sub>", def: "Pre-tax cost of debt" },
      { symHtml: "T",             def: "Corporate tax rate" },
    ],
  },
  {
    num: "04",
    title: "Calculate Terminal Value",
    body: "Because you can't forecast forever, assume FCFs grow at a stable perpetual rate after Year 3. The Gordon Growth Model converts this into a single lump-sum terminal value. WACC must exceed g.",
    formulaHtml: "TV              = FCF<sub>final</sub> × (1 + g) ÷ (WACC − g)<br>PV<sub>TV</sub> = TV ÷ (1 + WACC)³",
    vars: [
      { symHtml: "FCF<sub>final</sub>", def: "Free Cash Flow in the final forecast year" },
      { symHtml: "g",                   def: "Perpetual growth rate, must be less than WACC" },
      { symHtml: "PV<sub>TV</sub>",     def: "Present value of Terminal Value discounted to today" },
    ],
  },
  {
    num: "05",
    title: "Bridge to Equity Value per Share",
    body: "Sum the discounted FCFs and the PV of Terminal Value to get Enterprise Value. Subtract net debt to get equity value, then divide by diluted shares outstanding.",
    formulaHtml: "EV    = Σ PV(FCFs) + PV<sub>TV</sub><br>Price = (EV − Net Debt) ÷ Shares",
    vars: [
      { symHtml: "EV",               def: "Enterprise Value: total value of the business" },
      { symHtml: "Σ PV(FCFs)",       def: "Sum of all discounted Free Cash Flows" },
      { symHtml: "PV<sub>TV</sub>",  def: "Discounted Terminal Value" },
      { symHtml: "Net Debt",         def: "Total debt minus cash and equivalents" },
    ],
  },
];

const TOC = [
  { href: "#what-is-dcf",    label: "What is a DCF?" },
  { href: "#key-terms",      label: "Key Terms" },
  { href: "#five-steps",     label: "The 5 Steps" },
  { href: "#worked-example", label: "Worked Example" },
  { href: "#calculator",     label: "Live Calculator" },
  { href: "#verdict",        label: "What To Do" },
  { href: "#tips",           label: "Tips" },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function DCFValuationPage() {
  return (
    <div className="pt-16">

      {/* ── Hero ── */}
      <div className="bg-cfn-navy py-14">
        <div className="section-container max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-cfn-cream/50 text-sm mb-6">
            <Link href="/" className="hover:text-cfn-cream transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/models-frameworks" className="hover:text-cfn-cream transition-colors">Models &amp; Frameworks</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cfn-blue-text">DCF Valuation</span>
          </nav>

          <div className="flex flex-wrap items-start gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cfn-navy-100 text-cfn-navy">
              Valuation
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-cfn-navy-100 text-cfn-navy">
              Intermediate
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-cfn-cream leading-tight mb-4">
            DCF Valuation
          </h1>
          <p className="text-cfn-cream/70 text-lg max-w-2xl leading-relaxed mb-6">
            Learn the most foundational valuation method in finance, then run one live. Input your own assumptions
            and see intrinsic value calculate in real time.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-cfn-cream/50 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />~10 min read</span>
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />5 steps</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" />Interactive calculator</span>
          </div>
        </div>
      </div>

      {/* ── Body: main content + sidebar ── */}
      <div className="section-container max-w-[1100px] mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">

          {/* ══ Main column ══ */}
          <div className="space-y-16 min-w-0">

            {/* Section 1 — What is a DCF */}
            <section id="what-is-dcf">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                  What is a DCF &amp; Why Use It?
                </h2>
              </div>

              <div className="space-y-4 text-cfn-charcoal leading-relaxed mb-8">
                <p>
                  A Discounted Cash Flow (DCF) is a valuation method that estimates what an investment is worth
                  today based on how much cash it&apos;s expected to generate in the future. You forecast
                  those future cash flows, then &ldquo;discount&rdquo; them back to present value using a
                  required rate of return.
                </p>
                <p>
                  The intuition is simple: a dollar today is worth more than a dollar tomorrow. The DCF
                  formalises that idea across 3–5 years of forecasts, then adds a terminal value to capture
                  everything beyond the projection window.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { Icon: TrendingUp, title: "Stock Valuation",    body: "Determine whether a publicly traded company's shares are over- or under-valued relative to your modelled intrinsic value." },
                  { Icon: Target,     title: "M&A Analysis",       body: "Price a private acquisition target where no market price exists; the DCF gives you an independent fair value anchor." },
                  { Icon: BookOpen,   title: "Capital Budgeting",  body: "Decide whether a new project or investment clears your required rate of return before committing capital." },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="bg-cfn-cream rounded-2xl p-5 border border-cfn-navy-100 shadow-card">
                    <div className="w-10 h-10 rounded-xl bg-cfn-cream/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-cfn-blue-text" />
                    </div>
                    <h3 className="font-bold text-cfn-navy mb-1">{title}</h3>
                    <p className="text-sm text-cfn-muted leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 — Key Terms */}
            <section id="key-terms">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                  Key Terms Explained
                </h2>
              </div>
              <p className="text-cfn-charcoal leading-relaxed mb-6">
                Before building a DCF, you need to understand what each input means and why it matters.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {KEY_TERMS.map(({ term, def }) => (
                  <div key={term} className="bg-cfn-cream rounded-xl p-5 border border-cfn-navy-100 shadow-card">
                    <p className="text-xs font-bold text-cfn-blue-text font-mono uppercase tracking-wider mb-2">{term}</p>
                    <p className="text-sm text-cfn-muted leading-relaxed">{def}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 — The 5 Steps */}
            <section id="five-steps">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                  The 5 Steps of a DCF
                </h2>
              </div>
              <p className="text-cfn-charcoal leading-relaxed mb-8">
                Every DCF follows the same five-step structure. Get these right and you can value any company.
              </p>
              <div className="space-y-6">
                {STEPS.map(({ num, title, body, formulaHtml, vars }) => (
                  <div key={num} className="flex gap-5">
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cfn-navy flex items-center justify-center">
                      <span className="text-cfn-blue-text font-black text-sm">{num}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-cfn-navy text-lg mb-2">{title}</h3>
                      <p className="text-cfn-charcoal text-sm leading-relaxed mb-3">{body}</p>

                      {/* Formula block — uses HTML for subscripts/superscripts */}
                      <pre
                        className="bg-cfn-navy-800 text-cfn-blue-text text-xs font-mono px-4 py-3 rounded-xl overflow-x-auto leading-6 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: formulaHtml }}
                      />

                      {/* Variable legend */}
                      {vars.length > 0 && (
                        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                          {vars.map(({ symHtml, def }, i) => (
                            <div key={i} className="flex items-baseline gap-2 text-xs">
                              <dt
                                className="font-mono font-bold text-cfn-navy flex-shrink-0"
                                dangerouslySetInnerHTML={{ __html: symHtml }}
                              />
                              <dd className="text-cfn-muted">{def}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4 — Worked Example */}
            <section id="worked-example">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                  Worked Example
                </h2>
              </div>
              <p className="text-cfn-charcoal leading-relaxed mb-2">
                Using the default calculator assumptions: $100M revenue, 5% growth, 10% EBIT margin, 30% tax,
                2% D&amp;A, 3% CAPEX, 5% ΔNWC, 8% WACC, 2% perpetual growth, $30M net debt, 10M shares.
              </p>
              <p className="text-cfn-muted text-sm mb-6">All figures in $M unless noted.</p>

              <div className="bg-cfn-cream rounded-2xl border border-cfn-navy-100 shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cfn-navy text-cfn-cream">
                        <th className="text-left px-4 py-3 font-semibold">Line Item</th>
                        <th className="text-right px-4 py-3 font-semibold text-cfn-cream/70">Base Y0</th>
                        <th className="text-right px-4 py-3 font-semibold">Year 1</th>
                        <th className="text-right px-4 py-3 font-semibold">Year 2</th>
                        <th className="text-right px-4 py-3 font-semibold">Year 3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cfn-navy-100 font-mono">
                      {/* Revenue build */}
                      <tr className="bg-cfn-navy/5">
                        <td colSpan={5} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cfn-navy font-sans">Revenue Build</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-sans text-cfn-navy">Sales</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y0.sales}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y1.sales}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y2.sales}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y3.sales}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-sans text-cfn-navy">EBIT</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y1.ebit}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y2.ebit}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y3.ebit}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-muted text-xs">NOPAT</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y1.nopat}</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y2.nopat}</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y3.nopat}</td>
                      </tr>
                      {/* FCF build */}
                      <tr className="bg-cfn-navy/5">
                        <td colSpan={5} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cfn-navy font-sans">FCF Build</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-navy">+ D&amp;A</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y1.da}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y2.da}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y3.da}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-navy">− CAPEX</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y1.capex}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y2.capex}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y3.capex}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-navy">− ΔNWC</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y1.dnwc}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y2.dnwc}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy">{EX.y3.dnwc}</td>
                      </tr>
                      <tr className="bg-cfn-navy font-bold">
                        <td className="px-4 py-3 font-sans text-cfn-cream">= Free Cash Flow</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-navy font-semibold">{EX.y1.fcf}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy font-semibold">{EX.y2.fcf}</td>
                        <td className="px-4 py-3 text-right text-cfn-navy font-semibold">{EX.y3.fcf}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-muted text-xs">PV of FCF (@ 8%)</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">—</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y1.pv}</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y2.pv}</td>
                        <td className="px-4 py-3 text-right text-cfn-muted">{EX.y3.pv}</td>
                      </tr>
                      {/* Valuation bridge */}
                      <tr className="bg-cfn-navy/5">
                        <td colSpan={5} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cfn-navy font-sans">Valuation Bridge</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-sans text-cfn-navy">Σ PV of FCFs</td>
                        <td colSpan={4} className="px-4 py-3 text-right font-semibold text-cfn-navy">{EX.sum}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-sans text-cfn-navy">Terminal Value</td>
                        <td colSpan={4} className="px-4 py-3 text-right text-cfn-navy">{EX.tv}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-muted text-xs">PV of TV</td>
                        <td colSpan={4} className="px-4 py-3 text-right text-cfn-muted">{EX.pvtv}</td>
                      </tr>
                      <tr className="bg-cfn-navy-100 font-semibold">
                        <td className="px-4 py-3 font-sans text-cfn-navy">Enterprise Value</td>
                        <td colSpan={4} className="px-4 py-3 text-right text-cfn-navy">{EX.ev}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-muted text-xs">− Net Debt</td>
                        <td colSpan={4} className="px-4 py-3 text-right text-cfn-muted">(30.00)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 pl-8 font-sans text-cfn-muted text-xs">÷ Shares Outstanding</td>
                        <td colSpan={4} className="px-4 py-3 text-right text-cfn-muted">10.00M</td>
                      </tr>
                      <tr className="bg-cfn-navy text-cfn-cream font-black">
                        <td className="px-4 py-4 font-sans text-cfn-navy">= Intrinsic Value per Share</td>
                        <td colSpan={4} className="px-4 py-4 text-right text-cfn-navy text-xl">{EX.pps}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interpretive callout */}
              <div className="mt-4 p-5 bg-cfn-navy/5 border-l-4 border-cfn-navy rounded-r-xl">
                <p className="text-sm text-cfn-charcoal leading-relaxed">
                  <span className="font-bold text-cfn-navy">Reading the output:</span>{" "}
                  {EX.pps} is the model&apos;s estimate of intrinsic value. If shares trade at $6.50, the stock
                  looks undervalued. If shares trade at $9.00, the market is pricing in more growth than this
                  model projects. A DCF is only as good as its inputs, so always stress-test with sensitivity analysis.
                </p>
              </div>
            </section>

            {/* Section 5 — Calculator */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                    Live DCF Calculator
                  </h2>
                  <p className="text-cfn-muted text-sm mt-1">
                    Edit the assumptions below; the model recalculates on demand.
                  </p>
                </div>
              </div>
              <DCFCalculator />
            </section>

            {/* Section 6 — What To Do */}
            <section id="verdict">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                  What To Do With Your Number
                </h2>
              </div>
              <p className="text-cfn-charcoal leading-relaxed mb-6">
                Once your DCF produces a price per share, compare it to the current market price and apply this
                decision framework:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    sig:  "BUY",
                    dot:  "bg-emerald-500",
                    cond: "Intrinsic value > market price by &gt;5%",
                    body: "Your model suggests the stock is undervalued: the market hasn't yet priced in your projected cash flows. Validate with comps before acting.",
                    bg:   "bg-emerald-50 border-emerald-200",
                    head: "text-emerald-700",
                  },
                  {
                    sig:  "HOLD",
                    dot:  "bg-cfn-navy",
                    cond: "Within ±5% of market price",
                    body: "The market is roughly pricing in what your model projects. Monitor for changes in assumptions, management guidance, or macro conditions.",
                    bg:   "bg-cfn-navy-100 border-cfn-navy-100",
                    head: "text-cfn-navy",
                  },
                  {
                    sig:  "SELL",
                    dot:  "bg-red-500",
                    cond: "Intrinsic value &lt; market price by &gt;5%",
                    body: "The stock appears overvalued relative to your fair value estimate. The market is pricing in more growth than your model projects.",
                    bg:   "bg-red-50 border-red-200",
                    head: "text-red-700",
                  },
                ].map(({ sig, dot, cond, body, bg, head }) => (
                  <div key={sig} className={`rounded-2xl p-5 border ${bg}`}>
                    <p className={`flex items-center gap-2 text-xl font-black mb-1 ${head}`}>
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
                      {sig}
                    </p>
                    <p className={`text-xs font-semibold mb-3 ${head} opacity-80`} dangerouslySetInnerHTML={{ __html: cond }} />
                    <p className="text-sm text-cfn-charcoal leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>

              {/* Caveat */}
              <div className="p-5 bg-cfn-navy rounded-2xl">
                <p className="text-cfn-navy font-bold text-sm mb-2">⚠️ Important caveat</p>
                <p className="text-cfn-cream/80 text-sm leading-relaxed">
                  A DCF is only as good as its inputs. Never treat your output as definitive. Always run a
                  sensitivity analysis, use conservative estimates, and triangulate with other methods like
                  Comparable Company Analysis (comps). The model is a thinking tool, not an oracle.
                </p>
              </div>
            </section>

            {/* Tips */}
            <section id="tips">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-10 bg-cfn-navy-100 rounded-full flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-cfn-navy">
                  Tips for a Better DCF
                </h2>
              </div>
              <p className="text-cfn-charcoal leading-relaxed mb-6">
                Because a DCF is built on assumptions, always stress-test your output. The sensitivity table
                in the calculator above shows how your price per share changes as WACC and perpetual growth
                rate vary. Here are the rules of thumb professionals use:
              </p>
              <ul className="space-y-3">
                {[
                  "Use historical data as your starting point, then adjust for expected changes.",
                  "Always be conservative: overly optimistic growth projections are the most common DCF error.",
                  "Don't project beyond 10 years; uncertainty compounds rapidly.",
                  "WACC must always exceed g, otherwise your terminal value formula breaks.",
                  "Keep your perpetual growth rate below long-run GDP growth (typically ≤ 3%).",
                  "Terminal value usually represents 60–80% of total Enterprise Value, so take it seriously.",
                  "Never forget to subtract net debt (and add cash) when bridging to equity value.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-cfn-charcoal">
                    <span className="w-5 h-5 rounded-full bg-cfn-navy-100 text-cfn-navy text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

          </div>{/* end main column */}

          {/* ══ Sidebar ══ */}
          <aside className="hidden lg:block space-y-6 sticky top-24">

            {/* Table of Contents */}
            <div className="bg-cfn-cream rounded-2xl border border-cfn-navy-100 shadow-card p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-cfn-blue-text mb-4">On This Page</p>
              <nav className="space-y-1">
                {TOC.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-sm text-cfn-muted hover:text-cfn-navy hover:translate-x-1 transition-all py-1"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Model Stats */}
            <div className="bg-cfn-navy rounded-2xl p-5 text-cfn-cream">
              <p className="text-xs font-bold uppercase tracking-widest text-cfn-blue-text mb-4">Model Stats</p>
              <dl className="space-y-3 text-sm">
                {[
                  { dt: "Category",    dd: "Valuation" },
                  { dt: "Difficulty",  dd: "Intermediate" },
                  { dt: "Read time",   dd: "~10 min" },
                  { dt: "Steps",       dd: "5" },
                  { dt: "Inputs",      dd: "12 assumptions" },
                  { dt: "Outputs",     dd: "Price per share + sensitivity" },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex justify-between gap-2">
                    <dt className="text-cfn-cream/50">{dt}</dt>
                    <dd className="font-semibold text-right">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Related Models */}
            <div className="bg-cfn-cream rounded-2xl border border-cfn-navy-100 shadow-card p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-cfn-blue-text mb-4">Related Models</p>
              <div className="space-y-2">
                {[
                  { label: "Comps Analysis",    href: "/models-frameworks?category=comparable-analysis" },
                  { label: "LBO Modeling",       href: "/models-frameworks?category=lbo" },
                  { label: "Merger Model",       href: "/models-frameworks?category=merger-model" },
                  { label: "Financial Statements", href: "/models-frameworks?category=financial-statements" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between text-sm text-cfn-navy hover:text-cfn-navy-800 transition-colors py-1 group"
                  >
                    {label}
                    <ChevronRight className="w-3.5 h-3.5 text-cfn-muted group-hover:text-cfn-navy transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
