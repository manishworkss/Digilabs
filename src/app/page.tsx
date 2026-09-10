import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import dynamic from 'next/dynamic';

// ============================================================
// Dynamic Imports for below-the-fold components (Performance & LCP Optimization)
// ============================================================
const Statement = dynamic(() => import('@/components/sections/Statement').then(mod => mod.Statement));
const PerformanceSystem = dynamic(() => import('@/components/sections/PerformanceSystem').then(mod => mod.PerformanceSystem));
const Results = dynamic(() => import('@/components/sections/Results').then(mod => mod.Results));
const Process = dynamic(() => import('@/components/sections/Process').then(mod => mod.Process));
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA').then(mod => mod.FinalCTA));
const LeadForm = dynamic(() => import('@/components/sections/LeadForm').then(mod => mod.LeadForm));
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer));
const FloatingCTA = dynamic(() => import('@/components/layout/FloatingCTA').then(mod => mod.FloatingCTA));

// ============================================================
// Home Page — Composes all sections in the approved architecture order
// ============================================================
// Architecture:
// 1. Navbar (sticky)
// 2. Hero (Loaded eagerly for LCP)
// 3. Statement / Problem (Lazy)
// 4. Performance System (Lazy)
// 5. Results / Proof (Lazy)
// 6. Process (Lazy)
// 7. Final CTA (Lazy)
// 8. Lead Form (Lazy)
// 9. Footer (Lazy)
// + Floating CTA (persistent, Lazy)
// ============================================================

export default function Home() {
  return (
    <>
      <Navbar />
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
