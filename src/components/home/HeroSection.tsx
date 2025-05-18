import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const waveContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SVG object handling
    const svgObject = document.getElementById(
      "wavelines-svg-object"
    ) as HTMLObjectElement;

    const handleLoad = () => {
      const svgDoc = svgObject?.contentDocument;
      if (!svgDoc) return;

      const svgElement = svgDoc.querySelector("svg");
      if (svgElement) {
        svgElement.style.filter = "brightness(1.2) contrast(1.2)";
      }

      // Add additional sine wave animation to the whole group
      const gElement = svgDoc.querySelector("g");
      if (gElement) {
        gElement.style.animation = "float 20s ease-in-out infinite alternate";
        gElement.style.transformOrigin = "center";
      }

      // Get all path elements for the connection effect
      const paths = Array.from(svgDoc.querySelectorAll('path'));
      if (!paths.length) return;
      
      // Set initial properties for smooth transitions
      paths.forEach(path => {
        path.style.transition = "stroke 0.8s ease-out";
      });
      
      // Connection effect function
      const createConnectionEffect = () => {
        // Pick a random starting point
        const startIndex = Math.floor(Math.random() * paths.length);
        let currentIndex = startIndex;
        
        // Create a "connection path" that will light up
        const connectionPath: number[] = [currentIndex];
        
        // Add 2-4 connected segments randomly
        const segmentCount = 2 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < segmentCount; i++) {
          // Choose next segment (prefer adjacent ones for more natural flow)
          const nextIndex = getNextPathIndex(currentIndex, paths.length, connectionPath);
          connectionPath.push(nextIndex);
          currentIndex = nextIndex;
        }
        
        // Animate the connection
        animateConnection(paths, connectionPath);
      };
      
      // Helper to get next path index with preference for adjacent paths
      const getNextPathIndex = (currentIndex: number, maxLength: number, usedIndices: number[]): number => {
        // 70% chance to pick an adjacent path for more natural flow
        if (Math.random() < 0.7) {
          // Try adjacent indices
          const possibleNext = [
            (currentIndex + 1) % maxLength,
            (currentIndex - 1 + maxLength) % maxLength
          ].filter(idx => !usedIndices.includes(idx));
          
          if (possibleNext.length > 0) {
            return possibleNext[Math.floor(Math.random() * possibleNext.length)];
          }
        }
        
        // Otherwise pick a random unused path
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * maxLength);
        } while (usedIndices.includes(nextIndex));
        
        return nextIndex;
      };
      
      // Function to animate the connection with red color
      const animateConnection = (paths: SVGPathElement[], indices: number[]) => {
        // Colors for the effect
        const baseColor = "#ffffff";
        const activeColor = "#ff3333";
        const glowColor = "#ff0000";
        
        // Animate each segment sequentially
        indices.forEach((pathIndex, i) => {
          const path = paths[pathIndex];
          
          // Activate with delay based on position in sequence
          setTimeout(() => {
            // Add glow effect
            path.style.stroke = activeColor;
            path.style.filter = "drop-shadow(0 0 3px #ff0000)";
            path.style.strokeWidth = "2";
            
            // Return to normal after a delay
            setTimeout(() => {
              path.style.stroke = baseColor;
              path.style.filter = "none";
              path.style.strokeWidth = "1.5";
            }, 800);
          }, i * 200); // Stagger the animation
        });
        
        // Create a pulsating point at a random connection junction
        if (indices.length >= 2) {
          // Pick a random junction point
          const junctionIndex = Math.floor(Math.random() * (indices.length - 1)) + 1;
          const junctionPathIndex = indices[junctionIndex];
          const junctionPath = paths[junctionPathIndex];
          
          // Create a pulse effect at the junction
          setTimeout(() => {
            // Get the bounding box of the junction path
            const bbox = junctionPath.getBBox();
            
            // Create a circle element for the pulse
            const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pulse.setAttribute("cx", (bbox.x + bbox.width / 2).toString());
            pulse.setAttribute("cy", (bbox.y + bbox.height / 2).toString());
            pulse.setAttribute("r", "3");
            pulse.setAttribute("fill", "#ff0000");
            pulse.style.filter = "drop-shadow(0 0 5px #ff0000)";
            
            // Add animation
            const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            anim.setAttribute("attributeName", "r");
            anim.setAttribute("values", "3;8;3");
            anim.setAttribute("dur", "1s");
            anim.setAttribute("repeatCount", "3");
            
            // Add fade-out animation
            const fadeAnim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            fadeAnim.setAttribute("attributeName", "opacity");
            fadeAnim.setAttribute("values", "1;0.7;1;0.7;0");
            fadeAnim.setAttribute("dur", "3s");
            fadeAnim.setAttribute("repeatCount", "1");
            fadeAnim.setAttribute("fill", "freeze");
            
            // Add animations to pulse
            pulse.appendChild(anim);
            pulse.appendChild(fadeAnim);
            
            // Add pulse to SVG
            const svg = junctionPath.ownerSVGElement;
            if (svg) {
              svg.appendChild(pulse);
            }
            
            // Remove after animation completes
            setTimeout(() => {
              if (svg && svg.contains(pulse)) {
                svg.removeChild(pulse);
              }
            }, 3000);
          }, junctionIndex * 200 + 300);
        }
      };
      
      // Start the connection effect
      const runConnectionEffects = () => {
        // Initial delay
        setTimeout(() => {
          // Run first effect
          createConnectionEffect();
          
          // Setup interval for periodic effects
          setInterval(() => {
            if (Math.random() < 0.7) { // 70% chance to trigger 
              createConnectionEffect();
            }
          }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds
        }, 2000);
      };
      
      // Start the effect
      runConnectionEffects();
    };

    if (svgObject) {
      svgObject.onload = handleLoad;
      handleLoad();
    }

    // Create true sine wave animation effect
    const animateSineWave = () => {
      if (!waveContainerRef.current) return;

      const waveContainer = waveContainerRef.current;
      let time = 0;

      const animate = () => {
        // Sine wave math
        time += 0.01;
        const translateX = Math.sin(time) * 20;
        const translateY = Math.cos(time * 0.8) * 10;

        // Apply transform with 3D acceleration
        waveContainer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

        // Continue animation
        requestAnimationFrame(animate);
      };

      // Start animation loop
      animate();
    };

    // Initialize the sine wave animation
    animateSineWave();

    // Clean up
    return () => {
      // Clean up code if needed
    };
  }, []);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden pt-24">
      {/* Main content */}
      <div className="container mx-auto px-8 pt-10 z-50">
        {/* Top row - Transform and gray box */}
        <div className="flex justify-between items-center">
          <h1 className="text-8xl md:text-[150px] font-bold text-white leading-[1.1] animate-fade-in">
            <span className="inline-block animate-slide-up">Transform</span>
          </h1>

          {/* Gray box with button */}
          <div className="relative">
            <div className="w-[540px] h-[250px] bg-gray-800/40 backdrop-blur-sm rounded-[30px] animate-fade-in-delay"></div>
            {/* Explore button */}
            <Link 
            to={''}
            className="absolute right-12 -bottom-20 z-100 hover:cursor-pointer"
            >
              <div className="w-[200px] h-[200px] rounded-full bg-red-600 flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform duration-300 relative animate-fade-in-bounce">
                {/* Centered Arrow */}
                <div className="w-[180px] h-[180px] inset-0 flex items-center justify-center z-10">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 19L19 5M19 5H8M19 5V16"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Circular Text with animation */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  <svg
                    className="absolute inset-0 w-[200px] h-[200px] p-5"
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="textCircle"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text fill="white" className="text-[13px]">
                      <textPath xlinkHref="#textCircle" startOffset="0%">
                        EXPLORE&#160;&#160;&#160;NOW&#160;&#160;&#160;EXPLORE&#160;&#160;&#160;NOW
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-10 -mt-5">
          <h1 className="text-8xl md:text-[150px] font-bold text-white leading-[1.1] animate-fade-in-delay">
            <span className="inline-block animate-slide-up-delay">Your</span>
          </h1>
          <h1 className="text-8xl md:text-[150px] italic font-normal text-white leading-[1.1] animate-fade-in-delay-2">
            <span className="inline-block animate-slide-up-delay-2">
              Business
            </span>
          </h1>
        </div>
        <div className="max-w-xl ml-auto mr-[60px] animate-fade-in-delay-3">
          <p className="text-gray-400 text-lg leading-relaxed text-left">
            Our team of experts has years of experience in the IT industry and a
            passion for innovative technology solutions. We're dedicated to
            delivering solutions that are tailored to your unique needs and
            budget, and that exceed your expectations.
          </p>
        </div>
      </div>

      {/* Animated Wave lines using external SVG */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[450px] wavelines-wrapper">
        <div
          ref={waveContainerRef}
          className="absolute wavelines-container w-full h-full"
        >
          <object
            id="wavelines-svg-object"
            data="/wavelines.svg"
            type="image/svg+xml"
            className="w-full transform scale-150 -translate-y-1/3"
          ></object>

          {/* Overlay sine wave layer for enhanced effect */}
          <div className="absolute inset-0 sine-wave-overlay">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`sine-wave-layer wave-layer-${i + 1}`}
                style={{
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.03 + i * 0.01,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        
        .wavelines-wrapper {
          position: relative;
        }
        
        .wavelines-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform: translateZ(0);
          will-change: transform;
          transition: transform 0.05s linear;
        }
        
        /* Additional sine wave visual overlay */
        .sine-wave-overlay {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
        
        .sine-wave-layer {
          position: absolute;
          left: -10%;
          width: 120%;
          height: 300px;
          background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          opacity: 0.05;
          transform-origin: center;
          animation: sineWaveMove 8s infinite ease-in-out alternate;
        }
        
        .wave-layer-1 {
          bottom: 50px;
          height: 250px;
          animation-duration: 15s;
        }
        
        .wave-layer-2 {
          bottom: 80px;
          height: 200px;
          animation-duration: 18s;
        }
        
        .wave-layer-3 {
          bottom: 20px;
          height: 300px;
          animation-duration: 20s;
        }
        
        @keyframes sineWaveMove {
          0% {
            transform: translateY(0) scaleX(1.05) skewY(1deg);
          }
          25% {
            transform: translateY(20px) scaleX(0.95) skewY(-1deg);
          }
          50% {
            transform: translateY(-15px) scaleX(1.1) skewY(1.5deg);
          }
          75% {
            transform: translateY(10px) scaleX(0.9) skewY(-0.5deg);
          }
          100% {
            transform: translateY(-20px) scaleX(1.05) skewY(1deg);
          }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fade-in-bounce {
          0% { opacity: 0; transform: scale(0.8); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.9s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-bounce {
          animation: fade-in-bounce 1s ease-out 1.2s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
