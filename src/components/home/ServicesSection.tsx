import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
    // State for random positions of decorative elements
    const [positions, setPositions] = useState({
      square1: { x: 0, y: 0, rotation: 0 },
      square2: { x: 0, y: 0, rotation: 0 }
    });
  
    // Effect for random movements
    useEffect(() => {
      // Initial random positions
      setPositions({
        square1: { 
          x: Math.random() * 20 - 10, 
          y: Math.random() * 20 - 10,
          rotation: Math.random() * 30 - 15
        },
        square2: { 
          x: Math.random() * 20 - 10, 
          y: Math.random() * 20 - 10,
          rotation: Math.random() * 30 - 15
        }
      });
  
      // Update positions periodically for smooth random movement
      const interval = setInterval(() => {
        setPositions(prev => ({
          square1: { 
            x: prev.square1.x + (Math.random() * 4 - 2),
            y: prev.square1.y + (Math.random() * 4 - 2),
            rotation: prev.square1.rotation + (Math.random() * 10 - 5)
          },
          square2: { 
            x: prev.square2.x + (Math.random() * 4 - 2),
            y: prev.square2.y + (Math.random() * 4 - 2),
            rotation: prev.square2.rotation + (Math.random() * 10 - 5)
          }
        }));
      }, 3000); // Update every 3 seconds
  
      return () => clearInterval(interval);
    }, []);
  const services = [
    {
      title: "Web Development",
      path: "#"
      // path: "/services/web"
    },
    {
      title: "Mobile Development",
      path: "#"
      // path: "/services/mobile"
    },
    {
      title: "Artificial Intelligence",
      path: "#"
      // path: "/services/ai"
    },
    {
      title: "Quality Assurance",
      path: "#"
      // path: "/services/qa"
    },
    {
      title: "Database Architecture",
      path: "#"
      // path: "/services/database"
    }
  ];

  return (
    <section className="bg-black py-10 md:py-20 relative overflow-hidden">
      {/* Animated floating squares - added more animations */}
      <div 
        className="absolute top-10 left-1/2 w-16 md:w-20 h-16 md:h-20 bg-gray-400 opacity-30 animate-float transition-all duration-3000 ease-in-out backdrop-blur-sm"
        style={{
          transform: `translateY(0) translateX(${positions.square1.x}px) rotate(${positions.square1.rotation}deg)`,
          animation: 'float 6s ease-in-out infinite, spin 15s linear infinite, pulse 4s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-8 md:w-10 h-8 md:h-10 bg-red-600 transition-all duration-3000 ease-in-out backdrop-blur-sm"
        style={{
          transform: `translateY(0) translateX(${positions.square2.x}px) rotate(${positions.square2.rotation}deg)`,
          animation: 'float-slow 8s ease-in-out infinite, spin 20s linear infinite reverse, scale 5s ease-in-out infinite'
        }}
      ></div>
      
      <div className="container-custom relative z-10 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Right side content - moved to top on mobile */}
          <div className="order-first lg:order-last col-span-1 lg:col-span-6 flex flex-col justify-center lg:pl-12 mb-10 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-4 md:mb-6">
              Services
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-md">
              We provide customized solutions that meet our clients' unique needs and help them succeed in an increasingly digital world.
            </p>
          </div>

          {/* Left side services */}
          <div className="order-2 lg:order-first col-span-1 lg:col-span-3 flex flex-col space-y-4 md:space-y-8">
            {services.slice(0, 3).map((service, index) => (
              <Link key={index} to={service.path} className="relative group">
                <div className="bg-black p-4 md:p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{service.title}</h3>
                  <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Middle services */}
          <div className="order-3 col-span-1 lg:col-span-3 flex flex-col space-y-4 md:space-y-8">
            {services.slice(3).map((service, index) => (
              <Link key={index} to={service.path} className="relative group">
                <div className="bg-black p-4 md:p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{service.title}</h3>
                  <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg) translateX(0) translateY(0); }
          to { transform: rotate(360deg) translateX(0) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .duration-3000 {
          transition-duration: 3000ms;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
