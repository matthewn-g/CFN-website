import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import CFNLogo from "./CFNLogo";

const footerLinks = {
  "Financial Literacy": [
    { label: "Personal Finance",     href: "/financial-literacy?category=personal-finance" },
    { label: "Investments",          href: "/financial-literacy?category=investments" },
    { label: "Market Rundown",       href: "/financial-literacy?category=market-rundown" },
    { label: "Career Growth",        href: "/financial-literacy?category=career-growth" },
    { label: "Personal Development", href: "/financial-literacy?category=personal-development" },
  ],
  "Models & Frameworks": [
    { label: "DCF Valuation",        href: "/models-frameworks?category=dcf" },
    { label: "LBO Modeling",         href: "/models-frameworks?category=lbo" },
    { label: "Comps Analysis",       href: "/models-frameworks?category=comparable-analysis" },
    { label: "Financial Statements", href: "/models-frameworks?category=financial-statements" },
    { label: "Merger Model",         href: "/models-frameworks?category=merger-model" },
  ],
  "Company": [
    { label: "About CFN", href: "/about" },
    { label: "Events",    href: "/events" },
    { label: "Write for Us", href: "mailto:thecanadianfinancialnetwork@gmail.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-cfn-navy text-cfn-cream">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <CFNLogo variant="light" />
            <p className="mt-4 text-cfn-cream/60 text-sm leading-relaxed max-w-xs">
              Built by students. For every student. Financial literacy and technical finance skills for the next generation of Canadian investors and professionals.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Link
                href="https://instagram.com/thecanadianfinancialnetwork"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-cfn-cream/10 flex items-center justify-center hover:bg-cfn-cream/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://linkedin.com/company/cfn-org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-cfn-cream/10 flex items-center justify-center hover:bg-cfn-cream/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:thecanadianfinancialnetwork@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-lg bg-cfn-cream/10 flex items-center justify-center hover:bg-cfn-cream/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-cfn-cream/60 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cfn-cream/60 hover:text-cfn-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-cfn-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cfn-cream/40">
            © {new Date().getFullYear()} Canadian Financial Network. All rights reserved.
          </p>
          <p className="text-sm text-cfn-cream/40">
            Not financial advice. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
