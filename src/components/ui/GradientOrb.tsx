// ============================================================
// GradientOrb — Pure CSS animated gradient background
// ============================================================
// Used in the Hero section. Zero JavaScript cost.
// Animation defined in globals.css via @keyframes.
// ============================================================

export function GradientOrb() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary orb — blue */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--color-accent-blue) 0%, transparent 70%)",
          animation: "orb-drift 20s ease-in-out infinite",
        }}
      />
      {/* Secondary orb — violet */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-15 blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--color-accent-violet) 0%, transparent 70%)",
          animation: "orb-drift-secondary 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}
