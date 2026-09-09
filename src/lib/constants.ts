// ============================================================
// NOVA — Content Constants
// ============================================================
// All marketing copy lives here. Components import from this file.
// This prevents content duplication and makes updates easy.
// ============================================================

export const SITE = {
  name: "NOVA",
  tagline: "Performance Marketing",
  description:
    "NOVA builds, optimizes, and scales paid media systems that turn ad spend into predictable revenue.",
  url: "https://nova.example.com",
} as const;

// --- Navigation ---

export const NAV_LINKS = [
  { label: "System", href: "#system" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

// --- Hero ---

export const HERO = {
  headline: "Turn attention into growth.",
  subheadline:
    "Performance marketing engineered for businesses ready to scale.",
  primaryCTA: "Book a Call \u2192",
  secondaryCTA: "Explore the system \u2193",
  secondaryCTAHref: "#system",
} as const;

// --- Statement / Problem ---

export const STATEMENT = {
  eyebrow: "THE PROBLEM",
  heading: "Clicks are easy.",
  headingAccent: "Growth isn\u2019t.",
  body: "Most brands chase impressions. We engineer systems that turn paid media into compounding revenue.",
} as const;

// --- Performance System ---

export const SYSTEM_SECTION = {
  eyebrow: "THE SYSTEM",
  heading: "A unified approach to paid media",
  cards: [
    {
      number: "01",
      title: "Strategy",
      description:
        "Data-driven media planning that aligns spend with revenue goals across every channel.",
      icon: "Crosshair" as const,
    },
    {
      number: "02",
      title: "Creative",
      description:
        "Performance creative frameworks designed to scale, iterate, and convert.",
      icon: "Layers" as const,
    },
    {
      number: "03",
      title: "Optimization",
      description:
        "Continuous measurement and refinement from first click to closed deal.",
      icon: "BarChart3" as const,
    },
  ],
} as const;

// --- Results / Proof ---

export const RESULTS_SECTION = {
  eyebrow: "THE RESULTS",
  heading: "Numbers that speak for themselves",
  disclaimer: "Illustrative figures for demonstration purposes",
  metrics: [
    {
      value: "4.2\u00D7",
      label: "Illustrative ROAS",
    },
    {
      value: "+68%",
      label: "Illustrative qualified leads",
    },
    {
      value: "\u221234%",
      label: "Illustrative CPL",
    },
  ],
} as const;

// --- Process ---

export const PROCESS_SECTION = {
  eyebrow: "THE PROCESS",
  heading: "Four steps to compound growth",
  steps: [
    {
      number: "01",
      title: "Discover",
      description:
        "Deep-dive into performance data, audience signals, and market opportunity.",
    },
    {
      number: "02",
      title: "Build",
      description:
        "Architect a unified media system with clear KPIs and measurement.",
    },
    {
      number: "03",
      title: "Launch",
      description:
        "Deploy campaigns across channels with real-time creative optimization.",
    },
    {
      number: "04",
      title: "Scale",
      description:
        "Double down on what works. Cut what doesn\u2019t. Compound results monthly.",
    },
  ],
} as const;

// --- Final CTA ---

export const FINAL_CTA = {
  heading: "Ready to make your next campaign count?",
  body: "Let\u2019s build a paid media system that actually compounds.",
  cta: "Book a Call \u2192",
} as const;

// --- Lead Form ---

export const FORM_SECTION = {
  eyebrow: "GET STARTED",
  heading: "Let\u2019s talk growth",
  submitLabel: "Send Message",
  successTitle: "Message sent",
  successMessage:
    "Thanks for reaching out. We\u2019ll be in touch within 24 hours.",
  errorMessage:
    "Something went wrong. Please try again or email us directly.",
} as const;

export const BUDGET_OPTIONS = [
  { label: "Select your budget", value: "" },
  { label: "Under $10K", value: "under-10k" },
  { label: "$10K \u2013 $50K", value: "10k-50k" },
  { label: "$50K \u2013 $200K", value: "50k-200k" },
  { label: "$200K+", value: "200k-plus" },
] as const;

// --- Footer ---

export const FOOTER = {
  copyright: `\u00A9 ${new Date().getFullYear()} NOVA. All rights reserved.`,
  disclaimer: "This is a fictional brand created for demonstration purposes.",
  links: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;
