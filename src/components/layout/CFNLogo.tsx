import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CFNLogoProps {
  variant?: "light" | "dark";
  className?: string;
  showText?: boolean;
}

export default function CFNLogo({ variant = "dark", className, showText = true }: CFNLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      {/* Bull Image */}
      <div
        className="relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ width: 40, height: 40 }}
      >
        <Image
          src="/images/logo/bull.png"
          alt="CFN Bull"
          fill
          className="object-contain"
          style={
            variant === "light"
              ? { filter: "brightness(0) invert(1)" }
              : {}
          }
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="text-2xl font-black tracking-tight"
            style={{
              color: variant === "light" ? "#F8F6F1" : "#091E3A",
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            CFN
          </span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{
              color: variant === "light" ? "rgba(248,246,241,0.7)" : "#4D6E95",
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            Canadian Financial Network
          </span>
        </div>
      )}
    </Link>
  );
}
