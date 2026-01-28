import { motion } from "framer-motion";

const values = [
  "INTEGRITY",
  "COMMITMENT", 
  "EXCELLENCE",
  "EMEA REACH",
  "APAC EXPERTISE",
  "PRECISION",
  "PARTNERSHIP",
];

export const ValuesMarquee = () => {
  return (
    <section className="py-16 overflow-hidden relative">
      {/* Gradient overlays for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="relative">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...values, ...values, ...values, ...values].map((value, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
              transition={{ duration: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground/10 hover:text-primary/50 transition-colors duration-500 cursor-default select-none"
            >
              {value}
              <span className="text-primary/30 mx-6">✦</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
