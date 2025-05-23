import React, { useEffect, useState } from 'react';

export default function AboutUsSection() {


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


    return (
        <div className="container-custom flex flex-row mb-20 overflow-visible h-[60vh]">
            <div className="flex flex-col gap-5 mr-20">
                <h1 className="text-red-500 text-2xl">About.</h1>
                <h1 className="text-white text-6xl">We believe that <span className="text-white italic font-thin">technology</span></h1>
                <h1 className="text-white text-6xl">can transform the <span className="text-red-500" >world</span>.</h1>
                <p className="text-white">
                    That is why we're committed to delivering innovative IT solutions to businesses of all sizes. Our team of experienced professionals is dedicated to helping you achieve your goals and thrive in a rapidly evolving digital landscape. Our
                     goal is to help businesses of all sizes  succeed by providing customized solutions that meet their unique needs.
                </p>    
            </div>
            <div className="flex flex-col gap-5 mx-20 pt-20">
                <div 
                    className="w-5 h-5 bg-gray-500 justify-end self-end"
                    style={{
                        transform: `translateY(0) translateX(${positions.square1.x}px) rotate(${positions.square1.rotation}deg)`,
                        animation: 'float 6s ease-in-out infinite, spin 15s linear infinite'
                    }}
                ></div>
                <div 
                    className="w-[100px] h-[100px] bg-red-500 mt-10 mr-10"
                    style={{
                        transform: `translateY(0) translateX(${positions.square2.x}px) rotate(${positions.square2.rotation}deg)`,
                        animation: 'float-slow 8s ease-in-out infinite, spin 20s linear infinite reverse'
                    }}
                ></div>
            </div>
        </div>
    );
}