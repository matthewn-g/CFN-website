import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-white";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-cfn-gold text-cfn-navy font-semibold hover:bg-cfn-gold-light transition-colors duration-200",
  secondary:
    "bg-transparent text-cfn-navy border-2 border-cfn-navy font-semibold hover:bg-cfn-navy hover:text-white transition-colors duration-200 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-cfn-navy",
  ghost:
    "bg-transparent text-cfn-gold font-semibold hover:text-cfn-gold-light underline-offset-4 hover:underline transition-colors duration-200",
  "outline-white":
    "bg-transparent text-white border-2 border-white font-semibold hover:bg-white hover:text-cfn-navy transition-colors duration-200",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  onClick,
  disabled,
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 cursor-pointer select-none",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
