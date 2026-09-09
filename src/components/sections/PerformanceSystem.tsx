"use client";

import { motion } from "framer-motion";
import { Crosshair, Layers, BarChart3 } from "lucide-react";
import { SYSTEM_SECTION } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// Performance System — Three numbered service cards
// ============================================================
// Each card has: number, icon, title, description.
// Cards animate in on scroll with stagger.
// Subtle hover: scale + border brightening + shadow.
// ============================================================

// Map icon names to components
const iconMap = {
  Crosshair,
  Layers,
  BarChart3,
} as const;

export function PerformanceSystem() {
  const prefersReduced = useReducedMotion();

  return (
    <SectionWrapper id="system">
      <ScrollReveal>
        <p className="text-sm text-nova-muted mb-6 uppercase tracking-[0.2em]">
          {SYSTEM_SECTION.eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-nova-white max-w-3xl mb-14 md:mb-20">
          {SYSTEM_SECTION.heading}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {SYSTEM_SECTION.cards.map((card, i) => {
          const Icon = iconMap[card.icon];

          return (
            <ScrollReveal key={card.title} delay={0.15 + i * 0.1}>
              <motion.div
                className="group rounded-[var(--radius-card)] border border-nova-border bg-nova-surface/50 backdrop-blur-sm p-6 md:p-8 transition-colors duration-300 hover:border-nova-border-hover h-full"
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        y: -4,
                        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                      }
                }
              >
                {/* Number + Icon row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-nova-muted tracking-wide">
                    {card.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center transition-colors duration-300 group-hover:bg-white/[0.08]">
                    <Icon
                      size={20}
                      className="text-nova-gray transition-colors duration-300 group-hover:text-nova-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-nova-white mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-nova-gray text-base leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
