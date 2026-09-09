"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// ScrollReveal — Shared scroll-triggered reveal wrapper
// ============================================================
// Used by every section to animate elements into view on scroll.
// Respects prefers-reduced-motion.
// Uses `once: true` so elements only animate in once (not on scroll back).
// ============================================================

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  // Map direction to initial offset
  const offsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
