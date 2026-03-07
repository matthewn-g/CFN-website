import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen bg-cfn-navy flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-cfn-gold mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/60 text-lg mb-10 max-w-md mx-auto">
          This page doesn&apos;t exist, or the URL may have changed. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-cfn-gold text-cfn-navy font-bold px-6 py-3 rounded-lg hover:bg-cfn-gold-light transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/financial-literacy"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-cfn-navy transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
