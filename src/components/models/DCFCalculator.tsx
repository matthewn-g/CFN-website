"use client";

import { useState, useMemo } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Inputs {
  sales:      number; // Year 0 revenue $M
  growth:     number; // Revenue growth %
  ebitMargin: number; // EBIT / Revenue %
  tax:        number; // Tax rate %
  da:         number; // D&A % of sales
  capex:      number; // CAPEX % of sales
  nwc:        number; // ΔNWC % of incremental sales
  wacc:       number; // Discount rate %
  g:          number; // Perpetual growth %
  netDebt:    number; // Net debt $M
  shares:     number; // Diluted shares M
  price:      number; // Current market price $
}

interface YearData {
  year:  number;
  sales: number;
  ebit:  number;
  nopat: number;
  da:    number;
  capex: number;
  dnwc:  number;
  fcf:   number;
  pvFcf: number;
}

interface CalcResults {
  years:         YearData[];
  sumPvFcf:      number;
  tv:            number;
  pvTv:          number;
  ev:            number;
  equityValue:   number;
  pricePerShare: number;
  upside:        number; // % vs market price
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const DEFAULTS: Inputs = {
  sales: 100, growth: 5, ebitMargin: 10, tax: 30,
  da: 2, capex: 3, nwc: 5,
  wacc: 8, g: 2,
  netDebt: 30, shares: 10, price: 7.64,
};

/* Raw string equivalents of DEFAULTS — drives the displayed input values so
   fields can be fully cleared without snapping back to 0. */
type RawInputs = Record<keyof Inputs, string>;
const DEFAULT_RAW: RawInputs = {
  sales: "100", growth: "5", ebitMargin: "10", tax: "30",
  da: "2", capex: "3", nwc: "5",
  wacc: "8", g: "2",
  netDebt: "30", shares: "10", price: "7.64",
};

const G_ROWS    = [1, 1.5, 2, 2.5, 3];
const WACC_COLS = [6, 7, 8, 9, 10];

const HEAT = [
  "bg-red-100       text-red-800   ",
  "bg-orange-50  text-orange-800",
  "bg-cfn-navy-100 text-cfn-navy  ",
  "bg-emerald-50 text-emerald-800",
  "bg-emerald-100 text-emerald-800",
];

/* ─── Calculation helpers ────────────────────────────────────────────────── */

function computeYear(n: number, inp: Inputs, prevSales: number): YearData {
  const wD = inp.wacc / 100;
  const sales = inp.sales * Math.pow(1 + inp.growth / 100, n);
  const ebit  = sales * (inp.ebitMargin / 100);
  const nopat = ebit  * (1 - inp.tax / 100);
  const da    = sales * (inp.da   / 100);
  const capex = sales * (inp.capex / 100);
  const dnwc  = (sales - prevSales) * (inp.nwc / 100);
  const fcf   = nopat + da - capex - dnwc;
  const pvFcf = fcf / Math.pow(1 + wD, n);
  return { year: n, sales, ebit, nopat, da, capex, dnwc, fcf, pvFcf };
}

function computeDCF(inp: Inputs): CalcResults {
  const wD = inp.wacc / 100;
  const gD = inp.g    / 100;

  let prevSales  = inp.sales;
  const years: YearData[] = [];

  for (let n = 1; n <= 3; n++) {
    const y = computeYear(n, inp, prevSales);
    years.push(y);
    prevSales = y.sales;
  }

  const sumPvFcf = years.reduce((a, y) => a + y.pvFcf, 0);
  const fcfFinal = years[2].fcf;
  const tv       = fcfFinal * (1 + gD) / (wD - gD);
  const pvTv     = tv / Math.pow(1 + wD, 3);
  const ev       = sumPvFcf + pvTv;
  const equityValue   = ev - inp.netDebt;
  const pricePerShare = equityValue / inp.shares;
  const upside        = ((pricePerShare - inp.price) / inp.price) * 100;

  return { years, sumPvFcf, tv, pvTv, ev, equityValue, pricePerShare, upside };
}

function scenarioPPS(inp: Inputs, g: number, wacc: number): number {
  if (wacc <= g) return NaN;
  return computeDCF({ ...inp, g, wacc }).pricePerShare;
}

function heatClass(val: number, min: number, max: number): string {
  if (isNaN(val)) return "bg-gray-100 text-gray-400";
  const range = max - min;
  if (range === 0) return HEAT[2];
  const idx = Math.min(4, Math.floor(((val - min) / range) * 5));
  return HEAT[idx];
}

/* ─── Formatting ─────────────────────────────────────────────────────────── */

const fM  = (n: number) => isNaN(n) ? "—" : `$${n.toFixed(2)}M`;
const fP  = (n: number) => isNaN(n) ? "—" : `$${n.toFixed(2)}`;
const f2  = (n: number) => isNaN(n) ? "—" : n.toFixed(2);

/* ─── Input config ───────────────────────────────────────────────────────── */

const INPUT_GROUPS = [
  {
    title: "Revenue Build",
    fields: [
      { label: "Sales, Year 0 ($M)",    key: "sales"      as const, step: 10,   hint: "Current annual revenue"      },
      { label: "Revenue Growth (%)",   key: "growth"     as const, step: 0.5,  hint: "Annual growth rate"           },
      { label: "EBIT Margin (%)",      key: "ebitMargin" as const, step: 0.5,  hint: "EBIT ÷ Revenue"               },
      { label: "Tax Rate (%)",         key: "tax"        as const, step: 1,    hint: "Corporate tax rate"           },
    ],
  },
  {
    title: "FCF Build",
    fields: [
      { label: "D&A (% of Sales)",     key: "da"         as const, step: 0.5,  hint: "Non-cash add-back"            },
      { label: "CAPEX (% of Sales)",   key: "capex"      as const, step: 0.5,  hint: "Capital expenditures"         },
      { label: "ΔNWC (% of Sales)",    key: "nwc"        as const, step: 0.5,  hint: "Applied to incremental rev."  },
    ],
  },
  {
    title: "Discounting",
    fields: [
      { label: "WACC (%)",             key: "wacc"       as const, step: 0.5,  hint: "Must exceed g"                },
      { label: "Perpetual Growth (%)", key: "g"          as const, step: 0.5,  hint: "Keep below GDP growth (~3%)"  },
    ],
  },
  {
    title: "Bridge to Equity",
    fields: [
      { label: "Net Debt ($M)",        key: "netDebt"    as const, step: 5,    hint: "Total debt minus cash"        },
      { label: "Shares Out. (M)",      key: "shares"     as const, step: 1,    hint: "Diluted share count"          },
      { label: "Market Price ($)",     key: "price"      as const, step: 0.10, hint: "For buy / sell verdict"       },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function DCFCalculator() {
  const [inp, setInp]         = useState<Inputs>(DEFAULTS);
  /* rawInp drives the visible input value — decoupled from the numeric state
     so the user can clear a field fully without it snapping back to "0". */
  const [rawInp, setRawInp]   = useState<RawInputs>(DEFAULT_RAW);
  const [results, setResults] = useState<CalcResults | null>(null);
  const [error, setError]     = useState<string | null>(null);

  const handleChange = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setRawInp(prev => ({ ...prev, [key]: raw }));
    const num = parseFloat(raw);
    // Only update numeric state when the value is actually a valid number
    if (!isNaN(num)) {
      setInp(prev => ({ ...prev, [key]: num }));
    }
  };

  const handleCalculate = () => {
    if (inp.wacc <= inp.g) {
      setError("WACC must be greater than the perpetual growth rate (g). Adjust your inputs.");
      return;
    }
    setError(null);
    setResults(computeDCF(inp));
  };

  /* Sensitivity — only computed once results exist */
  const sensitivityMatrix = useMemo(() => {
    if (!results) return null;
    const cells = G_ROWS.map(g => WACC_COLS.map(wacc => scenarioPPS(inp, g, wacc)));
    const flat   = cells.flat().filter(v => !isNaN(v));
    const min    = Math.min(...flat);
    const max    = Math.max(...flat);
    return { cells, min, max };
  }, [results, inp]);

  const verdict = results
    ? results.upside > 5
      ? { label: "BUY SIGNAL",    dot: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-400", text: "text-emerald-700", head: "text-emerald-700" }
      : results.upside < -5
      ? { label: "SELL SIGNAL",   dot: "bg-red-500",     bg: "bg-red-50 border-red-400",            text: "text-red-700",         head: "text-red-700"         }
      : { label: "FAIRLY VALUED", dot: "bg-cfn-navy",    bg: "bg-cfn-navy-100 border-cfn-navy-100",                    text: "text-cfn-navy/80",    head: "text-cfn-navy"       }
    : null;

  return (
    <div className="space-y-6" id="calculator">

      {/* ── Inputs ── */}
      <div className="bg-cfn-cream rounded-2xl border border-cfn-navy-100 shadow-card overflow-hidden">
        <div className="bg-cfn-navy px-6 py-4">
          <h3 className="text-cfn-cream font-bold text-lg">Enter Your Assumptions</h3>
          <p className="text-cfn-cream/60 text-sm mt-0.5">Change any value and hit Calculate. The model does the rest.</p>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INPUT_GROUPS.map(group => (
            <div key={group.title} className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cfn-navy border-b border-cfn-navy-100 pb-1">
                {group.title}
              </p>
              {group.fields.map(({ label, key, step, hint }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-cfn-navy mb-1">{label}</label>
                  <input
                    type="number"
                    value={rawInp[key]}
                    onChange={handleChange(key)}
                    step={step}
                    className="w-full px-3 py-2 text-sm font-mono bg-cfn-cream-dark border border-cfn-navy-100 rounded-lg text-cfn-navy focus:outline-none focus:ring-2 focus:ring-cfn-navy/30"
                  />
                  <p className="text-[10px] text-cfn-muted mt-1">{hint}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="px-6 pb-6">
          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto bg-cfn-navy text-cfn-cream font-black px-10 py-3 rounded-xl hover:bg-cfn-navy-800 transition-colors text-sm uppercase tracking-wider"
          >
            Calculate My DCF →
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {results && verdict && (
        <div className="space-y-6">

          {/* Output summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "FCF, Year 1",          value: fM(results.years[0].fcf)   },
              { label: "FCF, Year 3",          value: fM(results.years[2].fcf)   },
              { label: "Terminal Value",       value: fM(results.tv)             },
              { label: "PV of Terminal Value", value: fM(results.pvTv)           },
              { label: "Enterprise Value",     value: fM(results.ev)             },
              { label: "Price per Share",      value: fP(results.pricePerShare), highlight: true },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={`rounded-xl p-4 text-center ${
                  highlight
                    ? "bg-cfn-navy col-span-2 sm:col-span-1"
                    : "bg-cfn-cream-dark border border-cfn-navy-100"
                }`}
              >
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${highlight ? "text-cfn-cream/70" : "text-cfn-muted"}`}>
                  {label}
                </p>
                <p className={`text-2xl font-black font-mono ${highlight ? "text-cfn-cream" : "text-cfn-navy"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Verdict */}
          <div className={`${verdict.bg} border-2 rounded-2xl p-6 text-center`}>
            <p className={`flex items-center justify-center gap-2.5 text-2xl font-black mb-2 ${verdict.head}`}>
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${verdict.dot}`} />
              {verdict.label}
            </p>
            <p className={verdict.text}>
              Intrinsic value{" "}
              <span className="font-bold">{fP(results.pricePerShare)}</span>{" "}
              {results.upside > 0 ? "is" : "is"}{" "}
              <span className="font-bold">{Math.abs(results.upside).toFixed(1)}%</span>{" "}
              {results.upside > 0 ? "above" : "below"} market price{" "}
              <span className="font-bold">{fP(inp.price)}</span>.
            </p>
          </div>

          {/* Step-by-step breakdown table */}
          <div className="bg-cfn-cream rounded-2xl border border-cfn-navy-100 shadow-card overflow-hidden">
            <div className="bg-cfn-navy px-6 py-4">
              <h3 className="text-cfn-cream font-bold">Step-by-Step Breakdown</h3>
              <p className="text-cfn-cream/60 text-sm">All figures in $M unless noted</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cfn-cream-dark border-b border-cfn-navy-100">
                    <th className="text-left px-4 py-3 font-semibold text-cfn-navy">Line Item</th>
                    <th className="text-right px-4 py-3 font-semibold text-cfn-muted">Base Y0</th>
                    {results.years.map(y => (
                      <th key={y.year} className="text-right px-4 py-3 font-semibold text-cfn-navy">Year {y.year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cfn-navy-100">

                  {/* Section header */}
                  <tr className="bg-cfn-navy/5">
                    <td colSpan={5} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cfn-navy">Revenue Build</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-cfn-navy">Sales</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">{f2(inp.sales)}</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-navy">{f2(y.sales)}</td>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-cfn-navy">EBIT</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-navy">{f2(y.ebit)}</td>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-cfn-muted pl-7 text-xs">EBIT(1−t)</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-muted">{f2(y.nopat)}</td>)}
                  </tr>

                  {/* FCF Build */}
                  <tr className="bg-cfn-navy/5">
                    <td colSpan={5} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cfn-navy">FCF Build</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-navy">+ D&amp;A</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-navy">{f2(y.da)}</td>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-navy">− CAPEX</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-navy">({f2(y.capex)})</td>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-navy">− ΔNWC</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-navy">({f2(y.dnwc)})</td>)}
                  </tr>
                  <tr className="bg-cfn-navy font-bold">
                    <td className="px-4 py-3 text-cfn-cream">= Free Cash Flow</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-cream">{f2(y.fcf)}</td>)}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-muted text-xs">PV of FCF</td>
                    <td className="px-4 py-3 text-right font-mono text-cfn-muted">—</td>
                    {results.years.map(y => <td key={y.year} className="px-4 py-3 text-right font-mono text-cfn-muted">{f2(y.pvFcf)}</td>)}
                  </tr>

                  {/* Valuation bridge */}
                  <tr className="bg-cfn-navy/5">
                    <td colSpan={5} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cfn-navy">Valuation Bridge</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-cfn-navy">Σ PV of FCFs</td>
                    <td colSpan={4} className="px-4 py-3 text-right font-mono font-semibold text-cfn-navy">{f2(results.sumPvFcf)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-cfn-navy">Terminal Value (TV)</td>
                    <td colSpan={4} className="px-4 py-3 text-right font-mono text-cfn-navy">{f2(results.tv)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-muted text-xs">PV of TV</td>
                    <td colSpan={4} className="px-4 py-3 text-right font-mono text-cfn-muted">{f2(results.pvTv)}</td>
                  </tr>
                  <tr className="bg-cfn-navy-100 font-semibold">
                    <td className="px-4 py-3 text-cfn-navy">Enterprise Value</td>
                    <td colSpan={4} className="px-4 py-3 text-right font-mono text-cfn-navy">{f2(results.ev)}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-muted text-xs">− Net Debt</td>
                    <td colSpan={4} className="px-4 py-3 text-right font-mono text-cfn-muted">({f2(inp.netDebt)})</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 pl-7 text-cfn-muted text-xs">÷ Shares Outstanding</td>
                    <td colSpan={4} className="px-4 py-3 text-right font-mono text-cfn-muted">{f2(inp.shares)}M</td>
                  </tr>
                  <tr className="bg-cfn-navy font-black">
                    <td className="px-4 py-4 text-cfn-cream">= Intrinsic Value per Share</td>
                    <td colSpan={4} className="px-4 py-4 text-right font-mono text-cfn-cream text-xl">{fP(results.pricePerShare)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sensitivity table */}
          {sensitivityMatrix && (
            <div className="bg-cfn-cream rounded-2xl border border-cfn-navy-100 shadow-card overflow-hidden" id="sensitivity">
              <div className="bg-cfn-navy px-6 py-4">
                <h3 className="text-cfn-cream font-bold">Sensitivity Analysis: Price per Share</h3>
                <p className="text-cfn-cream/60 text-sm mt-0.5">
                  Varies WACC and perpetual growth rate across your current assumptions. Base case marked ★.
                </p>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-sm font-mono">
                  <thead>
                    {/* Axis label row */}
                    <tr className="border-b border-cfn-navy-100">
                      <th className="px-3 py-1" />
                      <th
                        colSpan={WACC_COLS.length}
                        className="px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-cfn-muted font-sans"
                      >
                        WACC — Discount Rate →
                      </th>
                    </tr>
                    {/* Value headers */}
                    <tr>
                      <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-cfn-muted font-sans whitespace-nowrap">
                        Growth Rate (g) ↓
                      </th>
                      {WACC_COLS.map(w => (
                        <th key={w} className="px-3 py-2 text-center text-xs font-semibold text-cfn-navy">{w}%</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    {G_ROWS.map((g, gi) => (
                      <tr key={g}>
                        <td className="px-3 py-2 text-xs font-semibold text-cfn-navy whitespace-nowrap">
                          {g}%{g === inp.g ? " ★" : ""}
                        </td>
                        {WACC_COLS.map((w, wi) => {
                          const val    = sensitivityMatrix.cells[gi][wi];
                          const isBase = (g === inp.g && w === inp.wacc);
                          return (
                            <td
                              key={w}
                              className={`px-3 py-2 text-center rounded text-xs
                                ${heatClass(val, sensitivityMatrix.min, sensitivityMatrix.max)}
                                ${isBase ? "ring-2 ring-cfn-navy font-bold" : ""}
                              `}
                            >
                              {isNaN(val) ? "—" : `$${val.toFixed(2)}`}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="px-6 pb-4 flex flex-wrap gap-4 text-xs text-cfn-muted border-t border-cfn-navy-100 pt-3">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-200 inline-block" />Low</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-50 border border-orange-200 inline-block" />Below base</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cfn-navy-100 border border-cfn-navy-100 inline-block" />Mid</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200 inline-block" />Above base</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200 inline-block" />High</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded ring-2 ring-cfn-navy inline-block" />Base case</span>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
