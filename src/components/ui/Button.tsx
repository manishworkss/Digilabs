import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ============================================================
// Button — Primary / Secondary / Ghost variants
// ============================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  /** Render as an anchor tag instead of a button */
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium transition-all",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    // Size
    size === "default" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-4 text-base",
    // Variants
    variant === "primary" &&
      "bg-gradient-to-r from-accent-blue to-accent-violet text-nova-white rounded-[var(--radius-button)] hover:brightness-110 active:brightness-95",
    variant === "secondary" &&
      "border border-nova-border text-nova-white rounded-[var(--radius-button)] hover:border-nova-border-hover hover:bg-white/[0.03] active:bg-white/[0.05]",
    variant === "ghost" &&
      "text-nova-gray hover:text-nova-white",
    className
  );

  // Render as anchor if href is provided
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
