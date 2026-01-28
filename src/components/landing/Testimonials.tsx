import { memo, useCallback, useMemo } from "react";
import { motion, useReducedMotion, Easing } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { springHover } from "@/lib/animations";

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  company: string;
  content: string;
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

// Memoized testimonial card
const TestimonialCard = memo(({ testimonial, prefersReducedMotion }: { 
  testimonial: Testimonial; 
  prefersReducedMotion: boolean | null;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={prefersReducedMotion ? undefined : { y: -6 }}
    transition={springHover}
    className="glass rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 will-change-transform"
  >
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    
    <Quote className="w-10 h-10 text-primary/20 mb-4" />
    
    <p className="text-foreground leading-relaxed mb-6">
      "{testimonial.content}"
    </p>
    
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/25">
        {testimonial.author_name.charAt(0)}
      </div>
      <div>
        <div className="font-semibold text-foreground">{testimonial.author_name}</div>
        <div className="text-sm text-muted-foreground">
          {testimonial.author_role}, {testimonial.company}
        </div>
      </div>
    </div>
  </motion.div>
));

TestimonialCard.displayName = "TestimonialCard";

export const Testimonials = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Testimonial[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  }), [prefersReducedMotion]);

  if (isLoading) {
    return (
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
            />
            <span className="text-muted-foreground">Loading testimonials...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={headerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
            Client Success
          </span>
          <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            See what our clients have to say about their partnership with Hire Right.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;

