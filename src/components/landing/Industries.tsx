import { memo, useMemo } from "react";
import { motion, useReducedMotion, Easing } from "framer-motion";
import { springHover } from "@/lib/animations";

const industries = [
  "IT & Technology",
  "Engineering",
  "Oil & Gas",
  "Healthcare",
  "Finance & Banking",
  "Retail",
  "Hospitality",
  "Manufacturing",
  "Construction",
  "Logistics",
  "Education",
  "Real Estate",
];

const smoothEasing: Easing = [0.25, 0.4, 0.25, 1];

const headerVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: smoothEasing }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: smoothEasing },
  },
};

export const Industries = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.04,
        delayChildren: 0.1,
      },
    },
  }), [prefersReducedMotion]);

  return (
    <section id="industries" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Static background - no animation for performance */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
            Industries We Serve
          </span>
          <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Deep Industry Expertise
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our specialized recruiters understand the unique challenges and 
            requirements of each industry sector.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {industries.map((industry) => (
            <motion.span
              key={industry}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springHover}
              className="px-6 py-3 rounded-full glass text-foreground font-medium cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 will-change-transform"
            >
              {industry}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Industries.displayName = "Industries";
