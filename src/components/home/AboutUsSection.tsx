import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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


    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5
            }
        })
    };

    return (
        <section id="about" className="container-custom flex flex-row mb-20 overflow-visible h-[60vh]">
            <motion.div 
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-5 mr-20"
            >
                <motion.h1 
                    variants={textVariants}
                    className="text-red-500 text-2xl relative"
                >
                    About.
                </motion.h1>
                
                <motion.h1 
                    className="text-white text-6xl flex flex-wrap gap-3"
                    variants={textVariants}
                >
                    {["We", "believe", "that"].map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            className="inline-block"
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                    <motion.span 
                        custom={3}
                        variants={wordVariants}
                        className="text-white italic font-thin"
                    >
                        technology
                    </motion.span>
                </motion.h1>

                <motion.h1 
                    className="text-white text-6xl flex flex-wrap gap-3"
                    variants={textVariants}
                >
                    {["can", "transform", "the"].map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i + 4}
                            variants={wordVariants}
                            className="inline-block"
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                    <motion.span 
                        className="text-red-500"
                        variants={wordVariants}
                        custom={7}
                        whileHover={{ 
                            scale: 1.1,
                            transition: { duration: 0.2 }
                        }}
                    >
                        world
                    </motion.span>
                    <motion.span variants={wordVariants} custom={8}>.</motion.span>
                </motion.h1>

                <motion.p 
                    className="text-white max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    That is why we're committed to delivering innovative IT solutions to businesses of all sizes. Our team of experienced professionals is dedicated to helping you achieve your goals and thrive in a rapidly evolving digital landscape. Our
                     goal is to help businesses of all sizes succeed by providing customized solutions that meet their unique needs.
                </motion.p>    
            </motion.div>

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
        </section>
    );
}