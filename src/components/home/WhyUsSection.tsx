
import React from 'react';

const WhyUsSection = () => {
  const reasons = [
    {
      title: "Innovation",
      description: "We develop cutting-edge solutions that push boundaries and set new standards."
    },
    {
      title: "Experience",
      description: "Our team brings years of expertise across diverse technological domains."
    },
    {
      title: "Quality",
      description: "We're committed to excellence in every line of code and pixel we deliver."
    },
    {
      title: "Support",
      description: "We stand by our products and offer unparalleled customer service."
    }
  ];

  return (
    <section className="bg-black text-white py-20">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Why <span className="text-techred">us</span>?</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6 opacity-75">
                {/* Icon placeholders */}
                <div className="w-12 h-12 mx-auto border border-white/20 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
