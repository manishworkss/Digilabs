"use client";

import { motion } from "framer-motion";
import { FINAL_CTA } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradientOrb } from "@/components/ui/GradientOrb";

export function FinalCTA() {
  return (
    <SectionWrapper id="cta" className="relative overflow-hidden text-center items-center justify-center min-h-[60vh] flex flex-col pt-32 pb-48">
      {/* Background glow to anchor the bottom of the page */}
      <GradientOrb />
      
      <ScrollReveal className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-nova-text mb-6">
          {FINAL_CTA.heading}
        </h2>
        <p className="text-lg md:text-xl text-nova-textMuted mb-10 max-w-xl">
          {FINAL_CTA.body}
        </p>
        
        {/* We use an anchor link to scroll to the form section, or if the form is the next section, we can just use an href */}
        <Button href="#contact" variant="primary" size="lg" className="w-full sm:w-auto">
          {FINAL_CTA.cta}
        </Button>
      </ScrollReveal>
    </SectionWrapper>
  );
}
