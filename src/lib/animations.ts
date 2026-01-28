import type { Easing } from "framer-motion";

// Type-safe easing for framer-motion
const smoothEasing: Easing = [0.25, 0.4, 0.25, 1];

// Shared animation variants for consistent, performant animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: smoothEasing }
  }
} as const;

export const fadeInBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: smoothEasing }
  }
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: smoothEasing }
  }
} as const;

// Optimized spring config for hover effects
export const springHover = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

// Export the easing for use elsewhere
export { smoothEasing };
