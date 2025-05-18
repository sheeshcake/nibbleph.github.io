
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import WhyUsSection from '../components/home/WhyUsSection';
import ServicesSection from '../components/home/ServicesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import CtaSection from '../components/home/CtaSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TeamSection from '../components/home/TeamSection';
import BlogSection from '../components/home/BlogSection';
import FaqSection from '../components/home/FaqSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <WhyUsSection />
        <ServicesSection />
        <ProjectsSection />
        <CtaSection />
        <TestimonialsSection />
        <TeamSection />
        <BlogSection />
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
