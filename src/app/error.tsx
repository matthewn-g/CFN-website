"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-16 min-h-screen bg-cfn-cream flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-cfn-navy-100 flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-cfn-navy/40" />
        </div>
        <h1 className="text-3xl font-bold text-cfn-navy mb-3">
          Something went wrong
        </h1>
        <p className="text-cfn-muted text-lg mb-8 max-w-md mx-auto">
          {error.message ?? "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-cfn-navy text-cfn-cream font-bold px-6 py-3 rounded-lg hover:bg-cfn-navy-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-cfn-navy text-cfn-navy font-bold px-6 py-3 rounded-lg hover:bg-cfn-navy hover:text-cfn-cream transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
