"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_SECTION } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// Process — Four-step timeline with scroll-driven progress line
// ============================================================
// A vertical timeline where:
// - A gradient progress line grows as the user scrolls
// - Each step reveals sequentially
// - Step dots light up as the line passes them
// - The whole thing respects prefers-reduced-motion
// ============================================================

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  // Map scroll to line height (0% → 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="process">
      <ScrollReveal>
        <p className="text-sm text-nova-muted mb-6 uppercase tracking-[0.2em]">
          {PROCESS_SECTION.eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-nova-white max-w-3xl mb-14 md:mb-20">
          {PROCESS_SECTION.heading}
        </h2>
      </ScrollReveal>

      {/* Timeline container */}
      <div ref={containerRef} className="relative">
        {/* Vertical line track (static gray background) */}
        <div
          className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-nova-border"
          aria-hidden="true"
        />

        {/* Animated gradient progress line */}
        {!prefersReduced && (
          <motion.div
            className="absolute left-4 md:left-5 top-0 w-px origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, var(--color-accent-blue), var(--color-accent-violet))",
            }}
            aria-hidden="true"
          />
        )}

        {/* If reduced motion: show the full line as static */}
        {prefersReduced && (
          <div
            className="absolute left-4 md:left-5 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, var(--color-accent-blue), var(--color-accent-violet))",
            }}
            aria-hidden="true"
          />
        )}

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {PROCESS_SECTION.steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.08}>
              <div className="flex gap-8 md:gap-12 items-start">
                {/* Dot on the line */}
                <div className="relative shrink-0 w-8 md:w-10 flex justify-center pt-1">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full border-2 border-nova-border bg-nova-black"
                    whileInView={
                      prefersReduced
                        ? {}
                        : {
                            borderColor: "var(--color-accent-blue)",
                            backgroundColor: "var(--color-accent-blue)",
                            boxShadow: "0 0 12px rgba(37, 99, 235, 0.4)",
                          }
                    }
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>

                {/* Content */}
                <div className="pb-2">
                  {/* Number */}
                  <span className="text-sm font-medium text-nova-muted tracking-wide">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-semibold text-nova-white mt-1 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-nova-gray text-base md:text-lg leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
