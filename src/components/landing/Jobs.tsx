import { memo, useCallback, useMemo } from "react";
import { motion, useReducedMotion, Easing } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { springHover } from "@/lib/animations";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  job_type: string;
}

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEasing },
  },
};

// Memoized job card
const JobCard = memo(({ job, onApply, prefersReducedMotion }: { 
  job: Job; 
  onApply: () => void;
  prefersReducedMotion: boolean | null;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={prefersReducedMotion ? undefined : { y: -3, x: 2 }}
    transition={springHover}
    className="group glass rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer will-change-transform"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {job.title}
        </h3>
        <p className="mt-2 text-muted-foreground line-clamp-2">{job.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground px-3 py-1 rounded-full bg-foreground/5">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground px-3 py-1 rounded-full bg-foreground/5">
            <Briefcase className="w-3.5 h-3.5" />
            {job.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {job.job_type}
          </span>
        </div>
      </div>
      <Button
        onClick={onApply}
        className="shrink-0 rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-lg transition-all duration-200"
      >
        Apply Now
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Button>
    </div>
  </motion.div>
));

JobCard.displayName = "JobCard";

export const Jobs = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as Job[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const scrollToContact = useCallback(() => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

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

  if (isLoading) {
    return (
      <section id="careers" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
            />
            <span className="text-muted-foreground">Loading opportunities...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            Current Opportunities
          </span>
          <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Find Your Next Role
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Explore our latest job openings across EMEA and APAC regions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {jobs.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center py-12 glass rounded-3xl">
              <p className="text-muted-foreground">No job listings available at the moment. Check back soon!</p>
            </motion.div>
          ) : (
            jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onApply={scrollToContact}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, ease: smoothEasing }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToContact}
            className="rounded-full glass border-0 hover:bg-foreground/5"
          >
            Contact Us for More Opportunities
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

Jobs.displayName = "Jobs";

export default Jobs;

