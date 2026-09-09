import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============================================================
// SectionWrapper — Shared section container
// ============================================================
// Enforces consistent section spacing, max-width, and semantic HTML.
// Every page section uses this to maintain visual consistency.
// ============================================================

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Whether to use the large section spacing. Defaults to true. */
  padded?: boolean;
}

export function SectionWrapper({
  children,
  id,
  className,
  padded = true,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        padded && "py-20 md:py-24 lg:py-30",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-8">
        {children}
      </div>
    </section>
  );
}
