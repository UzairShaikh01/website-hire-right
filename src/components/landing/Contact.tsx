import { memo } from "react";
import { motion, Easing } from "framer-motion";
import { Phone, Mail, MapPin, Sparkles } from "lucide-react";

const smoothEasing: Easing = [0.25, 0.4, 0.25, 1];

const headerVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: smoothEasing }
  }
};

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+971 52 457 8336", href: "tel:+971524578336" },
  { icon: Mail, label: "Email", value: "info@hirerightuae.com", href: "mailto:info@hirerightuae.com" },
  { icon: MapPin, label: "Office", value: "405, 4th Floor, P114 Sheikha Maryam Building, Baniyas Rd, Al Rigga, Deira, Dubai, UAE", href: null },
];

export const Contact = memo(() => {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Static background */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={headerVariants}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-primary font-semibold text-sm tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              Get In Touch
            </span>
            <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-tight">
              Ready to <span className="text-primary">Hire Right?</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Whether you're looking to hire exceptional talent or take the next 
              step in your career, we're here to help.
            </p>

            <div className="mt-10 flex flex-col items-center space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.08, ease: smoothEasing }}
                  className="flex items-center gap-4 p-4 rounded-2xl glass transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors duration-200">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-muted-foreground">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;

