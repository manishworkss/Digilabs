"use client";

import { motion } from "framer-motion";
import { HERO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/ui/GradientOrb";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// Hero — Full-screen cinematic hero section
// ============================================================
// - Animated gradient orb background (CSS-only, no JS cost)
// - Staggered entrance animation for headline, copy, CTAs
// - Large editorial typography with strong whitespace
// - Respects prefers-reduced-motion
// ============================================================

// --- Animation variants ---

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Instant reveal for reduced motion
const noMotionVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function Hero() {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? noMotionVariants : fadeUpVariants;
  const container = prefersReduced
    ? { hidden: {}, visible: {} }
    : containerVariants;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient orb background */}
      <GradientOrb />

      {/* Subtle top-to-bottom vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--color-nova-black) 100%)",
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 w-full pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-sm md:text-base text-nova-gray uppercase tracking-[0.2em] mb-6 md:mb-8 font-semibold"
          variants={variants}
        >
          Performance Marketing
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-[3.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[6.5rem] lg:leading-[1.02] font-bold tracking-[var(--tracking-tight)] text-nova-white max-w-5xl"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {HERO.headline.split(" ").map((word, i, arr) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ marginRight: i === arr.length - 1 ? 0 : "0.25em" }}
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.4,
                    ease: [0.4, 0, 0.2, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 md:mt-8 text-xl md:text-2xl text-nova-gray leading-relaxed max-w-2xl font-medium tracking-[var(--tracking-normal)]"
          variants={variants}
        >
          {HERO.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4"
          variants={variants}
        >
          <Button href="#contact" size="lg" className="rounded-full px-8 !bg-none !bg-[#7bc4e9] text-white hover:!brightness-110">
            {HERO.primaryCTA}
          </Button>
          <Button href={HERO.secondaryCTAHref} variant="secondary" size="lg" className="rounded-full px-8 bg-nova-white/10 text-nova-white hover:bg-nova-white/20 border-none">
            {HERO.secondaryCTA}
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom fade to seamlessly blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--color-nova-black) 100%)",
        }}
      />
    </section>
  );
}
