import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ExploreButtonProps {
  to: string;
  className?: string;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({ to, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="w-full md:w-[540px] h-[200px] md:h-[250px] bg-gray-800/40 backdrop-blur-sm rounded-[30px] animate-fade-in-delay"></div>
      {/* Explore button */}
      <Link 
        to={'#about'}
        className={`absolute right-4 md:right-12 -bottom-16 md:-bottom-20 z-50 hover:cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-red-600 flex items-center justify-center cursor-pointer transform hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300 ease-in-out relative group">
          {/* Centered Arrow */}
          <div className="w-[135px] h-[135px] md:w-[180px] md:h-[180px] inset-0 flex items-center justify-center z-10">
            <svg
              width="45"
              height="45"
              className="md:w-[60px] md:h-[60px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 group-hover:scale-110 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
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
          <div className={`absolute inset-0 pointer-events-none ${isVisible ? 'animate-[spin_20s_linear_infinite]' : 'opacity-0'}`}>
            <svg
              className="absolute inset-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] p-4 md:p-5"
              viewBox="0 0 100 100"
            >
              <path
                id="textCircle"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fill="white" className="text-[13px]">
                <textPath xlinkHref="#textCircle" startOffset="0%">
                  EXPLORE&#160;&#160;&#160;&#160;NOW&#160;&#160;&#160;&#160;&#160;&#160;EXPLORE&#160;&#160;&#160;&#160;NOW
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExploreButton;