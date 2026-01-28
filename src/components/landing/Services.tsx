import { memo, useMemo } from "react";
import { motion, useReducedMotion, Easing } from "framer-motion";
import { Users, Clock, Award, Building2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { springHover } from "@/lib/animations";

const services = [
  {
    title: "Permanent Recruitment",
    description: "Find the right people for your most critical permanent roles. Our rigorous screening process ensures cultural and technical fit.",
    icon: Users,
    size: "large" as const,
    variant: "primary" as const,
  },
  {
    title: "Contract Staffing",
    description: "Flexible workforce solutions for project-based needs. Scale up or down with qualified professionals.",
    icon: Clock,
    size: "small" as const,
    variant: "glass" as const,
  },
  {
    title: "Executive Search",
    description: "Discreet and thorough search for C-suite and senior leadership positions.",
    icon: Award,
    size: "small" as const,
    variant: "glass" as const,
  },
  {
    title: "RPO Solutions",
    description: "Full recruitment process outsourcing to optimize your hiring at scale. End-to-end management with dedicated teams.",
    icon: Building2,
    size: "medium" as const,
    variant: "dark" as const,
  },
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

export const Services = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  }), [prefersReducedMotion]);

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Tailored Recruitment Solutions
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From permanent hires to full RPO, we have the expertise to meet your unique talent acquisition needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              transition={springHover}
              className={cn(
                "group relative rounded-3xl p-8 cursor-pointer overflow-hidden will-change-transform",
                service.size === "large" && "lg:col-span-2 lg:row-span-2 p-10",
                service.size === "medium" && "lg:col-span-2",
                service.variant === "primary" && "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-xl shadow-primary/20",
                service.variant === "dark" && "bg-foreground text-background",
                service.variant === "glass" && "glass hover:shadow-lg transition-shadow duration-300"
              )}
            >
              {/* Simplified background decoration */}
              {service.variant === "primary" && (
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
              )}

              <div className="relative z-10">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                  transition={springHover}
                  className={cn(
                    "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6",
                    service.variant === "primary" && "bg-white/20",
                    service.variant === "dark" && "bg-white/10",
                    service.variant === "glass" && "bg-primary/10"
                  )}
                >
                  <service.icon className={cn("w-7 h-7", service.variant === "glass" && "text-primary")} />
                </motion.div>

                <h3 className={cn("text-2xl font-bold mb-3", service.size === "large" && "text-3xl lg:text-4xl")}>
                  {service.title}
                </h3>

                <p className={cn(
                  "leading-relaxed",
                  service.variant === "primary" && "text-white/80",
                  service.variant === "dark" && "text-white/70",
                  service.variant === "glass" && "text-muted-foreground"
                )}>
                  {service.description}
                </p>

                <div className={cn(
                  "mt-6 inline-flex items-center gap-2 font-medium",
                  service.variant === "primary" && "text-white",
                  service.variant === "dark" && "text-white",
                  service.variant === "glass" && "text-primary"
                )}>
                  Learn more
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Services.displayName = "Services";
