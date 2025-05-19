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
      path: "/services/web"
    },
    {
      title: "Mobile Development",
      path: "/services/mobile"
    },
    {
      title: "Artificial Intelligence",
      path: "/services/ai"
    },
    {
      title: "Quality Assurance",
      path: "/services/qa"
    },
    {
      title: "Database Architecture",
      path: "/services/database"
    }
  ];

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Animated floating squares */}
      <div 
        className="absolute top-10 left-1/2 w-20 h-20 bg-gray-400 opacity-30 animate-float transition-all duration-3000 ease-in-out"
        style={{
          transform: `translateY(0) translateX(${positions.square1.x}px) rotate(${positions.square1.rotation}deg)`,
          animation: 'float 6s ease-in-out infinite, spin 15s linear infinite'
        }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-10 h-10 bg-red-600 transition-all duration-3000 ease-in-out"
        style={{
          transform: `translateY(0) translateX(${positions.square2.x}px) rotate(${positions.square2.rotation}deg)`,
          animation: 'float-slow 8s ease-in-out infinite, spin 20s linear infinite reverse'
        }}
      ></div>
      
      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side services */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3 flex flex-col space-y-8">
            <Link to={services[0].path} className="relative group">
              <div className="bg-black p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                <h3 className="text-xl md:text-2xl font-bold text-white">Web<br />Development</h3>
                <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to={services[1].path} className="relative group">
              <div className="bg-black p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                <h3 className="text-xl md:text-2xl font-bold text-white">Mobile<br />Development</h3>
                <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to={services[2].path} className="relative group">
              <div className="bg-black p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                <h3 className="text-xl md:text-2xl font-bold text-white">Artificial<br />Intelligence</h3>
                <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Middle services */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3 md:mt-16 flex flex-col space-y-8">
            <Link to={services[3].path} className="relative group">
              <div className="bg-black p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                <h3 className="text-xl md:text-2xl font-bold text-white">Quality<br />Assurance</h3>
                <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
            
            <Link to={services[4].path} className="relative group">
              <div className="bg-black p-6 rounded-md flex items-center justify-between transition-all duration-500 group-hover:border group-hover:border-gray-600">
                <h3 className="text-xl md:text-2xl font-bold text-white">Database<br />Architecture</h3>
                <div className="text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Right side content */}
          <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col justify-center md:pl-12">
            <h2 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">Services</h2>
            <p className="text-gray-300 mb-8 max-w-md">
              We provide customized solutions that meet our clients' unique needs and help them succeed in an increasingly digital world.
            </p>
            
            <Link to="/services" className="inline-block">
              <div className="border border-gray-300 text-white py-3 px-6 rounded-md flex items-center justify-between w-48 group hover:bg-white hover:text-black transition-all duration-300">
                <span className="uppercase text-sm font-medium">Learn More</span>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M23.5303 6.53033C23.8232 6.23744 23.8232 5.76256 23.5303 5.46967L18.7574 0.696699C18.4645 0.403806 17.9896 0.403806 17.6967 0.696699C17.4038 0.989593 17.4038 1.46447 17.6967 1.75736L21.9393 6L17.6967 10.2426C17.4038 10.5355 17.4038 11.0104 17.6967 11.3033C17.9896 11.5962 18.4645 11.5962 18.7574 11.3033L23.5303 6.53033ZM0 6.75H23V5.25H0V6.75Z" fill="currentColor"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg) translateX(0) translateY(0); }
          to { transform: rotate(360deg) translateX(0) translateY(0); }
        }
        .duration-3000 {
          transition-duration: 3000ms;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
