"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-cfn-navy py-20">
      <div className="section-container">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-cfn-cream/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-cfn-cream" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-cfn-cream mb-3">
            Stay Ahead of the Market
          </h2>
          <p className="text-cfn-cream/70 text-lg mb-8">
            Weekly roundups, new models, and networking events straight to your inbox.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-semibold text-lg">
              <CheckCircle className="w-5 h-5" />
              You&apos;re in! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-cfn-cream/10 border border-cfn-cream/20 text-cfn-cream placeholder:text-cfn-cream/40 focus:outline-none focus:border-cfn-cream/60 focus:ring-1 focus:ring-white/30 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-7 py-3 bg-cfn-cream text-cfn-navy font-bold rounded-lg hover:bg-cfn-cream-dark transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}

          <p className="mt-4 text-cfn-cream/40 text-xs">
            By subscribing you consent to receive emails from CFN. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
