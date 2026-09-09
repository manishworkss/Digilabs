// ============================================================
// Utility Helpers
// ============================================================

/**
 * Concatenate class names, filtering out falsy values.
 * A lightweight alternative to clsx + tailwind-merge.
 * We avoid adding extra dependencies for a simple utility.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
