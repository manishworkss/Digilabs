export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="inner-circle">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="8" fill="none" />
      
      {/* N inside */}
      <g clipPath="url(#inner-circle)">
        {/* Left Stem */}
        <polygon points="25,100 39,100 39,46.6 25,7.85" />
        {/* Right Stem */}
        <polygon points="61,0 75,0 75,91.45 61,52.67" />
        {/* Diagonal */}
        <polygon points="25,0 39,0 75,100 61,100" />
      </g>
    </svg>
  );
}
