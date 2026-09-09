"use client";

import { motion } from "framer-motion";
import { RESULTS_SECTION } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// Results / Proof — Illustrative metric cards
// ============================================================
// Three large metric numbers with gradient text treatment.
// Clearly labeled as illustrative/demo figures.
// Cards animate in with stagger and have subtle hover states.
// ============================================================

export function Results() {
  const prefersReduced = useReducedMotion();

  return (
    <SectionWrapper id="results">
      <ScrollReveal>
        <p className="text-sm text-nova-muted mb-6 uppercase tracking-[0.2em]">
          {RESULTS_SECTION.eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-nova-white max-w-3xl mb-14 md:mb-20">
          {RESULTS_SECTION.heading}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {RESULTS_SECTION.metrics.map((metric, i) => (
          <ScrollReveal key={metric.label} delay={0.15 + i * 0.1}>
            <motion.div
              className="group rounded-[var(--radius-card)] border border-nova-border bg-nova-surface/50 backdrop-blur-sm p-8 md:p-10 text-center transition-colors duration-300 hover:border-nova-border-hover"
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      y: -4,
                      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                    }
              }
            >
              {/* Large metric number */}
              <p className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold gradient-text leading-none mb-4">
                {metric.value}
              </p>

              {/* Label */}
              <p className="text-nova-gray text-base">
                {metric.label}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Disclaimer */}
      <ScrollReveal delay={0.4}>
        <p className="mt-10 text-sm text-nova-muted text-center">
          {RESULTS_SECTION.disclaimer}
        </p>
      </ScrollReveal>
    </SectionWrapper>
  );
}
