import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

const directionVariants = {
  up: { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  down: { initial: { y: -60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  left: { initial: { x: 60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  none: { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 } },
};

export const AnimatedSection = ({
  children,
  id,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px -10% 0px",
    amount: 0.1 
  });

  const variants = directionVariants[direction];

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ ...variants.initial, filter: "blur(8px)" }}
      animate={isInView ? { ...variants.animate, filter: "blur(0px)" } : variants.initial}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.section>
  );
};
