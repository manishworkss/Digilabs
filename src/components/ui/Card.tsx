import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============================================================
// Card — Shared card component
// ============================================================
// Subtle border, very restrained backdrop blur, soft depth.
// Used by Performance System and Results sections.
// ============================================================

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-nova-border",
        "bg-nova-surface/50 backdrop-blur-sm",
        "p-6 md:p-8",
        "transition-all duration-300 ease-[var(--ease-smooth)]",
        "hover:border-nova-border-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
