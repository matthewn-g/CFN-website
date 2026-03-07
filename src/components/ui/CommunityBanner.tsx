import { Users } from "lucide-react";
import Link from "next/link";

interface CommunityBannerProps {
  variant?: "chip" | "section";
}

export default function CommunityBanner({ variant = "chip" }: CommunityBannerProps) {
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL ?? "#";

  if (variant === "chip") {
    return (
      <Link
        href={discordUrl}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white/80 hover:text-white hover:border-white/60 text-sm transition-colors group"
      >
        <Users className="w-4 h-4 group-hover:text-cfn-gold transition-colors" />
        <span>Join our community</span>
        <span className="text-xs bg-cfn-gold text-cfn-navy font-semibold px-2 py-0.5 rounded-full">
          Coming Soon
        </span>
      </Link>
    );
  }

  return (
    <div className="bg-cfn-navy rounded-2xl p-8 text-center text-white">
      <div className="w-12 h-12 rounded-full bg-cfn-gold/20 flex items-center justify-center mx-auto mb-4">
        <Users className="w-6 h-6 text-cfn-gold" />
      </div>
      <h3 className="text-xl font-bold mb-2">Join the CFN Community</h3>
      <p className="text-white/70 mb-4 max-w-md mx-auto">
        Connect with finance students from UBC to Queen&apos;s. Ask questions, share resources, and find your people.
      </p>
      <Link
        href={discordUrl}
        className="inline-flex items-center gap-2 bg-cfn-gold text-cfn-navy font-semibold px-6 py-3 rounded-lg hover:bg-cfn-gold-light transition-colors"
      >
        <Users className="w-4 h-4" />
        Join Discord
        <span className="text-xs bg-cfn-navy text-cfn-gold font-bold px-2 py-0.5 rounded-full">
          Soon
        </span>
      </Link>
    </div>
  );
}
