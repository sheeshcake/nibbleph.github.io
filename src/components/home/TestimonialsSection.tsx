import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container-custom">
        <div className="relative">
          <div className="flex items-center space-x-2 mb-6">
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <p className="text-sm">Testimonials</p>
          </div>
          
          <div className="max-w-3xl">
            <blockquote className="text-xl md:text-2xl font-medium mb-6">
              "Working with Nibble Dev Team has been a game-changer for our business. Their expertise in artificial intelligence solutions led to scale our operations quickly and efficiently, and their personalized approach ensured that our exact needs were met."
            </blockquote>
            
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              </div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-400">CEO at TechFront</p>
              </div>
            </div>
          </div>
          
          <div className="absolute right-0 bottom-0 hidden md:flex space-x-2">
            <button className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <span>←</span>
            </button>
            <button className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
