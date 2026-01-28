import { memo, useMemo } from "react";
import { motion, useReducedMotion, Easing } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { springHover } from "@/lib/animations";

const team = [
  {
    name: "Ahmed Al-Rashid",
    role: "Founder & CEO",
    bio: "20+ years in executive recruitment across MENA. Former HR Director at a Fortune 500.",
    initials: "AR",
  },
  {
    name: "Sarah Chen",
    role: "Head of APAC Operations",
    bio: "Singapore-based leader with deep expertise in technology and finance sectors.",
    initials: "SC",
  },
  {
    name: "James Wilson",
    role: "Director of Client Solutions",
    bio: "Specializes in enterprise RPO and workforce planning for multinational corporations.",
    initials: "JW",
  },
  {
    name: "Dr. Fatima Hassan",
    role: "Healthcare Division Lead",
    bio: "Former healthcare executive with unmatched network in medical recruitment.",
    initials: "FH",
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

export const Team = memo(() => {
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
    <section id="team" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Static background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
            Our Team
          </span>
          <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Meet the Experts
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our leadership team brings together decades of industry experience 
            and a passion for connecting great talent with great opportunities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              transition={springHover}
              className="group text-center will-change-transform"
            >
              <div className="relative mx-auto w-40 h-40 mb-6">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  transition={springHover}
                  className="w-full h-full rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-primary/20 overflow-hidden"
                >
                  <span className="relative z-10">{member.initials}</span>
                </motion.div>
                
                {/* Social buttons */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200 shadow-lg">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200 shadow-lg">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                {member.name}
              </h3>
              <div className="text-primary font-medium mt-1">{member.role}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Team.displayName = "Team";
