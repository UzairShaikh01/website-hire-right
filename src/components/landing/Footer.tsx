import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
  ],
  resources: [
    { label: "Career Tips", href: "#" },
    { label: "Hiring Guide", href: "#" },
    { label: "Market Insights", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  regions: [
    { label: "Dubai, UAE", href: "#" },
  ],
};

export const Footer = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold tracking-tight text-white">HIRE RIGHT</h3>
            <p className="mt-6 text-white/60 max-w-sm leading-relaxed">
              Your trusted recruitment partner across EMEA and APAC. Connecting 
              exceptional talent with forward-thinking organizations.
            </p>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              {[
                { icon: Phone, text: "+971 52 457 8336", href: "tel:+971524578336" },
                { icon: Mail, text: "info@hirerightuae.com", href: "mailto:info@hirerightuae.com" },
                { icon: MapPin, text: "Deira, Dubai, UAE", href: null },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-white/60">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Regional Hubs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-6">Regional Hubs</h4>
            <ul className="space-y-3">
              {footerLinks.regions.map((link) => (
                <li key={link.label}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Hire Right. All rights reserved.
            </motion.div>
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ color: "white" }}
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </motion.button>
              <motion.button
                whileHover={{ color: "white" }}
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
