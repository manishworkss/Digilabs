"use client";

import { STATEMENT } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ============================================================
// Statement / Problem — Editorial text section
// ============================================================
// Large, confident typography with a two-part headline.
// The accent line ("Growth isn't.") uses the gradient treatment
// to create visual contrast and draw the eye.
// ============================================================

export function Statement() {
  return (
    <SectionWrapper id="statement">
      <ScrollReveal>
        <p className="text-sm text-nova-muted mb-6 uppercase tracking-[0.2em]">
          {STATEMENT.eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-nova-white max-w-3xl">
          {STATEMENT.heading}
          <br />
          <span className="gradient-text">{STATEMENT.headingAccent}</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-nova-gray leading-relaxed max-w-xl">
          {STATEMENT.body}
        </p>
      </ScrollReveal>
    </SectionWrapper>
  );
}
