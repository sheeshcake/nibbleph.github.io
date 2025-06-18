import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-8 md:py-16 bg-black">
      <div className="container-custom">
        <div className="relative overflow-hidden bg-black border border-gray-800 text-white p-8 md:p-16 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 md:mb-12 relative z-10">
            Ready to take <br className="hidden sm:block" />
            your <span className="italic">Business' IT</span> <br className="hidden sm:block" />
            to the next <span className="text-red-600">level</span>?
          </h2>
          
          {/* Button commented out in original code */}

          {/* Wave SVG animation */}
          <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 overflow-hidden">
            <svg 
              className="absolute bottom-0 left-0 w-[200%] md:w-[150%] h-full transform translate-x-[-25%] animate-wave-slow" 
              viewBox="0 0 2880 240" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0,64L60,74.7C120,85,240,107,360,112C480,117,600,107,720,90.7C840,75,960,53,1080,58.7C1200,64,1320,96,1440,106.7C1560,117,1680,107,1800,90.7C1920,75,2040,53,2160,42.7C2280,32,2400,32,2520,42.7C2640,53,2760,75,2880,80C3000,85,3120,75,3240,69.3C3360,64,3480,64,3600,69.3C3720,75,3840,85,3960,85.3C4080,85,4200,75,4320,69.3C4440,64,4560,64,4680,69.3C4800,75,4920,85,5040,90.7C5160,96,5280,96,5400,85.3C5520,75,5640,53,5760,53.3C5880,53,6000,75,6120,85.3C6240,96,6360,96,6480,85.3C6600,75,6720,53,6840,53.3C6960,53,7080,75,7200,85.3C7320,96,7440,96,7560,85.3C7680,75,7800,53,7920,53.3C8040,53,8160,75,8280,85.3C8400,96,8520,96,8580,90.7L8640,85.3L8640,240L8580,240C8520,240,8400,240,8280,240C8160,240,8040,240,7920,240C7800,240,7680,240,7560,240C7440,240,7320,240,7200,240C7080,240,6960,240,6840,240C6720,240,6600,240,6480,240C6360,240,6240,240,6120,240C6000,240,5880,240,5760,240C5640,240,5520,240,5400,240C5280,240,5160,240,5040,240C4920,240,4800,240,4680,240C4560,240,4440,240,4320,240C4200,240,4080,240,3960,240C3840,240,3720,240,3600,240C3480,240,3360,240,3240,240C3120,240,3000,240,2880,240C2760,240,2640,240,2520,240C2400,240,2280,240,2160,240C2040,240,1920,240,1800,240C1680,240,1560,240,1440,240C1320,240,1200,240,1080,240C960,240,840,240,720,240C600,240,480,240,360,240C240,240,120,240,60,240L0,240Z" 
                className="fill-current opacity-10"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
