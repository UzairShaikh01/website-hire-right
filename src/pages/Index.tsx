import { lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { ValuesMarquee } from "@/components/landing/ValuesMarquee";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Industries } from "@/components/landing/Industries";

import { Footer } from "@/components/landing/Footer";

// Lazy load data-fetching components for better initial load
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const Jobs = lazy(() => import("@/components/landing/Jobs"));
const Contact = lazy(() => import("@/components/landing/Contact"));


// Loading placeholder
const SectionLoader = memo(() => (
  <div className="py-24 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
    />
  </div>
));

SectionLoader.displayName = "SectionLoader";

const Index = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen overflow-x-hidden"
    >
      <Header />
      <Hero />
      <ValuesMarquee />
      <About />
      <Services />
      <Industries />
      
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Jobs />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      <Footer />
    </motion.div>
  );
});

Index.displayName = "Index";

export default Index;
