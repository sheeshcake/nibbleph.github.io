import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import AboutUsSection from '../components/home/AboutUsSection';
import WhyUsSection from '../components/home/WhyUsSection';
import ServicesSection from '../components/home/ServicesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import CtaSection from '../components/home/CtaSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TeamSection from '../components/home/TeamSection';
import BlogSection from '../components/home/BlogSection';
import FaqSection from '../components/home/FaqSection';
import Footer from '../components/Footer';

interface ScrollSectionProps {
  children: React.ReactNode;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  ); 
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection /> {/* Keep hero section always visible */}
        
        <ScrollSection>
          <AboutUsSection />
        </ScrollSection>
        
        <ScrollSection>
          <WhyUsSection />
        </ScrollSection>
        
        <ScrollSection>
          <ServicesSection />
        </ScrollSection>
        
        <ScrollSection>
          <ProjectsSection />
        </ScrollSection>
        
        <ScrollSection>
          <CtaSection />
        </ScrollSection>
        
        <ScrollSection>
          <TestimonialsSection />
        </ScrollSection>
        
        <ScrollSection>
          <TeamSection />
        </ScrollSection>
        
        <ScrollSection>
          <BlogSection />
        </ScrollSection>
        
        <ScrollSection>
          <FaqSection />
        </ScrollSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;