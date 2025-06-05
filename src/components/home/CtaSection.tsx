import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container-custom">
        <div className="relative overflow-hidden bg-black border border-gray-800 text-white p-16 rounded-3xl">
          <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-12">
            Ready to take <br />
            your <span className="italic">Business' IT</span> <br />
            to the next <span className="text-red-600">level</span>?
          </h2>
          
          {/* <button className="group bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 flex items-center">
            GET FREE CONSULTATION
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button> */}

          {/* Wave SVG animation */}
          <svg 
            className="absolute bottom-0 left-0 w-full h-150 opacity-10 animate-wave" 
            viewBox="0 0 1440 120" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,32L48,37.3C96,43,192,53,288,48C384,43,480,21,576,32C672,43,768,85,864,90.7C960,96,1056,64,1152,48C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
