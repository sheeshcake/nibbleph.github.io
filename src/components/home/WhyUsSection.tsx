
import React from 'react';

const WhyUsSection = () => {
  const reasons = [
    {
      title: "expertise",
      icon: '/expertise-icon.svg',
      description: "Our team of experienced experts have the knowledge and expertise to deliver innovative IT solutions that meet your unique needs."
    },
    {
      title: "technology",
      icon: '/technology-icon.svg',
      description: "We stay up to date with the latest trends and technologies in the IT industry, so you can get the most advanced solutions available."
    },
    {
      title: "solutions",
      icon: '/solutions-icon.svg',
      description: "We take a personalized approach to every project, working closely with you to understand your business and create solutions."
    },
    {
      title: "results",
      icon: '/results-icon.svg',
      description: "Our track record speaks for itself – we've helped businesses of all sizes and industries achieve their goals with our IT solutions."
    }
  ];

  return (
    <section className="text-white pb-20 relative z-20 bg-black">
      <div className="container-custom bg-transparent relative z-20 mt-20">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-20 text-center">Why <span className="text-red-600">Us</span>?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-20 gap-10 md:gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-8">
                {/* 3D Wireframe models - using SVG placeholders that look like the image */}
                <div className="w-24 h-24 mx-auto opacity-80">
                  <img src={reason.icon} alt={reason.title} className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="text-3xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-lg text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
