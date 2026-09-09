import { Navbar } from "@/components/layout/Navbar";
import { LocalNav } from "@/components/layout/LocalNav";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";

import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { PerformanceSystem } from "@/components/sections/PerformanceSystem";
import { Results } from "@/components/sections/Results";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LeadForm } from "@/components/sections/LeadForm";

// ============================================================
// Home Page — Composes all sections in the approved architecture order
// ============================================================
// Architecture:
// 1. Navbar (sticky)
// 2. Hero
// 3. Statement / Problem
// 4. Performance System
// 5. Results / Proof
// 6. Process
// 7. Final CTA
// 8. Lead Form
// 9. Footer
// + Floating CTA (persistent)
// ============================================================

export default function Home() {
  return (
    <>
      <Navbar />
      <LocalNav />
      <main id="main-content">
        <Hero />
        <Statement />
        <PerformanceSystem />
        <Results />
        <Process />
        <FinalCTA />
        <LeadForm />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
