"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Hook to detect if the user prefers reduced motion.
 * Wraps Framer Motion's built-in hook for consistent usage.
 *
 * Usage:
 *   const prefersReduced = useReducedMotion();
 *   // If true → skip/disable animations
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
