"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import CFNLogo from "./CFNLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Financial Literacy",
    href:  "/financial-literacy",
    dropdown: [
      { label: "Savings",        href: "/financial-literacy?category=savings" },
      { label: "Credit Cards",   href: "/financial-literacy?category=credit-cards" },
      { label: "Investing",      href: "/financial-literacy?category=investing" },
      { label: "ETFs",           href: "/financial-literacy?category=etfs" },
      { label: "Crypto",         href: "/financial-literacy?category=crypto" },
      { label: "Market Rundown", href: "/financial-literacy?category=market-rundown" },
      { label: "Career Growth",  href: "/financial-literacy?category=career-growth" },
      { label: "Mindset",        href: "/financial-literacy?category=mindset" },
    ],
  },
  {
    label: "Models & Frameworks",
    href:  "/models-frameworks",
    dropdown: [
      { label: "DCF Valuation",        href: "/models-frameworks?category=dcf" },
      { label: "LBO Modeling",         href: "/models-frameworks?category=lbo" },
      { label: "Comps Analysis",       href: "/models-frameworks?category=comparable-analysis" },
      { label: "Financial Statements", href: "/models-frameworks?category=financial-statements" },
    ],
  },
  { label: "Events",   href: "/events"   },
  { label: "About Us", href: "/about"    },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBg = isHome
    ? scrolled ? "bg-cfn-navy shadow-nav" : "bg-transparent"
    : "bg-cfn-navy shadow-nav";

  return (
    <>
      <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", navBg)}>
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <CFNLogo variant="light" />

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors",
                      pathname.startsWith(link.href) && "text-white bg-white/10"
                    )}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </Link>

                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-52 pt-1">
                      <div className="bg-white dark:bg-cfn-dark-bg rounded-xl shadow-card-hover border border-cfn-navy-100 dark:border-white/10 overflow-hidden animate-fade-in">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-cfn-charcoal dark:text-white/80 hover:bg-cfn-navy-100 dark:hover:bg-white/10 hover:text-cfn-navy dark:hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/events"
                className="ml-2 bg-cfn-gold text-cfn-navy font-semibold px-5 py-2 rounded-lg text-sm hover:bg-cfn-gold-light transition-colors"
              >
                Join CFN
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-cfn-cream-dark dark:bg-cfn-dark-bg shadow-2xl flex flex-col transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-cfn-navy-100 dark:border-white/10">
          <CFNLogo variant="dark" showText={false} />
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-cfn-navy dark:text-white hover:bg-cfn-navy-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex-1 overflow-y-auto py-4">
          {navLinks.map((link) => (
            <div key={link.href}>
              <button
                onClick={() =>
                  link.dropdown
                    ? setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    : setMobileOpen(false)
                }
                className="w-full flex items-center justify-between px-6 py-3 text-left font-semibold text-cfn-navy dark:text-white hover:bg-cfn-navy-100 dark:hover:bg-white/10 transition-colors"
              >
                {link.dropdown ? (
                  <>
                    <span>{link.label}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        mobileExpanded === link.label && "rotate-180"
                      )}
                    />
                  </>
                ) : (
                  <Link href={link.href} className="w-full" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </button>
              {link.dropdown && mobileExpanded === link.label && (
                <div className="bg-cfn-cream-dark dark:bg-white/5">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-10 py-2.5 text-sm text-cfn-muted dark:text-cfn-dark-muted hover:text-cfn-navy dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Drawer footer CTA */}
        <div className="p-4 border-t border-cfn-navy-100 dark:border-white/10">
          <Link
            href="/events"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-cfn-gold text-cfn-navy font-semibold px-6 py-3 rounded-lg hover:bg-cfn-gold-light transition-colors"
          >
            Join CFN
          </Link>
        </div>
      </div>
    </>
  );
}
