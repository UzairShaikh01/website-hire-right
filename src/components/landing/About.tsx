import { motion } from "framer-motion";
import { Shield, Globe2, Users, Sparkles, Zap } from "lucide-react";

const features = [
  { icon: Sparkles, text: "AI-Powered Matching" },
  { icon: Globe2, text: "Global Network" },
  { icon: Users, text: "Industry Specialists" },
];

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30"
      >
        <div className="w-full h-full bg-gradient-conic from-primary/20 via-transparent to-primary/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
              About Hire Right
            </span>
            <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Human Insight Meets{" "}
              <span className="text-primary">Smart Technology</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Hire Right, we believe great recruitment is about more than matching 
              CVs to job descriptions. It's about understanding the unique DNA of your 
              organization and finding talent that will thrive within it.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Our team combines decades of industry expertise with cutting-edge 
              recruitment technology to deliver results that matter.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 grid grid-cols-2 gap-6"
            >
              {[
                { icon: Globe2, value: "10+", label: "Industries" },
                { icon: Users, value: "2+", label: "Global Hubs" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="relative glass rounded-3xl p-8 lg:p-12">
              {/* Decorative elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-accent to-primary/20 rounded-full blur-xl"
              />

              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 mb-6"
                >
                  <Shield className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Trusted Talent Partner
                </h3>
                <p className="text-muted-foreground">
                  Your success is our mission. We're committed to delivering 
                  excellence in every placement.
                </p>

                {/* Feature cards */}
                <div className="mt-8 space-y-3">
                  {features.map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 4, backgroundColor: "hsl(var(--accent))" }}
                      className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-border/50 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{item.text}</span>
                      <Zap className="w-4 h-4 text-primary/50 ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
