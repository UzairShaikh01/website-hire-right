import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizes = {
    sm: { width: 120, height: 32 },
    md: { width: 150, height: 40 },
    lg: { width: 180, height: 48 },
  };

  const { width, height } = sizes[size];

  return (
    <svg
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
      style={{ width, height }}
    >
      {/* Person icon */}
      <circle cx="16" cy="12" r="6" fill="hsl(217, 91%, 53%)" />
      <path
        d="M8 32C8 26.4772 12.4772 22 18 22H14C14 22 8 22 8 28V32Z"
        fill="hsl(217, 91%, 53%)"
      />
      <path
        d="M24 32C24 26.4772 19.5228 22 14 22H18C18 22 24 22 24 28V32Z"
        fill="hsl(217, 91%, 53%)"
      />
      <ellipse cx="16" cy="30" rx="10" ry="8" fill="hsl(217, 91%, 53%)" />

      {/* Bar chart rising */}
      <rect x="30" y="28" width="5" height="12" rx="1" fill="hsl(217, 91%, 53%)" />
      <rect x="38" y="22" width="5" height="18" rx="1" fill="hsl(217, 91%, 53%)" />
      <rect x="46" y="16" width="5" height="24" rx="1" fill="hsl(217, 91%, 53%)" />
      
      {/* Checkmark overlay on chart */}
      <path
        d="M34 30L38 34L48 22"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Text: HIRE RIGHT */}
      <text
        x="60"
        y="32"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        HIRE RIGHT
      </text>
    </svg>
  );
};
